(function($) {
  var timing = new Timing();
  var targetObj, roads;

  function init(target, roads, destinations, timerMode, 
    timerCallback, timeupCallback, finishEventCallBack) {
    this.targetObj = $(target);
    this.roads = $(roads);
    this.targetObj.draggable({
      revert : 'invalid',
      start: function() { startEvent(timerMode, timerCallback); },
      snap: '[type="destination"]',
      snapMode: 'inner'
    });

    this.roads.droppable({
      accept: '#target',
      over: function(event, ui) { touchHandler(event, ui); },
      tolerance: 'touch'
    });

    $(destinations).droppable({
      over: function(event, ui) { finishEvent(finishEventCallBack); }
    });
  }


  function startEvent(timerMode, timerCallback, timeupCallback) {
    switch(timerMode) {
      case 'timer':
        timing.start(null, timerCallback);
        break;
      case 'countdown':
        timing.countdown(15000, timeupCallback, null, timerCallback);
        break;
    }
  }

  function touchHandler(event, ui) {
    var oldtarget = ui.draggable[0];
    $(oldtarget).trigger('mouseup');
    $(oldtarget).animate({ top: 0, left: 0 }, 'slow');
  }

  function finishEvent(finishEventCallBack) {
    timing.stop();
    this.targetObj.draggable('destroy');
    this.roads.droppable('disable');
    finishEventCallBack();
  }

  $.fn.experimentB = function(map) {
    var target = map['tatget'],
      roads = map['roads'],
      destinations = map['destinations'],
      timerMode = map['timerMode'],
      timer = map['timer'],
      timeup = map['timeup'],
      finish = map['finish'];
      if(timerMode == null ) { timerMode = 'timer';}
      if(timeup == null ) { timeup = function(){};}
      if(finish == null ) { finish = function(){};}
      init(target, roads, destinations, timerMode, timer, timeup, finish);
  };

})(jQuery)