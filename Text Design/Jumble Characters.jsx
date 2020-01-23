#include "../Library/KTUlib.jsx"

// jumbleChars takes a textframe and a jumble amount as its arguments.
// It nudges the baseline shift of each character in a textframe by slightly random, alternating amounts up and down

var jumbleChars = function (obj, jumbleAmt) // jumbleAmt is the DENOMINATOR of the jumbling equation, so a lower jumbleAmt will result in more vertical displacement
{
    if (obj instanceof TextFrame) { // if we're in a text frame
        return function() {
            for (var i = 0; i < obj.characters.length; i++) {
                if (i % 2 == 0) { // if we're on an even-numbered character in the frame, nudge it up
                    obj.characters[i].baselineShift += Math.random() * (obj.characters[i].pointSize / jumbleAmt)
                }
                else { // if odd numbered character, nudge it down (e.g., multiply the nudge amount by -1 to result in a negative number)
                    obj.characters[i].baselineShift += Math.random() * (obj.characters[i].pointSize * -1 / jumbleAmt)
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
    KTUDoScriptAsUndoable(jumbleChars(app.selection[0], 6), "Jumble Characters Vertically")
} catch(err) {
    alert("Error: " + err.description) 
}
