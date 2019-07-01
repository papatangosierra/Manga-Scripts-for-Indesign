var myFrames = app.activeDocument.textFrames.everyItem().getElements() // build static array of all textframes

for (var i=0; i<myFrames.length; i++) {
    if (/all\-knowing\-narrator/.test(myFrames[i].texts[0].appliedParagraphStyle.name)) {
        myFrames[i].texts.everyItem().horizontalScale = 100
    }
}