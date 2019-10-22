// THIS IS EXTREMELY FRAGILE AND EXPERIMENTAL, but: 
// this is also the beginning of a script that will place artwork automatically in a layout


var w = new Window ("palette"); // must be defined at top level
var myMessage = w.add ("statictext"); 
myMessage.text = "Placing artwork...";

var artFileMatchExpr = /P\d+\.(tif|TIF|psd|PSD|tiff|TIFF)|\d+p\.(tif|TIF|psd|PSD|tiff|TIFF)/ // Regular expression to find art with page numbers

/* Function for recursively pushing matching art files onto artFileArr. It's not great to have a recursive function modifying an array outside of its own scope,
but I don't feel like figuring out how to make fileList more cleanly recursive right now. */

function findArtFiles(fileList) { // add files whose names match artFileMatchExpr to the artFileArr array
    var foundFiles = []
    for (i=0; i < fileList.length; i++) {
        if (fileList[i].displayName.match(artFileMatchExpr)) { // if current element's filename matches our expression
            foundFiles.push(fileList[i]) // add file to the array we'll be returning
        }
        if (Folder.isPrototypeOf(fileList[i])) { // if the current element has the Folder object as a prototype, e.g., it is a folder…
            foundFiles.concat(findArtFiles(fileList[i].getFiles())) // recurse and continue, concatenating as we go
        }
    }
    return foundFiles
}


// intialize the artFileArr by prompting for a folder to start with, getting the contents, and passing them to our art-finding script
var artFileArr = findArtFiles(Folder.selectDialog('Select folder containing page art assets to place.').getFiles()) 
 
function placeAllArtwork() {
    if (!w.pbar) { // if the progress bar doesn't exist
        w.pbar = w.add('progressbar', undefined, 0, artFileArr.length); 
    } else {
        w.pbar.value = 0;
        w.update();
    }
    w.pbar.preferredSize.width = 300;
    w.show(); // Show our progress bar window

    for (var i=0; i < artFileArr.length; i++) { // iterate over array and place every file.
            // this insane line converts the matched to an integer, then back to a string, 
            //in order to strip any leading "0" characters from the match. It does this because 
            //the itemByName method will only match correctly if the _string_ value matches the page
            //number.
        var currentPage = app.activeDocument.pages.itemByName(parseInt(artFileArr[i].name.match(/\d+/)[0], 10).toString())
        app.activeWindow.activePage = currentPage
        var artFrame = currentPage.masterPageItems[0].override(currentPage) // detatch master art frame instance on current page and make it editable
        artFrame.place(artFileArr[i])

        w.pbar.value = i + 1;
        w.update() // Have to call this, or the progress bar won't update.
    }
    w.close()   
}

placeAllArtwork()



/*
var currentPage = app.activeWindow.activePage

//detatch master art frame and make it editable
var artFrame = app.activeDocument.pages[0].masterPageItems[0].override(currentPage)

//place art file in newly-created frame
artFrame.place(myArtFile)
*/