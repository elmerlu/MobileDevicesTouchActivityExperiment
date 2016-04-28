(function( $ ){
    $('#target').draggable();
    $('div[type!="road"].cell').droppable({
      accept: '#target',
      hoverClass: 'red',
      drop: function( event, ui ) {console.log('drop')},
      over: function( event, ui ) {reset(ui)},
      activate: function( event, ui ) {console.log('activate1')},
      create: function( event, ui ) {console.log('create')},
      drag: function( event, ui ) {onsole.log('drag')},
      stop: function( event, ui ) {onsole.log('stop')},
      tolerance :'touch'
    });

    function reset(ui) {
      
      var oldtarget = ui.draggable[0];
      console.log(oldtarget);
      var newtarget = jQuery.extend({}, oldtarget);
      console.log(newtarget);
      // $('div[name="target-start"]').html(newtarget);
      $(oldtarget).draggable( "destroy" );

      // $('#target').css('left','0px');
      // $('#target').css('top','0px');
    }

})(jQuery)