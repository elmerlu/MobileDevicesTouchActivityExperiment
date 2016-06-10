 var Timing = function () {
    var startTime = null;
    var intervalTask = null;
    var isTiming = false;
    var isCountdown = false;

    this.isTiming = function() {
        return isTiming || isCountdown;
    }

    this.start = function (milliseconds, callback, endTimeMilliseconds, endCallback) {
        if(this.isTiming()) return;
        milliseconds = milliseconds == null ? 1 : milliseconds;
        startTime = new Date();
        isTiming = true;
      
        intervalTask = setInterval(function() {
            var now = new Date();
            var time = now - startTime;
            if(callback != null) {
              callback(time);
            }
            
            if(time>endTimeMilliseconds) {
                clearInterval(intervalTask);
                endCallback(time);
            }
        }, milliseconds);
    }
   
    this.countdown = function (endTimeMilliseconds, endCallback, milliseconds, callback) {
        if(this.isTiming()) return;
        milliseconds = milliseconds == null ? 1 : milliseconds;
        startTime = new Date();
        isCountdown = true;
     
        intervalTask = setInterval(function() {
            var now = new Date();
            var time = endTimeMilliseconds - (now - startTime);
            if(callback != null) {
                callback(time);
            }
            
            if(time<0) {
               clearInterval(intervalTask);
               endCallback(0);
            }
        }, milliseconds);
    };
   
    this.stop = function () {
        isTiming = false;
        isCountdown = false;
        clearInterval(intervalTask);
    }
};