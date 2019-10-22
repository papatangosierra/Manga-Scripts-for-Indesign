// This script applies the B-master to the left-side page of the current spread, asuming right-to-left binding order.

function applyMasterToPage(thePage,theMaster) {
    thePage.appliedMaster = app.activeDocument.masterSpreads.itemByName(theMaster)
}

if (app.activeWindow.activeSpread.pages[1].appliedMaster.name != 'B-Master') { // if the page is not numbered (this assumes right-to-left binding order)
    applyMasterToPage(app.activeWindow.activeSpread.pages[1], 'B-Master')
} else {
    applyMasterToPage(app.activeWindow.activeSpread.pages[1], 'A-Master')
}