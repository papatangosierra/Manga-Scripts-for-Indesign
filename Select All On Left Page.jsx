// Select all items on left page

if (app.activeDocument.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right
    app.selection = app.activeWindow.activeSpread.pages[0].pageItems // select everything on the first page of the spread
} else {
    app.selection = app.activeWindow.activeSpread.pages[1].pageItems // otherwise, select everything on the second page of the spread
}