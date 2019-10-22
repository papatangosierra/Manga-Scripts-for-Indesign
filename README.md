# Manga Scripts for Indesign

Herewith please avail yourself of this package of InDesign automations aimed at decreasing drudgery and imprecision when lettering Japanese comics in English.

## Art Placement

**Create Master Page Art Frames** creates two empty graphics frames on the _A-Master_ master page, sized to the page size plus 1/8" bleed on the outer edges. This is useful for setting up container frames that page artwork will later be dropped into. The container frames will inherit various attributes from the frames on the master page, which is useful for bulk adjusting the scale and placement of the art frames throughout the document.

**Move All Graphics to Art Layer** moves all graphic frames in the document to the bottom-most layer.

**Move Page Graphics to Art Layer** moves all graphic frames on the current page do the bottom-most layer.

**Set Master Art Scaling** adjust the master page graphic frames created using **Create Master Page Art Frames** in such a way as to affect the scaling of every image placed in one of the child graphic frames. This allows you to quickly find an appropriate scaling percentage for placed artwork _en masse_, without having to individually adjust every graphic frame. Please be advised of the following caveats:

- The scaling percentage is applied based on the current scaling equalling 100%. This means if you set a scaling percentage of 80%, then decide that's too small and  re-run the script with a percentage of 90%, the art will get smaller again, because you are specifying a size that's 90% as big as the size that resulted from the first 80% scaling.
- Because of certain assumptions the script makes, it will not be reliable unless used in conjunction with graphics frames placed using the **Create Master Page Art Frames** script.
- Depending on the art assets, individual pages may need to have their scaling factor adjusted. This script is meant to assist in arriving at a reasonable ballpark figure.

## Guide Placement

Despite its reputation for fanciful panel layouts, a given manga typically establishes and adheres to fairly rigid margins. Placing guides approximately in line with these margins makes a variety of layout tasks much easier and more accurate.

**Add Guides** places guide lines on the _A-Master_ page, 1/2" from the trim on every side. 

**Nudge Horizontal Margins In** moves the guides at the top and bottom of each spread 1pt closer to each other each time it is run. **Nudge Horizontal Margins Out** does the opposite.

**Nudge Vertical Margins In** moves the guides at the left and right margins of both pages in a spread 1pt closer to each other each time it is run. **Nudge Vertical Margins Out** moves them away from each other.

## Pagination and Numbering

**Toggle Binding Direction** changes the binding direction of the document from right-to-left to left-to-right, and vice versa.

**Reverse Interior** fixes Yen Press books. Wait, no, I mean it reverses the spread order and binding direction of the entire document. This takes a few seconds, so it displays a progress bar as it works. **Note:** A minor bug causes the contents of the very first and last pages to be mis-placed after reversal. Fixing this bug is not a high priority for yours truly, since manual correction is quite easy, and frankly I just reversed a whole volume of manga for you so I really think _you_ should be thanking _me_.

**Toggle Left Page Number** applies or un-applies the _B-Master_ page to the left-hand page of the current spread. The assumption here is that the letterer will have set up _B-Master_ to include an automatically-generated page number. Improving the script to simply do this for the letterer is a high priority. 

**Toggle Right Page Number** applies or un-applies the _B-Master_ page to the left-hand page of the current spread.

## Text Design

**Escalate Characters** adjusts the text in a text frame such that each character is slightly larger than the character before it, such that the text appears to get "louder."

**De-Escalate Characters** adjusts the text in a text frame such that each character is slightly smaller than the character before it, such that the text appears to get "quieter."

**Enclose Text in Angle Brackets** wraps the text in a selected text frame in angle brackets, e.g. < >. 

**Enclose Text in Brackets** wraps the text in a selected text frame in square brackets, e.g. [ ].
 
**Inflate Characters** makes the text in the selected text box larger towards the middle, and smaller at the ends. 

**Deflate Characters** does the opposite, making the characters smaller towards the middle of the text, and larger at the ends

**Jumble Characters** adjusts the characters of the text up and down by alternating and slightly random amounts.

**Ramp Down Characters** adjusts the characters progressively lower with respect to the text's baseline for a stair-step effect.
**Ramp Up Characters** does the same, but upwards.

**Rotate Characters** rotates each character in the text box by a slight random amount, alternating clockwise and counterclockwise directions.

## Et Cetera

I'm tired, and will write the rest of this document later.

## TODO

- Add better (which is to say, any) error handling in basically all scripts
- Add setup script for B-Master page (which will include a page number) (or add that handling logic to the "toggle page number" scripts)
- Add script that moves all text fames to Text layer.
- Add setup scripts for common dialogue, caption, aside, and SFX paragraph styles
- Add setup scripts for common character styles
- Improve SFX scripts to be undo-able in a single ctrl-z.
- Adjust magic numbers of SFX scripts, especially Jumble
