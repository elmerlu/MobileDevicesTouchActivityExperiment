var timeobj;
var startTime;
var isStart = false;
var intervalTask;
var objs;
var targetname="target";

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();
if(QueryString['lv'] == null || QueryString['lv'] > 5) {
    QueryString['lv']=1;
}
$('body').addClass('lv'+QueryString['lv']);
    
$(function() {
    timeobj = $('#time');
    initTime();
    var btns = $('button[name^="target"]');
    for (var i = 0; i < btns.length; i++) {
        $(btns[i]).on('click', clickEvent);
    };

    initWindowsSize();
    
    $('#startbtn').on('click', function() {
        if(isStart) {
            var btns = $('button[name^="target"]');
            for (var i = 0; i < btns.length; i++) {
                $(btns[i]).removeClass(targetname);
            };
            isStart = false;
            $(this).html('START');
            stopTimeing();
            initTime();
        }else {
            isStart = true;
            $(this).html('STOP');
            initTime();
            startTiming();
            objs = getObjs();
            nextEvent();
        }
    });
});

function initWindowsSize() {
    var width = $( '#container' ).width();
    var height = $( '#container' ).height();
    var bodyWidth = $( 'body' ).width();
    var bodyHeight = $( 'body' ).height();
    var min = width < height ? width : height;
    if(min == width) {
        var marginTop = height - width;
        marginTop/=2;
        console.log(marginTop);
        $('#container').css("margin-top",marginTop);
    }
    console.log(min +'   '+ width+','+height)
    min = min*0.96;
    $('#container').width(min);
    $('#container').height(min);
    $('#size').html(bodyWidth+' * '+bodyHeight);
}

function getObjs() {
    if($('input[name="sort"]').prop('checked')){
        return getSortObjs();
    }else{
        return getNonSortObjs();
    }
}

function getSortObjs() {
    var btns = $('button[name^="target"]');
    var arrays=[];
    for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];
        var ids = $(btn).attr('id');
        ids = ids.split(',');
        for (var ii = 0; ii < ids.length; ii++) {
            var id = ids[ii];
            arrays[parseInt(id)]=btn;
        };
    };
    return arrays;
}

function getNonSortObjs() {
    var arrays = getSortObjs();
    var btns = $('button[name="target-random"]');
    var randomIndexs = [];
    for (var i = 0; i < btns.length; i++) {
        randomIndexs[i]=parseInt($(btns[i]).attr('id'));
    };
    for (var i = 0; i < btns.length; i++) {
        var index = Math.floor((Math.random() * btns.length));
        console.log(index +'  ,'+randomIndexs[index]);
        var index = randomIndexs[index];
        var tmp = arrays[randomIndexs[i]];
        arrays[randomIndexs[i]] = arrays[index];
        arrays[index] = tmp;
    };
    return arrays;
}

function initTime() {
    $(timeobj).html(0);
}

function startTiming() {
    startTime = new Date();
    intervalTask = setInterval(function() {
        var time = new Date();
        time = time - startTime;
        $(timeobj).html(time/1000.0);
    }, 50);
}

function stopTimeing() {
    clearInterval(intervalTask);
}

function nextEvent() {
    var firstElement = objs.splice(0,1);
    $(firstElement).addClass(targetname);
}

function clickEvent() {
    if($(this).hasClass(targetname)) {
        $(this).removeClass(targetname);
        console.log(objs);
        if(objs.length == 0) {
            finishEvent();
        }else {
            nextEvent();
        }
    }
}

function finishEvent() {
    isStart = false;
    $('#startbtn').html('START');
    stopTimeing();
}