#include "Library/KTUlib.jsx"

// function for selecting all items on left page
// have to declare function as a variable in order to pass it, jeez
var selectAllOnLeftPage = function () {
    if (app.activeWindow.activeSpread.pages.length == 1) { // if there's only one page in the spread
        app.selection = app.activeWindow.activeSpread.pages[0].pageItems // select everything on the first page of the spread
    } else { // if there are multiple pages in the spread
        if (theDoc.documentPreferences.pageBinding == PageBindingOptions.leftToRight) { // if the book's laid out left-to-right OR there's only one page on the spread
            app.selection = app.activeWindow.activeSpread.pages[0].pageItems // select everything on the first page of the spread
        } else {
            app.selection = app.activeWindow.activeSpread.pages[1].pageItems // otherwise, select everything on the second page of the spread  
        }
    }
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(selectAllOnLeftPage, "Select All On Left Page")
} catch(err) {
    alert("Error: " + err.description) 
}
