#include "Library/KTUlib.jsx"

// this function locks all items in the document
var lockAllItems = function () {
    app.activeDocument.pageItems.everyItem().locked = true;  
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(lockAllItems, "Select All On Right Page")
} catch(err) {
    alert("Error: " + err.description) 
}
