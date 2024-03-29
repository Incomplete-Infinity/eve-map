const Renderer = {
  layer: { _list: [] },

  stage: false,

  init: function () {
    requestAnimationFrame(Renderer.animate);

    Viewport.resizeCallbacks.push(Renderer.updateLayersOnResize);
    /*
		if(State.fpsMeter && Stats){
			FPS_Meter = new Stats();
			FPS_Meter.showPanel( 0 );
			document.body.appendChild( FPS_Meter.dom );
			FPS_Meter.dom.style.position = 'absolute';
			FPS_Meter.dom.style.top = '10px';
			FPS_Meter.dom.style.left = '';
			FPS_Meter.dom.style.right = '10px';
		}
    */
  },
  // - RENDER LOOP
  animate: function () {
    if (FPS_Meter) FPS_Meter.begin();

    // clear selection when done drawing
    if (
      State.clearSelection &&
      !(
        Dispobj.redraw ||
        Dispobj.repos ||
        Dispobj.rescale ||
        Dispobj.isEditUpdate
      )
    ) {
      State.clearSelection = false;
      State.selection = [];
      State.mouseNear = false;
      State.updateSelection();
      Dispobj.redraw = true;
    }

    // redraw canvas
    if (Dispobj.redraw || State.autoRedraw) {
      if (Dispobj.repos) Dispobj.updateDrawPositions();

      if (Renderer.stage) Renderer.stage.render();

      Dispobj.redraw = false;
      Dispobj.repos = false;
      Dispobj.rescale = false;

      Dispobj.isEditUpdate = false;
    }
    if (FPS_Meter) FPS_Meter.end();

    requestAnimationFrame(Renderer.animate);
  },
  createCanvas: function (name) {
    var canv, cont;

    canv = document.createElement("canvas");
    cont = canv.getContext("2d");

    canv.width = Viewport.width;
    canv.height = Viewport.height;

    Renderer.layer._list.push(name);

    return cont;
  },
  setContext: function (layer) {
    ctx = layer.context;
    canvas = layer.context.canvas;
  },
  clearCanvas: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  updateLayersOnResize: function () {
    var i = 0,
      count = Layer._list.length,
      layer;

    if (!count) return;

    while (i < count) {
      layer = Helper.getElementInList(Layer, i);

      layer.context.canvas.width = Viewport.width;
      layer.context.canvas.height = Viewport.height;
      layer.isDirty = true;

      i++;
    }
  },

  drawBoundingBox: function (bound, color) {
    ctx.save();

    ctx.strokeStyle = color || "#ffffff";
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;

    ctx.setLineDash([2, 2]);
    ctx.lineDashOffset = 0.5;

    ctx.strokeRect(bound.l - 0.5, bound.t - 0.5, bound.w + 1, bound.h + 1);

    ctx.restore();
  },
  drawPolyline: function (path, stroke) {
    var i = 1,
      count = path.length;

    ctx.beginPath();

    ctx.moveTo(path[0][0], path[0][1]);

    while (i < count) {
      ctx.lineTo(path[i][0], path[i][1]);

      i++;
    }

    if (stroke) ctx.stroke();
  },
  drawDotShape: function (sys, pos) {
    var R = [State.truDot, State.truDot * 0.9, State.truDot * 1.2];

    ctx.beginPath();

    if (!sys.display.station) {
      // - no station
      ctx.arc(pos.x, pos.y, R[0], 0, 2 * PI, false);
    } else {
      if (sys.display.station.type == "station") {
        if (!sys.display.station.part.center) {
          // - npc station
          ctx.moveTo(pos.x - R[1], pos.y - R[1]);
          ctx.lineTo(pos.x + R[1], pos.y - R[1]);
          ctx.lineTo(pos.x + R[1], pos.y + R[1]);
          ctx.lineTo(pos.x - R[1], pos.y + R[1]);
        } else {
          // - conquerable station
          ctx.moveTo(pos.x, pos.y - R[2]);
          ctx.lineTo(pos.x + R[2], pos.y);
          ctx.lineTo(pos.x, pos.y + R[2]);
          ctx.lineTo(pos.x - R[2], pos.y);
        }
      } else {
        // - outpost
        ctx.moveTo(pos.x, pos.y - R[0]);
        ctx.lineTo(pos.x + R[0], pos.y - R[0]);
        ctx.lineTo(pos.x + R[0], pos.y + R[0]);
        ctx.lineTo(pos.x, pos.y + R[0]);
        ctx.lineTo(pos.x - R[0], pos.y);
      }
    }

    ctx.closePath();
  },
  drawCapsule: function (pos, shape, box) {
    ctx.beginPath();
    if (!box) {
      ctx.moveTo(pos.x - shape.x / 2 + shape.r, pos.y + shape.y / 2);
      ctx.lineTo(pos.x + shape.x / 2 - shape.r, pos.y + shape.y / 2);
      ctx.arc(
        pos.x + shape.x / 2 - shape.r,
        pos.y + shape.y / 2 - shape.r,
        shape.r,
        0.5 * PI,
        0,
        true
      );
      ctx.lineTo(pos.x + shape.x / 2, pos.y - shape.y / 2 + shape.r);
      ctx.arc(
        pos.x + shape.x / 2 - shape.r,
        pos.y - shape.y / 2 + shape.r,
        shape.r,
        0,
        -0.5 * PI,
        true
      );
      ctx.lineTo(pos.x - shape.x / 2 + shape.r, pos.y - shape.y / 2);
      ctx.arc(
        pos.x - shape.x / 2 + shape.r,
        pos.y - shape.y / 2 + shape.r,
        shape.r,
        -0.5 * PI,
        PI,
        true
      );
      ctx.lineTo(pos.x - shape.x / 2, pos.y - shape.y / 2 + shape.r);
      ctx.arc(
        pos.x - shape.x / 2 + shape.r,
        pos.y + shape.y / 2 - shape.r,
        shape.r,
        PI,
        0.5 * PI,
        true
      );
    } else {
      ctx.moveTo(pos.x - shape.x / 2, pos.y + shape.y / 2);
      ctx.lineTo(pos.x + shape.x / 2, pos.y + shape.y / 2);
      ctx.lineTo(pos.x + shape.x / 2, pos.y - shape.y / 2);
      ctx.lineTo(pos.x - shape.x / 2, pos.y - shape.y / 2);
    }
    ctx.closePath();
  },
  drawStationBase: function (station, pos) {
    if (station.type == "station") {
      // - square
      Renderer.drawPolyline([
        [pos.x - 5.5, pos.y - 5.5],
        [pos.x + 5.5, pos.y - 5.5],
        [pos.x + 5.5, pos.y + 5.5],
        [pos.x - 5.5, pos.y + 5.5],
      ]);
    } else {
      // - leftSpike
      Renderer.drawPolyline([
        [pos.x + 5.5, pos.y - 5.5],
        [pos.x - 0.5, pos.y - 5.5],
        [pos.x - 6, pos.y],
        [pos.x - 0.5, pos.y + 5.5],
        [pos.x + 5.5, pos.y + 5.5],
      ]);
    }
  },
};

module.exports = Renderer;