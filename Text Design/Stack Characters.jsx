function stackChars(obj)
{
    // stacks all of the text in a frame vertically, with a line break between each character
    obj.contents = obj.contents.split('').join('\n');
}

stackChars(app.selection[0])
