var w = new Window ("palette"); // must be defined at top level
var myMessage = w.add ("statictext"); 
myMessage.text = "Moving graphic objects to bottom layer...";


function moveGraphicsToArtLayer(thePage) { // Moves all graphic frames to bottom ("Art") Layer
    for (var i = 0; i < thePage.allGraphics.length; i++) { // iterate over all graphics on page
        if (thePage.allGraphics[i].parent.parent instanceof Spread) { // if the graphic is inside a text frame that's not inside anything else
            thePage.allGraphics[i].parent.itemLayer = app.activeDocument.layers[app.activeDocument.layers.length - 1] // move graphic parent (i.e, the container). last layer is bottom layer
        }
    }
}

function processAllPages() {
    if (!w.pbar) { // if the progress bar doesn't exist
        w.pbar = w.add('progressbar', undefined, 0, app.activeDocument.spreads.length); 
    } else {
        w.pbar.value = 0;
        w.update();
    }
    w.pbar.preferredSize.width = 300;
    w.show(); // Show our progress bar window
    var refpage = 0;
    for (var i = 0; i < app.activeDocument.pages.length; i++) { // iterate over Pages
        moveGraphicsToArtLayer(app.activeDocument.pages[i]) // actually move graphic
        w.pbar.value = i + 1; // update progress bar value
        w.update(); // Have to call this, or the progress bar won't update.
    }
    w.close();
}

processAllPages()
