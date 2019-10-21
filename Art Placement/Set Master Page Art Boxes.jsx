// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "spread", again so our math works out.
oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN


// Create a new layer for putting Guides on, if it doesn't already exist
if (app.activeDocument.layers.itemByName('Art') == null ) {
    app.activeDocument.layers.add({name:'Art'}) 
}

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
        {
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


// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE
// And restore old ruler origin
app.activeDocument.viewPreferences.rulerOrigin = oldOrigin 