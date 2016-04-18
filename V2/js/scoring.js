var Scoring = function () {
    var _score = 0;
    this.addScore = function(score) {
        _score+=score;
    }

    this.getScore = function() {
        return _score;
    }

    this.reset = function() {
        _score = 0;
    }
}