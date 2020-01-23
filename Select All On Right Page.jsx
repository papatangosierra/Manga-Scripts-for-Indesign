#include "Library/KTUlib.jsx"

// function for selecting all items on right page

function selectAllOnRightPage() {
    if (theDoc.documentPreferences.pageBinding == PageBindingOptions.leftToRight && app.activeWindow.activeSpread.pages.length > 1) { // if the book's laid out left-to-right AND there are multiple pages on the spread
        app.selection = app.activeWindow.activeSpread.pages[1].pageItems // select everything on the first page of the spread
    } else {
        app.selection = app.activeWindow.activeSpread.pages[0].pageItems // otherwise, select everything on the second page of the spread  
    }
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(selectAllOnRightPage, "Select All On Right Page")
} catch(err) {
    alert("Error: " + err.description) 
}
