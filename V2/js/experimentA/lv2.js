(function( $ ){
    var timing = new Timing();
    var scoring = new Scoring();
    var targetClass = 'target';
    var targets = null;
    var btns = getObjs();
    var intervalTask = null;

    for (var i = 0; i < btns.length; i++) {
        $(btns[i]).on('click', clickEvent);
    };
    $('#startbtn').on('click', function () {

        if(timing.isTiming()) {
            //stop
            finishEvent();
            var btns = $('button[type^="target"]');
            for (var i = 0; i < btns.length; i++) {
                $(btns[i]).removeClass(targetClass);
            };
            $(this).html('Start');
        }else {
            //start
            targets = getObjs();
            timing.countdown(15000, 
                function(time) {
                    $('#time').html((time/1000).toFixed(3))
                    finishEvent();
                    $(this).html('Start');
                }, 
                null, 
                function(time) {
                    $('#time').html((time/1000).toFixed(3))
                }
            );
            scoring.reset();
            $(this).html('Stop');
            $('#score').html(0);
                        
            startEvent();
        }
    });

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

    function startEvent() {
        intervalTask = setInterval(function() {
            nextEvent();
        }, 300);
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

    function finishEvent() {
        clearInterval(intervalTask);
        timing.stop();

        // var btns = $('button[type^="target"]');
        // for (var i = 0; i < btns.length; i++) {
        //     $(btns[i]).removeClass(targetClass);
        // };
    }

})(jQuery)