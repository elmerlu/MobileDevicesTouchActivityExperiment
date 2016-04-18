(function( $ ){
    var timing = new Timing();
    var scoring = new Scoring();
    var targetClass = 'target';
    var targets = getObjs();
    var intervalTask = null;

    for (var i = 0; i < targets.length; i++) {
        $(targets[i]).on('click', clickEvent);
    };

    function getObjs() {
    // if($('input[name="sort"]').prop('checked')){
    //     return getSortObjs();
    // }else{
    //     return getNonSortObjs();
    // }
         return getNonSortObjs();
    }

    function getSortObjs() {
        // var btns = $('button[name^="target"]');
        // var arrays=[];
        // for (var i = 0; i < btns.length; i++) {
        //     var btn = btns[i];
        //     var ids = $(btn).attr('id');
        //     ids = ids.split(',');
        //     for (var ii = 0; ii < ids.length; ii++) {
        //         var id = ids[ii];
        //         arrays[parseInt(id)]=btn;
        //     };
        // };
        // return arrays;
    }

    function getNonSortObjs() {
        // var arrays = getSortObjs();
        var btns = $('button[type="target-random"]');
        var randomIndexs = [];
        // for (var i = 0; i < btns.length; i++) {
        //     randomIndexs[i]=i;
        // };
        for (var i = 0; i < btns.length; i++) {
            var index = Math.floor((Math.random() * btns.length));
            var tmp = btns[index];
            btns[index] = btns[i];
            btns[i] = tmp;
            // console.log(index +'  ,'+randomIndexs[index]);
            // var index = randomIndexs[index];
            // var tmp = randomIndexs[i];
            // arrays[randomIndexs[i]] = arrays[index];
            // arrays[index] = tmp;
        };
        return btns;
    }

    $.startEvent = function(startEventCallback, finishEventCallBack) {
        startEvent(startEventCallback, finishEventCallBack);
    };

    function startEvent(startEventCallback, finishEventCallBack) {
        scoring.reset();
        for (var i = 0; i < targets.length; i++) {
            $(targets[i]).removeClass(targetClass);
        };

        timing.countdown(15000, 
            function(time) {
                $('#time').html((time/1000).toFixed(3))
                finishEvent(finishEventCallBack);
                $(this).html('Start');
            }, 
            null, 
            function(time) {
                $('#time').html((time/1000).toFixed(3))
            }
        );

        intervalTask = setInterval(function() {
            nextEvent();
        }, 300);
        if(startEventCallback != null) {
            startEventCallback();
        }
    }

    function nextEvent() {
        var index = Math.floor((Math.random() * targets.length));
        var i = index;
        do {
            var firstElement = targets[i++];
            i%=targets.length;
            if(i == index) {
                return;
            }
        }while($(firstElement).hasClass(targetClass))
        $(firstElement).addClass(targetClass);
    }

    function clickEvent() {
        if(timing.isTiming() && $(this).hasClass(targetClass)) {
            $(this).removeClass(targetClass);
            scoring.addScore(1);
            $('#score').html(scoring.getScore());
        }
    }

    $.finishEvent = function(callback) {
        finishEvent(callback);
    };

    function finishEvent(callback) {
        clearInterval(intervalTask);
        timing.stop();
        if(callback != null) {
            callback(scoring.getScore());
        }

        // var btns = $('button[type^="target"]');
        // for (var i = 0; i < btns.length; i++) {
        //     $(btns[i]).removeClass(targetClass);
        // };
    }

    $.isRunning = function() {
        return isRunning();
    }

    function isRunning() {
        return timing.isTiming();
    }

})(jQuery)