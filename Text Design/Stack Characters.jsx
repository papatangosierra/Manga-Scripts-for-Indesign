#include "../Library/KTUlib.jsx"

// stackChars takes a textframe introduces a line break after each character, creating a single
// vertical column of text.

var stackChars = function (obj) // jumbleAmt is the DENOMINATOR of the jumbling equation, so a lower jumbleAmt will result in more vertical displacement
{
    if (obj instanceof TextFrame) { // if we're in a text frame
        return function() {
            // stacks all of the text in a frame vertically, with a line break between each character
            obj.contents = obj.contents.split('').join('\n');
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
    KTUDoScriptAsUndoable(stackChars(app.selection[0]), "Ramp Down Characters in Frame")
} catch(err) {
    alert("Error: " + err.description) 
}







function stackChars(obj)
{
    // stacks all of the text in a frame vertically, with a line break between each character
    obj.contents = obj.contents.split('').join('\n');
}

stackChars(app.selection[0])
