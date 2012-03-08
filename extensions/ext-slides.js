/*
 * ext-slides.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
 
svgEditor.addExtension("Slides", function() {
    var currentSelection;
    
    var count = 0;
    
    var strip = $("<div id = 'sortable'></div>");
    strip.css({
        'background-color': 'grey',
        'float': 'left',
        'height': '56px',
        'width': '700px',
    });
    strip.appendTo($("#tools_top")); 
    strip.sortable({ revert: true });

    var generateButton = $("<button type = 'button'>Generate!</button>");
    generateButton.appendTo($("#tools_top"));
    
    generateButton.click(function() {
        var sequence = strip.sortable('toArray');
        console.log(sequence);
        makePresentation(sequence);
    });

		return {
			name: "Slides",
			// For more notes on how to make an icon file, see the source of
			// the hellorworld-icon.xml
			svgicons: "extensions/slidesicon.xml",
			
			// Multiple buttons can be added in this array
			buttons: [{
				// Must match the icon ID in helloworld-icon.xml
				id: "tool_add_slide", 
				
				// This indicates that the button will be added to the "mode"
				// button panel on the left side
				type: "context", 
                panel: "selected_panel",
				
				// Tooltip text
				title: "Add to presentation sequence", 
				
				// Events
				events: {
					'click': function() {
                        count += 1;

					    var thumbDiv = $('<div>', {
                            id: currentSelection.id
                        }).appendTo(strip);
                        thumbDiv.css({
                            'background-color': 'white',
                            'border': '1px solid black'
                        });

					    var thumb = $('<canvas>', {
                            style: 'display: none;'
                        }).appendTo(thumbDiv);
                        
                        var ctx = thumb[0].getContext('2d');
                        var src = svgCanvas.getSvgString();
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(src, "text/xml");
                        var bbox = currentSelection.getBBox();
                        doc.getElementsByTagName("svg")[0].setAttribute('viewBox', bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height);
                        // console.log(doc);

                        canvg(thumb[0], doc, { ignoreMouse: true, ignoreAnimation: true });

    
                            
                            var canvasCopy = document.createElement("canvas");
                            var copyContext = canvasCopy.getContext("2d");
                                
                            var ratio = 1;
    
                            if(thumb[0].width > thumb[0].height)
                                ratio = 100 / thumb[0].width;
                            else 
                                ratio = 45 / thumb[0].height;

                            canvasCopy.width = thumb[0].width * ratio;
                            canvasCopy.height = thumb[0].width * ratio;
                            copyContext.drawImage(thumb[0], 0, 0, thumb[0].width, thumb[0].height, 0, 0, canvasCopy.width, canvasCopy.height);

                            imgData = canvasCopy.toDataURL();


                        $("<img src = '" +imgData+"'></img>").appendTo(thumbDiv);
                        
                        removeElement = function(el) {
                            el.parentNode.parentNode.removeChild(el.parentNode);
                        }

                        $("<span onclick = removeElement(this)><a href = '#'>delete</a></span>").appendTo(thumbDiv);
                        
					}

				}
			}],
			// This is triggered when the main mouse button is pressed down 
			// on the editor canvas (not the tool panels)
			mouseDown: function() {
				// Check the mode on mousedown
				if(svgCanvas.getMode() == "slides") {
			
					// The returned object must include "started" with 
					// a value of true in order for mouseUp to be triggered
					return {started: true};
				}
			},
			
			// This is triggered from anywhere, but "started" must have been set
			// to true (see above). Note that "opts" is an object with event info
			mouseUp: function(opts) {
				// Check the mode on mouseup
				if(svgCanvas.getMode() == "slides") {

				}
			},

            selectedChanged: function(opts) {
                currentSelection = null;
                currentSelection = opts.selectedElement;
            }

		};
});

