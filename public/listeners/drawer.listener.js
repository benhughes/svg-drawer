define(function (require) {
    "use strict";

    var trackPadStream = require('streams/trackpad.stream'),
        draw = SVG('drawing'),
        drawGuide = SVG('drawingGuide');


    var points = [[0,0]];

    trackPadStream.mouseDrags.subscribe(function (drags) {
        console.log('here');
        var lastCoord = drags.startPos;

        drags.drags.subscribe(function (test) {
                lastCoord = test;
                drawGuide.clear();
                drawGuide.line(points[points.length - 1][0], points[points.length - 1][1], test[0], test[1]).stroke({ width: 1 });
                drawGuide.circle(10).fill('none').stroke({ width: 1 }).move(test[0] - 5, test[1] - 5);

            },
            function (error) {
                console.log('error', error);
            },
            function () {
                points.push(lastCoord);
                draw.clear();
                drawGuide.clear();
                draw.polyline(points).fill('none').stroke({ width: 1 });
            }
        );

    });
});

