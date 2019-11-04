#include "../Library/KTUlib.jsx"

// Escalate Characters makes each character in the currently selected text frame smlargeraller than the character before it.
// It takes an object as an argument, and returns either a function that applies progressively smaller point sizes to an object,
// or a function that displays an alert specifying that a text frame must be selected.
var escalateChars = function (obj)
{
    if (obj instanceof TextFrame) { // if this is a text frame
        return function() {
            for (var i = 0; i < obj.characters.length; i++) {
               if (i > 0) // if not first char {
                {
                    obj.characters[i].pointSize = (obj.characters[i-1].pointSize * (1 + (1 / obj.characters.length))) // increase by 1/length every character
                }
            }
        }
    } else {
        return function () {
            alert("You must have a single text frame selected to run this script.")            
        }
    }
}

// Send script to KTUDoScriptAsUndoable with app.selection as its argument,
// and do it within a try/catch
try { 
    KTUDoScriptAsUndoable(escalateChars(app.selection[0]), "Escalate Characters in Frame")
} catch(err) {
    alert("Error: " + err.description) 
}