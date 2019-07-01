// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "spread", again so our math works out.
oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old origin
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN

var myFrames = app.selection; // Get selection, it's an array

// This would work, except it doesn't account for bleed: 

// function matchNewFrameToPageSize(theFrame) {
//    theFrame.geometricBounds = theFrame.parentPage.bounds;
// }

function matchFrameToPageSize(theFrame) {
    if (app.activeDocument.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right
        if (theFrame.parentPage.documentOffset % 2 == 0) { // if we’re on a left-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Same, but for right-side pages
                theFrame.parentPage.bounds[1] - 0, 
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 9];
        } else { // we must be on a right-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Adjust the dimensions to give 1/8" bleed
                theFrame.parentPage.bounds[1] - 9, // on right-side pages
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] - 0];
        }
       
        } 
    else {
        if (theFrame.parentPage.documentOffset % 2 == 0) { // if we’re on a left-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Adjust the dimensions to give 1/8" bleed
                theFrame.parentPage.bounds[1] - 9, // on left-side pages
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] - 0];
        } else { // we must be on a left-side page
            theFrame.geometricBounds = [
                theFrame.parentPage.bounds[0] - 9, // Same, but for right-side pages
                theFrame.parentPage.bounds[1] - 0, 
                theFrame.parentPage.bounds[2] + 9, 
                theFrame.parentPage.bounds[3] + 9];
        }
    }
}


for (var i = 0; i < app.selection.length; i++) {
    if (myFrames[i].itemLayer.id == app.activeDocument.layers[app.activeDocument.layers.length - 1].id) { // bottommost layer is at the high end of the array
            matchFrameToPageSize(myFrames[i]) //
    }
}

// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE
app.activeDocument.viewPreferences.rulerOrigin = oldOrigin // restore old origin