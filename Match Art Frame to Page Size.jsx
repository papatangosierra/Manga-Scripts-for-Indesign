#include "Library/KTUlib.jsx"

var matchSelectionToBleed = function () {
    for (var i = 0; i < app.selection.length; i++) {
        if (app.selection[i].itemLayer.id == theLayers[theLayers.length - 1].id) { // if the item is on the bottommost layer, which we know is the art layer
                KTUMatchFrameToBleedSize(app.selection[i]) // run KTUMatchFrameToBleedSize on it
        } // otherwise do nothing
    }
}

// Send script to KTUDoScriptAsUndoable with app.selection as its argument,
// and do it within a try/catch
try { 
    KTUDoScriptAsUndoable(matchSelectionToBleed, "Match Art of Selection to Bleed")
} catch(err) {
    alert("Error: " + err.description) 
}
