function stackWords(obj)
{
    // stacks all of the words into a single column (great for skinny bubbles)
    obj.contents = obj.contents.split(' ').join(' \n');
}

stackWords(app.selection[0])