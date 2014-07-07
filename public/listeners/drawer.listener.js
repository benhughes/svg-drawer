define(function (require) {
    "use strict";

    var trackPadStream = require('streams/trackpad.stream'),
        guideStream = require('streams/guide.stream'),
        draw = SVG('drawing'),
        drawGuide = SVG('drawingGuide');

    var startCoord = [0,0];
    var points = [[startCoord]];

    trackPadStream.mouseDrags.subscribe(function (drags) {
        var thisPoint = points[points.length - 1];
        console.log('here');
        //points.push([startCoord]);
        //var startCoord = drags.startPos;

        drags.drags.subscribe(function (test) {
                startCoord = test;
                drawGuide.clear();
                drawGuide.line(thisPoint[thisPoint.length -1][0], thisPoint[thisPoint.length -1][1], test[0], test[1]).stroke({ width: 1 });
                drawGuide.circle(10).fill('none').stroke({ width: 1 }).move(test[0] - 5, test[1] - 5);

            },
            function (error) {
                console.log('error', error);
            },
            function () {
                points[points.length - 1].push(startCoord);
                draw.clear();
                drawGuide.clear();
                console.log(points);
                for (var i = 0; i < points.length; i++) {
                    //console.log('rendering', points[i]);
                    draw.polyline(points[i]).fill('none').stroke({ width: 1 });
                }
            }
        );

    });

    trackPadStream.mouseOver.subscribe(function (coords) {
        drawGuide.clear();
        drawGuide.circle(10).fill('none').stroke({ width: 1 }).move(coords[0], coords[1]);
    });

    guideStream.click.subscribe(function (coords) {
        points.push([coords]);
        console.log('new coord', coords, points)
    });
});

