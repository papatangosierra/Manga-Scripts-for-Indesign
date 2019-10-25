/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
MANGA LETTERING AUTOMATION LIBRARY
Paul Starr
October 2019
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Set up some convenient variables

var theDoc    = app.activeDocument
var thePages  = app.activeDocument.pages
var theLayers = app.activeDocument.layers
var theMaster = app.activeDocument.masterSpreads.itemByName('A-Master')

// MATCH PAGE TO BLEED SIZE

function KTUmatchFrameToBleedSize(theFrame) {
    // set the measurement units to Points, so our math lower down will work out
    app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
    // set the ruler to "spread", again so our math works out.
    oldOrigin = theDoc.viewPreferences.rulerOrigin // save old ruler origin
    theDoc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN

    if (theDoc.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right
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
    theDoc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN
}

// TOGGLE BINDING DIRECTION
function KTUToggleBindingDirection(aDocument) {
    aDocument.documentPreferences.pageBinding = 
        aDocument.documentPreferences.pageBinding == PageBindingOptions.LEFT_TO_RIGHT ? 
            PageBindingOptions.RIGHT_TO_LEFT : 
            PageBindingOptions.LEFT_TO_RIGHT            
}

// CHECK BINDING FOR RIGHT-TO-LEFT SETTING
function KTUIsBindingCorrect(aDocument) {
    if (aDocument.documentPreferences.pageBinding == PageBindingOptions.RIGHT_TO_LEFT) {
        return true
    } else {
        return false
    }
}

// LOCK ALL ITEMS IN A DOCUMENT
function KTULockAllItems(aDocument) {
        aDocument.pageItems.everyItem().locked = true
}

// UNLOCK ALL ITEMS
function KTUUnLockAllItems(aDocument) {
        aDocument.pageItems.everyItem().locked = false
}
