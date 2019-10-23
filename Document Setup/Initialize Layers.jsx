// Set up standard manga lettering document

// Set up right-to-left binding order
app.activeDocument.documentPreferences.pageBinding = PageBindingOptions.RIGHT_TO_LEFT

// Set up a sensible stack of layers that subsequent scripts can assume.

app.activeDocument.layers[0].name = 'Art' // Rename first layer to 'Art' 

// Create standard layers if they don't already exist

if (app.activeDocument.layers.itemByName('Design') == null ) {
    var designLayer = app.activeDocument.layers.add({name:'Design'}) 
}

if (app.activeDocument.layers.itemByName('Retouching') == null ) {
    var retouchingLayer = app.activeDocument.layers.add({name:'Retouching'}) 
}

if (app.activeDocument.layers.itemByName('Page Numbers') == null ) {
    var pageNumberLayer = app.activeDocument.layers.add({name:'Page Numbers'}) 
}

if (app.activeDocument.layers.itemByName('SFX') == null ) {
    var SFXLayer = app.activeDocument.layers.add({name:'SFX'}) 
}

if (app.activeDocument.layers.itemByName('Text') == null ) {
    var textLayer = app.activeDocument.layers.add({name:'Text'}) 
}

// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "page", again so our math works out.
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
    justification: Jusification.AWAY_FROM_BINDING_SIDE,
})

// Calculate placement of page number box based on placement of named guides
var rectoTopLeftX = theMaster.guides.itemByName('RectoOutside').location - 30
var rectoTopLeftY = theMaster.guides.itemByName('Bottom').location
var rectoBottomLeftX = theMaster.guides.itemByName('RectoOutside').location
var rectoBottomLeftY = theMaster.guides.itemByName('Bottom').location + 15

// Add text boxes with page numbers to B-Master
theBMaster.textFrames.add(pageNumberLayer, theBMaster, {
    contents: SpecialCharacters.AUTO_PAGE_NUMBER,
    geometricBounds: [rectoTopLeftX,rectoTopLeftY,rectoBottomLeftX,rectoBottomLeftY],
})



// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
