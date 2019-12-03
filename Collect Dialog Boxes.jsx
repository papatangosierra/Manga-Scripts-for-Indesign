// This collects text from text boxes on the 'Dialog' layer

function getTextStructure () {
    var dialogPages = []; // dialogPages will be an array of arrays. Each sub-array will contain zero or more strings, each string corresponding to a single dialog bubble
    for (var i = 0; i < app.activeDocument.pages.length; i++) { // loop over pages
        dialogPages.push([]); // Add an empty array for every page we iterate over. 
        for (var j = 0; j < app.activeDocument.pages[i].textFrames.length; j++) { // loop over textFrames
            if (app.activeDocument.pages[i].textFrames[j].itemLayer.name == 'Text') { // If a textFrame is on the text layer
                dialogPages[i].push(app.activeDocument.pages[i].textFrames[j].contents)
            }
        }
    }
    return dialogPages;
}

var myDialog = returnDialogStructure();

for (var i=0; i < myDialog.length; i++) {
    for (var j=0; j < myDialog[i].length; j++ ) {
        app.activeDocument.pages[0].textFrames.lastItem().contents += 'dialog: ' + myDialog[i][j] + "\n";
    }
}
