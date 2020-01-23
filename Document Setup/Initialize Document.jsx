// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "spread", again so our math works out.
oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN

// Set up right-to-left binding order
app.activeDocument.documentPreferences.pageBinding = PageBindingOptions.RIGHT_TO_LEFT

// Initialize first layer as Art layer
app.activeDocument.layers[0].name = 'Art'
var artLayer = app.activeDocument.layers[0]

// Create other standard layers
var designLayer = app.activeDocument.layers.add({name:'Design'}) 
var retouchingLayer = app.activeDocument.layers.add({name:'Retouching'}) 
var pageNumberLayer = app.activeDocument.layers.add({name:'Page Numbers'}) 
var SFXLayer = app.activeDocument.layers.add({name:'SFX'}) 
var textLayer = app.activeDocument.layers.add({name:'Text'})


// This reuses the function from the "match art frame to page size plus bleed" script
// 
function matchFrameToPageSize(theFrame) {
    if (app.activeDocument.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right
        if (theFrame.parentPage.index % 2 == 0) { // if we’re on a left-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Same, but for right-side pages
                theFrame.parentPage.bounds[1] - 9, 
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 0];
        } else { // we must be on a right-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Adjust the dimensions to give 1/8" bleed on right-side pages
                theFrame.parentPage.bounds[1] - 0, // 
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 9];
        }
       
        } 
    else { // if the book is laid out right-to-left
        if (theFrame.parentPage.index % 2 == 0) { // if we’re on a right-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Adjust the dimensions to give 1/8" bleed
                theFrame.parentPage.bounds[1] + 0, // on right-side pages
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 9];
        } else { // we must be on a left-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Same, but for right-side pages
                theFrame.parentPage.bounds[1] - 9, 
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 0];
        }
    }
}


// Set up master page object for convenience
theMaster = app.activeDocument.masterSpreads.itemByName('A-Master')

// Place art boxes at 100% of page size
for (var i=0; i < theMaster.pages.length; i++) {
    thisRect = theMaster.pages[i].rectangles.add( // create a rect on the art layer of the current page
        app.activeDocument.layers.itemByName('Art'),  // art layer
        LocationOptions.AT_BEGINNING, // inside the beginning of the list of objects 
        theMaster.pages[i],  // with the current page as the reference object
        {
            name: 'ArtFrame',
            layer: app.activeDocument.layers.itemByName('Art'), 
            geometricBounds: theMaster.pages[i].bounds, 
            contentType: ContentType.GRAPHIC_TYPE, // make sure to specify that this is a graphic container
            frameFittingOption: 
                {
                    fittingAlignment: AnchorPoint.CENTER_ANCHOR,
                    fittingOnEmptyFrame: EmptyFrameFittingOptions.PROPORTIONALLY,
                },
        }) 
    matchFrameToPageSize(thisRect) // extend boxes to bleed
}

/// THIS IS EXTREMELY FRAGILE AND EXPERIMENTAL, but: 
// this is also the beginning of a script that will place artwork automatically in a layout


var w = new Window ("palette"); // must be defined at top level
var myMessage = w.add ("statictext"); 
myMessage.text = "Placing artwork...";

// Regular expression to find single-page art with page numbers.
// Matches "P04.tif", "44.psd", etc.
var singlePgMatchExpr = /[pP]?\d+\.(tif|TIF|psd|PSD|tiff|TIFF)/ // Regular expression to find single-page art with page numbers

// Regular expression to find two-page art files with two page numbers across a spread.
// Matches "P04.tif", "44.psd", etc.
var doublePgMatchExpr = /[pP]?\d+[\-\_][pP]?\d+\.(tif|TIF|psd|PSD|tiff|TIFF)/ // Regular expression to find single-page art with page numbers

/* Function for recursively pushing matching art files onto artFileArr. It's not great to have a recursive function modifying an array outside of its own scope,
but I don't feel like figuring out how to make fileList more cleanly recursive right now. */

// create an external variable we'll use to keep track of the highest-numbered page
var lastPage = 0

function findArtFiles(fileList) { // add files whose names match singlePgMatchExpr to the artFileArr array
    var foundFiles = []
    for (var i=0; i < fileList.length; i++) {
        $.writeln('total files to eval: ' + fileList.length)
        $.writeln('evaluating: ' + fileList[i].name + ', iteration ' + i)
        if (fileList[i].constructor == Folder) { // if the current element has the Folder object as a constructor, e.g., it is a folder…
            $.writeln('found Folder: ' + fileList[i].name)
            foundFiles = foundFiles.concat(findArtFiles(fileList[i].getFiles())) // recurse and continue, concatenating as we go
        } else {
            if (fileList[i].displayName.match(singlePgMatchExpr)) { // if current element's filename matches our expression
                foundFiles.push(fileList[i]) // add file to the array we'll be returning
                // check if filename is bigger than the last biggest one
                if (parseInt(fileList[i].displayName.match(/\d+/)[0], 10) > lastPage) {
                    lastPage = parseInt(fileList[i].displayName.match(/\d+/)[0], 10) // if it is, parse the match as an int and assign it to lastPage
                }
            }
        }
    }
    return foundFiles
}

