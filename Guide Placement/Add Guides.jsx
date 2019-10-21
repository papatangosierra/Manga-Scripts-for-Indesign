// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "page", again so our math works out.
oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin

// Spread Origin is necessary for some reason, otherwise I can't figure out how to refer to dimensions on both pages
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN 


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

// Add recto left guide
theMaster.guides.add(
    {
        label: 'RectoLeft',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[0].bounds[1] + 36
    }
)

// Add recto right guide
theMaster.guides.add(
    {
        label: 'RectoRight',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[0].bounds[3] - 36
    }
)


// Add verso left guide
theMaster.guides.add(
    {
        label: 'VersoLeft',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[1].bounds[1] + 36
    }
)

// Add verso right guide
theMaster.guides.add(
    {
        label: 'VersoRight',
        orientation: HorizontalOrVertical.VERTICAL,
        location: theMaster.pages[1].bounds[3] - 36
    }
)




// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
