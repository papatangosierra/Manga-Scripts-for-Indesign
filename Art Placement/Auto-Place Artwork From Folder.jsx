// THIS IS EXTREMELY FRAGILE AND EXPERIMENTAL, but: 
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



/*
var currentPage = app.activeWindow.activePage

//detatch master art frame and make it editable
var artFrame = app.activeDocument.pages[0].masterPageItems[0].override(currentPage)

//place art file in newly-created frame
artFrame.place(myArtFile)
*/