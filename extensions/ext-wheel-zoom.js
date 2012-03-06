svgEditor.addExtension("mouseZoom",function(){
    var z = 1;
    $("#svgcanvas").mousewheel(function(a,b){
        z = (b < 0 ? z*0.9 : z * 1.1);
//        $("#svgcontent > g").setAttribute("a", "b");
//        $("#svgcontent > g").get(0).setAttribute("transform", "scale(" + z + ")");
//        svgCanvas.setZoom(svgCanvas.getZoom()*(b<0?0.9:1.1));
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
