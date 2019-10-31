#include "Library/KTUlib.jsx"

// this function calls KTULockAllItems, to lock all items in the document
var lockAllItems = function () {
    KTULockAllItems(theDoc);  
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(lockAllItems, "Lock All Items")
} catch(err) {
    alert("Error: " + err.description) 
}
