#include "Library/KTUlib.jsx"

// this function calls KTULockAllItems, to unlock all items in the document
var unlockAllItems = function () {
    KTUUnlockAllItems(theDoc);  
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(unlockAllItems, "Unlock All Items")
} catch(err) {
    alert("Error: " + err.description) 
}