function addPagesUpToSignature(highestPage) {
    signaturePages = highestPage + (16 - (highestPage % 16))
    for (i=0; i < signaturePages - 1 ; i++) { // add one less than the number of pages in signaturePages because the document already has one page.
        app.activeDocument.pages.add(
            LocationOptions.AT_END,
            {
                appliedMaster: app.activeDocument.masterSpreads.itemByName('A-Master')
            }
        )
    }
}
 
function placeAllArtwork() {
    if (!w.pbar) { // if the progress bar doesn't exist
        w.pbar = w.add('progressbar', undefined, 0, artFileArr.length); 
    } else {
        w.pbar.value = 0;
        w.update();
    }
    w.pbar.preferredSize.width = 300;
    w.show(); // Show our progress bar window

    for (var i=0; i < artFileArr.length; i++) { // iterate over array and place every file.
            // this insane line converts the matched to an integer, then back to a string, 
            //in order to strip any leading "0" characters from the match. It does this because 
            //the itemByName method will only match correctly if the _string_ value matches the page
            //number.
        var currentPage = app.activeDocument.pages.itemByName(parseInt(artFileArr[i].displayName.match(/\d+/)[0], 10).toString())
        var artFrame = currentPage.masterPageItems[0].override(currentPage) // detatch master art frame instance on current page and make it editable
        // app.activeWindow.activePage = currentPage // jump view to page being placed
        artFrame.place(artFileArr[i])

        w.pbar.value = i + 1; // increment progress bar
        w.update() // Have to call this, or the progress bar won't update.
    }
    w.close()   
}

// intialize the artFileArr by prompting for a folder to start with, getting the contents, and passing them to our art-finding script
var artFileArr = findArtFiles(Folder.selectDialog('Select folder containing page art assets to place.').getFiles()) 


addPagesUpToSignature(lastPage)

placeAllArtwork()

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin

// Spread Origin is necessary for some reason, otherwise I can't figure out how to refer to dimensions on both pages
// app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN 
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPINE_ORIGIN

// Create a new layer for putting Guides on, if it doesn't already exist
if (app.activeDocument.layers.itemByName('Guides') == null ) {
    app.activeDocument.layers.add({name:'Guides'}) 
}

// Set up master page object for convenience
theMaster = app.activeDocument.masterSpreads.itemByName('A-Master')

// Add top margin guide
theMaster.guides.add(
    {
        label: 'Top',
        orientation: HorizontalOrVertical.HORIZONTAL,
        location: theMaster.pages[0].bounds[0] + 36
    }
)

// Add bottom margin guide
theMaster.guides.add(
    {
        label: 'Bottom',
        orientation: HorizontalOrVertical.HORIZONTAL,
        location: theMaster.pages[0].bounds[2] - 36
    }
)

// Add recto inside guide
theMaster.guides.add(
    {
        label: 'RectoInside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: '42'
    }
)


// Add recto outside guide
theMaster.guides.add(
    {
        label: 'RectoOutside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[0].bounds[1] - 30
    }
)

// Add verso inside guide
theMaster.guides.add(
    {
        label: 'VersoInside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: -42
    }
)

// Add verso outside guide
theMaster.guides.add(
    {
        label: 'VersoOutside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: -theMaster.pages[1].bounds[3] + 30
    }
)

// PAGE NUMBERS SETUP INCLUDES
// - Create B-Master Page
// - Create Paragraph Style for Page Numbers
// - Place Page Number textFrames on both sides of B-Master

// Add B-Master and set it to inherit from A-Master
theBMaster = app.activeDocument.masterSpreads.add(2, {
    appliedMaster: theMaster, // set it to inherit from A-Master    
})

// Create page number paragraph style
pageNumberStyle = app.activeDocument.paragraphStyles.add({
    name: "Page Numbers",
    justification: Justification.AWAY_FROM_BINDING_SIDE,
})

// Calculate placement of verso page number box based on placement of named guides
var versoTopLeftX = theMaster.guides.itemByName('VersoOutside').location + 30
var versoTopLeftY = theMaster.guides.itemByName('Bottom').location
var versoBottomLeftX = theMaster.guides.itemByName('VersoOutside').location
var versoBottomLeftY = theMaster.guides.itemByName('Bottom').location + 15

// Calculate placement of recto page number box based on placement of named guides
var rectoTopLeftX = theMaster.guides.itemByName('RectoOutside').location
var rectoTopLeftY = theMaster.guides.itemByName('Bottom').location
var rectoBottomLeftX = theMaster.guides.itemByName('RectoOutside').location - 30
var rectoBottomLeftY = theMaster.guides.itemByName('Bottom').location + 15


// Add text boxes with page numbers to B-Master
theBMaster.textFrames.add(app.activeDocument.layers[0], LocationOptions.AT_END, theBMaster, {
    contents: SpecialCharacters.AUTO_PAGE_NUMBER,
    paragraphStyle: pageNumberStyle,
    geometricBounds: [versoTopLeftY,versoTopLeftX,versoBottomLeftY,versoBottomLeftX],
})

theBMaster.textFrames.add(app.activeDocument.layers[0], LocationOptions.AT_END, theBMaster, {
    contents: SpecialCharacters.AUTO_PAGE_NUMBER,
    paragraphStyle: pageNumberStyle,
    geometricBounds: [rectoTopLeftY,rectoTopLeftX,rectoBottomLeftY,rectoBottomLeftX],
})

// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin


// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE
// And restore old ruler origin
app.activeDocument.viewPreferences.rulerOrigin = oldOrigin 