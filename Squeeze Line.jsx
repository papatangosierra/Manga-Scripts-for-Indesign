#include "Library/KTUlib.jsx"

// squeezeLine reduces the horizontal scaling of the current line of text by 5 percent each time it's run.
// It's useful for fitting text to constrained bubbles to avoid hyphenation or breaking when those would be
// undesirable.

var squeezeLine = function (theLine) { // this function has to itself return a function that itself does what we want, in order to be apssed to KTUDoScript
    if (theLine) { // if it's defined, try to scale it (this is currently useless error-catching logic)
        return function () {
                theLine.horizontalScale = theLine.horizontalScale - 5 // reduce horizontal scaling of current line of text by five percent 
            }
    } else {
            return function () {
                alert("You must be editing the contents of a text frame to change text within it. \n")
            }
    }
}

// Send script to KTUDoScriptAsUndoable, just for form's sake,
// and do it within a try/catch, again, just for form's sake
try { 
    KTUDoScriptAsUndoable(squeezeLine(app.selection[0].lines[0]), "Squeeze Current Text Line")
} catch(err) {
    alert("Error: " + err.description) 
}


