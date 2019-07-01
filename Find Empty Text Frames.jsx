function findEmptyTextFramesˀ() { // returns true if there were any empty text frames; false if otherwise.
    for (var i = 0; i < app.activeDocument.pages.length; i++) { // loop over pages
        for (var j = 0; j < app.activeDocument.pages[i].textFrames.length; j++) { // loop over textFrames on a page
            if (app.activeDocument.pages[i].textFrames[j].contents === '' && app.activeDocument.pages[i].textFrames[j].overflows === false) { // If a textFrame is empty, and not because it's overset
                app.selection = app.activeDocument.pages[i].textFrames[j]
                alert('Empty Text Frame found on page ' + app.activeDocument.pages[i].name + '.')
                return true
            }
        }
    }
    alert('No empty text frames found.')
    return false
}

findEmptyTextFramesˀ()
