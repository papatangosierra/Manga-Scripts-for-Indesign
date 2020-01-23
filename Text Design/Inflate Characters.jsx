#include "../Library/KTUlib.jsx"

// inflateChars takes a textframe and a scaling factor as its arguments.
// It progressively increases each character in size until it reaches the middle character of text in the frame, then gradually
// returns each character to the original size.

var inflateChars = function (obj, scalefactor)
{
    if (obj instanceof TextFrame) { // if we're in a text frame
        return function() {
            for (var i = 1; i < (obj.characters.length - 1); i++) { // iterate over everything except the first and last characters
                if (i+1 < obj.characters.length / 2) { // in first half
                    obj.characters[i].pointSize = obj.characters[i-1].pointSize * ((1 + ((1 - scalefactor) / obj.characters.length)) * scalefactor) // increase by (1/length) * scalefactor every character                
                    obj.characters[i].baselineShift = (obj.characters[0].pointSize - obj.characters[i].pointSize) / 2 // set baseline shift to half the difference in point size between the initial character and the current character
                }
                if (i == Math.ceil(obj.characters.length / 2) - 1 ) { // at midpoint
                    obj.characters[i].pointSize = obj.characters[i-1].pointSize * ((1 + ((1 - scalefactor) / obj.characters.length)) * scalefactor)
                    obj.characters[i].baselineShift = ((obj.characters[0].pointSize - obj.characters[i].pointSize) / 2) // set baseline shift to half the difference in point size between the initial character and the current character
                }
                if (i+1 > obj.characters.length / 2) { // in last half
                    obj.characters[i].pointSize = obj.characters[obj.characters.length - (i + 1)].pointSize // mirror the size of the characters in the first half              
                    obj.characters[i].baselineShift = obj.characters[obj.characters.length - (i + 1)].baselineShift // set baseline shift to half the difference in point size between the initial character and the current character
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
    KTUDoScriptAsUndoable(inflateChars(app.selection[0], 1.2), "Inflate Characters in Frame")
} catch(err) {
    alert("Error: " + err.description) 
}