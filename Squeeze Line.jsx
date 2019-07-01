function squeezeLine(theLine) {
    theLine.horizontalScale = theLine.horizontalScale - 5 // Bump down by five percent 
}

squeezeLine(app.selection[0].lines[0])