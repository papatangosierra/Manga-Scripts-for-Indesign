// This script applies the B-master to the right-side page of the current spread, asuming right-to-left binding order.

function applyMasterToPage(thePage,theMaster) {
    thePage.appliedMaster = app.activeDocument.masterSpreads.itemByName(theMaster)
}

if (app.activeWindow.activeSpread.pages[0].appliedMaster.name != 'B-Master') { // if the page is not numbered (this assumes right-to-left binding order)
    applyMasterToPage(app.activeWindow.activeSpread.pages[0], 'B-Master')
} else {
    applyMasterToPage(app.activeWindow.activeSpread.pages[0], 'A-Master')
}