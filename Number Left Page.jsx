function applyPageNumber(thePage) {
    thePage.appliedMaster = app.activeDocument.masterSpreads.itemByName('B-Master')
}

function applytoLeftPage() { // Assumes Right-to-Left binding order
    applyPageNumber(app.activeWindow.activeSpread.pages[1])
}

applytoLeftPage()