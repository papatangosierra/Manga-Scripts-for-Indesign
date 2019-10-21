// BOILERPLATE FUNCTION, MEAT OF SCRIPT IS DOWN THERE

function matchFrameToPageSize(theFrame) {
    // set the measurement units to Points, so our math lower down will work out
    app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

    // set the ruler to "spread", again so our math works out.
    oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
    app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN

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
    // When we're done, change the scriptPreferences MeasurementUnit to its default, so
    // we don't accidentally break any other scripts.
    app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE
    // And restore old ruler origin
    app.activeDocument.viewPreferences.rulerOrigin = oldOrigin 
}


theMaster = app.activeDocument.masterSpreads.itemByName('A-Master')
rectoArt = theMaster.pages[0].rectangles[0] // set the first graphic on the first page as recto
versoArt = theMaster.pages[1].rectangles[0] // set the first graphic on the second page as verso

myScaleFactor = prompt('Set master art scale percentage.', 100) // get transformation factor
myScaleMatrix = app.transformationMatrices.add(
    {
        horizontalScaleFactor: parseFloat(myScaleFactor)/100, // divide by 100 to get factor from percentage
        verticalScaleFactor: parseFloat(myScaleFactor)/100, 
    }
)

rectoArt.transform( // transform recto frame
    CoordinateSpaces.INNER_COORDINATES,
    AnchorPoint.CENTER_ANCHOR,
    myScaleMatrix
)

versoArt.transform( // transform verso frame
    CoordinateSpaces.INNER_COORDINATES,
    AnchorPoint.CENTER_ANCHOR,
    myScaleMatrix
)

matchFrameToPageSize(rectoArt) // rematch art frames to parent page size plus bleed
matchFrameToPageSize(versoArt)