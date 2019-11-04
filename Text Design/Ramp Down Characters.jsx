#include "../Library/KTUlib.jsx"

// rampDownChars takes a textframe as its argument.
// It progressively decreases the baseline shift of characters in the selected textframe,
// creating a falling-off effect.

var rampDownChars = function (obj) // jumbleAmt is the DENOMINATOR of the jumbling equation, so a lower jumbleAmt will result in more vertical displacement
{
    if (obj instanceof TextFrame) { // if we're in a text frame
        return function() {
            obj.characters[0].baselineShift = 0 // If there's already a baseline shift that's been applied, this algorithm will behave unexpectedly, so set first char to 0 just to be sure
            for (var i = 1; i < obj.characters.length; i++) { // start iteration at 1, to skip first character
                // Decrease by 1pt from the previous character, but subtract the existing baseline shift so that the script can be repeatedly run
                obj.characters[i].baselineShift = ((obj.characters[i-1].baselineShift - 1) - Math.abs(obj.characters[i].baselineShift)) * .75 // multiplying by .75 produces relatively sane results, and we have to get the absolute value because otherwise we'll end up subtracting negative numbers and getting positive results 
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
    KTUDoScriptAsUndoable(rampDownChars(app.selection[0]), "Ramp Down Characters in Frame")
} catch(err) {
    alert("Error: " + err.description) 
}
