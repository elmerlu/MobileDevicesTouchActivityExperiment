(function( $ ){
    $("#target").draggable();
    $("div[type!='road'].cell").droppable({
      accept: "#target",
      hoverClass: "red",
      drop: function( event, ui ) {console.log('drop')},
      over: function( event, ui ) {console.log('over')},
      activate: function( event, ui ) {console.log('activate1')},
      create: function( event, ui ) {console.log('create')},
      tolerance :'touch'
    });
 

})(jQuery)