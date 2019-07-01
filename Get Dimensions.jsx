app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

theObject = app.selection[0]

alert(
    "Geometric Bounds:\n" + 
    "Top Left y1 :" + theObject.geometricBounds[0] + "\n" +
    "Top Left x1: " + theObject.geometricBounds[1] + "\n" +
    "Bottom Right y2: " + theObject.geometricBounds[2] + "\n" +
    "Bottom Left x2: " + theObject.geometricBounds[3] + "\n\n" +
    "Top Left page y1 :" + theObject.parentPage.bounds[0] + "\n" +  
    "Top Left page x1 :" + theObject.parentPage.bounds[1] + "\n" +  
    "Bottom Right page y2 :" + theObject.parentPage.bounds[2] + "\n" +  
    "Bottom Right page x2 :" + theObject.parentPage.bounds[3] + "\n" 
)

app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE;