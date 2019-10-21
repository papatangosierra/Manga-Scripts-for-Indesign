/* This script assumes margin guides have been placed using the "Add Guides.jsx" script.
The Add Guides script assigns invisible labels to each guide it places, which the 
adjustment scripts later use to refer to those guides when adjusting them.

The guide names are:
    - Top
    - Bottom
    - VersoLeft
    - VersoRight
    - RectoLeft
    - RectoRight

*/

// Set Rulers
// set the measurement units to Points, so our math lower down will work out
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// set the ruler to "page", again so our math works out.
oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin

// Spread Origin is necessary for some reason, otherwise I can't figure out how to refer to dimensions on both pages
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN 

// Set up master page object for convenience
theMaster = app.activeDocument.masterSpreads.itemByName('A-Master')

// Add or subtract 1 point from guide's current location
theMaster.guides.itemByName("Top").location += 1
theMaster.guides.itemByName("Bottom").location -= 1

// When we're done, change the scriptPreferences MeasurementUnit to its default, so
// we don't accidentally break any other scripts.
app.scriptPreferences.measurementUnit = AutoEnum.AUTO_VALUE

oldOrigin = app.activeDocument.viewPreferences.rulerOrigin // save old ruler origin
