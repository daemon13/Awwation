makePresentation = function(sequence) {
    
    // Import DOM
    var src = svgCanvas.getSvgString();
    var parser = new DOMParser();
    var doc = parser.parseFromString(src, "text/xml");
    // Make it ready for dizzy.js

    // The top group should have id 'canvas'
    doc.getElementsByTagName('g')[0].setAttribute('id', 'canvas');
    
    for(var i = 0; i < sequence.length; i += 1) {
        // get element from sequence
        var node = doc.getElementById(sequence[i]);
        if(node.parentNode.id == 'canvas') {
            // the parent is the canvas, so time to create a new g and reparent node to it
            var newGroup = doc.createElement('g');
            node.parentNode.replaceChild(newGroup, node);
            newGroup.appendChild(node);
            
            // add mandatory classes
            newGroup.setAttribute('class', 'group group_' + i);

            // now move the transform attributes from node to g
            newGroup.setAttribute('transform', node.getAttribute('transform'));
            node.setAttribute('transform', ' ');
        }
        else {
            // This node has already been traversed before, so don't create a new g
            var group = node.parentNode;
            group.setAttribute('class', node.getAttribute('class') + ' group_' + i);
        }
    }

    console.log( (new XMLSerializer()).serializeToString(doc) );

}
