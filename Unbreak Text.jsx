var myFrame = app.selection[0] // get first item of selection

myFrame.contents = myFrame.contents.toString().replace(/\s/g, ' ') // replace ANY whitespace with a single space
myFrame.texts.everyItem().leading = Leading.AUTO // reset all leading to default

