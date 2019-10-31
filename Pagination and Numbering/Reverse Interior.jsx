#include "../Library/KTUlib.jsx"

// Set up window to use for progress bar when reversing pages, but don't display yet.
var w = new Window ("palette"); // must be defined at top level
var myMessage = w.add ("statictext"); 
myMessage.text = "Reversing page order...";


var reverseSpreadOrder = function () {
    // first, lock all items in the document in place
    KTULockAllItems(theDoc)

    if (!w.pbar) { // if the progress bar doesn't exist
        w.pbar = w.add('progressbar', undefined, 0, app.activeDocument.spreads.length); 
    } else {
        w.pbar.value = 0;
        w.update();
    }
    w.pbar.preferredSize.width = 300;
    w.show(); // Show our progress bar window
    var refpage = 0;
    for (var i = 0; i < app.activeDocument.spreads.length; i++) { // move by spread, not page, so as not to fuck up formatting
        if (i != 0) {
            targetpage = app.activeDocument.spreads[i];
            targetpage.move(LocationOptions.BEFORE, refpage);
            refpage = targetpage;
        } else {
            refpage = app.activeDocument.spreads[i];
        }
        w.pbar.value = i + 1;
        w.update(); // Have to call this, or the progress bar won't update.
    }
    w.close();
    
    // then reverse the binding direction from wherever it was
    KTUToggleBindingDirection(theDoc)

    // then unlock all items in the document
    KTUUnLockAllItems(theDoc)
}

try { 
    KTUDoScriptAsUndoable(reverseSpreadOrder, "Reverse Interior")
} catch(err) {
    alert("Error: " + err.description) 
}

