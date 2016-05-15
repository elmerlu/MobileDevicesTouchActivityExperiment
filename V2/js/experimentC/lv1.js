
document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
$('button').on('touchstart',function() {
  $(this).click();
});

(function($) {
  var timing = new Timing();
  var targets;
  var targetCategoryMap = {};
  var tmpTargetsArray = [];
  var Target = function target() {
    this.target,
    this.type
  };
  
  function init(targetsSelector, timerMode, 
    timerCallback, timeupCallback, finishEventCallBack) {
    targets = $(targetsSelector);
    var mouseoverHandler = function(target) {
      
      var item = new Target();
      item.target = target;
      item.type = $(target).attr('type');
      if(!contains(item, tmpTargetsArray)){
        if(tmpTargetsArray.length == 0 || item.type == tmpTargetsArray[0].type){
          $(target).addClass('over');
          tmpTargetsArray.push(item);
          if(tmpTargetsArray.length == targetCategoryMap[tmpTargetsArray[0].type]) {
            console.log('clear');
            delete targetCategoryMap[tmpTargetsArray[0].type];
            for (var i = tmpTargetsArray.length - 1; i >= 0; i--) {
              var item = tmpTargetsArray[i];
              $(item.target).detach();
            }
            tmpTargetsArray = [];
            if(Object.size(targetCategoryMap) == 0) {
              finishEvent(finishEventCallBack);
            }
          }
        }else {
          $(target).trigger('touchend');
        }
      }
      lastHandleTarget = target;
    };

    initTargetCategoryMap($(targetsSelector));
    initMouseOverHandler(targetsSelector, mouseoverHandler, function(target){
      startEvent(timerMode, timerCallback, timeupCallback);
    });
  }

  function initTargetCategoryMap(targetsArray) {
    targetCategoryMap = {};
    $.each( targetsArray, function( i, l ){
      var type = $(l).attr('type');
      if( targetCategoryMap[ type ] == null ) {
        targetCategoryMap[ type ] = 1;
      } else {
        targetCategoryMap[ type ]++;
      }
    });
  }

  function contains(value, array) {
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if(isEquivalent(value, item)) {
        return true;
      }
    }
    return false;
  };

  function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
  }

  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  function initMouseOverHandler(targetsSelector, mouseoverHandler, startEventCallBack) {
    var startflag = false;
    var handlerflag = false;
    var lastHandleTarget = null;

    $('body').on('touchstart', function(e) {
      handlerflag = true;
      tmpTargetsArray = [];
    });

    $('body').on('touchend', function(e) {
      handlerflag = false;
      lastHandleTarget = null;
      $('.targetBall').removeClass('over');
    });

    $('body').on('touchmove', function(e) {
      var target = getElementFromTouchPoint(e.originalEvent.touches[0]);
      if(elementContains(target, targets)) {
        if(handlerflag) {
          if(this != lastHandleTarget) {
            if(!startflag) {
              startflag = true;
              startEventCallBack(target);
            }
            mouseoverHandler(target);
          }
        }
      }
    });
  }

  function getElementFromTouchPoint(touch) {
    var touchX = touch.clientX, touchY = touch.clientY;
    var target = document.elementFromPoint(touchX, touchY);
    return target;
  } 

  function elementContains(value, array) {
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if(item.isEqualNode(value)) {
        return true;
      }
    }
    return false;
  };

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

  function finishEvent(finishEventCallBack) {
    timing.stop();
    finishEventCallBack();
  }

  $.fn.experimentC = function(map) {
    var targetsSelector = map['targetsSelector'],
      timerMode = map['timerMode'],
      timer = map['timer'],
      timeup = map['timeup'],
      finish = map['finish'];
      if(timerMode == null ) { timerMode = 'timer';}
      if(timeup == null ) { timeup = function(){};}
      if(finish == null ) { finish = function(){};}
      init(targetsSelector, timerMode, timer, timeup, finish);
  };

})(jQuery)