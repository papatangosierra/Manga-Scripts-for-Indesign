function encloseTextInAngleBrackets(obj)
{
    obj.contents = '<' + obj.contents + '>'
}

encloseTextInAngleBrackets(app.selection[0])