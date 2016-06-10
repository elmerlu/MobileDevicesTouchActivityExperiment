(function( $ ){
    var timing = new Timing();

    $.startEvent = function(callback, startEventCallback, finishEventCallBack) {
        startEvent(callback, startEventCallback, finishEventCallBack);
    };

    function startEvent(callback, startEventCallback, finishEventCallBack) {
        
      timing.start(null, function(time) {
        callback(time);
      });
      
      if(startEventCallback != null) {
        startEventCallback();
      }
    }

    $.finishEvent = function(callback) {
        finishEvent(callback);
    };

    function finishEvent(callback) {
        timing.stop();
        if(callback != null) {
            callback();
        }
    }

    $.isRunning = function() {
        return isRunning();
    }

    function isRunning() {
        return timing.isTiming();
    }

    $.keyboardInput = function keyboardInput(context, inputTarget, callback) {
      $(inputTarget).on('input', function() {
        if($.isRunning()) {
          var value = this.value;
          var pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/;
          var discount=0;
            
            console.log(value);
            console.log(context);
            
            console.log(value == context);
          if(value == context) {
            finishEvent();
            callback(0);                     
          }else{
            for (var i = 0; i < value.length; i++) {
              if(!pattern.test(value.charAt(i))){
                  if(context.charCodeAt(i)!=value.charCodeAt(i)){
                    discount--;
                  }
                }
              }

            callback(discount);
          }
        }
      });
    }

})(jQuery)