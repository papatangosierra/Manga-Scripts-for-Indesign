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
        label: 'VersoInside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: '42'
    }
)


// Add recto outside guide
theMaster.guides.add(
    {
        label: 'VersoOutside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[0].bounds[1] - 30
    }
)



// Add verso inside guide
theMaster.guides.add(
    {
        label: 'RectoInside',
        orientation: HorizontalOrVertical.VERTICAL,
        location: -42
    }
)


// Add verso outside guide
theMaster.guides.add(
    {
        label: 'RectoOutside',
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
var versoTopLeftX = theMaster.guides.itemByName('VersoOutside').location - 30
var versoTopLeftY = theMaster.guides.itemByName('Bottom').location
var versoBottomLeftX = theMaster.guides.itemByName('VersoOutside').location
var versoBottomLeftY = theMaster.guides.itemByName('Bottom').location + 15

// Calculate placement of recto page number box based on placement of named guides
var rectoTopLeftX = theMaster.guides.itemByName('RectoOutside').location
var rectoTopLeftY = theMaster.guides.itemByName('Bottom').location
var rectoBottomLeftX = theMaster.guides.itemByName('RectoOutside').location + 30
var rectoBottomLeftY = theMaster.guides.itemByName('Bottom').location + 15


// Add text boxes with page numbers to B-Master
theBMaster.textFrames.add(app.activeDocument.layers[0], LocationOptions.AT_END, theBMaster, {
    contents: SpecialCharacters.AUTO_PAGE_NUMBER,
    geometricBounds: [versoTopLeftY,versoTopLeftX,versoBottomLeftY,versoBottomLeftX],
})

theBMaster.textFrames.add(app.activeDocument.layers[0], LocationOptions.AT_END, theBMaster, {
    contents: SpecialCharacters.AUTO_PAGE_NUMBER,
    geometricBounds: [rectoTopLeftY,rectoTopLeftX,rectoBottomLeftY,rectoBottomLeftX],
})


// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
