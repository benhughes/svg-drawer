define(function () {
    var guideEl = document.querySelector('#drawingGuide'),
        guideMove = Rx.Observable.fromEvent(guideEl, 'mousemove'),
        guideClick = Rx.Observable.fromEvent(guideEl, 'click');


    var moveStream = guideMove.map(function (event) {
        return [event.offsetX, event.offsetY];
    });
    var clickStream = guideClick.map(function (event) {
        return [event.offsetX, event.offsetY];
    });


    return {
        mouseMove: moveStream,
        click: clickStream
    }
});

