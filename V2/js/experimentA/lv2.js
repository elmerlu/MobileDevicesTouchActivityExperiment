(function( $ ){
    var timing = new Timing();
    var targetClass = 'target';
    var targets;
    var btns = getObjs();
    for (var i = 0; i < btns.length; i++) {
        //$(btns[i]).on('click', clickEvent);
    };
    $('#startbtn').on('click', function () {

        if(timing.isTiming()) {

            timing.stop();

            var btns = $('button[type^="target"]');
            for (var i = 0; i < btns.length; i++) {
                $(btns[i]).removeClass(targetClass);
            };
            $(this).html('Start');
        }else {
            targets = getObjs();
            timing.countdown(15000, 
                function(time) {
                    $('#time').html((time/1000).toFixed(3))
                    timing.stop();
                    $(this).html('Start');
                }, 
                null, 
                function(time) {
                    $('#time').html((time/1000).toFixed(3))
                }
            );
            
            $(this).html('Stop');
                        
            nextEvent();
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


    function nextEvent() {
        var firstElement = targets.splice(0,1);
        $(firstElement).addClass(targetClass);
    }

    function clickEvent() {
        if($(this).hasClass(targetClass)) {
            $(this).removeClass(targetClass);
            if(btns.length - targets.length == 20) {
                finishEvent();
            }else {
                console.log(targets.length);
                nextEvent();
            }
        }
    }

    function finishEvent() {
        timing.stop();

        // var btns = $('button[type^="target"]');
        // for (var i = 0; i < btns.length; i++) {
        //     $(btns[i]).removeClass(targetClass);
        // };
    }

})(jQuery)