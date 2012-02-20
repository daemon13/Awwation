svgEditor.addExtension("mouseZoom",function(){
    $("#svgcanvas").mousewheel(function(a,b){
        svgCanvas.setZoom(svgCanvas.getZoom()*(b<0?0.9:1.1));
        a.preventDefault();
        a.stopPropagation();
    });

    return {
        name:"MouseZoom",
        buttons:[],
        mouseDown: function() { 
            if(0){
                return {
                    started:true
                }
            }
        },
        mouseUp:function(a){
        }
    }
});
