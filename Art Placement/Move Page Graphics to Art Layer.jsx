function moveGraphicsToArtLayer(thePage) { // Moves all graphic frames to bottom ("Art") Layer
    for (var i = 0; i < thePage.allGraphics.length; i++) { // iterate over all graphics on page
        if (thePage.allGraphics[i].parent.parent instanceof Spread) { // if the graphic is inside a text frame that's not inside anything else
            thePage.allGraphics[i].parent.itemLayer = app.activeDocument.layers[app.activeDocument.layers.length - 1] // move graphic parent (i.e, the container). last layer is bottom layer
        }
    }
}

moveGraphicsToArtLayer(app.activeWindow.activePage)