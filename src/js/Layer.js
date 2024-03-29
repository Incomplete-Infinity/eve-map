const Layer = Renderer.layer;
Renderer.init();
// ##### MAIN DRAW #####
Renderer.stage = Layer.stage = {
  context: Renderer.createCanvas("stage"),

  visible: true,
  isDirty: true,

  render: () => {
    // - draw layers
    Layer.background.render();
    Layer.jumps.render();
    Layer.systems.render();
    Layer.labels.render();
    if (!State.hideUI) Layer.ui.render();

    // - set context to stage
    Renderer.setContext(Layer.stage);

    // - draw to stage
    Renderer.clearCanvas();

    ctx.drawImage(Layer.background.context.canvas, 0, 0);

    if (Camera.scale > 17) ctx.drawImage(Layer.labels.context.canvas, 0, 0);

    ctx.drawImage(Layer.jumps.context.canvas, 0, 0);
    ctx.drawImage(Layer.systems.context.canvas, 0, 0);

    if (Camera.scale <= 17) ctx.drawImage(Layer.labels.context.canvas, 0, 0);

    if (!State.hideUI) ctx.drawImage(Layer.ui.context.canvas, 0, 0);

    // - set context to viewport
    ctx = Viewport.canvas._ctx;
    canvas = Viewport.canvas;

    // - draw stage to viewport
    Renderer.clearCanvas();
    ctx.drawImage(Layer.stage.context.canvas, 0, 0);
  },
};
// ##### DRAW LAYERS #####
Layer.background = {
  context: Renderer.createCanvas("background"),

  visible: false,
  isDirty: false,

  render: () => {
    Renderer.setContext(Layer.background);

    Layer.background.drawColor();
    Layer.background.drawCrosshair();

    if (State.drawInfluence) Layer.background.drawInfluence();

    if (State.editMode && Camera.norm >= State.thresholdIcons) {
      if (!State.isDetail) {
        if (State.simpleSpacer) Layer.background.drawSystemSpacer();
      } else {
        if (State.detailSpacer) Layer.background.drawSystemSpacer();
      }

      Layer.background.drawGrid();
    }
  },
  drawColor: () => {
    ctx.fillStyle = "#08080800";
    ctx.fillRect(0, 0, Viewport.width, Viewport.height);
  },
  drawCrosshair: () => {
    ctx.fillStyle = "rgba(196,196,196,0.40)";
    ctx.fillRect(Viewport.center.x - 4, Viewport.center.y - 1, 8, 2);
    ctx.fillRect(Viewport.center.x - 1, Viewport.center.y - 4, 2, 8);
  },
  drawInfluence: () => {
    let i, j, ci, cj, data;

    let box = 800000;
    const scale = 2;

    box = box / Math.max(5, Dispobj.system._v.length);

    box = box * scale * scale;
    box = Math.floor(Math.sqrt(box));

    box = Math.floor(Math.min(125 * scale, box));

    i = Math.max(0, Math.min(Viewport.width, Viewport.center.x - box));
    ci = Math.max(0, Math.min(Viewport.width, Viewport.center.x + box));

    while (i < ci) {
      j = Math.max(0, Math.min(Viewport.height, Viewport.center.y - box));
      cj = Math.max(0, Math.min(Viewport.height, Viewport.center.y + box));

      while (j < cj) {
        data = Layer.background.getPixelNearestSystem(i, j);

        if (data.sys) {
          if (data.border) {
            ctx.fillStyle = data.sys.display.simple;
          } else {
            ctx.fillStyle = data.sys.display.background;
          }
        } else {
          ctx.fillStyle = "#333333";
        }

        ctx.fillRect(
          Math.floor(i - scale / 2),
          Math.floor(j - scale / 2),
          scale,
          scale
        );

        j += scale;
      }

      i += scale;
    }
  },
  getPixelNearestSystem: (x, y) => {
    let closest = false;
    let dist = 99999;
    let curDist;
    let curObj;
    let i;
    let count;

    let c2,
      d2 = 99999;

    let dvc, border;

    i = 0;
    count = Dispobj.system._v.length;

    while (i < count) {
      curObj = Helper.getElementInRefList(Dispobj.system, i, "_v");
      curDist = Helper.getDistance({ x: x, y: y }, curObj.draw);

      // current object is closer than c2 and further than closest
      if (curDist <= d2 && curDist >= dist) {
        c2 = curObj;
        d2 = curDist;
      }

      // current object is closer then currently saved
      if (curDist <= dist) {
        if (d2 >= dist) {
          c2 = closest;
          d2 = dist;
        }

        closest = curObj;
        dist = curDist;
      }

      i++;
    }

    //if( dist > 250 ) return false;

    //if( x == Viewport.center.x && y == Viewport.center.y ) console.log( closest.name , dist , c2.name , d2 );

    dvc = Math.abs(dist - d2);

    border = dvc >= 0.0 && dvc < (2 - dist / 200) * (Camera.norm / 10000);

    if (!border && dist > 198) border = true;
    if (dist > 200) return false;

    return { sys: closest, border: false };
  },
  drawSystemSpacer: () => {
    let curObj, count, w, h;

    let i = 0;
    count = Dispobj.system._v.length;

    w = 75 * (Camera.scale / 100);
    h = 50 * (Camera.scale / 100);

    ctx.globalAlpha = 0.15;

    while (i < count) {
      curObj = Helper.getElementInRefList(Dispobj.system, i, "_v");

      ctx.fillStyle = curObj.display.simple;
      ctx.fillRect(curObj.draw.x - w / 2, curObj.draw.y - h / 2, w, h);

      i++;
    }

    ctx.globalAlpha = 1;
  },
  drawGrid: () => {
    var a = [0, 0],
      sub = State.gridSplit * State.gridSub,
      b;

    if (Camera.scale < 50) return;

    ctx.lineWidth = 1;

    b =
      (Viewport.center.x - Camera.renderPosition.x * Camera.scale) /
      Camera.scale;
    a[0] = Camera.scale - Math.round((Math.ceil(b) - b) * Camera.scale);

    b = Math.ceil(Viewport.width / Camera.scale) * sub + sub;
    while (b) {
      ctx.beginPath();
      ctx.moveTo(a[0] + ((b - sub) * Camera.scale) / sub, 0);
      ctx.lineTo(a[0] + ((b - sub) * Camera.scale) / sub, Viewport.height);
      ctx.strokeStyle =
        "rgba(255, 255, 255," +
        (b % sub ? ((b % sub) % State.gridSub ? "0.02)" : "0.05)") : "0.2)");
      ctx.stroke();
      b--;
    }

    b =
      (Viewport.center.y + Camera.renderPosition.y * Camera.scale) /
      Camera.scale;
    a[1] = Camera.scale - Math.round((Math.ceil(b) - b) * Camera.scale);

    b = Math.ceil(Viewport.height / Camera.scale) * sub + sub;
    while (b) {
      ctx.beginPath();
      ctx.moveTo(0, a[1] + ((b - sub) * Camera.scale) / sub);
      ctx.lineTo(Viewport.width, a[1] + ((b - sub) * Camera.scale) / sub);
      ctx.strokeStyle =
        "rgba(255, 255, 255," +
        (b % sub ? ((b % sub) % State.gridSub ? "0.02)" : "0.05)") : "0.2)");
      ctx.stroke();
      b--;
    }
  },
};
Layer.ui = {
  context: Renderer.createCanvas("ui"),

  visible: true,
  isDirty: true,

  render: function () {
    // - set context to layer
    Renderer.setContext(Layer.ui);

    Renderer.clearCanvas();
    Layer.ui.draw();
  },

  draw: function () {
    // background
    ctx.fillStyle = "rgba(0,0,0,0.40)";
    ctx.strokeStyle = "rgba(0,0,0,0.60)";
    ctx.lineWidth = 2;

    if (State.showSystemDrawCount) {
      ctx.fillRect(5, 5, 85, 35);
      ctx.strokeRect(5, 5, 85, 35);
    } else {
      ctx.fillRect(5, 5, 85, 20);
      ctx.strokeRect(5, 5, 85, 20);
    }

    // text
    ctx.font = "12px consolas";
    ctx.textBaseline = "middle";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.strokeText("Zoom: " + Camera.norm, 10, 15);
    ctx.fillText("Zoom: " + Camera.norm, 10, 15);

    if (State.showSystemDrawCount) {
      ctx.strokeText("Sys: " + Dispobj.system._v.length, 10, 30);
      ctx.fillText("Sys: " + Dispobj.system._v.length, 10, 30);
    }
  },
};
Layer.systems = {
  context: Renderer.createCanvas("systems"),

  visible: true,
  isDirty: true,

  render: function () {
    // - set context to layer
    Renderer.setContext(Layer.systems);

    Renderer.clearCanvas();
    Layer.systems.drawSystems();
  },

  drawSystems: function () {
    if (Camera.norm < State.thresholdIcons) {
      Layer.systems.drawSystemsBasic();
    } else {
      Layer.systems.redrawSystemIcons();
      Layer.systems.drawSystemsIcon();
    }
  },
  drawSystemsBasic: function () {
    var i = 0,
      count = Dispobj.system._v.length,
      sys;

    while (i < count) {
      sys = Helper.getElementInRefList(Dispobj.system, i, "_v");

      Layer.systems.drawBasic(sys);

      i++;
    }
  },
  redrawSystemIcons: function () {
    var i = 0,
      count = Dispobj.system._v.length,
      sys;

    while (i < count) {
      sys = Helper.getElementInRefList(Dispobj.system, i, "_v");

      Layer.systems.redrawIcon(sys);

      i++;
    }
  },
  drawSystemsIcon: function () {
    var i = 0,
      count = Dispobj.system._v.length,
      sys;

    while (i < count) {
      sys = Helper.getElementInRefList(Dispobj.system, i, "_v");

      Layer.systems.drawIcon(sys);

      i++;
    }
  },

  getSystemAlpha: function (sys) {
    if (typeof sys.display.alpha == "undefined") return 1;

    return Math.max(0, Math.min(1, sys.display.alpha));
  },

  drawBasic: function (sys) {
    var TA = Layer.systems.getSystemAlpha(sys);

    if (ctx.globalAlpha != TA) ctx.globalAlpha = TA;

    ctx.fillStyle = sys.display.simple;

    if (State.dot <= 2)
      ctx.fillRect(sys.draw.x - 1, sys.draw.y - 1, State.dot, State.dot);
    else {
      Renderer.drawDotShape(sys, { x: sys.draw.x, y: sys.draw.y });
      ctx.fill();
    }

    if (ctx.globalAlpha !== 1) ctx.globalAlpha = 1;

    if (State.editShowOffset) Layer.systems.drawOffset(sys);
  },
  redrawIcon: function (sys) {
    if (State.isDetail) {
      if (sys.display.redrawDetail || State.forceRedrawCached) {
        // update detail icon
        Layer.systems.updateDetailIcon(sys);
      }
    } else {
      if (
        sys.display.simpleScale != Math.min(10000, Camera.norm) ||
        State.forceRedrawCached ||
        State.debugPositionName
      ) {
        // update simple icon
        Layer.systems.updateSimpleIcon(sys);
      }
    }
  },
  drawIcon: function (sys) {
    if (State.isDetail) {
      ctx.drawImage(
        sys.display.icon,
        0,
        48,
        128,
        48,
        sys.bound.l,
        sys.bound.t,
        128,
        48
      );
    } else {
      ctx.drawImage(
        sys.display.icon,
        0,
        0,
        128,
        48,
        sys.bound.l,
        sys.bound.t,
        128,
        48
      );
    }

    if (State.editShowOffset) Layer.systems.drawOffset(sys);

    if (State.debugBounds) Renderer.drawBoundingBox(sys.bound, "#ffff00");
  },

  alphaBuffer: false,

  applyIconAlpha: function (alpha, simple) {
    var icon = canvas,
      albu;

    if (!Layer.systems.alphaBuffer) {
      Layer.systems.alphaBuffer = Helper.getIcon();

      Layer.systems.alphaBuffer.width = 128;
      Layer.systems.alphaBuffer.height = 48;
    }

    albu = Layer.systems.alphaBuffer;

    // set context to alphabuffer
    canvas = albu;
    ctx = canvas.cont;

    // draw icon to alphabuffer
    ctx.clearRect(0, 0, 128, 48);

    if (!simple) {
      ctx.drawImage(icon, 0, 48, 128, 48, 0, 0, 128, 48);
    } else {
      ctx.drawImage(icon, 0, 0, 128, 48, 0, 0, 128, 48);
    }

    // set context to icon
    canvas = icon;
    ctx = canvas.cont;

    // set alpha
    ctx.globalAlpha = alpha;

    // draw alphabuffer to icon
    if (!simple) {
      ctx.clearRect(0, 48, 128, 48);
      ctx.drawImage(albu, 0, 0, 128, 48, 0, 48, 128, 48);
    } else {
      ctx.clearRect(0, 0, 128, 48);
      ctx.drawImage(albu, 0, 0, 128, 48, 0, 0, 128, 48);
    }

    // set alpha
    ctx.globalAlpha = 1;
  },

  updateSimpleIcon: function (data) {
    canvas = data.display.icon;
    ctx = canvas.cont;

    // - draw icon
    ctx.clearRect(0, 0, 128, 48);

    ctx.lineWidth = State.sysBorderWidth;
    Layer.systems.drawIconDot(data);
    if (
      data.display.inSelection ||
      State.selHighlightE.indexOf(data.name) != -1 ||
      State.simpleForceName ||
      State.debugPositionName ||
      State.debugIdName
    ) {
      ctx.lineJoin = "round";
      Layer.systems.drawSimpleText(
        data,
        State.selHighlight1.indexOf(data.name) == -1
      );
      ctx.lineJoin = "miter";
    }

    if (typeof data.display.alpha != "undefined") {
      if (data.display.alpha >= 0 && data.display.alpha < 1) {
        Layer.systems.applyIconAlpha(data.display.alpha, true);
      }
    }

    // - set icon as updated
    Renderer.setContext(Layer.systems);

    data.display.simpleScale = Math.min(10000, Camera.norm);
  },
  updateDetailIcon: function (data) {
    canvas = data.display.icon;
    ctx = canvas.cont;

    // - draw icon
    ctx.clearRect(0, 48, 128, 48);

    ctx.lineWidth = 2;
    Layer.systems.drawDetailGlow(data);
    Layer.systems.drawDetailRing(data);
    Layer.systems.drawDetailPin(data);
    Layer.systems.drawDetailSelectionRing(data);
    Layer.systems.drawDetailCapsule(data);

    ctx.lineJoin = "round";
    Layer.systems.drawDetailText(data);
    ctx.lineJoin = "miter";

    Layer.systems.drawDetailStation(data);

    Layer.systems.drawDetailEffect(data);
    Layer.systems.drawDetailEffectText(data);

    if (typeof data.display.alpha != "undefined") {
      if (data.display.alpha >= 0 && data.display.alpha < 1) {
        Layer.systems.applyIconAlpha(data.display.alpha, false);
      }
    }

    // - set icon as updated
    Renderer.setContext(Layer.systems);

    data.display.redrawDetail = false;
  },

  drawIconDot: function (data) {
    var pColor = data.display.background,
      sColor = data.display.simple;

    var f = State.truDot * 1.75,
      rc;

    if (State.flashCache) {
      rc = Helper.randomColorSet();

      pColor = rc[0];
      sColor = rc[1];
    }

    ctx.fillStyle = pColor;
    ctx.strokeStyle = sColor;

    // Fractured
    if (data.display.pin) {
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - f, 24 - f);
      ctx.lineTo(State.sysSimpleOffset + f, 24 + f);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - f, 24 + f);
      ctx.lineTo(State.sysSimpleOffset + f, 24 - f);
      ctx.stroke();
    }

    // Edit Selection
    if (State.selHighlightE.indexOf(data.name) != -1) {
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - 0.5 * f, 24 - 2.5 * f);
      ctx.lineTo(State.sysSimpleOffset, 24 - 2 * f);
      ctx.lineTo(State.sysSimpleOffset + 0.5 * f, 24 - 2.5 * f);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - f, 24 - 2 * f);
      ctx.lineTo(State.sysSimpleOffset, 24 - f);
      ctx.lineTo(State.sysSimpleOffset + f, 24 - 2 * f);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - 0.5 * f, 24 + 2.5 * f);
      ctx.lineTo(State.sysSimpleOffset, 24 + 2 * f);
      ctx.lineTo(State.sysSimpleOffset + 0.5 * f, 24 + 2.5 * f);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(State.sysSimpleOffset - f, 24 + 2 * f);
      ctx.lineTo(State.sysSimpleOffset, 24 + f);
      ctx.lineTo(State.sysSimpleOffset + f, 24 + 2 * f);
      ctx.stroke();
    }

    // Create Shape Path
    Renderer.drawDotShape(data, { x: State.sysSimpleOffset, y: 24 });

    // Contested
    if (data.display.glow) {
      ctx.globalAlpha *= 0.125;
      ctx.lineWidth = State.sysBorderWidth + 8;
      ctx.stroke();
      ctx.lineWidth = State.sysBorderWidth + 6;
      ctx.stroke();
      ctx.lineWidth = State.sysBorderWidth + 4;
      ctx.stroke();
      ctx.lineWidth = State.sysBorderWidth + 2;
      ctx.stroke();
      ctx.globalAlpha *= 8;
    }

    // Base Shape
    ctx.lineWidth = State.sysBorderWidth;
    ctx.stroke();
    ctx.fill();

    // Effect
    if (data.display.effect) {
      ctx.fillStyle = ctx.strokeStyle;
      if (Camera.norm >= 8000) {
        ctx.fillRect(State.sysSimpleOffset - 1.5, 22.5, 3, 3);
      } else {
        ctx.fillRect(State.sysSimpleOffset - 1, 23, 2, 2);
      }
    }
  },
  drawSimpleText: function (data, fade) {
    var textPosX = State.sysSimpleOffset + State.sysTitleOffset,
      textPosY = 24 + State.mainTextOffset;

    ctx.font = "bold " + State.sysText + "px Consolas";
    ctx.textBaseline = "middle";
    ctx.textAlign = "start";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";

    ctx.fillStyle = data.display.titleColor;
    if (fade && State.selHighlightE.indexOf(data.name) != -1)
      ctx.fillStyle = data.display.simple;
    ctx.globalAlpha = Camera.norm >= 8000 ? 1 : 0.5;
    if (fade) ctx.globalAlpha *= 0.65;

    if (State.debugIdName) {
      ctx.strokeText(
        data.display.title +
          " : " +
          (Universe.table[data.display.title].id - 30000000),
        textPosX,
        textPosY
      );
      ctx.fillText(
        data.display.title +
          " : " +
          (Universe.table[data.display.title].id - 30000000),
        textPosX,
        textPosY
      );
    } else if (State.debugPositionName) {
      ctx.strokeText(
        "[ " + data.draw.x + " , " + data.draw.y + " ]",
        textPosX,
        textPosY
      );
      ctx.fillText(
        "[ " + data.draw.x + " , " + data.draw.y + " ]",
        textPosX,
        textPosY
      );
    } else {
      ctx.strokeText(data.display.title, textPosX, textPosY);
      ctx.fillText(data.display.title, textPosX, textPosY);
    }

    ctx.globalAlpha = 1;
  },

  drawDetailGlow: function (data) {
    var j = 4;

    if (!data.display.glow) return;

    ctx.globalAlpha = 0.125;
    ctx.fillStyle = data.display.glow;

    while (j) {
      Renderer.drawCapsule(
        State.capDraw,
        {
          x: data.display.width + 4 * j + 1,
          y: State.capsule.y + 4 * j + 1,
          r: State.capsule.r + 2 * j,
        },
        data.display.box
      );
      ctx.fill();
      j--;
    }

    ctx.globalAlpha = 1;
  },
  drawDetailSelectionRing: function (data) {
    // main selection
    if (
      !(
        !data.display.inSelection ||
        State.selHighlight1.indexOf(data.name) == -1
      )
    ) {
      ctx.strokeStyle = "#ffffff";
      Renderer.drawCapsule(
        State.capDraw,
        {
          x: data.display.width + 18,
          y: State.capsule.y + 18,
          r: State.capsule.r + 9,
        },
        data.display.box
      );
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.lineWidth = 2;

    // edit mode selection
    if (State.editMode && State.selHighlightE.indexOf(data.name) != -1) {
      ctx.setLineDash([8, 8]);

      ctx.strokeStyle = "#ffffff";
      ctx.lineDashOffset = 8;
      Renderer.drawCapsule(
        State.capDraw,
        {
          x: data.display.width + 16,
          y: State.capsule.y + 16,
          r: State.capsule.r + 8,
        },
        data.display.box
      );
      ctx.stroke();

      ctx.strokeStyle = "#000000";
      ctx.lineDashOffset = 0;
      Renderer.drawCapsule(
        State.capDraw,
        {
          x: data.display.width + 16,
          y: State.capsule.y + 16,
          r: State.capsule.r + 8,
        },
        data.display.box
      );
      ctx.stroke();

      ctx.setLineDash([]);
    }
  },
  drawDetailRing: function (data) {
    if (!data.display.ring) return;

    ctx.strokeStyle = data.display.ring;

    Renderer.drawCapsule(
      State.capDraw,
      {
        x: data.display.width + 8,
        y: State.capsule.y + 8,
        r: State.capsule.r + 4,
      },
      data.display.box
    );

    ctx.stroke();
  },
  drawDetailPin: function (data) {
    if (!data.display.pin) return;

    var pos = State.capDraw,
      deltaX = data.display.width / 2,
      deltaY = State.capsule.y / 2;

    if (data.display.box) {
      deltaX += 3;
      deltaY += 3;
    }

    ctx.strokeStyle = data.display.border;

    ctx.beginPath();
    ctx.moveTo(pos.x - deltaX, pos.y - deltaY);
    ctx.lineTo(pos.x - (deltaX - deltaY), pos.y);
    ctx.lineTo(pos.x - deltaX, pos.y + deltaY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos.x + deltaX, pos.y - deltaY);
    ctx.lineTo(pos.x + (deltaX - deltaY), pos.y);
    ctx.lineTo(pos.x + deltaX, pos.y + deltaY);
    ctx.stroke();
  },
  drawDetailCapsule: function (data) {
    ctx.fillStyle = data.display.background;
    ctx.strokeStyle = data.display.border;

    if (State.flashCache) {
      ctx.fillStyle = Helper.someRandomColor();
      ctx.strokeStyle = Helper.someRandomColor();
    }

    Renderer.drawCapsule(
      State.capDraw,
      { x: data.display.width, y: State.capsule.y, r: State.capsule.r },
      data.display.box
    );

    ctx.fill();
    ctx.stroke();
  },
  drawDetailText: function (data) {
    let shift = 0,
      titleTextSize = 12,
      infoTextSize = 10;
    const { title, info } = data.display;

    // calculate title values
    if (title.length >= 7) titleTextSize = 10;

    if (data.display.station) {
      shift = Math.max(0, title.length - 7);

      if (title.length == 11) titleTextSize = 9;
      if (title.length >= 12) {
        titleTextSize = 8;
        shift = Math.ceil((shift + 1) / 2);
      }
    }

    // draw title
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold " + titleTextSize + "px Consolas";
    ctx.fillStyle = data.display.titleColor;
    ctx.strokeStyle = "#000000";

    if (title.length >= 8)
      ctx.strokeText(
        title,
        State.capDraw.x - shift,
        State.capDraw.y + State.mainTextOffset - 5
      );
    ctx.fillText(
      title,
      State.capDraw.x - shift,
      State.capDraw.y + State.mainTextOffset - 5
    );

    // calculate info values
    if (info.length >= 10) infoTextSize = 9;
    if (info.length >= 12) infoTextSize = 8;

    // draw info
    ctx.font = "bold " + infoTextSize + "px Consolas";
    ctx.fillStyle = data.display.infoColor;

    if (info.length >= 8)
      ctx.strokeText(
        info,
        State.capDraw.x,
        State.capDraw.y + State.mainTextOffset + 6
      );
    ctx.fillText(
      info,
      State.capDraw.x,
      State.capDraw.y + State.mainTextOffset + 6
    );
  },
  drawDetailStation: (data) => {
    if (!data.display.station) return;

    ctx.lineWidth = 1;
    ctx.strokeStyle = data.display.station.border;

    Renderer.drawStationBase(data.display.station, {
      x: State.capDraw.x + data.display.width / 2,
      y: State.capDraw.y,
    });
    ctx.closePath();

    ctx.fillStyle = data.display.station.color;

    ctx.fill();
    ctx.stroke();

    if (data.display.station.type == "station")
      Layer.systems.drawSystemStationService(data.display.station, {
        x: State.capDraw.x + data.display.width / 2,
        y: State.capDraw.y,
      });
  },
  drawSystemStationService: (station, pos) => {
    if (station.part.top) {
      Renderer.drawPolyline([
        [pos.x - 5, pos.y - 5],
        [pos.x + 5, pos.y - 5],
        [pos.x, pos.y],
      ]);
      ctx.closePath();

      ctx.fillStyle = station.part.top;
      ctx.fill();
    }
    if (station.part.bottom) {
      Renderer.drawPolyline([
        [pos.x - 5, pos.y + 5],
        [pos.x + 5, pos.y + 5],
        [pos.x, pos.y],
      ]);
      ctx.closePath();

      ctx.fillStyle = station.part.bottom;
      ctx.fill();
    }
    if (station.part.left) {
      Renderer.drawPolyline([
        [pos.x - 5, pos.y - 5],
        [pos.x - 5, pos.y + 5],
        [pos.x, pos.y],
      ]);
      ctx.closePath();

      ctx.fillStyle = station.part.left;
      ctx.fill();
    }
    if (station.part.right) {
      Renderer.drawPolyline([
        [pos.x + 5, pos.y - 5],
        [pos.x + 5, pos.y + 5],
        [pos.x, pos.y],
      ]);
      ctx.closePath();

      ctx.fillStyle = station.part.right;
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(51,51,51,0.5)";

    // - lines between services
    Renderer.drawPolyline(
      [
        [pos.x - 5, pos.y - 5],
        [pos.x + 5, pos.y + 5],
      ],
      true
    );
    Renderer.drawPolyline(
      [
        [pos.x + 5, pos.y - 5],
        [pos.x - 5, pos.y + 5],
      ],
      true
    );

    if (station.part.center) {
      ctx.fillStyle = station.part.center;
      ctx.fillRect(pos.x - 2.5, pos.y - 2.5, 5, 5);
      ctx.strokeRect(pos.x - 2.5, pos.y - 2.5, 5, 5);
    }
  },
  drawDetailEffect: function (data) {
    if (!data.display.effect) return;

    const pos = {
      x: State.capDraw.x - data.display.width / 2,
      y: State.capDraw.y,
    };

    ctx.lineWidth = 2;
    ctx.strokeStyle = data.display.border;
    ctx.fillStyle = data.display.effect;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 6, 0, 2 * PI, false);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  },
  drawDetailEffectText: function (data) {
    if (!data.display.effectText) return;

    const pos = {
      x: State.capDraw.x - data.display.width / 2,
      y: State.capDraw.y + State.mainTextOffset,
    };

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold " + 10 + "px Consolas";
    ctx.fillStyle = data.display.effectTextColor;

    ctx.fillText(data.display.effectText, pos.x, pos.y);
  },

  drawOffset: (d_sys) => {
    const temp = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const sysOffset = { x: 0, y: 0 };
    const regOffset = { x: 0, y: 0 };

    const u_sys = Universe.system[d_sys.name];
    const u_reg = u_sys.region;
    const d_reg = Dispobj.region[u_reg.name];

    // get region offset
    pos.x = u_reg.position.x;
    pos.y = u_reg.position.z;
    Camera.getDrawPosition(pos, temp);

    regOffset.x = d_reg.draw.x - temp.x;
    regOffset.y = d_reg.draw.y - temp.y;

    // get system offset
    pos.x = u_sys.position.x;
    pos.y = u_sys.position.z;
    Camera.getDrawPosition(pos, temp);

    sysOffset.x = d_sys.draw.x - temp.x;
    sysOffset.y = d_sys.draw.y - temp.y;

    // get final offset
    temp.x = regOffset.x - sysOffset.x;
    temp.y = regOffset.y - sysOffset.y;

    const dist = Math.sqrt(Math.pow(temp.x, 2) + Math.pow(temp.y, 2));

    if (dist > 2) {
      if (
        !d_sys.display.inSelection ||
        State.selHighlight1.indexOf(d_sys.name) == -1
      ) {
        ctx.strokeStyle = "rgba(0,127,255,0.5)";
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = "rgba(0,127,255,1)";
        ctx.lineWidth = 2;
      }

      ctx.setLineDash([2, 2]);
      ctx.lineDashOffset = 0.5;

      ctx.beginPath();
      ctx.moveTo(d_sys.draw.x, d_sys.draw.y);
      ctx.lineTo(d_sys.draw.x + temp.x, d_sys.draw.y + temp.y);
      ctx.stroke();

      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#ffffff";
      ctx.lineWidth = 3;

      ctx.strokeText(Math.round(dist), d_sys.draw.x + 5, d_sys.draw.y - 5);
      ctx.fillText(Math.round(dist), d_sys.draw.x + 5, d_sys.draw.y - 5);
    }
  },
};
Layer.jumps = {
  context: Renderer.createCanvas("jumps"),

  visible: false,
  isDirty: false,

  render: () => {
    // - set context to layer
    Renderer.setContext(Layer.jumps);

    Renderer.clearCanvas();
    Layer.jumps.drawJumps();
  },

  drawJumps: () => {
    Layer.jumps.drawRegionJumps();
    Layer.jumps.drawConstellationJumps();
    Layer.jumps.drawSystemJumps();
  },
  drawRegionJumps: () => {
    let i = 0;
    const count = Dispobj.jump.region.length;

    ctx.lineWidth = State.regLine;

    while (i < count) {
      const jump = Dispobj.jump.region[i];

      if (jump.onScreen) Layer.jumps.drawJump(jump);

      i++;
    }
  },
  drawConstellationJumps: () => {
    let i = 0;
    const count = Dispobj.jump.constellation.length;

    ctx.lineWidth = State.regLine;

    while (i < count) {
      const jump = Dispobj.jump.constellation[i];

      if (jump.onScreen) Layer.jumps.drawJump(jump);

      i++;
    }
  },
  drawSystemJumps: () => {
    Dispobj.jumpcacheDrawList.length = 0;
    Layer.jumps.populateJumpcacheDrawList();
    Layer.jumps.redrawJumpcaches();
    Layer.jumps.drawJumpcaches();
  },
  populateJumpcacheDrawList: () => {
    let i = 0;

    const type =
      Camera.norm < State.thresholdJumpcache ? "region" : "constellation";

    const count = Dispobj[type]._d.length;

    while (i < count) {
      const jump = Helper.getElementInRefList(Dispobj[type], i, "_d");

      const drawable =
        jump.jumpcache.onScreen &&
        !jump.jumpcache.hide &&
        jump.jumpcache.jumps.length;
      if (drawable) Dispobj.jumpcacheDrawList.push(jump);

      i++;
    }
  },
  redrawJumpcaches: () => {
    let i = 0;
    let jump;
    const count = Dispobj.jumpcacheDrawList.length;

    while (i < count) {
      jump = Dispobj.jumpcacheDrawList[i];

      if (jump.jumpcache.redraw || State.forceRedrawCached)
        Layer.jumps.redrawJumpcache(jump);

      i++;
    }
  },
  drawJumpcaches: () => {
    let i = 0;
    const count = Dispobj.jumpcacheDrawList.length;

    while (i < count) {
      const jump = Dispobj.jumpcacheDrawList[i];

      Layer.jumps.drawJumpcache(jump);

      i++;
    }
  },

  drawJump: (jump) => {
    ctx.strokeStyle = jump.color || "#fff";

    if (jump.dashed) ctx.setLineDash([36, 36]);
    Renderer.drawPolyline(jump.draw, true);
    if (jump.dashed) ctx.setLineDash([]);

    if (State.debugBounds) Renderer.drawBoundingBox(jump.bound, "#ffff00");
  },
  drawJumpcache: (con) => {
    if (!con.jumpcache.drawnTo) return;

    ctx.drawImage(
      con.jumpcache.icon,
      con.jumpcache.bound.l,
      con.jumpcache.bound.t
    );

    if (State.debugBounds)
      Renderer.drawBoundingBox(con.jumpcache.bound, "#ff7f00");
  },
  redrawJumpcache: (con) => {
    const bound = con.jumpcache.bound;

    // draw system jumps
    let i = 0;
    const count = con.jumpcache.jumps.length;

    // set context to icon
    ctx = con.jumpcache.icon.cont;
    canvas = con.jumpcache.icon;

    // resize and clear canvas
    canvas.width = bound.w;
    canvas.height = bound.h;

    ctx.lineWidth = State.sysLine;

    //count = Math.min(count, 5);

    con.jumpcache.drawnTo = false;

    while (i < count) {
      const jump = con.jumpcache.jumps[i];

      Dispobj.updateSystemJumpDrawPosition(jump);

      if (Camera.scale < 25 && !Helper.shouldDrawLine(jump.draw)) {
        i++;
        continue;
      }
      if (!jump.inDrawGroup) {
        i++;
        continue;
      }

      ctx.strokeStyle = jump.color || "#999999";

      if (State.flashCache) ctx.strokeStyle = Helper.someRandomColor();

      Layer.jumps.drawJumpcacheJump(jump.draw, bound, true, jump.dashed);

      con.jumpcache.drawnTo = true;

      i++;
    }

    // set context to layer
    Renderer.setContext(Layer.jumps);

    con.jumpcache.redraw = false;
  },
  drawJumpcacheJump: (path, bound, stroke, dashed) => {
    let i = 1;
    const count = path.length;

    ctx.beginPath();

    ctx.moveTo(path[0][0] - bound.l, path[0][1] - bound.t);

    while (i < count) {
      ctx.lineTo(path[i][0] - bound.l, path[i][1] - bound.t);

      i++;
    }

    if (dashed) ctx.setLineDash([13, 21]);
    if (stroke) ctx.stroke();
    if (dashed) ctx.setLineDash([]);
  },
};
Layer.labels = {
  context: Renderer.createCanvas("labels"),
  render: () => {
    Renderer.setContext(Layer.labels);
    Renderer.clearCanvas();

    if (Camera.scale > 12) Layer.labels.drawLabels();
  },
  drawLabels: () => {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;

    Layer.labels.drawRegLabels();
    if (Camera.scale > 20) Layer.labels.drawConLabels();

    ctx.globalAlpha = 1;
  },
  getAlpha: (type) => {
    if (type == "R") {
      if (Camera.scale < 17) return 1;
      else if (Camera.scale < 22) return 0.75;
      else if (Camera.scale < 48) return 0.5;
      else if (Camera.scale < 70) return 0.25;
      else return 0.1;
    } else {
      if (Camera.scale < 70) return 0.5;
      else if (Camera.scale < 99) return 0.25;
      else return 0.1;
    }
  },
  drawRegLabels: () => {
    const offset = State.mainTextOffset * Math.floor(State.regText / 10);

    ctx.globalAlpha = Layer.labels.getAlpha("R");
    ctx.font = `bold ${State.regText} px consolas`;

    ctx.strokeStyle = "#000000";

    for (let i = 0; i < Dispobj.region._v.length; i++) {
      const SEL = Helper.getElementInRefList(Dispobj.region, i, "_v");

      if (SEL.inSelection) Layer.labels.drawLabelSelectionIcon(SEL.draw, "reg");

      if (Camera.scale < 17) {
        ctx.lineJoin = "round";
        ctx.strokeText(SEL.name, SEL.draw.x, SEL.draw.y + offset);
        ctx.lineJoin = "miter";
      }

      ctx.fillStyle = SEL.color || "#ffffff";
      ctx.fillText(SEL.name, SEL.draw.x, SEL.draw.y + offset);

      if (State.debugBounds) Renderer.drawBoundingBox(SEL.bound, "#7fff00");
    }
  },
  drawConLabels: () => {
    let offset = State.mainTextOffset * Math.floor(State.conText / 10);

    ctx.globalAlpha = Layer.labels.getAlpha();
    ctx.font = "bold " + State.conText + "px consolas";

    for (let i = 0; i < Dispobj.constellation._v.length; i++) {
      const SEL = Helper.getElementInRefList(Dispobj.constellation, i, "_v");

      if (SEL.inSelection) Layer.labels.drawLabelSelectionIcon(SEL.draw, "con");

      ctx.fillStyle = SEL.color || "rgb(255,223,127)";
      ctx.fillText(SEL.name, SEL.draw.x, SEL.draw.y + offset);

      if (State.debugBounds) Renderer.drawBoundingBox(SEL.bound, "#7fff00");
    }
  },
  drawLabelSelectionIcon: (pos, type) => {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = type == "con" ? "rgb(255,223,127)" : "#ffffff";
    ctx.fillStyle = "#080808";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 3;
    ctx.arc(pos.x, pos.y, 4, 0, 2 * PI, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(pos.x - 4, pos.y - 4);
    ctx.lineTo(pos.x + 4, pos.y + 4);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos.x + 4, pos.y - 4);
    ctx.lineTo(pos.x - 4, pos.y + 4);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  },
};

module.exports = Layer;