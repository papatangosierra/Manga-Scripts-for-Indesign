#include "../Library/KTUlib.jsx"

// Run KTUToggleBindingDirection on the current document, as undoable, with error catching

var toggleBindingDirection = function () {
    KTUToggleBindingDirection(theDoc)
}

try { 
    KTUDoScriptAsUndoable(toggleBindingDirection, "Toggle Binding Direction")
} catch(err) {
    alert("Error: " + err.description) 
}
