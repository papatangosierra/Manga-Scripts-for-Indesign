#include "../Library/KTUlib.jsx"

// encloses the contexts of selected TextFrames in [brackets]
function encloseTextInAngleBrackets(obj)
{
    if (obj) { // if we we were passed anything at all
        return function () {
            for (var i = 0; i < obj.length; i++) { // iterate over every item in the selection
                if (obj[i] instanceof TextFrame) { // if the current item is a textframe
                    obj[i].contents = '[' + obj[i].contents + ']' // bracket it
                }
            }
        }
    } else {
        return function () { // otherwise we weren't passed anything
            alert("You must have a text frame selected to run this script.")            
        }
    }        
}

// Send script to KTUDoScriptAsUndoable with app.selection as its argument,
// and do it within a try/catch
try { 
    KTUDoScriptAsUndoable(encloseTextInAngleBrackets(app.selection), "Enclose Text in Brackets")
} catch(err) {
    alert("Error: " + err.description) 
}



