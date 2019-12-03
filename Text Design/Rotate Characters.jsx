#include "../Library/KTUlib.jsx"

// rotateChars takes a textframe as its argument, and rotates each character in the frame by a small, randomly-determined amount.

var rotateChars = function (obj) // jumbleAmt is the DENOMINATOR of the jumbling equation, so a lower jumbleAmt will result in more vertical displacement
{
    if (obj instanceof TextFrame) { // if we're in a text frame
        return function() {
            obj.paragraphs[0].composer = "Adobe Japanese Paragraph Composer" // this is a necessary workaround; characters can't be rotated in the default composer
            for (var i = 0; i < obj.characters.length; i++) {
                var rotationJitter = Math.floor(Math.random() * 35) // between 0 and 35 degrees of randomness
                if (i % 2 == 0) {
                    obj.characters[i].characterRotation = rotationJitter
                }
                else {
                    obj.characters[i].characterRotation = rotationJitter + 325 
                }
            }
            obj.paragraphs[0].tracking = -250 // guesstimate new tracking to compensate for Japanese paragraph composer              
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
    KTUDoScriptAsUndoable(rotateChars(app.selection[0]), "Ramp Down Characters in Frame")
} catch(err) {
    alert("Error: " + err.description) 
}