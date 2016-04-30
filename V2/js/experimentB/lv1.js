(function($) {
  var timing = new Timing();
  init();

  function init() {
    $('#target').draggable({
      revert : 'invalid',
      start: function() { startEvent(); },
      snap: '[type="destination"]',
      snapMode: 'inner'
    });

    $('div[type!="road"].cell').droppable({
      accept: '#target',
      over: function(event, ui) { touchHandler(event, ui); },
      tolerance: 'touch'
    });

    $('[type="destination"]').droppable({
      over: function(event, ui) { finishEvent(); }
    });
  }


  function startEvent() {
    timing.start(null, function(time) {
      $('#time').html((time / 1000).toFixed(3));
    });
  }

  function touchHandler(event, ui) {
    var oldtarget = ui.draggable[0];
    $(oldtarget).trigger('mouseup');
    $(oldtarget).animate({ top: 0, left: 0 }, 'slow');
  }

  function finishEvent() {
    timing.stop();
    $('#target').draggable('destroy');
    $('div[type!="road"].cell').droppable('disable');
  }

})(jQuery)