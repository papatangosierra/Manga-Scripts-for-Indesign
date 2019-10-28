#include "Library/KTUlib.jsx"

// this function unlocks all items in the document 
var unlockAllItems = function () {
    app.activeDocument.pageItems.everyItem().locked = false;  
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(unlockAllItems, "Select All On Right Page")
} catch(err) {
    alert("Error: " + err.description) 
}
