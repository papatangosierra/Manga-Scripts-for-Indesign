function applyPageNumber(thePage) {
    thePage.appliedMaster = app.activeDocument.masterSpreads.itemByName('B-Master')
}

function applytoRightPage() { // Assumes Right-to-Left binding order
    applyPageNumber(app.activeWindow.activeSpread.pages[0])
}

applytoRightPage()