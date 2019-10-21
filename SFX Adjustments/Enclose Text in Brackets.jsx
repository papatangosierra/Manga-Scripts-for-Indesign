function encloseTextInBrackets(obj)
{
    obj.contents = '[' + obj.contents + ']'
}

encloseTextInBrackets(app.selection[0])