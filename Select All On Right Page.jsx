// Select all items on right page

if (app.activeDocument.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right
    app.selection = app.activeWindow.activeSpread.pages[1].pageItems
} else {
    app.selection = app.activeWindow.activeSpread.pages[0].pageItems
}