const work = true;
const { PI } = Math;
const Helper = {
  getElementInList: (obj, index) => obj[obj._list[index]],
  getElementInRefList: (obj, index, list) => obj[obj[list][index]],
  isAnoikis: (obj) => {
    if (Helper.isUnknown(obj)) return false;
    if (Helper.isAbyssal(obj)) return false;
    return obj.position.z < -500;
  },
  isAbyssal: (obj) => {
    if (obj.region) obj = obj.region;
    return obj.name.slice(0, 3) == "ADR";
  },
  isUnknown: (obj) => {
    if (obj.region) obj = obj.region;
    if (obj.name == "PR-01") return true;
    return false;
  },
  isJoveSpace: (obj) => {
    if (obj.region) obj = obj.region;
    if (obj.name == "A821-A" || obj.name == "J7HZ-F" || obj.name == "UUA-F4")
      return true;
    return false;
  },
  isNPCSpace: (sys) => {
    if (typeof Static == "undefined" || !Static.factionSovereignty)
      return false;

    return (
      Static.factionSovereignty[sys.constellation.name] ||
      Static.factionSovereignty[sys.region.name]
    );
  },
  isFactionWarfare: (sys) => {
    if (typeof Static == "undefined") return false;
    return (
      sys.security < 0.45 &&
      Static.factionWarfare &&
      Static.factionWarfare.list.indexOf(sys.constellation.name) != -1 &&
      Static.factionWarfare.ignore.indexOf(sys.name) == -1
    );
  },
  getJumpType: (sys1, sys2) => {
    sys1 = Universe.table[sys1];
    sys2 = Universe.table[sys2];

    return sys1.region.name != sys2.region.name
      ? "region"
      : sys1.constellation.name != sys2.constellation.name
      ? "constellation"
      : "system";
  },
  getIcon: () => {
    const canv = document.createElement("canvas");

    canv.cont = canv.getContext("2d");

    return canv;
  },
  getDistance: (pA, pB) =>
    Math.sqrt(Math.pow(pB.x - pA.x, 2) + Math.pow(pB.y - pA.y, 2)),
  shouldDrawLine: (draw) =>
    2.5 <
    Helper.getDistance(
      { x: draw[0][0], y: draw[0][1] },
      { x: draw[1][0], y: draw[1][1] }
    ),
  test: (...params) => {
    const { log } = console;
    log("Test() function was called!");
    params.forEach((param, i, a) =>
      log(`Parameter ${i + 1} of ${a.length}: ${param}`)
    );
  },
  abc: "zpxocivubyntmrlekwjqhagsfd-LAKSJDHFGQPWOEIRUTYZMXNCBV+0123456789",
  spelling: {
    "§": "0123456789-qwertyuiopasdfghjklzxcvbnm",
    0: "oq",
    1: "il",
    5: "s",
    8: "b",
    q: "0o",
    i: "1l",
    o: "0q",
    s: "5",
    l: "1i",
    b: "8",

    a: "e",
    e: "a",
  },
  colorCache: {
    // hsl
    Deklein: [270, 50, 25],
    Fade: [180, 50, 20],
    "Outer Ring": [40, 60, 25],
    Fountain: [0, 65, 25],
    Lonetrek: [50, 50, 25],
    Omist: [210, 50, 30],
    Catch: [75, 50, 20],
    Impass: [15, 50, 30],
    Aridia: [45, 60, 30],
    Khanid: [210, 55, 25],
    Domain: [60, 50, 30],
    "Kor-Azor": [105, 60, 30],
    Detorid: [270, 50, 30],
    Providence: [30, 60, 30],
    "Scalding Pass": [150, 50, 25],
    "Wicked Creek": [75, 50, 25],
    "A821-A": [15, 60, 20],
    "J7HZ-F": [270, 50, 20],
    "Black Rise": [180, 40, 20],
    Oasa: [30, 50, 25],

    "XFLN-F": [150, 60, 30],
    "U8-CWA": [0, 60, 20],
    "LY-FY6": [240, 50, 30],
    Balenne: [45, 50, 25],
    Yrton: [180, 40, 30],
    Regalia: [60, 60, 30],
    Sphinx: [180, 40, 30],
    "OK-FEM": [30, 50, 30],
    "YB7B-8": [330, 40, 30],
    "7ZRW-G": [120, 50, 20],
    "T-L301": [240, 40, 25],
    "L-H07K": [330, 40, 30],
    "OFQ-HG": [30, 60, 30],
    "T875-C": [240, 60, 20],
    "MZ-PA2": [15, 50, 25],
    "W-3Y6D": [30, 60, 20],
    "T-W4L3": [210, 60, 30],
    "K-DLD2": [330, 40, 25],
    "HS7W-T": [145, 50, 25],
    "D-95MV": [180, 50, 25],
    "4SRW-B": [60, 60, 30],
    "4-QV2L": [75, 50, 20],
    Braille: [30, 50, 25],
    "T-1WDH": [210, 60, 20],
    "QP6B-I": [0, 50, 30],
    "RFQ-8Y": [120, 60, 25],
    "R-CL2W": [0, 50, 20],
    "V2S-RH": [240, 50, 30],
    "760-9C": [180, 40, 20],
    "8-4EFQ": [30, 50, 30],
    "UR-HG4": [270, 50, 25],
    Rapture: [0, 60, 20],
    "E-IFSA": [60, 50, 30],
    "B4H-9W": [180, 50, 25],
    "M-J57M": [30, 60, 30],
    "TJ10-O": [60, 50, 25],
    "74IL-O": [30, 50, 25],
    "5YHF-H": [0, 60, 30],
    "U29-0S": [270, 60, 30],
    "E-8CSQ": [330, 50, 25],
    "0-8MWQ": [210, 60, 20],
    "V-LQBF": [60, 60, 30],
    "V-4QJC": [0, 50, 25],
    "U-3HAO": [30, 50, 30],
    "Z01V-Z": [60, 50, 30],
    "IZ-FBT": [180, 60, 30],
    "ZYR-NF": [210, 50, 25],
    "BZZ-1U": [60, 50, 30],
    "KPU3-3": [210, 60, 20],
    "X5O9-E": [270, 50, 30],
    "6GU-AT": [90, 60, 20],
    "3TS-12": [60, 60, 30],
    "1M4-FN": [30, 50, 25],
    "PGPJ-8": [60, 40, 25],
    "ICH-B6": [30, 50, 20],
    "3NA-Z1": [0, 60, 30],
  },
  styler: (DOM, style) => {
    for (let prop in style) {
      DOM.style[prop] = style[prop];
    }
  },
  classer: (e, classes) => {
    e.className = Array.isArray(classes)
      ? classes.join(" ")
      : classes.toString();
  },
  addUnique: (array, value) => {
    if (array.indexOf(value) == -1) array.push(value);
  },
  isInList: (list, value) => {
    if (!list) return false;
    return list.indexOf(value) != -1;
  },
  alternateSpellings: (input) => {
    let i;
    let count;
    const output = [];
    let point = 3;

    // add input to output
    output.push(input);
    // go through each letter
    i = 0;
    count = input.length;
    while (i < count) {
      if (point <= 0) break;

      if (Helper.spelling[input.charAt(i)]) {
        Helper.scrambleSpelling(output, i);
        point--;
      }
      i++;
    }
    return output;
  },
  scrambleSpelling: (data, index) => {
    let i = 0;
    const count = data.length;
    // go through each entry in data
    while (i < count) {
      const SEL = data[i];
      const SP = Helper.spelling[SEL.charAt(index)];
      let j = 0;
      const count2 = SP.length;
      while (j < count2) {
        Helper.addUnique(data, Helper.replaceAt(SEL, index, SP[j]));
        j++;
      }

      i++;
    }
    //console.log('SS',data);
  },
  replaceAt: (string, index, replacement) =>
    string.substr(0, index) +
    replacement +
    string.substr(index + replacement.length),
  isValidObject: (name) => !!(Dispobj.table[name] || false),
  isPointInRect: (bound, point) =>
    point.x <= bound.r &&
    point.x >= bound.l &&
    point.y <= bound.b &&
    point.y >= bound.t,
  someRandomColor: () =>
    "#" +
    (6 + Math.floor(Math.random() * 10)).toString(16) +
    (6 + Math.floor(Math.random() * 10)).toString(16) +
    (6 + Math.floor(Math.random() * 10)).toString(16),
  randomColorSet: () => {
    const output = ["", ""],
      hsv = [0, 0, 0];

    hsv[0] = Math.round(Math.random() * 361) % 360;
    hsv[1] = 40 + (Math.round(Math.random() * 21) % 20);
    hsv[2] = 20 + (Math.round(Math.random() * 11) % 10);

    output[0] = "hsl(" + hsv[0] + "," + hsv[1] + "%," + hsv[2] + "%)";
    output[1] = "hsl(" + hsv[0] + ",100%,50%)";

    return output;
  },
  getPermutations: (array, size) => {
    const p = (t, i) => {
      if (t.length === size) {
        result.push(t);
        return;
      }
      if (i + 1 > array.length) {
        return;
      }
      p(t.concat(array[i]), i + 1);
      p(t, i + 1);
    };

    const result = [];
    p(result, 0);
    return result;
  },
};
const Universe = {
  idMap: {}, // - lookup id and returns name
  table: {}, // - lookup name and returns object
  objects: [], // - list of all names
  system: { _list: [] },
  constellation: { _list: [] },
  region: { _list: [] },
  jump: [],

  initializer: {
    init: function () {
      let i, count, universe;

      if (typeof DATA_universe != "undefined") {
        universe = DATA_universe;
      } else {
        universe = [
          [
            "No Region Data",
            1,
            0,
            0,
            2,
            [
              [
                "No Constellation Data",
                1,
                0,
                0,
                1,
                [["No System Data", 1, 1000, 0, 0, 0, 10, 0, 0]],
              ],
            ],
          ],
        ];
      }

      (i = 0), (count = universe.length);

      while (i < count) {
        Universe.initializer.createRegion(universe[i]);

        i++;
      }

      if (typeof Static != "undefined" && Static.wormhole)
        Universe.initializer.processWormholeData();
    },
    createRegion: function (data) {
      let Region = {
          name: data[0],
          id: data[1] + 10000000,
          position: { x: data[2], y: data[3], z: data[4] },
          constellations: { _list: [] },
          systems: { _list: [] },
        },
        i,
        count,
        subData;

      // - add region to lists
      Universe.idMap[Region.id] = Region.name;
      Universe.table[Region.name] = Region;
      Universe.objects.push(Region.name);
      // - add region to universe
      Universe.region[Region.name] = Region;
      Universe.region._list.push(Region.name);

      // - create constellations in region
      (i = 0), (subData = data[5]), (count = subData.length);

      while (i < count) {
        Universe.initializer.createConstellation(Region, subData[i]);

        i++;
      }
    },
    createConstellation: function (region, data) {
      // wtf why is it LLAP-1 in the sde but is 014U-A ingame?
      if (data[0] == "LLAP-1") data[0] = "014U-A";

      let Constellation = {
          name: data[0],
          id: data[1] + 20000000,
          position: { x: data[2], y: data[3], z: data[4] },
          systems: { _list: [] },
          region: region,
        },
        i,
        count,
        subData;

      // - add constellation to lists
      Universe.idMap[Constellation.id] = Constellation.name;
      Universe.table[Constellation.name] = Constellation;
      Universe.objects.push(Constellation.name);
      // - add constellation to region
      region.constellations[Constellation.name] = Constellation;
      region.constellations._list.push(Constellation.name);
      // - add constellation to universe
      Universe.constellation[Constellation.name] = Constellation;
      Universe.constellation._list.push(Constellation.name);

      // - create systems in constellation
      (i = 0), (subData = data[5]), (count = subData.length);

      while (i < count) {
        Universe.initializer.createSystem(Constellation, subData[i]);

        i++;
      }
    },
    createSystem: function (constellation, data) {
      let System = {
          name: data[0],
          id: data[1] + 30000000,
          security: data[2] / 1000,
          radius: data[6],
          position: { x: data[3], y: data[4], z: data[5] },
          jumps: { _list: [] },
          service: false,
          constellation: constellation,
          region: constellation.region,

          wormhole: false,
        },
        i,
        count,
        subData;

      if (data[8]) System.service = [0, data[8]];

      // overwrite service with outpost data
      if (
        typeof DATA_outpost != "undefined" &&
        typeof DATA_outpost[data[1]] != "undefined"
      ) {
        System.service = Universe.initializer.getOutpostService(
          DATA_outpost[data[1]]
        );
      }

      // create wormhole data
      if (Helper.isAnoikis(System)) {
        System.wormhole = Universe.initializer.getWormholeData(System);
      }

      // - add system to lists
      Universe.idMap[System.id] = System.name;
      Universe.table[System.name] = System;
      Universe.objects.push(System.name);
      // - add system to constellation
      constellation.systems[System.name] = System;
      constellation.systems._list.push(System.name);
      // - add system to region
      System.region.systems[System.name] = System;
      System.region.systems._list.push(System.name);
      // - add system to universe
      Universe.system[System.name] = System;
      Universe.system._list.push(System.name);

      // - create jumps to connected systems
      (i = 0), (subData = data[7]), (count = subData.length);

      if (!count) count = 0;

      // - merge jumplist with static jumps
      if (
        typeof Static != "undefined" &&
        Static.jumps &&
        Static.jumps[data[1]] &&
        Helper.isJoveSpace(System)
      ) {
        if (!count) subData = [];

        subData = subData.concat(Static.jumps[data[1]]);

        count = subData.length;
      }

      if (!count) return;

      while (i < count) {
        // - skip jump if connected system has not been created yet
        if (!Universe.idMap[subData[i] + 30000000]) {
          i++;
          continue;
        }

        Universe.initializer.createJump(System, subData[i] + 30000000);

        i++;
      }
    },
    createJump: function (sys1, id2) {
      let sys2 = Universe.getObjectById(id2);

      // - add jump to systems
      sys1.jumps[sys2.name] = sys2;
      sys1.jumps._list.push(sys2.name);
      sys2.jumps[sys1.name] = sys1;
      sys2.jumps._list.push(sys1.name);

      // - add jump to universe
      Universe.jump.push(sys2.id + "-" + sys1.id);
    },
    getOutpostService: function (type) {
      switch (type) {
        // outposts
        case 0:
          return ["C", 41251349];
        case 1:
          return ["A", 41251349];
        case 2:
          return ["G", 41251413];
        case 3:
          return ["M", 40972821];
        // conquerable stations
        case 9:
          return [1, 41251333];
        case 8:
          return [1, 41226773];
        case 7:
          return [1, 41251333];
      }
    },
    getWormholeData: function (sys) {
      return {
        statics: [],
        whclass: Universe.initializer.getWormholeClass(sys),
        wandering: Universe.initializer.getWormholeWandering(sys),
        micro: Universe.initializer.getWormholeMicro(sys),
        effect: false,
        shattered: false,
      };
    },
    getWormholeClass: function (sys) {
      switch (sys.region.name.charAt(0)) {
        case "A":
          return "C1";
        case "B":
          return "C2";
        case "C":
          return "C3";
        case "D":
          return "C4";
        case "E":
          return "C5";
        case "F":
          return "C6";

        case "G":
          return "C12"; //C12
        case "H":
          return "C13"; //C13
        case "K":
          return "C14"; //C14

        default:
          return false;
      }
    },
    getWormholeWandering: function (sys) {
      switch (sys.region.name.charAt(0)) {
        case "A":
          return "W-Space";
        case "B":
          return false; // old eveeye suggests w-space #ripeveeye
        case "C":
          return "W-Space";
        case "D":
          return false;
        case "E":
          return "K-Space";
        case "F":
          return "K-Space";

        case "G":
          return false;
        case "H":
          return false;
        case "K":
          return false;

        default:
          return false;
      }
    },
    getWormholeMicro: function (sys) {
      switch (sys.region.name.charAt(0)) {
        case "A":
          return "E004";
        case "B":
          return "L005";
        case "C":
          return "Z006";
        case "D":
          return "M001";
        case "E":
          return "C008";
        case "F":
          return "G008";

        case "G":
          return false;
        case "H":
          return false;
        case "K":
          return false;

        default:
          return false;
      }
    },
    processWormholeData: function () {
      Universe.initializer.addWormholeEffects();
      Universe.initializer.addWormholeStatics();
    },
    addWormholeEffects: function () {
      let i = 0,
        j,
        count,
        SEL,
        FXS = ["Cat", "Mag", "Bla", "Pul", "Wol", "Red"];

      while (i < 6) {
        SEL = Static.wormhole.effects[FXS[i]];

        j = 0;
        count = SEL.length;

        while (j < count) {
          if (!Universe.system[SEL[j]]) {
            j++;
            continue;
          }

          Universe.system[SEL[j]].wormhole.effect = FXS[i];

          j++;
        }

        i++;
      }
    },
    addWormholeStatics: function () {
      let i, j, ci, cj, SEL;

      // add statics
      for (i in Static.wormhole.statics) {
        ci = Static.wormhole.statics[i];

        j = 0;
        cj = ci.length;

        while (j < cj) {
          if (Universe.system[ci[j]]) {
            Universe.system[ci[j]].wormhole.statics.push(i);
          } else {
            Universe.initializer.addConstellationStatic(ci[j], i);
          }

          j++;
        }
      }
    },
    addConstellationStatic(con, st) {
      let i, count, SEL;

      SEL = Universe.constellation[con];

      if (!SEL) return;

      i = 0;
      count = SEL.systems._list.length;

      while (i < count) {
        Helper.getElementInList(SEL.systems, i).wormhole.statics.push(st);

        i++;
      }
    },
  },

  getObjectById: function (id) {
    return Universe.table[Universe.idMap[id]] || false;
  },
};
const Dispobj = {
  table: {}, // - lookup name and returns object

  // d is a list of objects to render, v is a list of objects in d that are visible
  system: { _d: [], _v: [], _list: [] },
  constellation: { _d: [], _v: [], _list: [] },
  region: { _d: [], _v: [], _list: [] },

  // jumpcache draw list
  jumpcacheDrawList: [],

  // object form of system._d
  systemDrawEntries: {},

  jump: {
    all: [],
    system: [],
    constellation: [],
    region: [],
  },

  redraw: true,
  repos: true,
  rescale: true,
  isEditUpdate: false,

  // data
  getConnectedJumps: (sys) => {
    const list = [];
    let i;

    if (!Dispobj.system[sys]) return false;

    i = 0;
    const count = Dispobj.jump.all.length;

    while (i < count) {
      const jump = Dispobj.jump.all[i];

      if (jump.path.indexOf(sys) != -1) list.push(jump);

      i++;
    }

    return list;
  },

  initializer: {
    init: () => {
      let i = 0,
        data = Universe.region,
        count = data._list.length;

      while (i < count) {
        Dispobj.initializer.createRegionData(Helper.getElementInList(data, i));

        i++;
      }

      i = 0;
      data = Universe.constellation;
      count = data._list.length;

      while (i < count) {
        Dispobj.initializer.createConstellationData(
          Helper.getElementInList(data, i)
        );

        i++;
      }

      i = 0;
      data = Universe.system;
      count = data._list.length;

      while (i < count) {
        Dispobj.initializer.createSystemData(Helper.getElementInList(data, i));

        i++;
      }

      i = 0;
      data = Universe.jump;
      count = data.length;

      while (i < count) {
        Dispobj.initializer.createJumpData(data[i]);

        i++;
      }

      Dispobj.setDrawGroup(["All"]);

      Dispobj.setMapPositions("load");
    },

    basicData: (data) => ({
      name: data.name,
      position: {
        x: Math.round(data.position.x * 1000) / 1000,
        y: Math.round(data.position.z * 1000) / 1000,
      },
      onScreen: false,
      draw: { x: 0, y: 0 },
      bound: { t: 0, l: 0, b: 0, r: 0, a: { x: 0, y: 0 }, w: 0, h: 0 },
    }),

    createRegionData: (data) => {
      const reg = Dispobj.initializer.basicData(data);

      reg.color = "#ffffffff";

      // - jump cache
      reg.jumpcache = {
        icon: Helper.getIcon(),
        redraw: true,
        drawnTo: false,
        hide: true,
        onScreen: false,
        bound: { t: 0, l: 0, b: 0, r: 0, a: { x: 0, y: 0 }, w: 0, h: 0 },
        jumps: [],
      };

      reg.inSelection = false;

      // - add to display objects
      Dispobj.region[reg.name] = reg;
      Dispobj.table[reg.name] = reg;
      Dispobj.region._list.push(reg.name);
      //Dispobj.region._d.push(reg.name);
    },
    createConstellationData: (data) => {
      let con = Dispobj.initializer.basicData(data);

      con.color = "rgb(255,225,255)";

      // - jump cache
      con.jumpcache = {
        icon: Helper.getIcon(),
        redraw: true,
        drawnTo: false,
        hide: true,
        onScreen: false,
        bound: { t: 0, l: 0, b: 0, r: 0, a: { x: 0, y: 0 }, w: 0, h: 0 },
        jumps: [],
      };

      con.inSelection = false;

      //con.optipath = Gradata.optimalPath(con.name);
      //con.optipath.color = 'rgba(255,255,255,0.8)';

      // - add to display objects
      Dispobj.constellation[con.name] = con;
      Dispobj.table[con.name] = con;
      Dispobj.constellation._list.push(con.name);
      //Dispobj.constellation._d.push(con.name);
    },
    createSystemData: (data) => {
      const sys = Dispobj.initializer.basicData(data);

      sys.display = {
        icon: Helper.getIcon(),
        redrawDetail: true,
        simpleScale: 0,
        inSelection: false,

        width: data.name.length >= 8 ? 56 : 50,

        title: sys.name,
        titleColor: "#ffffff",
        info: "NO DATA",
        infoColor: "#cccccc",

        background: "#111111",
        border: Gradata.getBorderColor(data),
        simple: "#ffffff",

        glow: true,
        ring: true,
        pin: false,
        box: false,
        effect: true,
        effectText: false,
        effectTextColor: false,

        station: true,
      };

      sys.inDrawGroup = false;

      sys.display.icon.width = 128;
      sys.display.icon.height = 96;

      sys.display.ring = false;

      if (typeof Static != "undefined") {
        if (Static.ice && Static.ice.indexOf(data.name) != -1)
          sys.display.ring = "#007fff";
        if (
          Static.wormhole &&
          Static.wormhole.shattered &&
          Static.wormhole.shattered.indexOf(data.name) != -1
        )
          sys.display.pin = true;
        if (Helper.isFactionWarfare(data)) sys.display.glow = "#ff66ff";
      }

      sys.display.station = Gradata.getStationProperties(data.id);
      sys.display.effect = Gradata.getEffectColor(data.id);
      sys.display.effectText = Gradata.getEffectText(data.id);
      sys.display.effectTextColor = Gradata.getEffectTextColor(data.id);

      // - dipslay modes
      sys.mode = {};

      sys.mode.security = Gradata.getSecurityMode(data);
      sys.mode.region = Gradata.getRegionMode(data);
      sys.mode.constellation = Gradata.getConstellationMode(data);
      sys.mode.sovereignty = Gradata.getSovereigntyMode(data);
      sys.mode.pirate = Gradata.getPirateMode(data);

      Gradata.setDisplayData(sys, "security");

      // - connected jumps
      sys.jumps = [];

      // - add to display objects
      Dispobj.system[sys.name] = sys;
      Dispobj.table[sys.name] = sys;
      Dispobj.system._list.push(sys.name);
      //Dispobj.system._d.push(sys.name);
    },
    createJumpData: (data) => {
      let sys1, sys2, jump, type, temp;

      sys1 = Universe.idMap[data.substring(0, 8)];
      sys2 = Universe.idMap[data.substring(9, 17)];

      type = Helper.getJumpType(sys1, sys2);

      jump = {
        color: "#ffffff",
        type: type,
        dashed: false,
        path: [sys1, sys2],
        draw: [
          [0, 0],
          [0, 0],
        ],
        bound: false,
        onScreen: false,
        inDrawGroup: false,
      };

      jump.color =
        jump.type === "system"
          ? "rgba(255,255,255,0.8)"
          : jump.type === "constellation"
          ? "#cc3300"
          : jump.type === "region" && "#8800aa";

      jump.bound = jump.type != "system" && {
        t: 0,
        l: 0,
        b: 0,
        r: 0,
        a: { x: 0, y: 0 },
        w: 0,
        h: 0,
      };

      // set system jump color based on constellation color
      temp = Dispobj.table[sys1].mode.constellation[3];
      if (jump.type == "system") jump.color = Gradata.getSystemJumpColor(temp);

      // set dashed if destroyed gates
      temp = [Universe.system[sys1], false];
      if (Helper.isJoveSpace(temp[0])) {
        temp[1] = Universe.system[sys2];

        if (
          !(
            (temp[0].constellation.name == "0VFS-G" ||
              temp[0].constellation.name == "B-HLOG") &&
            (temp[1].constellation.name == "0VFS-G" ||
              temp[1].constellation.name == "B-HLOG")
          )
        ) {
          jump.dashed = true;
        }
      }

      // - add to display objects
      Dispobj.jump.all.push(jump);
      Dispobj.jump[type].push(jump);

      // - add to jumpcache
      if (jump.type == "system") {
        Dispobj.constellation[
          Universe.system[sys1].constellation.name
        ].jumpcache.jumps.push(jump);
        Dispobj.region[Universe.system[sys1].region.name].jumpcache.jumps.push(
          jump
        );
      }

      // - add to system dispobj
      Dispobj.system[sys1].jumps.push(jump);
      Dispobj.system[sys2].jumps.push(jump);
    },
  },

  setDrawGroup: function (data) {
    let i, count;

    // clear draw lists
    Dispobj.system._d.length = 0;
    Dispobj.systemDrawEntries = {};
    Dispobj.constellation._d.length = 0;
    Dispobj.region._d.length = 0;

    // reset system inDrawGroup
    i = 0;
    count = Dispobj.system._list.length;

    while (i < count) {
      Helper.getElementInList(Dispobj.system, i).inDrawGroup = false;

      i++;
    }

    // add to draw group
    i = 0;
    count = data.length;

    while (i < count) {
      Dispobj.addToDrawGroup(data[i]);

      i++;
    }

    // update jump draw group
    Dispobj.updateJumpDrawGroup();
  },
  addToDrawGroup: function (loc) {
    if (loc == "New Eden" || loc == "Anoikis" || loc == "All")
      Dispobj.addClusterToDrawGroup(loc);
    else if (Universe.region[loc]) Dispobj.addRegionToDrawGroup(loc);
    else if (Universe.constellation[loc])
      Dispobj.addConstellationToDrawGroup(loc);
    else if (Universe.system[loc]) Dispobj.addSystemToDrawGroup(loc);
  },
  addClusterToDrawGroup: function (loc) {
    let i, count, SEL, inAnoikis;

    // which cluster
    if (loc == "New Eden") inAnoikis = false;
    else if (loc == "Anoikis") inAnoikis = true;
    else if (loc != "All") return false;

    // add every region in cluster
    i = 0;
    count = Universe.region._list.length;

    while (i < count) {
      SEL = Helper.getElementInList(Universe.region, i);

      if (loc == "All" || Helper.isAnoikis(SEL) == inAnoikis)
        Dispobj.addRegionToDrawGroup(SEL);

      i++;
    }
  },
  addRegionToDrawGroup: function (loc) {
    let i, count, SEL;

    if (typeof loc == "string") loc = Universe.region[loc];

    // add region to draw group
    Helper.addUnique(Dispobj.region._d, loc.name);

    // add every constellation in region
    i = 0;
    count = loc.constellations._list.length;

    while (i < count) {
      SEL = Helper.getElementInList(loc.constellations, i);

      Dispobj.addConstellationToDrawGroup(SEL);

      i++;
    }
  },
  addConstellationToDrawGroup: function (loc) {
    let i, count, SEL;

    if (typeof loc == "string") loc = Universe.constellation[loc];

    // add constellation to draw group
    Helper.addUnique(Dispobj.constellation._d, loc.name);

    // add every system constellation
    i = 0;
    count = loc.systems._list.length;

    while (i < count) {
      SEL = Helper.getElementInList(loc.systems, i);

      Dispobj.addSystemToDrawGroup(SEL);

      i++;
    }
  },
  addSystemToDrawGroup: function (loc) {
    if (typeof loc == "string") loc = Universe.system[loc];

    //if( loc.security > 0 ) return;
    //Helper.addUnique(Dispobj.system._d, loc.name);

    if (!Dispobj.systemDrawEntries[loc.name]) {
      Dispobj.system._d.push(loc.name);
      Dispobj.systemDrawEntries[loc.name] = 1;
    }

    Dispobj.system[loc.name].inDrawGroup = true;
  },

  removeSystemFromDrawGroup: function (loc) {
    if (typeof loc == "string") loc = Universe.system[loc];

    if (Dispobj.systemDrawEntries[loc.name]) {
      Dispobj.system._d.splice(Dispobj.system._d.indexOf(loc.name), 1);
      Dispobj.systemDrawEntries[loc.name] = 0;
    }

    Dispobj.system[loc.name].inDrawGroup = false;
  },

  updateJumpDrawGroup: function () {
    let i, count, SEL;

    // update system jumps
    i = 0;
    count = Dispobj.jump.system.length;

    while (i < count) {
      SEL = Dispobj.jump.system[i];

      SEL.inDrawGroup = Dispobj.isJumpInDrawGroup(SEL);

      i++;
    }

    // update constellation jumps
    i = 0;
    count = Dispobj.jump.constellation.length;

    while (i < count) {
      SEL = Dispobj.jump.constellation[i];

      SEL.inDrawGroup = Dispobj.isJumpInDrawGroup(SEL);

      i++;
    }

    // update region jumps
    i = 0;
    count = Dispobj.jump.region.length;

    while (i < count) {
      SEL = Dispobj.jump.region[i];

      SEL.inDrawGroup = Dispobj.isJumpInDrawGroup(SEL);

      i++;
    }
  },
  isJumpInDrawGroup: function (jump) {
    let i, count;

    i = 0;
    count = jump.path.length;

    while (i < count) {
      if (Dispobj.system._d.indexOf(jump.path[i]) == -1) return false;

      i++;
    }

    return true;
  },

  updateDrawPositions: function () {
    let i,
      DATA,
      count,
      SEL,
      limit = [];

    // - reset arrays of visible objects
    Dispobj.system._v.length = 0;
    Dispobj.constellation._v.length = 0;
    Dispobj.region._v.length = 0;

    // - update system draw positions
    Dispobj.updateSystemDrawPositions();

    // - update constellation draw positions
    Dispobj.updateConstellationDrawPositions();

    // - update region draw positions
    Dispobj.updateRegionDrawPositions();

    // - update jump draw positions
    Dispobj.updateJumpDrawPositions();
  },
  updateSystemDrawPositions: function () {
    let i, count, DATA, SEL;

    DATA = Dispobj.system._d;
    count = DATA.length;
    i = 0;

    while (i < count) {
      SEL = Helper.getElementInRefList(Dispobj.system, i, "_d");

      Camera.getDrawPosition(SEL.position, SEL.draw);

      if (Dispobj.rescale) {
        // - update system bound scaling
        Dispobj.getSystemBounds(SEL);
      } else {
        // - update system bound
        Dispobj.updateBounds(SEL.bound);
      }

      // - set visibility
      SEL.onScreen = Camera.isRectInView(SEL.bound);
      if (SEL.onScreen) Dispobj.system._v.push(SEL.name);

      i++;
    }
  },
  updateConstellationDrawPositions: function () {
    let i,
      count,
      DATA,
      SEL,
      limit = [];

    DATA = Dispobj.constellation._d;
    count = DATA.length;
    i = 0;

    if (Dispobj.isEditUpdate && Camera.norm >= State.thresholdJumpcache)
      limit = Dispobj.getJumpcacheSelectionLimit("constellation");

    while (i < count) {
      SEL = Helper.getElementInRefList(Dispobj.constellation, i, "_d");

      Camera.getDrawPosition(SEL.position, SEL.draw);

      if (Dispobj.rescale) {
        // - update constellation bound scaling
        Dispobj.getLabelBounds(SEL, State.conText);
        if (
          !Dispobj.isEditUpdate ||
          (Dispobj.isEditUpdate && limit.indexOf(SEL.name) != -1)
        ) {
          if (Camera.norm >= State.thresholdJumpcache)
            Dispobj.getJumpcacheBounds(SEL, "constellation");
        }
      } else {
        // - update constellation bound
        Dispobj.updateBounds(SEL.bound);
        if (Camera.norm >= State.thresholdJumpcache)
          Dispobj.updateBounds(SEL.jumpcache.bound);
      }

      // - set visibility
      SEL.onScreen = Camera.isRectInView(SEL.bound);
      SEL.jumpcache.onScreen = Camera.isRectInView(SEL.jumpcache.bound);

      if (SEL.onScreen) Dispobj.constellation._v.push(SEL.name);

      i++;
    }
  },
  updateRegionDrawPositions: function () {
    let i,
      count,
      DATA,
      SEL,
      limit = [];

    DATA = Dispobj.region._d;
    count = DATA.length;
    i = 0;

    if (Dispobj.isEditUpdate && Camera.norm < State.thresholdJumpcache)
      limit = Dispobj.getJumpcacheSelectionLimit("region");

    while (i < count) {
      SEL = Helper.getElementInRefList(Dispobj.region, i, "_d");

      Camera.getDrawPosition(SEL.position, SEL.draw);

      if (Dispobj.rescale) {
        // - update region bound scaling
        Dispobj.getLabelBounds(SEL, State.regText);
        if (
          !Dispobj.isEditUpdate ||
          (Dispobj.isEditUpdate && limit.indexOf(SEL.name) != -1)
        ) {
          if (Camera.norm < State.thresholdJumpcache)
            Dispobj.getJumpcacheBounds(SEL, "region");
        }
      } else {
        // - update region bound
        Dispobj.updateBounds(SEL.bound);
        if (Camera.norm < State.thresholdJumpcache)
          Dispobj.updateBounds(SEL.jumpcache.bound);
      }

      // - set visibility
      SEL.onScreen = Camera.isRectInView(SEL.bound);
      SEL.jumpcache.onScreen = Camera.isRectInView(SEL.jumpcache.bound);

      if (SEL.onScreen) Dispobj.region._v.push(SEL.name);

      i++;
    }
  },
  updateJumpDrawPositions: function () {
    let i, count, DATA, SEL;

    DATA = Dispobj.jump.all;
    count = DATA.length;
    i = 0;

    while (i < count) {
      SEL = Dispobj.jump.all[i];

      if (SEL.type != "system") Dispobj.updateJumpDrawState(SEL);

      i++;
    }
  },

  getLabelBounds: function (data, scale) {
    let bound = data.bound,
      draw = data.draw;

    let hWidth = Math.ceil(data.name.length * scale * 0.4),
      hHeight = Math.ceil(scale * 0.6);

    // set current bound
    bound.t = Math.floor(draw.y - hHeight);
    bound.l = Math.floor(draw.x - hWidth);
    bound.b = Math.ceil(draw.y + hHeight);
    bound.r = Math.ceil(draw.x + hWidth);

    // set bound size
    bound.w = bound.r - bound.l;
    bound.h = bound.b - bound.t;

    // set bound anchor
    Camera.getWorldPosition({ x: bound.l, y: bound.t }, bound.a);
  },
  getSystemBounds: function (data) {
    let bound = data.bound,
      draw = data.draw;

    if (Camera.norm < State.thresholdIcons) {
      // basic
      bound.t = draw.y - State.rhDot;
      bound.l = draw.x - State.rhDot;
      bound.b = draw.y + State.rhDot;
      bound.r = draw.x + State.rhDot;
    } else {
      if (State.isDetail) {
        // detail
        bound.t = draw.y - 24;
        bound.l = draw.x - 64;
        bound.b = draw.y + 24;
        bound.r = draw.x + 64;
      } else {
        // simple
        bound.t = draw.y - 24;
        bound.l = draw.x - State.sysSimpleOffset;
        bound.b = draw.y + 24;
        bound.r = draw.x + (128 - State.sysSimpleOffset);
      }
    }

    // set bound size
    bound.w = bound.r - bound.l;
    bound.h = bound.b - bound.t;

    // set bound anchor
    Camera.getWorldPosition({ x: bound.l, y: bound.t }, bound.a);
  },
  getJumpcacheBounds: function (data, type) {
    let i,
      count,
      uSEL,
      dSEL,
      bound,
      hasReset = false;

    bound = data.jumpcache.bound;
    uSEL = Universe[type][data.name];

    // - full reset
    Dispobj.resetBound(bound, 0, 0);
    data.jumpcache.hide = true;
    data.jumpcache.redraw = false;

    // - skip if no jumps
    if (data.jumpcache.jumps.length === 0) return;

    // - update bounds
    i = 0;
    count = uSEL.systems._list.length;

    while (i < count) {
      dSEL = Dispobj.system[uSEL.systems._list[i]];

      // - ignore hidden systems
      if (!Dispobj.system[dSEL.name].inDrawGroup) {
        i++;
        continue;
      }

      // - update bounds
      if (!hasReset) {
        // - reset bounds to first system
        Dispobj.resetBound(bound, dSEL.draw.x, dSEL.draw.y);
        data.jumpcache.hide = false;
        hasReset = true;
      } else {
        // - add to bounds
        Dispobj.addToBound(bound, dSEL.draw.x, dSEL.draw.y);
      }

      i++;
    }

    Dispobj.expandBound(bound, 2);
    Dispobj.finalizeBound(bound);

    data.jumpcache.redraw = true;
  },
  // update con/reg jump draw and bounds
  updateJumpDrawState: function (data) {
    let i = 0,
      point,
      count;

    while (data.path.length > data.draw.length) data.draw.push([0, 0]);

    // - update jump if systems in draw group
    if (!data.inDrawGroup) {
      data.onScreen = false;
      return;
    }

    // - update drawing position and bounding box
    count = data.path.length;

    while (i < count) {
      // - update jump point draw position
      point = Dispobj.system[data.path[i]].draw;
      data.draw[i][0] = point.x;
      data.draw[i][1] = point.y;

      // - update jump bound scaling
      if (Dispobj.rescale) {
        if (i == 0) Dispobj.resetBound(data.bound, point.x, point.y);
        else Dispobj.addToBound(data.bound, point.x, point.y);
      }

      i++;
    }

    if (Dispobj.rescale) {
      Dispobj.expandBound(data.bound, 2);
      Dispobj.finalizeBound(data.bound);
    } else {
      Dispobj.updateBounds(data.bound);
    }

    data.onScreen = Camera.isRectInView(data.bound);
  },
  // list of jump cache to update based on current selection
  getJumpcacheSelectionLimit: function (type) {
    let output = [],
      i,
      count;

    if (typeof State.selection == "undefined") return output;

    i = 0;
    count = State.selection.length;

    while (i < count) {
      // selection is a system
      if (Dispobj.system[State.selection[i]]) {
        Helper.addUnique(
          output,
          Universe.system[State.selection[i]][type].name
        );
      }

      i++;
    }

    return output;
  },
  updateSystemJumpDrawPosition: function (data) {
    let i = 0,
      point,
      count;

    while (data.path.length > data.draw.length) data.draw.push([0, 0]);

    // - update drawing position and bounding box
    count = data.path.length;

    while (i < count) {
      // - update jump point draw position
      point = Dispobj.system[data.path[i]].draw;
      data.draw[i][0] = point.x;
      data.draw[i][1] = point.y;

      i++;
    }
  },

  resetBound: function (bound, x, y) {
    bound.t = y;
    bound.l = x;
    bound.b = y;
    bound.r = x;
  },
  addToBound: function (bound, x, y) {
    bound.t = Math.min(y, bound.t);
    bound.l = Math.min(x, bound.l);
    bound.b = Math.max(y, bound.b);
    bound.r = Math.max(x, bound.r);
  },
  expandBound: function (bound, n) {
    n = n || 1;

    bound.t += -n;
    bound.l += -n;
    bound.b += n;
    bound.r += n;
  },
  finalizeBound: function (bound) {
    bound.w = bound.r - bound.l;
    bound.h = bound.b - bound.t;

    Camera.getWorldPosition({ x: bound.l, y: bound.t }, bound.a);
  },

  updateBounds: function (bound) {
    // set current bound
    bound.t = Camera.returnDrawPositionY(bound.a.y);
    bound.l = Camera.returnDrawPositionX(bound.a.x);
    bound.b = bound.t + bound.h;
    bound.r = bound.l + bound.w;
  },

  redrawSystemIcons: function (type) {
    let i = 0,
      count = Dispobj.system._list.length,
      sys;

    if (!(type == "simple" || type == "detail")) return;

    while (i < count) {
      sys = Helper.getElementInList(Dispobj.system, i);

      if (type == "simple") {
        sys.display.simpleScale = 0;
      } else {
        sys.display.redrawDetail = true;
      }

      i++;
    }

    Dispobj.redraw = true;
  },

  // eveeye data
  sigmaImport: function (data) {
    let nodes = data.nodes,
      i,
      count,
      SEL;

    i = 0;
    count = nodes.length;

    while (i < count) {
      if (nodes[i].label == "Tranquillity") nodes[i].label = "Tranquility";

      SEL = Dispobj.table[nodes[i].label];

      //console.log( nodes[i].label );

      SEL.position.x = -55 + nodes[i].x / 10;
      SEL.position.y = 50 + nodes[i].y / -10;

      i++;
    }
  },

  // map data
  setMapPositions: function (type) {
    let obj = [],
      i,
      count,
      temp;

    if (type == "load" && !(typeof DATA_map != "undefined" && DATA_map)) return;
    if (
      type == "load" &&
      typeof GFLAG_DISABLE_MAP_LOAD != "undefined" &&
      GFLAG_DISABLE_MAP_LOAD
    )
      return;

    switch (type) {
      case "load":
        temp = Dispobj.mapPositionLoad;
        break;
      default:
        temp = Dispobj.mapPositionDefault;
        break;
    }

    obj = obj.concat(Dispobj.system._list);
    obj = obj.concat(Dispobj.constellation._list);
    obj = obj.concat(Dispobj.region._list);

    i = 0;
    count = obj.length;

    while (i < count) {
      temp(obj[i]);

      i++;
    }
  },
  mapPositionDefault: function (input) {
    let SEL = Dispobj.table[input],
      UNI = Universe.table[input];

    SEL.position.x = Math.round(UNI.position.x * 1000) / 1000;
    SEL.position.y = Math.round(UNI.position.z * 1000) / 1000;
  },
  mapPositionLoad: function (input) {
    let SEL = Dispobj.table[input],
      MAP = DATA_map[input];

    if (!MAP) return;

    SEL.position.x = Math.round(MAP[0]) / 1000;
    SEL.position.y = Math.round(MAP[1]) / 1000;
  },
  saveMapPositions: function () {
    let output = {},
      obj = [],
      i,
      count,
      SEL,
      U;

    obj = obj.concat(Dispobj.system._list);
    obj = obj.concat(Dispobj.constellation._list);
    obj = obj.concat(Dispobj.region._list);

    i = 0;
    count = obj.length;

    while (i < count) {
      SEL = Dispobj.table[obj[i]];

      // skip wormhole systems
      U = Universe.table[obj[i]];

      if (Helper.isUnknown(U)) {
        i++;
        continue;
      }
      if (Helper.isAbyssal(U)) {
        i++;
        continue;
      }
      if (Helper.isAnoikis(U)) {
        i++;
        continue;
      }

      output[obj[i]] = [
        Math.round(SEL.position.x * 1000),
        Math.round(SEL.position.y * 1000),
      ];

      i++;
    }

    console.log("DATA_map = " + JSON.stringify(output) + ";");
  },
};
const Gradata = {
  getSecurityMode: (data) => {
    if (Helper.isUnknown(data)) {
      return [
        // text textColor backgroundColor mainColor
        "??",
        "#cccccc",
        "#333333",
        "#cccccc",
      ];
    } else if (Helper.isAbyssal(data)) {
      return [
        // text textColor backgroundColor mainColor
        Gradata.getAbyssText(data),
        "#cccccc",
        Gradata.getAbyssBackgroundColor(data),
        Gradata.getAbyssColor(data),
      ];
    } else if (Helper.isAnoikis(data)) {
      return [
        // text textColor backgroundColor mainColor
        Gradata.getClassText(data),
        "#cccccc",
        Gradata.getClassBackgroundColor(data),
        Gradata.getClassColor(data),
      ];
    } else {
      return [
        // text textColor backgroundColor mainColor
        Gradata.getSecurityValue(data.security),
        data.security > 0 ? Gradata.getSecurityColor(data.security) : "#ff6666",
        Gradata.getSecurityBackgroundColor(data.security),
        Gradata.getSecurityColor(data.security),
      ];
    }
  },
  getRegionMode: (data) => {
    let hsl = Gradata.stringToColor(data.region.name, data.region);

    let reg = data.region.name;

    switch (reg) {
      case "Vale of the Silent": {
        reg = "Vale Silent";
        break;
      }
      case "The Kalevala Expanse": {
        reg = "Kalevala Exp";
        break;
      }
      case "The Bleak Lands": {
        reg = "Bleak Lands";
        break;
      }
      default: {
        break;
      }
    }

    return [
      // text textColor backgroundColor mainColor
      reg,
      "#cccccc",
      "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)",
      "hsl(" + hsl[0] + ",100%,50%)",
    ];
  },
  getConstellationMode: (data) => {
    let hsl = Gradata.stringToColor(
      data.constellation.name,
      data.constellation
    );

    let con = data.constellation.name;

    switch (con) {
      case "Gallente Border Zone": {
        con = "Gal Border";
        break;
      }
      case "Caldari Border Zone": {
        con = "Cal Border";
        break;
      }
      default: {
        break;
      }
    }

    return [
      // text textColor backgroundColor mainColor
      con,
      "#cccccc",
      "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)",
      "hsl(" + hsl[0] + ",100%,50%)",
    ];
  },
  getSovereigntyMode: (data) => {
    return [
      // text textColor backgroundColor mainColor
      Gradata.getSovText(data),
      "#cccccc",
      Gradata.getSovColor(data),
      Gradata.getSovSimpleColor(data),
    ];
  },
  getPirateMode: (data) => {
    return [
      // text textColor backgroundColor mainColor
      Gradata.getPirateText(data),
      "#cccccc",
      Gradata.getPirateColor(data),
      Gradata.getPirateSimpleColor(data),
    ];
  },

  getSecurityValue: (sec) => {
    return sec > 0
      ? Math.max(0.1, Math.round(sec * 10) / 10).toFixed(1)
      : (Math.round(sec * 100) / 100).toFixed(2);
  },
  getSecurityColor: (sec) => {
    let color;
    if (1 >= sec && sec >= 0.95) color = "#00bfff";
    //1.0
    else if (0.95 > sec && sec >= 0.85) color = "#00ffbf";
    //0.9
    else if (0.85 > sec && sec >= 0.65) color = "#00ef0f";
    //0.8 - 0.7
    else if (0.65 > sec && sec >= 0.55) color = "#7fff00";
    //0.6
    else if (0.55 > sec && sec >= 0.45) color = "#f8ff00";
    //0.5
    // - low sec
    else if (0.45 > sec && sec >= 0.25) color = "#ff9f00";
    //0.4 - 0.3
    else if (0.25 > sec && sec > 0) color = "#ff6000";
    //0.2 - 0.1
    // - null sec
    else if (0 >= sec && sec >= -0.35) color = "#ff1111";
    //0.0 - 0.3
    else if (-0.35 > sec && sec >= -0.75) color = "#cc1111";
    //0.4 - 0.7
    else color = "#991111"; //0.8 - 1.0
    return color;
  },
  getSecurityBackgroundColor: (sec) => {
    let color;
    if (1 >= sec && sec >= 0.95) color = "hsl(195, 65%, 15%)";
    //1.0
    else if (0.95 > sec && sec >= 0.85) color = "hsl(165, 65%, 15%)";
    //0.9
    else if (0.85 > sec && sec >= 0.65) color = "hsl(125, 65%, 15%)";
    //0.8 - 0.7
    else if (0.65 > sec && sec >= 0.55) color = "hsl(90, 65%, 15%)";
    //0.6
    else if (0.55 > sec && sec >= 0.45) color = "hsl(60, 65%, 15%)";
    //0.5
    // - low sec
    else if (0.45 > sec && sec >= 0.25) color = "hsl(35, 65%, 15%)";
    //0.4 - 0.3
    else if (0.25 > sec && sec > 0) color = "hsl(20, 65%, 15%)";
    //0.2 - 0.1
    // - null sec
    else if (0 >= sec && sec >= -0.35) color = "hsl(0, 65%, 15%)";
    //0.0 - 0.3
    else if (-0.35 > sec && sec >= -0.75) color = "hsl(0, 65%, 10%)";
    //0.4 - 0.7
    else color = "hsl(0, 65%, 5%)"; //0.8 - 1.0
    return color;
  },
  getClassColor: (sys) => {
    switch (sys.region.name.charAt(0)) {
      case "A":
        return "#00ffff";
      case "B":
        return "#40bfff";
      case "C":
        return "#809fff";
      case "D":
        return "#6f30ff";
      case "E":
        return "#af18ff";
      case "F":
        return "#ff00ff";

      case "G":
        return "#99ffff"; //c12
      case "H":
        return "#ff8033"; //c13
      case "K":
        return "#cccccc"; //c14

      default:
        return "#666666";
    }
  },
  getClassBackgroundColor: (sys) => {
    switch (sys.region.name.charAt(0)) {
      case "A":
        return "hsl(180, 65%, 10%)";
      case "B":
        return "hsl(200, 65%, 10%)";
      case "C":
        return "hsl(225, 65%, 10%)";
      case "D":
        return "hsl(265, 65%, 10%)";
      case "E":
        return "hsl(280, 65%, 10%)";
      case "F":
        return "hsl(300, 65%, 10%)";

      case "G":
        return "hsl(180, 65%, 10%)"; //c12
      case "H":
        return "hsl(30, 65%, 10%)"; //c13
      case "K":
        return "#333333"; //c14

      default:
        return "#666666";
    }
  },
  getClassText: (sys) => {
    switch (sys.region.name.charAt(0)) {
      case "A":
        return "C1";
      case "B":
        return "C2";
      case "C":
        return "C3";
      case "D":
        return "C4";
      case "E":
        return "C5";
      case "F":
        return "C6";

      case "G":
        return "-";
      case "H":
        return "C13";
      case "K":
        return "-";

      default:
        return "??";
    }
  },
  getAbyssColor: (sys) => {
    switch (sys.region.name.charAt(4)) {
      case "1":
        return "#660000";
      case "2":
        return "#990000";
      case "3":
        return "#cc0000";
      case "4":
        return "#994c00";
      case "5":
        return "#cc6600";

      default:
        return "#666666";
    }
  },
  getAbyssBackgroundColor: (sys) => {
    switch (sys.region.name.charAt(4)) {
      case "1":
        return "#330000";
      case "2":
        return "#660000";
      case "3":
        return "#990000";
      case "4":
        return "#663300";
      case "5":
        return "#994c00";

      default:
        return "#666666";
    }
  },
  getAbyssText: (sys) => {
    switch (sys.region.name.charAt(4)) {
      case "1":
        return "Calm";
      case "2":
        return "Agitated";
      case "3":
        return "Fierce";
      case "4":
        return "Raging";
      case "5":
        return "Chaotic";

      default:
        return "??";
    }
  },
  getSovText: (sys) => {
    return Gradata.getSovEntry(sys) || "...";
  },
  getSovColor: (sys) => {
    let sov = Gradata.getSovEntry(sys);

    if (!sov) return "#303030";

    switch (sov) {
      case "Caldari":
        return "#233C61";
      case "Gallente":
        return "#184000";
      case "Minmatar":
        return "#5B1A00";
      case "Amarr":
        return "#6D6000";

      case "Ammatar":
        return "#593400";
      case "Khanid":
        return "#507B00";

      case "Jove":
        return "#003300";

      case "Guristas":
        return "hsl(30,65%, 20%)";
      case "ORE":
        return "hsl(45, 65%, 15%)";
      case "Syndicate":
        return "hsl(240, 65%, 20%)";
      case "Thukker":
        return "hsl(0, 0%, 30%)";
      case "Angel":
        return "hsl(240, 30%, 20%)";
      case "Sansha":
        return "hsl(60, 65%, 15%)";
      case "Blood":
        return "hsl(0, 65%, 15%)";
      case "Serpentis":
        return "hsl(100, 65%, 15%)";
      case "Society":
        return "hsl(40, 65%, 15%)";
      case "Sisters":
        return "hsl(0, 0%, 30%)";
      case "Mordu":
        return "hsl(270, 50%, 25%)";

      case "Concord":
        return "hsl(180, 100%, 15%)";
      getEffectColor: (id) => {
          let SEL = Universe.getObjectById(id);

          if (!SEL.wormhole) return false;

          switch (SEL.wormhole.effect) {
            case "Cat":
              return "hsl(30, 40%, 15%)";
            case "Mag":
              return "hsl(300, 40%, 15%)";
            case "Bla":
              return "hsl(255, 40%, 15%)";
            case "Pul":
              return "hsl(210, 40%, 15%)";
            case "Wol":
              return "hsl(150, 40%, 15%)";
            case "Red":
              return "hsl(0, 40%, 15%)";
            default:
              return false;
          }
        },

    document.body.appendChild(Viewport.canvas);

    Viewport.canvas.style.position = "absolute";
    Viewport.canvas.style.zIndex = 0;
    Viewport.canvas.onselectstart = function () {
      return false;
    };

    Viewport.onResize();
  },
  onResize: () => {
    Viewport.updateWindow();
    Viewport.calculateViewportShape();
    Viewport.resizeViewport();

    Viewport.doCallbacks();
  },
  updateWindow: () => {
    Viewport.window.w = window.innerWidth + 0;
    Viewport.window.h = window.innerHeight + 0;
  },
  calculateViewportShape: () => {
    Viewport.left = 0;
    Viewport.top = 0;

    Viewport.width = Viewport.window.w + 0;
    Viewport.height = Viewport.window.h + 0;

    Viewport.center.x = Math.floor(Viewport.width / 2);
    Viewport.center.y = Math.floor(Viewport.height / 2);
  },
  resizeViewport: () => {
    Viewport.canvas.style.left = Viewport.left + "px";
    Viewport.canvas.style.top = Viewport.top + "px";
    Viewport.canvas.width = Viewport.width;
    Viewport.canvas.height = Viewport.height;
  },
  doCallbacks: () => {
    let i = 0,
      AL = Viewport.resizeCallbacks.length;

    if (!AL) return;

    while (i < AL) {
      Viewport.resizeCallbacks[i]();

      i++;
    }
  },
};
window.onresize = (e) => {
  clearTimeout(Viewport.resizeTimeout);
  Viewport.resizeTimeout = setTimeout(Viewport.onResize, 1000);
};
Viewport.resizeCallbacks.push(() => {
  Dispobj.redraw = true;
  Dispobj.repos = true;
}); // Add a colon here

const Camera = {
  worldPosition: { x: 0, y: 0 },
  renderPosition: { x: 0, y: 0 },

  scale: 4 * Math.pow(2, 7 / 12),
  norm: 1,
  px: 1,

  zoomIn: Math.pow(2, 1 / 12),
  zoomOut: Math.pow(0.5, 1 / 12),

  getDrawPosition: (pos, write) => {
    write.x =
      Math.round((pos.x - Camera.renderPosition.x) * Camera.scale) +
      Viewport.center.x;
    write.y =
      -Math.round((pos.y - Camera.renderPosition.y) * Camera.scale) +
      Viewport.center.y;
  },
  returnDrawPositionX: (x) =>
    Math.round((x - Camera.renderPosition.x) * Camera.scale) +
    Viewport.center.x,
  returnDrawPositionY: (y) =>
    -Math.round((y - Camera.renderPosition.y) * Camera.scale) +
    Viewport.center.y,
  getWorldPosition: (draw, write) => {
    write.x =
      (draw.x - Viewport.center.x) / Camera.scale + Camera.renderPosition.x;
    write.y =
      -((draw.y - Viewport.center.y) / Camera.scale) + Camera.renderPosition.y;
  },
  isRectInView: (bound) =>
    0 <= bound.r &&
    Viewport.width >= bound.l &&
    0 <= bound.b &&
    Viewport.height >= bound.t,
  focusTo: (data) => {
    let obj = Dispobj.table[data] || false;

    if (!obj) return;

    Camera.worldPosition.x = obj.position.x;
    Camera.worldPosition.y = obj.position.y;

    Camera.alignRenderPosition();

    Dispobj.redraw = true;
    Dispobj.repos = true;
  },
  alignRenderPosition: () => {
    Camera.renderPosition.x =
      Math.round(Camera.worldPosition.x / Camera.px) * Camera.px;
    Camera.renderPosition.y =
      Math.round(Camera.worldPosition.y / Camera.px) * Camera.px;
  },
};
Camera.norm = Math.round(Camera.scale * 100);
Camera.px = 1 / Camera.scale;
const State = {
  autoRedraw: false,
  forceRedrawCached: false,

  // - EPILEPSY WARNING : forceRedrawCached test
  flashCache: false,

  gridSplit: 4,
  gridSub: 2,
  sysText: 12,
  conText: 1,
  regText: 1,
  sysLine: 1,
  conLine: 1,
  regLine: 1,
  lineMulti: 1,
  sysTitleOffset: 0,
  sysBorderWidth: 3,
  detailMode: true,
  isDetail: false,

  displayMode: false,

  debugBounds: false,

  debugPositionName: false,
  debugIdName: false,

  capsule: { y: 24, r: 12 },
  capDraw: { x: 64, y: 72 },
  sysSimpleOffset: 24,
  mainTextOffset: 1,

  dot: 1,
  hDot: 0.5,
  truDot: 1,
  rDot: 1,
  rhDot: 1,

  fpsMeter: true,

  thresholdJumpcache: 5000,
  thresholdIcons: 7000,
  thresholdDetail: 10000,

  simpleForceName: false,
  simpleSpacer: true,
  detailSpacer: true,

  minZoom: 1,
  maxZoom: 800,

  hideUI: false,
  showSystemDrawCount: true,

  searchExtend: false,
  searchFuzzy: true,
  searchTack: true,
  searchNum: true,

  mouseNear: false,
  selection: [],
  customEditSelection: [],
  selHighlight1: [], // primary selection
  selHighlight2: [], // secondary selection - neighbors
  selHighlightE: [], // edit selection
  selLabels: [], // selected labels
  selectionRange: 12,
  clearSelection: false,

  editMode: false,
  editType: "system",
  editSystems: true,
  editLabels: true,
  editGridLock: true,
  mapEdited: false,
  grabbedSelection: false,

  editShowOffset: false,
  drawInfluence: false,

  searchResult: [],
  searchIndex: 0,
  searchShowEntriesCount: 0,

  update: () => {
    // - determine draw mode
    State.isDetail = State.detailMode && Camera.norm >= State.thresholdDetail;

    // - label text size
    State.conText = Math.max(12, Camera.scale / 4);
    State.regText = Math.max(12, Camera.scale / 1.5);

    // - jump line width
    if (Camera.norm >= State.thresholdDetail) {
      State.lineMulti = 2;
    } else if (Camera.norm >= State.thresholdIcons) {
      State.lineMulti = 1.5;
    } else if (Camera.norm >= State.thresholdJumpcache) {
      State.lineMulti = 1;
    } else {
      State.lineMulti = Math.min(1, Math.max(0.5, Camera.norm / 10000));
    }

    State.sysLine = State.lineMulti * 1;
    State.conLine = State.lineMulti * 1.25;
    State.regLine = State.lineMulti * 1.5;

    // - dot sizes
    if (Camera.norm < 601)
      State.dot = Math.max(1, Math.round((Camera.norm - 195) / 50) / 4);
    else State.dot = Math.max(2, Camera.scale / 10);

    State.dot = State.isDetail ? 60 : Math.min(10, State.dot);
    State.hDot = State.dot / 2;
    State.truDot = State.hDot;
    State.rDot = Math.round(State.dot);
    State.rhDot = Math.round(State.hDot);
    if (Camera.norm >= State.thresholdIcons) State.truDot -= 1;

    State.sysTitleOffset = State.rhDot + 2;
  },
  updateSelection: () => {
    let i, j, count, count2, obj;

    // flag current objects for redraw
    i = 0;
    count = State.selHighlight1.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlight1[i]];

      State.setSelectionState(obj, false);

      i++;
    }

    i = 0;
    count = State.selHighlight2.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlight2[i]];

      State.setSelectionState(obj, false);

      i++;
    }

    // recalculate selection lists
    State.selHighlight1.length = 0;
    State.selHighlight2.length = 0;

    if (State.mouseNear) {
      i = 0;
      count = State.mouseNear.length;

      while (i < count) {
        Helper.addUnique(State.selHighlight1, State.mouseNear[i]);

        i++;
      }
    }
    if (State.selection) {
      i = 0;
      count = State.selection.length;

      while (i < count) {
        Helper.addUnique(State.selHighlight1, State.selection[i]);

        i++;
      }
    }

    // add neighbors of systems in selection1 to selection2
    i = 0;
    count = State.selHighlight1.length;

    while (i < count) {
      obj = Universe.system[State.selHighlight1[i]] || false;

      if (!obj) {
        i++;
        continue;
      }

      j = 0;
      count2 = obj.jumps._list.length;

      while (j < count2) {
        Helper.addUnique(State.selHighlight2, obj.jumps._list[j]);

        j++;
      }

      i++;
    }

    // flag new objects for redraw
    i = 0;
    count = State.selHighlight1.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlight1[i]];

      State.setSelectionState(obj, true);

      i++;
    }

    i = 0;
    count = State.selHighlight2.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlight2[i]];

      State.setSelectionState(obj, true);

      i++;
    }

    // redraw
    Dispobj.redraw = true;
  },
  updateCustomEditSelection: () => {
    let i, count, obj;

    // flag current objects for redraw
    i = 0;
    count = State.selHighlightE.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlightE[i]];

      obj.display.simpleScale = 0;
      obj.display.redrawDetail = true;

      i++;
    }

    // recalculate selection list
    State.selHighlightE.length = 0;

    if (State.customEditSelection) {
      i = 0;
      count = State.customEditSelection.length;

      while (i < count) {
        Helper.addUnique(State.selHighlightE, State.customEditSelection[i]);

        i++;
      }
    }

    // flag new objects for redraw
    i = 0;
    count = State.selHighlightE.length;

    while (i < count) {
      obj = Dispobj.table[State.selHighlightE[i]];

      obj.display.simpleScale = 0;
      obj.display.redrawDetail = true;

      i++;
    }

    Dispobj.redraw = true;
  },
  setSelectionState: (obj, value) => {
    if (Universe.system[obj.name]) {
      obj.display.simpleScale = 0;
      obj.display.redrawDetail = true;
      obj.display.inSelection = value;
    } else {
      obj.inSelection = value;
    }
  },
};
const Interface = {
  // html elements
  elem: {},

  // text
  boolTrue: "\u2713",
  boolFalse: "\u2715",

  createElement: (type, parent, dSel, prop, classes) => {
    const elem = document.createElement(type);
    parent?.appendChild(elem);
    prop && Helper.styler(elem, prop);
    classes && Helper.classer(elem, classes);
    if (dSel)
      elem.onselectstart = () => {
        return false;
      };

    return elem;
  },

  createToolbar: () => {
    Interface.elem.toolbar = Interface.createElement(
      "footer",
      document.body,
      true,
      {
        position: "absolute",
        bottom: "2vw",
        left: "3vw",
        zIndex: 1,
        width: "94vw",
        height: "2em",
      },
      ["bg-dark", "rounded", "row", "align-center", "p-1", "shadow"]
    );

    Interface.elem.tb_searchHelpIcon = Interface.createElement(
      "output",
      Interface.elem.toolbar,
      true,
      {
        /*
        position: "absolute",
        bottom: "0px",
        /*
        left: "102px",
        */
        width: "auto",
        height: "2em",
        /*
        backgroundColor: "rgba(160,160,160,0.25)",
        color: "#cccccc",
        */
        cursor: "help",
        "text-align": "center",
        /*
        font: "bold 16px consolas"
        */
      },
      ["d-inline", "text-secondary", "fs-2"]
    );

    Interface.elem.tb_search = Interface.createElement(
      "input",
      Interface.elem.toolbar,
      true,
      {
        height: "1.6em",
      },
      ["topcoat-search-input", "w-75", "d-inline", "ps-5"]
    );

    Interface.elem.tb_detail = Interface.createElement(
      "label",
      Interface.elem.toolbar,
      true,
      {
        width: "40px",
        cursor: "pointer",
      },
      ["topcoat-checkbox", "text-center", "h-auto", "d-inline", "p-0", "m-0"]
    );

    Interface.elem.tb_search.placeholder = "Search";
    Interface.elem.tb_detail.innerHTML = `<input type="checkbox">
  <div class=""></div>`;
    Interface.elem.tb_searchHelpIcon.innerText = "?";

    if (State.detailMode) {
      Interface.elem.tb_detail.innerText = Interface.boolTrue;
      Interface.elem.tb_detail.style.color = "#00ff00";
    } else {
      Interface.elem.tb_detail.innerText = Interface.boolFalse;
      Interface.elem.tb_detail.style.color = "#ff8000";
    }

    Interface.elem.tb_mode_container = Interface.createElement(
      "span",
      document.body,
      true,
      {
        position: "fixed",
        top: "2vw",
        right: "2vw",
      },
      ["container", "w-auto", "p-0"]
    );

    Interface.elem.tb_mode = Interface.createElement(
      "button",
      Interface.elem.tb_mode_container,
      true,
      {
        //position: "absolute",
        //top: "2vw",
        //right: "2vw",
        //backgroundColor: "#333333",
        //border: "1px solid #666666",
        //color: "#cccccc",
        //width: 'auto',
        //height: "50px",
        //cursor: "pointer",
        //"text-align": "center",
        /*
        font: "bold 16px consolas"
        */
      },
      ["btn", "btn-lg", "topcoat-button--large", "text-center", "shadow-lg"]
    );

    Interface.elem.tb_mode.innerText = State.displayMode.substring(0, 13);
  },
  createSearchTooltip: () => {
    Interface.elem.searchHelp = Interface.createElement(
      "aside",
      document.body,
      true,
      {
        position: "absolute",
        bottom: "50px",
        left: "50px",
        zIndex: 2,

        //width: "250px",
        //height: "80px",
        /*
        backgroundColor: "rgba(32,32,32,0.8)",
        border: "1px solid #333333",
        color: "#cccccc",
        */
        visibility: "hidden",
      },
      ["bg-info", "p-1", "pb-0", "pe-0", "border-0", "w-50", "rounded"]
    );

    // text
    Interface.elem.sh_text = Interface.createElement(
      "output",
      Interface.elem.searchHelp,
      true,
      {
        //position: "absolute",
        //top: "1px",
        //left: "1px",
        //color: "#cccccc",
        //backgroundColor: "rgba(16,16,16,0.5)",
        width: "100%",
        //height: "56px",
        paddingLeft: "5px",
        //font: "bold 12px consolas",
        cursor: "default",
        "line-height": "1.5em",
      },
      ["p-1", "topcoat-text-input"]
    );
    Interface.elem.sh_text.innerText =
      "Wildcard Character\n(can represent 1 OR more):\n> Use '*' or '?'";
  },
  createSearchResults: () => {
    // main window
    Interface.elem.searchResults = Interface.createElement(
      "aside",
      document.body,
      true,
      {
        position: "absolute",
        top: "250px",
        left: "250px",
        zIndex: 1,
        //backgroundColor: "rgba(32,32,32,0.8)",
        //border: "1px solid #333333",
        //color: "#cccccc",
        width: "275px",
        height: "190px",
        overflow: "hidden",
        visibility: "hidden",
      },
      ["bg-body-secondary", "text-body", "bg-opacity-50", "card"]
    );

    // title
    Interface.elem.sr_title = Interface.createElement(
      "header",
      Interface.elem.searchResults,
      true,
      {
        position: "absolute",
        top: "0px",
        left: "0px",
        //color: "#999999",
        //backgroundColor: "rgba(16,16,16,0.8)",
        width: "275px",
        //height: "30px",
        paddingLeft: "5px",
        //font: "bold 16px consolas",
        cursor: "default",
      },
      ["card-header", "h-auto"]
    );

    Interface.elem.sr_title.innerText = "Search Results";

    // cancle
    Interface.elem.sr_close = Interface.createElement(
      "div",
      Interface.elem.searchResults,
      true,
      {
        position: "absolute",
        top: "2px",
        right: "8px",
        width: "16px",
        //height: "14px",
        //border: "1px solid #333333",
        //backgroundColor: "rgba(32,32,32,1)",
        cursor: "pointer",
        //"text-align": "center",
        //font: "bold 16px consolas",
        //color: "#cccccc",
        //lineHeight: "14px",
        "z-index": 3,
      },
      ["btn", "topcoat-button", "bg-danger", "p-1"]
    );

    Interface.elem.sr_close.innerText = "X";

    // content
    Interface.elem.sr_content = Interface.createElement(
      "div",
      Interface.elem.searchResults,
      true,
      {
        position: "absolute",
        top: "30px",
        left: "0px",
        width: "280px",
        height: "100px",
        overflow: "overlay",
        "overflow-x": "hidden",
      }
    );

    // scrollbar
    Interface.elem.sr_scroll = Interface.createElement(
      "div",
      Interface.elem.searchResults,
      true,
      {
        position: "absolute",
        top: "20px",
        right: "0px",
        width: "5px",
        height: "25px",
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: "2px",
      }
    );

    // bottom
    Interface.elem.sr_footer = Interface.createElement(
      "footer",
      Interface.elem.searchResults,
      true,
      {
        position: "absolute",
        bottom: "0px",
        left: "0px",
        width: "270px",
        height: "35px",
        //backgroundColor: "rgba(16,16,16,0.8)"
      }
    );

    // result range
    Interface.elem.sr_resultRange = Interface.createElement(
      "div",
      Interface.elem.sr_footer,
      true,
      {
        position: "absolute",
        bottom: "10px",
        left: "75px",
        width: "100px",
        height: "20px",
      }
    );

    // range separator
    Interface.elem.sr_rangeSeparator = Interface.createElement(
      "div",
      Interface.elem.sr_resultRange,
      true,
      {
        position: "absolute",
        top: "0px",
        left: "40px",
        width: "20px",
        height: "20px",
        cursor: "default",
        "text-align": "center",
        font: "bold 16px consolas",
        color: "#cccccc",
        lineHeight: "20px",
      }
    );

    Interface.elem.sr_rangeSeparator.innerText = "-";

    // range start
    Interface.elem.sr_rangeStart = Interface.createElement(
      "span",
      Interface.elem.sr_resultRange,
      true,
      {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "40px",
        height: "20px",
        cursor: "default",
        //"text-align": "right",
        //font: "bold 16px consolas",
        //color: "#cccccc",
        lineHeight: "20px",
      },
      ["text-end"]
    );

    // range end
    Interface.elem.sr_rangeEnd = Interface.createElement(
      "span",
      Interface.elem.sr_resultRange,
      true,
      {
        position: "absolute",
        top: "0px",
        right: "0px",
        width: "40px",
        height: "20px",
        cursor: "default",
        //"text-align": "left",
        //font: "bold 16px consolas",
        //color: "#cccccc",
        //lineHeight: "20px"
      },
      ["text-left"]
    );

    // prev page
    Interface.elem.sr_prevPage = Interface.createElement(
      "div",
      Interface.elem.sr_footer,
      true,
      {
        position: "absolute",
        top: "5px",
        left: "20px",
        //width: "33px",
        //height: "28px",
        //border: "1px solid #333333",
        //backgroundColor: "rgba(32,32,32,1)",
        cursor: "default",
        "text-align": "center",
        font: "bold 20px consolas",
        //color: "#666666",
        lineHeight: "28px",
      },
      ["btn", "topcoat-icon-button"]
    );

    // next page
    Interface.elem.sr_nextPage = Interface.createElement(
      "div",
      Interface.elem.sr_footer,
      true,
      {
        position: "absolute",
        top: "5px",
        right: "20px",
        //width: "33px",
        //height: "28px",
        //border: "1px solid #333333",
        //backgroundColor: "rgba(32,32,32,1)",
        cursor: "default",
        "text-align": "center",
        font: "bold 20px consolas",
        //color: "#666666",
        lineHeight: "28px",
      },
      ["btn", "topcoat-icon-button"]
    );

    Interface.elem.sr_prevPage.V_usable = false;
    Interface.elem.sr_nextPage.V_usable = false;

    Interface.elem.sr_prevPage.innerText = "<<";
    Interface.elem.sr_nextPage.innerText = ">>";
  },
  createEditOptions: () => {
    // main window
    Interface.elem.editOptions = Interface.createElement(
      "aside",
      document.body,
      true,
      {
        position: "absolute",
        bottom: "40px",
        left: "10px",
        zIndex: 1,
        //backgroundColor: "rgba(32,32,32,0.8)",
        //border: "1px solid #333333",
        //color: "#cccccc",
        width: "250px",
        height: "200px",
        overflow: "hidden",
        //visibility: "hidden"
      },
      ["card"]
    );

    // title
    Interface.elem.eo_title = Interface.createElement(
      "header",
      Interface.elem.editOptions,
      true,
      {
        //position: "absolute",
        top: "0px",
        left: "0px",
        //color: "#999999",
        //backgroundColor: "rgba(16,16,16,0.8)",
        width: "100%",
        //height: "19px",
        paddingLeft: "5px",
        //font: "bold 16px consolas",
        cursor: "default",
      },
      ["card-header"]
    );

    Interface.elem.eo_title.innerText = "Edit Mode";

    // content
    Interface.elem.eo_content = Interface.createElement(
      "section",
      Interface.elem.editOptions,
      true,
      {
        position: "absolute",
        top: "35px",
        //left: "0px",
        width: "100%",
        height: "100%",
        overflow: "overlay",
        "overflow-x": "hidden",
      }
    );

    // mapstate
    Interface.elem.eo_mapstate = Interface.createElement(
      "div",
      Interface.elem.eo_content,
      true,
      {
        position: "absolute",
        top: "1px",
        left: "1px",
        width: "100%",
        height: "28px",
        backgroundColor: "rgba(16,16,16,0.5)",
      },
      ["btn-group"]
    );

    // reset
    Interface.elem.eo_reset = Interface.createElement(
      "button",
      Interface.elem.eo_mapstate,
      true,
      {
        position: "absolute",
        top: "2px",
        //left: "5px",
        //width: "100%",
        height: "19px",
        //backgroundColor: "rgba(48,64,64,0.5)",
        cursor: "pointer",
        //font: "bold 12px consolas",
        "padding-top": "5px",
        //color: "#99ffff"
      },
      ["btn", "topcoat-button"]
    );

    Interface.elem.eo_reset.innerText = "Reset";

    // import
    Interface.elem.eo_import = Interface.createElement(
      "button",
      Interface.elem.eo_mapstate,
      true,
      {
        //position: "absolute",
        top: "2px",
        //left: "43px",
        //width: "100%",
        height: "21px",
        //backgroundColor: "rgba(48,48,48,0.5)",
        //font: "bold 14px consolas",
        "padding-top": "3px",
        //color: "#99ffff",
        cursor: "pointer",
      },
      ["btn", "topcoat-button"]
    );

    Interface.elem.eo_import.innerText = "Load";

    if (
      typeof DATA_map != "undefined" &&
      DATA_map &&
      !(typeof GFLAG_DISABLE_MAP_LOAD != "undefined" && GFLAG_DISABLE_MAP_LOAD)
    ) {
      //Interface.elem.eo_import.style.cursor = "pointer";
      //Interface.elem.eo_import.style.color = "#99ffff";
      //Interface.elem.eo_import.style.backgroundColor = "rgba(48,64,64,0.5)";
    }

    // export
    Interface.elem.eo_export = Interface.createElement(
      "div",
      Interface.elem.eo_mapstate,
      true,
      {
        //position: "absolute",
        top: "2px",
        //left: "81px",
        //width: "100%",
        height: "21px",
        //backgroundColor: "rgba(48,64,64,0.5)",
        cursor: "pointer",
        //font: "bold 14px consolas",
        "padding-top": "3px",
        //color: "#99ffff"
      },
      ["btn", "topcoat-button"]
    );

    Interface.elem.eo_export.innerText = "Save";

    // target
    Interface.elem.eo_target = Interface.createElement(
      "div",
      Interface.elem.eo_content,
      true,
      {
        position: "absolute",
        top: "31px",
        left: "1px",
        width: "100%",
        height: "28px",
        //backgroundColor: "rgba(16,16,16,0.5)"
      }
    );

    // edittype
    Interface.elem.eo_edittype = Interface.createElement(
      "div",
      Interface.elem.eo_target,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "5px",
        width: "100%",
        height: "24px",
        //backgroundColor: "rgba(64,64,48,0.5)",
        cursor: "pointer",
        font: "bold 16px consolas",
        //color: "#ffff99"
      }
    );

    Interface.elem.eo_edittype.innerText = State.editType.substring(0, 3);

    // editsys
    Interface.elem.eo_editsys = Interface.createElement(
      "div",
      Interface.elem.eo_target,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "43px",
        width: "100%",
        height: "21px",
        //backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 14px consolas",
        "padding-top": "3px",
      }
    );

    Interface.elem.eo_editsys.innerText = "icon";
    if (State.editSystems) {
      Interface.elem.eo_editsys.style.color = "#00ff00";
      Interface.elem.eo_editsys.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_editsys.style.color = "#ff3300";
      //Interface.elem.eo_editsys.style.backgroundColor = "rgba(128,80,64,0.5)";
    }

    // editlabel
    Interface.elem.eo_editlabel = Interface.createElement(
      "div",
      Interface.elem.eo_target,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "81px",
        width: "100%",
        height: "19px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 12px consolas",
        "padding-top": "5px",
      }
    );

    Interface.elem.eo_editlabel.innerText = "label";
    if (State.editLabels) {
      Interface.elem.eo_editlabel.style.color = "#00ff00";
      Interface.elem.eo_editlabel.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_editlabel.style.color = "#ff8000";
      //Interface.elem.eo_editlabel.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    // grid
    Interface.elem.eo_grid = Interface.createElement(
      "div",
      Interface.elem.eo_content,
      true,
      {
        position: "absolute",
        top: "61px",
        left: "1px",
        width: "100%",
        height: "28px",
        //backgroundColor: "rgba(16,16,16,0.5)"
      }
    );

    // gridlock
    Interface.elem.eo_gridlock = Interface.createElement(
      "div",
      Interface.elem.eo_grid,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "5px",
        width: "100%",
        height: "21px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 14px consolas",
        "padding-top": "3px",
      }
    );

    Interface.elem.eo_gridlock.innerText = "grid";
    if (State.editGridLock) {
      Interface.elem.eo_gridlock.style.color = "#00ff00";
      Interface.elem.eo_gridlock.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_gridlock.style.color = "#ff8000";
      Interface.elem.eo_gridlock.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    // gridsplit
    Interface.elem.eo_gridsplit = Interface.createElement(
      "div",
      Interface.elem.eo_grid,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "43px",
        width: "100%",
        height: "24px",
        backgroundColor: "rgba(64,64,48,0.5)",
        cursor: "pointer",
        font: "bold 16px consolas",
        "padding-left": "10px",
        color: "#ffff99",
      }
    );

    Interface.elem.eo_gridsplit.innerText = State.gridSplit;

    // gridsub
    Interface.elem.eo_gridsub = Interface.createElement(
      "div",
      Interface.elem.eo_grid,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "81px",
        width: "100%",
        height: "24px",
        backgroundColor: "rgba(64,64,48,0.5)",
        cursor: "pointer",
        font: "bold 16px consolas",
        "padding-left": "10px",
        color: "#ffff99",
      }
    );

    Interface.elem.eo_gridsub.innerText = State.gridSub;

    // guide
    Interface.elem.eo_guide = Interface.createElement(
      "div",
      Interface.elem.eo_content,
      true,
      {
        position: "absolute",
        top: "91px",
        left: "1px",
        width: "100%",
        height: "28px",
        backgroundColor: "rgba(16,16,16,0.5)",
      }
    );

    // guidetext
    Interface.elem.eo_guidetext = Interface.createElement(
      "div",
      Interface.elem.eo_guide,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "5px",
        width: "100%",
        height: "21px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 14px consolas",
        "padding-top": "3px",
      }
    );

    Interface.elem.eo_guidetext.innerText = "name";
    if (State.simpleForceName) {
      Interface.elem.eo_guidetext.style.color = "#00ff00";
      Interface.elem.eo_guidetext.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_guidetext.style.color = "#ff8000";
      Interface.elem.eo_guidetext.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    // simplespacer
    Interface.elem.eo_simplespacer = Interface.createElement(
      "div",
      Interface.elem.eo_guide,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "43px",
        width: "100%",
        height: "21px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 16px consolas",
        "padding-top": "3px",
        "padding-left": "2px",
      }
    );

    Interface.elem.eo_simplespacer.innerText = "[S]";
    if (State.simpleSpacer) {
      Interface.elem.eo_simplespacer.style.color = "#00ff00";
      Interface.elem.eo_simplespacer.style.backgroundColor =
        "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_simplespacer.style.color = "#ff8000";
      Interface.elem.eo_simplespacer.style.backgroundColor =
        "rgba(128,96,64,0.5)";
    }

    // detailspacer
    Interface.elem.eo_detailspacer = Interface.createElement(
      "div",
      Interface.elem.eo_guide,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "81px",
        width: "100%",
        height: "21px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 16px consolas",
        "padding-top": "3px",
        "padding-left": "2px",
      }
    );

    Interface.elem.eo_detailspacer.innerText = "[D]";
    if (State.detailSpacer) {
      Interface.elem.eo_detailspacer.style.color = "#00ff00";
      Interface.elem.eo_detailspacer.style.backgroundColor =
        "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_detailspacer.style.color = "#ff8000";
      Interface.elem.eo_detailspacer.style.backgroundColor =
        "rgba(128,96,64,0.5)";
    }

    // extra
    Interface.elem.eo_extra = Interface.createElement(
      "div",
      Interface.elem.eo_content,
      true,
      {
        position: "absolute",
        top: "121px",
        left: "1px",
        width: "100%",
        height: "28px",
        backgroundColor: "rgba(16,16,16,0.5)",
      }
    );

    // showoffset
    /*
		Interface.elem.eo_showoffset = Interface.createElement('div', Interface.elem.eo_extra, true, {
			position: 'absolute', top: '2px', left: '62px', width: '49px', height: '21px', backgroundColor: 'rgba(16,16,16,0.5)',
			cursor: 'pointer', font: 'bold 14px consolas', 'padding-top': '3px', 'text-align': 'center'
		});
		
		Interface.elem.eo_showoffset.innerText = 'offset';
		if( State.editShowOffset ){
			Interface.elem.eo_showoffset.style.color = '#00ff00';
			Interface.elem.eo_showoffset.style.backgroundColor = 'rgba(64,128,64,0.5)';
		}else{
			Interface.elem.eo_showoffset.style.color = '#ff8000';
			Interface.elem.eo_showoffset.style.backgroundColor = 'rgba(128,96,64,0.5)';
		}
		*/

    // showbound
    Interface.elem.eo_showbound = Interface.createElement(
      "div",
      Interface.elem.eo_extra,
      true,
      {
        position: "absolute",
        top: "2px",
        left: "5px",
        width: "100%",
        height: "21px",
        backgroundColor: "rgba(16,16,16,0.5)",
        cursor: "pointer",
        font: "bold 14px consolas",
        "padding-top": "3px",
        "text-align": "center",
      }
    );

    Interface.elem.eo_showbound.innerText = "bound";
    if (State.debugBounds) {
      Interface.elem.eo_showbound.style.color = "#00ff00";
      Interface.elem.eo_showbound.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_showbound.style.color = "#ff8000";
      Interface.elem.eo_showbound.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    // bottom
    Interface.elem.eo_bottom = Interface.createElement(
      "footer",
      Interface.elem.editOptions,
      true,
      {
        position: "absolute",
        bottom: "0px",
        left: "0px",
        width: "100%",
        height: "29px",
        backgroundColor: "rgba(16,16,16,0.8)",
      }
    );

    // toggle
    Interface.elem.eo_toggle = Interface.createElement(
      "div",
      Interface.elem.eo_bottom,
      true,
      {
        position: "absolute",
        top: "5px",
        left: "5px",
        backgroundColor: "rgba(32,32,32,1)",
        border: "1px solid #666666",
        color: "#cccccc",
        width: "100%",
        height: "18px",
        cursor: "pointer",
        "text-align": "center",
      }
    );

    if (State.editMode) {
      Interface.elem.eo_toggle.innerText = Interface.boolTrue;
      Interface.elem.eo_toggle.style.color = "#00ff00";
    } else {
      Interface.elem.eo_toggle.innerText = Interface.boolFalse;
      Interface.elem.eo_toggle.style.color = "#ff8000";
    }

    // exit
    Interface.elem.eo_exit = Interface.createElement(
      "div",
      Interface.elem.eo_bottom,
      true,
      {
        position: "absolute",
        top: "5px",
        left: "30px",
        width: "83px",
        height: "18px",
        border: "1px solid #666666",
        backgroundColor: "rgba(32,32,32,1)",
        cursor: "pointer",
        "text-align": "center",
        font: "bold 16px consolas",
        color: "#cccccc",
      }
    );

    Interface.elem.eo_exit.innerText = "Exit";
  },
  createConfirmWindow: (
    title = "Default",
    message = "[undefined]",
    buttonSet = 7
  ) => {
    buttonSets = [
      ["Yes", "No"],
      ["OK", "Cancel"],
      ["Allow", "Deny"],
      ["Proceed", "Back"],
      ["Save", "Discard"],
      ["Confirm", "Abort"],
      ["Accept", "Decline"],
    ];
    buttonSet = buttonSet % buttonSets.length;
    // main window
    Interface.elem.confirmWindow = Interface.createElement(
      "aside",
      document.body,
      true,
      {
        position: "absolute",
        top: "250px",
        left: "250px",
        zIndex: 1,
        //backgroundColor: "rgba(32,32,32,0.8)",
        //border: "1px solid #333333",
        //color: "#cccccc",
        width: "250px",
        height: "160px",
        overflow: "hidden",
        //visibility: "hidden"
      },
      ["card"]
    );

    // title
    Interface.elem.cw_title = Interface.createElement(
      "header",
      Interface.elem.confirmWindow,
      true,
      {
        //position: "absolute",
        //top: "0px",
        //left: "0px",
        //color: "#999999",
        //backgroundColor: "rgba(16,16,16,0.8)",
        //width: "245px",
        //height: "20px",
        paddingLeft: "5px",
        //font: "bold 16px consolas",
        cursor: "default",
      },
      ["card-header"]
    );

    Interface.elem.cw_title.innerText = title;

    // content
    Interface.elem.cw_content = Interface.createElement(
      "div",
      Interface.elem.confirmWindow,
      true,
      {
        //position: "absolute",
        //top: "20px",
        left: "0px",
        width: "100%",
        height: "100px",
        paddingLeft: "5px",
        //font: "bold 12px consolas",
        cursor: "default",
      }
    );

    Interface.elem.cw_content.innerText = message;

    // bottom
    Interface.elem.cw_footer = Interface.createElement(
      "footer",
      Interface.elem.confirmWindow,
      true,
      {
        position: "absolute",
        bottom: "0px",
        left: "0px",
        width: "100%",
        height: "40px",
        //backgroundColor: "rgba(16,16,16,0.8)"
      },
      ["card-footer", "btn-group"]
    );

    // ok
    Interface.elem.cw_ok = Interface.createElement(
      "button",
      Interface.elem.cw_footer,
      true,
      {
        position: "absolute",
        top: "5px",
        left: "10%",
        width: "40%",
        height: "28px",
        //border: "1px solid #666666",
        //backgroundColor: "rgba(32,32,32,1)",
        cursor: "pointer",
        //"text-align": "center",
        //font: "bold 20px consolas",
        //color: "#cccccc",
        lineHeight: "28px",
      },
      [
        "btn",
        "topcoat-button",
        "btn-outline-primary",
        "bg-primary",
        "bg-opacity-50",
        "bg-gradient",
      ]
    );

    Interface.elem.cw_ok.innerText = buttonSets[buttonSet][0];
    Interface.elem.cw_ok.V_pointer = false;

    // cancel
    Interface.elem.cw_cancel = Interface.createElement(
      "div",
      Interface.elem.cw_footer,
      true,
      {
        position: "absolute",
        top: "5px",
        right: "10%",
        width: "40%",
        height: "28px",
        //border: "1px solid #666666",
        //backgroundColor: "rgba(32,32,32,1)",
        cursor: "pointer",
        //"text-align": "center",
        //font: "bold 20px consolas",
        //color: "#cccccc",
        lineHeight: "28px",
      },
      [
        "btn",
        "topcoat-button",
        "btn-outline-danger",
        "bg-danger",
        "bg-opacity-50",
        "bg-gradient",
      ]
    );

    Interface.elem.cw_cancel.innerText = buttonSets[buttonSet][1];
  },

  init: () => {
    Interface.createToolbar();
    Interface.createSearchTooltip();
    Interface.createSearchResults();
    Interface.createEditOptions();
    Interface.createConfirmWindow();
  },
};
const Interaction = {
  // mouse events
  mouse: {
    delta: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    previous: { x: 0, y: 0 },
    leftDown: false,
    drag: false,

    updatePosData: (e) => {
      // - set previous
      Mouse.previous.x = Mouse.position.x;
      Mouse.previous.y = Mouse.position.y;

      // - get current position
      Mouse.position.x = e.clientX - Viewport.left;
      Mouse.position.y = e.clientY - Viewport.top;

      // - get delta
      Mouse.delta.x = Mouse.position.x - Mouse.previous.x;
      Mouse.delta.y = Mouse.position.y - Mouse.previous.y;
    },
    resetPosData: (e) => {
      // - get current position
      Mouse.position.x = e.clientX - Viewport.left;
      Mouse.position.y = e.clientY - Viewport.top;

      // - set previous
      Mouse.previous.x = Mouse.position.x;
      Mouse.previous.y = Mouse.position.y;

      // - get delta
      Mouse.delta.x = 0;
      Mouse.delta.y = 0;
    },
  },
  onmousemove: (e) => {
    // update mouse position
    Mouse.updatePosData(e);

    // check if mouse actually moved
    if (!(Mouse.delta.x || Mouse.delta.y)) return;

    // set mouse drag if LMB is down
    if (!Mouse.drag && Mouse.leftDown) Mouse.drag = true;

    // LMB is down and dragging
    if (Mouse.leftDown && Mouse.drag) {
      // grabbed selection
      if (State.grabbedSelection) {
        Interaction.moveSelection();
      } else {
        Interaction.panCamera();
      }
    }

    // LMB is not down
    //if(!Mouse.leftDown) Interaction.setMouseNear( e.ctrlKey );
  },
  onwheel: (e) => {
    e.preventDefault();
    Interaction.zoomCamera(e);
  },
  onmousedown: (e) => {
    // - LMB
    if (e.which == 1) {
      Mouse.resetPosData(e);
      Mouse.leftDown = true;
      Mouse.drag = false;

      Interaction.setSelection(e.ctrlKey);
    }
  },
  onmouseup: (e) => {
    if (e.which == 1) {
      if (State.grabbedSelection) {
        Interaction.releaseSelection();
        State.grabbedSelection = false;
      }

      if (State.editMode) State.clearSelection = true;
    }

    Mouse.leftDown = false;
    Mouse.drag = false;
  },

  // camera control
  panCamera: () => {
    Camera.worldPosition.x -= Mouse.delta.x * Camera.px;
    Camera.worldPosition.y += Mouse.delta.y * Camera.px;

    Camera.alignRenderPosition();

    Dispobj.redraw = true;
    Dispobj.repos = true;
  },
  zoomCamera: (e) => {
    let times = Math.round((e.deltaY || e.deltaX) / 100),
      isZoomingIn;

    isZoomingIn = times < 0;

    while (times != 0) {
      Camera.scale =
        Camera.scale * (isZoomingIn ? Camera.zoomIn : Camera.zoomOut);
      times += isZoomingIn ? 1 : -1;

      if (Camera.scale < 13.5 && Camera.scale > 11.8) {
        if (Camera.scale > 11.8 && Camera.scale < 12.2)
          Camera.scale = 8 * Math.pow(2, 7 / 12);
        else if (Camera.scale > 12.4 && Camera.scale < 12.8)
          Camera.scale = 12.6;
        else if (Camera.scale > 13.1 && Camera.scale < 13.5)
          Camera.scale = 12.5 * Camera.zoomIn;
      }
    }

    Camera.scale = Math.min(
      State.maxZoom,
      Math.max(State.minZoom, Camera.scale)
    );

    Camera.norm = Math.round(Camera.scale * 100);
    Camera.px = 1 / Camera.scale;

    Camera.alignRenderPosition();

    State.update();

    Dispobj.redraw = true;
    Dispobj.repos = true;
    Dispobj.rescale = true;

    if (State.grabbedSelection) {
      Interaction.releaseSelection();
      State.grabbedSelection = false;
    }

    Dispobj.isEditUpdate = false;
  },

  // selection tracker
  setMouseNear: (add) => {
    let data = Interaction.mouseNear(true);

    if (!data[0] || State.editMode) return;

    return;

    // check if system is in selection range
    if (Interaction.isSelectableRange(data)) {
      // add or replace current selection
      if (add) {
        if (!State.mouseNear) State.mouseNear = [];
        // check if system is not in mouseNear
        if (State.mouseNear && State.mouseNear.indexOf(data[0]) == -1) {
          State.mouseNear.push(data[0]);
          State.updateSelection();
        }
      } else {
        // check if system is not the current mouseNear
        if (State.mouseNear[0] != data[0]) {
          State.mouseNear = [data[0]];
          State.updateSelection();
        }
      }
    }
  },
  setSelection: (add) => {
    let data = Interaction.mouseNear(true);

    // return if no system
    if (!data[0]) return;

    // return if system not in range
    if (!Interaction.isSelectableRange(data)) return;

    // grab selection
    if (State.editMode) State.grabbedSelection = true;

    // modify selection
    if (!State.editMode) Interaction.modifySelection(data[0], add);
    else Interaction.modifyEditSelection(data[0], add);
  },
  modifySelection: (data, add) => {
    let index = State.selection.indexOf(data);

    if (add) {
      if (index == -1) {
        State.selection.push(data);
      } else {
        State.selection.splice(index, 1);
      }
    } else {
      if (index == -1) State.selection = [data];
      else if (State.selection.length == 1) State.selection = [];
    }

    State.updateSelection();
  },
  modifyEditSelection: (data, add) => {
    let index = State.customEditSelection.indexOf(data);

    if (add) {
      if (index == -1) {
        State.customEditSelection.push(data);
      } else {
        State.customEditSelection.splice(index, 1);
      }
      State.updateCustomEditSelection();
    } else {
      State.selection = Interaction.getSelectionAddList(data);
      State.updateSelection();
    }
  },
  getSelectionAddList: (data) => {
    let output = [],
      i = 0,
      count = State.customEditSelection.length;

    if (State.editSystems) {
      if (State.editType == "system") output.push(data);
      else
        output = output.concat(
          Universe.system[data][State.editType].systems._list
        );
    }

    if (State.editLabels) {
      if (State.editType == "constellation")
        output.push(Universe.system[data].constellation.name);
      if (State.editType == "region") {
        if (State.editSystems)
          output = output.concat(
            Universe.system[data].region.constellations._list
          );
        output.push(Universe.system[data].region.name);
      }
    }

    if (count) {
      while (i < count) {
        if (output.indexOf(State.customEditSelection[i]) != -1) {
          i = 0;

          while (i < count) {
            Helper.addUnique(output, State.customEditSelection[i]);

            i++;
          }

          break;
        }

        i++;
      }
    }

    return output;
  },
  mouseNear: (sysOnly) => {
    let closest = false,
      dist = 99999,
      delta = { x: 0, y: 0 },
      curDist,
      curObj,
      i,
      count;

    // closest system
    if (Camera.norm >= State.thresholdIcons) {
      i = 0;
      count = Dispobj.system._v.length;

      while (i < count) {
        curObj = Helper.getElementInRefList(Dispobj.system, i, "_v");
        curDist = Helper.getDistance(Mouse.position, curObj.draw);

        // current object is closer then currently saved
        if (curDist < dist) {
          closest = curObj.name;
          dist = curDist;
          delta.x = Mouse.position.x - curObj.draw.x;
          delta.y = Mouse.position.y - curObj.draw.y;
        }

        i++;
      }
    }

    // closest label
    if (!sysOnly) {
    }

    //console.log(closest, dist, delta);

    return [closest, dist, delta];
  },
  isSelectableRange: (data) => {
    let SEL = Dispobj.table[data[0]];

    if (Dispobj.system[SEL.name]) {
      // system
      if (State.isDetail) {
        return Helper.isPointInRect(
          {
            t: -14,
            l: (SEL.display.width + 2) / -2,
            b: 14,
            r: (SEL.display.width + 2) / 2,
          },
          data[2]
        );
      } else {
        return data[0] && data[1] <= State.selectionRange;
      }
    } else {
      // label
    }
  },

  // map editior
  moveSelection: () => {
    let i, count, SEL, dx, dy;

    // get value to move selection
    dx = Mouse.delta.x * Camera.px;
    dy = -Mouse.delta.y * Camera.px;

    // move all selection
    i = 0;
    count = State.selection.length;

    while (i < count) {
      SEL = Dispobj.table[State.selection[i]];

      SEL.position.x += dx;
      SEL.position.y += dy;

      i++;
    }

    Dispobj.redraw = true;
    Dispobj.repos = true;
    Dispobj.rescale = true;

    Dispobj.isEditUpdate = true;
    State.mapEdited = true;
  },
  releaseSelection: () => {
    let i, count, SEL, snap;

    snap = State.editGridLock ? State.gridSplit * State.gridSub : 1000;

    i = 0;
    count = State.selection.length;

    while (i < count) {
      SEL = Dispobj.table[State.selection[i]];

      SEL.position.x = Math.round(SEL.position.x * snap) / snap;
      SEL.position.y = Math.round(SEL.position.y * snap) / snap;

      i++;
    }

    Dispobj.redraw = true;
    Dispobj.repos = true;
    Dispobj.rescale = true;

    Dispobj.isEditUpdate = true;
    State.mapEdited = true;
  },

  resetMapPosition: () => {
    Dispobj.setMapPositions();

    Dispobj.redraw = true;
    Dispobj.repos = true;
    Dispobj.rescale = true;

    State.mapEdited = false;
  },
  loadMapPosition: () => {
    Dispobj.setMapPositions("load");

    Dispobj.redraw = true;
    Dispobj.repos = true;
    Dispobj.rescale = true;

    State.mapEdited = false;
  },
  saveMapPosition: () => {
    Dispobj.saveMapPositions();
  },
  cycleEditSelectionType: (e) => {
    let cycle = ["system", "constellation", "region"],
      dir = 1;

    if (e.which == 3) dir *= -1;

    State.editType =
      cycle[
        (cycle.indexOf(State.editType) + dir + cycle.length) % cycle.length
      ];

    Interface.elem.eo_edittype.innerText = State.editType.substring(0, 3);
  },
  toggleEditSystem: () => {
    State.editSystems = !State.editSystems;

    if (State.editSystems) {
      Interface.elem.eo_editsys.style.color = "#00ff00";
      Interface.elem.eo_editsys.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_editsys.style.color = "#ff8000";
      Interface.elem.eo_editsys.style.backgroundColor = "rgba(128,96,64,0.5)";
    }
  },
  toggleEditLabel: () => {
    State.editLabels = !State.editLabels;

    if (State.editLabels) {
      Interface.elem.eo_editlabel.style.color = "#00ff00";
      Interface.elem.eo_editlabel.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_editlabel.style.color = "#ff8000";
      Interface.elem.eo_editlabel.style.backgroundColor = "rgba(128,96,64,0.5)";
    }
  },
  toggleEditGridLock: () => {
    State.editGridLock = !State.editGridLock;

    if (State.editGridLock) {
      Interface.elem.eo_gridlock.style.color = "#00ff00";
      Interface.elem.eo_gridlock.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_gridlock.style.color = "#ff8000";
      Interface.elem.eo_gridlock.style.backgroundColor = "rgba(128,96,64,0.5)";
    }
  },
  cycleEditGridSplit: (e) => {
    let cycle = [2, 3, 4, 5, 6],
      dir = 1;

    if (e.which == 3) dir *= -1;

    State.gridSplit =
      cycle[
        (cycle.indexOf(State.gridSplit) + dir + cycle.length) % cycle.length
      ];

    Interface.elem.eo_gridsplit.innerText = State.gridSplit;

    if (Camera.norm >= State.thresholdIcons) {
      Dispobj.redraw = true;
    }
  },
  cycleEditGridSub: (e) => {
    let cycle = [2, 3, 4, 5, 6],
      dir = 1;

    if (e.which == 3) dir *= -1;

    State.gridSub =
      cycle[(cycle.indexOf(State.gridSub) + dir + cycle.length) % cycle.length];

    Interface.elem.eo_gridsub.innerText = State.gridSub;

    if (Camera.norm >= State.thresholdIcons) {
      Dispobj.redraw = true;
    }
  },
  toggleSimpleNameText: () => {
    State.simpleForceName = !State.simpleForceName;

    if (State.simpleForceName) {
      Interface.elem.eo_guidetext.style.color = "#00ff00";
      Interface.elem.eo_guidetext.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_guidetext.style.color = "#ff8000";
      Interface.elem.eo_guidetext.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    if (Camera.norm >= State.thresholdIcons && !State.isDetail) {
      Dispobj.redrawSystemIcons("simple");
    }
  },
  toggleSimpleSpacer: () => {
    State.simpleSpacer = !State.simpleSpacer;

    if (State.simpleSpacer) {
      Interface.elem.eo_simplespacer.style.color = "#00ff00";
      Interface.elem.eo_simplespacer.style.backgroundColor =
        "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_simplespacer.style.color = "#ff8000";
      Interface.elem.eo_simplespacer.style.backgroundColor =
        "rgba(128,96,64,0.5)";
    }

    if (
      State.editMode &&
      Camera.norm >= State.thresholdIcons &&
      !State.isDetail
    ) {
      Dispobj.redraw = true;
    }
  },
  toggleDetailSpacer: () => {
    State.detailSpacer = !State.detailSpacer;

    if (State.detailSpacer) {
      Interface.elem.eo_detailspacer.style.color = "#00ff00";
      Interface.elem.eo_detailspacer.style.backgroundColor =
        "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_detailspacer.style.color = "#ff8000";
      Interface.elem.eo_detailspacer.style.backgroundColor =
        "rgba(128,96,64,0.5)";
    }

    if (
      State.editMode &&
      Camera.norm >= State.thresholdIcons &&
      State.isDetail
    ) {
      Dispobj.redraw = true;
    }
  },
  /*
	toggleEditShowOffset : function(){
		State.editShowOffset = !State.editShowOffset;
		
		if( State.editShowOffset ){
			Interface.elem.eo_showoffset.style.color = '#00ff00';
			Interface.elem.eo_showoffset.style.backgroundColor = 'rgba(64,128,64,0.5)';
		}else{
			Interface.elem.eo_showoffset.style.color = '#ff8000';
			Interface.elem.eo_showoffset.style.backgroundColor = 'rgba(128,96,64,0.5)';
		}
		
		Dispobj.redraw = true;
	},
	*/
  toggleDebugBounds: () => {
    State.debugBounds = !State.debugBounds;

    if (State.debugBounds) {
      Interface.elem.eo_showbound.style.color = "#00ff00";
      Interface.elem.eo_showbound.style.backgroundColor = "rgba(64,128,64,0.5)";
    } else {
      Interface.elem.eo_showbound.style.color = "#ff8000";
      Interface.elem.eo_showbound.style.backgroundColor = "rgba(128,96,64,0.5)";
    }

    Dispobj.redraw = true;
  },
  toggleEditMode: () => {
    State.editMode = !State.editMode;

    if (State.editMode) {
      Interface.elem.eo_toggle.innerText = Interface.boolTrue;
      Interface.elem.eo_toggle.style.color = "#00ff00";
    } else {
      Interface.elem.eo_toggle.innerText = Interface.boolFalse;
      Interface.elem.eo_toggle.style.color = "#ff8000";
    }

    if (Camera.norm >= State.thresholdIcons) {
      State.selection = [];
      State.updateSelection();
      State.updateCustomEditSelection();

      Dispobj.redraw = true;
    }
  },
  exitEditMode: () => {
    State.editMode = false;

    Interface.elem.eo_toggle.innerText = Interface.boolFalse;
    Interface.elem.eo_toggle.style.color = "#ff8000";

    Interface.elem.editOptions.style.visibility = "hidden";

    if (Camera.norm >= State.thresholdIcons) {
      State.selection = [];
      State.updateSelection();
      State.updateCustomEditSelection();

      Dispobj.redraw = true;
    }
  },

  // search
  searchKeyUp: (e) => {
    let event = e || window.event;
    let charCode = event.which || event.keyCode;

    let name, spec;

    spec = Interface.elem.tb_search.value.toLowerCase().replace(/[- ]/g, "");

    if (charCode == "13") {
      switch (spec) {
        case "edit": {
          Interface.elem.editOptions.style.visibility = "visible";

          Interface.elem.tb_search.value = "";
          Interface.elem.tb_search.blur();

          return;
        }
        case "origin":
        case "center":
        case "kspace": {
          Camera.worldPosition.x = 0;
          Camera.worldPosition.y = 0;

          Camera.alignRenderPosition();

          Dispobj.redraw = true;
          Dispobj.repos = true;

          Interface.elem.tb_search.value = "";
          Interface.elem.tb_search.blur();

          return;
        }
        case "anoikis":
        case "wspace": {
          Camera.worldPosition.x = 810.5;
          Camera.worldPosition.y = -1002.5;

          Camera.alignRenderPosition();

          Dispobj.redraw = true;
          Dispobj.repos = true;

          Interface.elem.tb_search.value = "";
          Interface.elem.tb_search.blur();

          return;
        }
      }

      name = Interaction.getSearchResult(Interface.elem.tb_search.value);

      if (name) Camera.focusTo(name);

      Interface.elem.tb_search.value = "";
      Interface.elem.tb_search.blur();
    }
  },
  getSearchResult: (input) => {
    let value, adv;

    value = input;
    if (Helper.isValidObject(value)) return value;

    value = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    if (Helper.isValidObject(value)) return value;

    value = input.toUpperCase();
    if (Helper.isValidObject(value)) return value;

    value = "J" + input;
    if (Helper.isValidObject(value)) return value;

    // advanced search
    adv = Interaction.searchInput(input);

    if (adv.length == 1) return adv[0];

    if (adv.length != 0) {
      adv = Interaction.sortSearchResults(adv);

      State.searchResult = adv;
      State.searchIndex = 0;

      Interaction.populateSearchResults(adv);
    }

    console.log(adv);
  },
  searchInput: (input) => {
    const transformInput = (input, delimiter, replacement) => {
      // Replace delimiter characters with replacement character
      input = input.replace(new RegExp(delimiter, "g"), replacement);

      // Check for extended search key
      if (input.charAt(0) === "." || input.charAt(0) === "_") {
        ext = true;
      }

      // Remove delimiter characters
      input = input.replace(new RegExp("\\" + delimiter, "g"), "");

      return input;
    };

    let preReg = [],
      regex = [],
      matches = [];
    let i,
      j,
      ci,
      cj,
      SEL,
      text,
      ext = false;

    // any char key
    input = input.replace(/\*/g, "§");
    input = input.replace(/\?/g, "§");

    // extended search key
    if (input.charAt(0) == "." || input.charAt(0) == "_") ext = true;

    input = input.replace(/\./g, "");
    input = input.replace(/\_/g, "");

    input = input.replace(/\//g, "");

    // create list of strings used to create regex

    // basic input to prereg
    text = input.toLowerCase();
    Helper.addUnique(preReg, text);

    text = text.replace(/\-/g, ""); // remove -
    Helper.addUnique(preReg, text);

    //console.log('basic', preReg);

    // tack search
    if (State.searchTack) {
      i = 0;
      ci = text.length + 1;

      while (i < ci) {
        Helper.addUnique(
          preReg,
          text.substring(0, i) + "-" + text.substring(i, text.length)
        );

        i++;
      }

      //console.log('tack', preReg);
    }

    // fuzzy search
    if (State.searchFuzzy) {
      i = 0;
      ci = preReg.length;

      while (i < ci) {
        SEL = Helper.alternateSpellings(preReg[i]);

        j = 0;
        cj = SEL.length;

        while (j < cj) {
          Helper.addUnique(preReg, SEL[j]);

          j++;
        }

        i++;
      }

      //console.log('fuzzy', preReg);
    }

    // use prereg to create regex

    // starts with regex
    i = 0;
    ci = preReg.length;

    while (i < ci) {
      if (preReg[i].charAt(0) == "-") {
        i++;
        continue;
      }

      regex.push(new RegExp("^" + preReg[i], "i"));

      i++;
    }

    //console.log('start', regex);

    // extended search regex
    if (State.searchExtended || ext) {
      i = 0;
      ci = preReg.length;

      while (i < ci) {
        regex.push(new RegExp(preReg[i], "i"));

        i++;
      }

      //console.log('contains', regex);
    }

    // search j number
    if (State.searchNum && !isNaN(Number(input))) {
      regex.push(new RegExp("^j" + input, "i"));
    }

    // search ad number
    if (State.searchNum && !isNaN(Number(input))) {
      regex.push(new RegExp("^ad" + input, "i"));
    }

    // search p number
    if (State.searchNum && !isNaN(Number(input))) {
      regex.push(new RegExp("^p-" + input, "i"));
    }

    // find all ibjects that match regex
    j = 0;
    cj = regex.length;

    while (j < cj) {
      // go through all universe objects
      i = 0;
      ci = Universe.objects.length;

      while (i < ci) {
        SEL = Universe.objects[i];

        if (regex[j].test(SEL)) Helper.addUnique(matches, SEL);

        i++;
      }

      j++;
    }

    //console.log('match', matches);

    return matches;
  },
  sortSearchResults: (results) => {
    let ks = [],
      as = [],
      us = [],
      ws = [],
      obj,
      out;

    let i = 0,
      count = results.length;

    while (i < count) {
      obj = Universe.table[results[i]];

      if (Helper.isAnoikis(obj) && obj.name != "Thera") {
        ws.push(results[i]);
      } else if (Helper.isAbyssal(obj)) {
        as.push(results[i]);
      } else if (Helper.isUnknown(obj)) {
        us.push(results[i]);
      } else {
        ks.push(results[i]);
      }

      i++;
    }

    out = ks.concat(as);
    out = out.concat(us);
    out = out.concat(ws);

    return out;
  },
  positionSearchResults: () => {
    Interface.elem.searchResults.style.left =
      Math.floor(
        Viewport.center.x - Interface.elem.searchResults.offsetWidth / 2
      ) + "px";
    Interface.elem.searchResults.style.top =
      Math.floor(
        Viewport.center.y - Interface.elem.searchResults.offsetHeight / 2
      ) + "px";
  },
  populateSearchResults: () => {
    // set ShowEntriesCount
    State.searchShowEntriesCount = Math.min(
      200,
      State.searchResult.length - State.searchIndex
    );

    // reset search results
    Interaction.clearSearchResults();

    // update search results text and pages
    Interface.elem.sr_title.innerText =
      "Search Results [" + State.searchResult.length + "]";
    Interface.elem.sr_rangeStart.innerText = State.searchIndex + 1;
    Interface.elem.sr_rangeEnd.innerText = Math.min(
      State.searchResult.length,
      State.searchIndex + 200
    );
    Interaction.updateSearchPageState();

    // create entries
    Interaction.createResultEntries();

    // update entries
    Interaction.updateResultEntries();

    // resize and position results window
    Interface.elem.searchResults.style.height =
      Math.max(160, Math.min(310, 60 + State.searchResult.length * 25)) + "px";
    Interface.elem.sr_content.style.height =
      Math.max(100, Math.min(249, State.searchResult.length * 25)) + "px";

    Interface.elem.searchResults.style.visibility = "visible";

    Interaction.positionSearchResults();
    Interaction.updateSearchScrollbarVisibility();
  },
  createResultEntries: () => {
    let i, count;

    if (
      Math.min(200, State.searchShowEntriesCount) >
      Interface.elem.sr_content.children.length
    ) {
      i = Interface.elem.sr_content.children.length;
      count = Math.min(200, State.searchShowEntriesCount);

      while (i < count) {
        Interaction.createResultEntry();

        i++;
      }
    }
  },
  createResultEntry: () => {
    let entry, t0, t1, t2;

    // entry
    entry = document.createElement("div");
    Interface.elem.sr_content.appendChild(entry);

    Helper.styler(entry, {
      position: "absolute",
      top: "1px",
      left: "1px",
      width: "248px",
      height: "23px",
      backgroundColor: "rgba(16,16,16,0.5)",
      cursor: "pointer",
      visibility: "hidden",
    });

    entry.onmouseenter = function () {
      entry.style.backgroundColor = "rgba(64,64,64,0.5)";
    };
    entry.onmouseleave = function () {
      entry.style.backgroundColor = "rgba(16,16,16,0.5)";
    };

    // text 0
    t0 = document.createElement("div");
    entry.appendChild(t0);

    Helper.styler(t0, {
      position: "absolute",
      bottom: "0px",
      left: "9px",
      width: "105px",
      height: "20px",
      color: "#cccccc",
      font: "bold 16px consolas",
      overflow: "hidden",
      "white-space": "nowrap",
    });

    // text 1
    t1 = document.createElement("div");
    entry.appendChild(t1);

    Helper.styler(t1, {
      position: "absolute",
      bottom: "0px",
      left: "119px",
      width: "80px",
      height: "16px",
      color: "#999999",
      font: "bold 12px consolas",
      overflow: "hidden",
      "white-space": "nowrap",
    });

    // text 2
    t2 = document.createElement("div");
    entry.appendChild(t2);

    Helper.styler(t2, {
      position: "absolute",
      bottom: "0px",
      right: "9px",
      width: "35px",
      height: "20px",
      color: "#cccccc",
      font: "bold 16px consolas",
      "text-align": "right",
    });
  },
  updateResultEntries: () => {
    let i, count;

    i = 0;
    count = Math.min(200, State.searchShowEntriesCount);

    while (i < count) {
      Interaction.updateResultEntry(
        Interface.elem.sr_content.children[i],
        State.searchResult[i + State.searchIndex],
        i
      );

      i++;
    }
  },
  updateResultEntry: (entry, target, index) => {
    // set position and visibility
    entry.style.top = 1 + index * 25 + "px";
    entry.style.visibility = "visible";

    // set target
    entry.onmousedown = function (e) {
      Camera.focusTo(target);

      if (e.which == 1) Interaction.closeSearchResults();
    };

    // set text
    entry.children[0].innerText = target || "NO DATA";

    if (Dispobj.system[target]) Interaction.setSystemEntry(entry, target);
    else if (Dispobj.constellation[target])
      Interaction.setConstellationEntry(entry, target);
    else if (Dispobj.region[target]) Interaction.setRegionEntry(entry, target);
    else {
      Interaction.setRegionEntry(entry, target);

      entry.children[1].style.font = "bold 12px consolas";
      entry.children[1].style.height = "16px";

      entry.children[1].innerText = "ERROR";
      entry.children[2].innerText = "...";
    }
  },
  setSystemEntry: (entry, target) => {
    entry.children[0].style.width = "105px";
    if (entry.children[0].innerText.length < 12) {
      entry.children[0].style.font = "bold 16px consolas";
      entry.children[0].style.height = "20px";
    } else if (entry.children[0].innerText.length < 16) {
      entry.children[0].style.font = "bold 12px consolas";
      entry.children[0].style.height = "16px";
    } else {
      entry.children[0].style.font = "bold 10px consolas";
      entry.children[0].style.height = "14px";
    }

    entry.children[1].innerText = Universe.table[target].region.name;
    if (entry.children[1].innerText.length >= 12) {
      entry.children[1].style.font = "bold 10px consolas";
      entry.children[1].style.height = "14px";
    } else {
      entry.children[1].style.font = "bold 12px consolas";
      entry.children[1].style.height = "16px";
    }

    entry.children[2].innerText = Dispobj.table[target].mode.security[0];
    if (!Helper.isAnoikis(Universe.table[target])) {
      entry.children[2].style.color = Dispobj.table[target].mode.security[1];
    } else {
      entry.children[2].style.color = Dispobj.table[target].mode.security[3];
    }
    if (entry.children[2].innerText.length >= 8) {
      entry.children[2].style.font = "bold 8px consolas";
      entry.children[2].style.height = "12px";
    } else if (entry.children[2].innerText.length >= 6) {
      entry.children[2].style.font = "bold 10px consolas";
      entry.children[2].style.height = "14px";
    } else if (entry.children[2].innerText.length >= 4) {
      entry.children[2].style.font = "bold 12px consolas";
      entry.children[2].style.height = "16px";
    } else {
      entry.children[2].style.font = "bold 16px consolas";
      entry.children[2].style.height = "20px";
    }
  },
  setConstellationEntry: (entry, target) => {
    entry.children[0].style.width = "105px";
    if (entry.children[0].innerText.length < 12) {
      entry.children[0].style.font = "bold 16px consolas";
      entry.children[0].style.height = "20px";
    } else if (entry.children[0].innerText.length < 16) {
      entry.children[0].style.font = "bold 12px consolas";
      entry.children[0].style.height = "16px";
    } else {
      entry.children[0].style.font = "bold 10px consolas";
      entry.children[0].style.height = "14px";
    }

    entry.children[1].innerText = Universe.table[target].region.name;
    if (entry.children[1].innerText.length >= 12) {
      entry.children[1].style.font = "bold 11px consolas";
      entry.children[1].style.height = "14px";
    } else {
      entry.children[1].style.font = "bold 13px consolas";
      entry.children[1].style.height = "16px";
    }

    entry.children[2].innerText = "CON";
    entry.children[2].style.color = "rgb(255,223,127)";
    entry.children[2].style.font = "bold 17px consolas";
    entry.children[2].style.height = "21px";
  },
  setRegionEntry: (entry, target) => {
    entry.children[0].style.width = "180px";
    entry.children[0].style.font = "bold 16px consolas";
    entry.children[0].style.height = "20px";

    entry.children[1].innerText = "";

    entry.children[2].innerText = "REG";
    entry.children[2].style.color = "#cccccc";
    entry.children[2].style.font = "bold 16px consolas";
    entry.children[2].style.height = "20px";
  },
  updateSearchScrollbarPosition: () => {
    Interface.elem.sr_scroll.style.top =
      20 +
      Math.min(
        225,
        (Interface.elem.sr_content.scrollTop *
          (225 / (State.searchShowEntriesCount - 10))) /
          25
      ) +
      "px";
  },
  updateSearchScrollbarVisibility: () => {
    if (State.searchShowEntriesCount > 10) {
      Interface.elem.sr_scroll.style.right = "0px";
    } else {
      Interface.elem.sr_scroll.style.right = "-5px";
    }
  },
  updateSearchPageState: () => {
    // prev page
    if (State.searchIndex > 0) {
      Interface.elem.sr_prevPage.style.border = "1px solid #fff";
      Interface.elem.sr_prevPage.style.color = "#cccccc";
      Interface.elem.sr_prevPage.style.cursor = "pointer";

      Interface.elem.sr_prevPage.V_usable = true;
    } else {
      Interface.elem.sr_prevPage.style.border = "1px solid #333333";
      Interface.elem.sr_prevPage.style.color = "#666666";
      Interface.elem.sr_prevPage.style.cursor = "default";

      Interface.elem.sr_prevPage.V_usable = false;

      Interface.elem.sr_prevPage.style.backgroundColor = "rgba(32,32,32,1)";
    }

    // next page
    if (State.searchIndex + 200 < State.searchResult.length) {
      Interface.elem.sr_nextPage.style.border = "1px solid #666666";
      Interface.elem.sr_nextPage.style.color = "#cccccc";
      Interface.elem.sr_nextPage.style.cursor = "pointer";

      Interface.elem.sr_nextPage.V_usable = true;
    } else {
      Interface.elem.sr_nextPage.style.border = "1px solid #333333";
      Interface.elem.sr_nextPage.style.color = "#666666";
      Interface.elem.sr_nextPage.style.cursor = "default";

      Interface.elem.sr_nextPage.V_usable = false;

      Interface.elem.sr_nextPage.style.backgroundColor = "rgba(32,32,32,1)";
    }
  },
  clearSearchResults: () => {
    let i = 0,
      count = Interface.elem.sr_content.children.length,
      SEL;

    while (i < count) {
      SEL = Interface.elem.sr_content.children[i];

      SEL.style.top = "1px";
      SEL.style.visibility = "hidden";

      i++;
    }
  },
  closeSearchResults: () => {
    Interaction.clearSearchResults();

    Interface.elem.sr_title.innerText = "Search Results";
    Interface.elem.searchResults.style.visibility = "hidden";
  },

  // toolbar
  toggleDetail: () => {
    State.detailMode = !State.detailMode;

    if (State.detailMode) {
      Interface.elem.tb_detail.innerText = Interface.boolTrue;
      Interface.elem.tb_detail.style.color = "#00ff00";
    } else {
      Interface.elem.tb_detail.innerText = Interface.boolFalse;
      Interface.elem.tb_detail.style.color = "#ff8000";
    }

    if (Camera.norm >= State.thresholdDetail) {
      Dispobj.redraw = true;
      Dispobj.repos = true;
      Dispobj.rescale = true;
      State.update();
    }
  },
  toggleDisplayMode: (e) => {
    let modes = [
        "security",
        "constellation",
        "region",
        "sovereignty",
        "pirate",
      ],
      dir = 1;

    if (e.which == 3) dir *= -1;

    Gradata.setDisplayMode(
      modes[
        (modes.indexOf(State.displayMode) + dir + modes.length) % modes.length
      ]
    );

    Interface.elem.tb_mode.innerText = State.displayMode.substring(0, 3);
  },

  // search tooltip
  showSearchHelp: (e) => {
    Interface.elem.searchHelp.style.visibility = "visible";
  },
  hideSearchHelp: (e) => {
    Interface.elem.searchHelp.style.visibility = "hidden";
  },

  openConfirmWindow: (pointer, text) => {
    Interface.elem.cw_ok.V_pointer = pointer;

    Interface.elem.cw_content.innerText = text;
    Interaction.positionConfirmation();
    Interface.elem.confirmWindow.style.visibility = "visible";
  },
  positionConfirmation: () => {
    Interface.elem.confirmWindow.style.left =
      Math.floor(
        Viewport.center.x - Interface.elem.confirmWindow.offsetWidth / 2
      ) + "px";
    Interface.elem.confirmWindow.style.top =
      Math.floor(
        Viewport.center.y - Interface.elem.confirmWindow.offsetHeight / 2
      ) + "px";
  },
  acceptConfirmation: () => {
    if (Interface.elem.cw_ok.V_pointer) Interface.elem.cw_ok.V_pointer();

    Interaction.clearConfirmWindow();
  },
  clearConfirmWindow: () => {
    Interface.elem.cw_ok.V_pointer = false;

    Interface.elem.cw_content.innerText = "[undefined]";
    Interface.elem.confirmWindow.style.visibility = "hidden";
  },

  init: () => {
    Viewport.canvas.onmousemove = Interaction.onmousemove;
    Viewport.canvas.onwheel = Interaction.onwheel;
    Viewport.canvas.onmousedown = Interaction.onmousedown;
    Viewport.canvas.onmouseup = Interaction.onmouseup;
    Viewport.canvas.onmouseleave = Interaction.onmouseup;

    Interface.elem.tb_search.onkeyup = Interaction.searchKeyUp;

    Interface.elem.searchResults.oncontextmenu = function (e) {
      if (!e.ctrlKey) return false;
    };

    Interface.elem.sr_content.onscroll =
      Interaction.updateSearchScrollbarPosition;

    Interface.elem.sr_close.onmouseenter = () => {
      Interface.elem.sr_close.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.sr_close.onmouseleave = () => {
      Interface.elem.sr_close.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.sr_close.onmousedown = (e) => {
      if (e.which == 1) Interaction.closeSearchResults();
    };

    Interface.elem.sr_prevPage.onmouseenter = function () {
      if (Interface.elem.sr_prevPage.V_usable)
        Interface.elem.sr_prevPage.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.sr_prevPage.onmouseleave = function () {
      Interface.elem.sr_prevPage.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.sr_prevPage.onmousedown = function () {
      if (Interface.elem.sr_prevPage.V_usable) {
        if (State.searchIndex % 200 === 0) State.searchIndex -= 200;
        else State.searchIndex = Math.floor(State.searchIndex / 200) * 200;

        Interaction.populateSearchResults();
      }
    };

    Interface.elem.sr_nextPage.onmouseenter = function () {
      if (Interface.elem.sr_nextPage.V_usable)
        Interface.elem.sr_nextPage.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.sr_nextPage.onmouseleave = function () {
      Interface.elem.sr_nextPage.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.sr_nextPage.onmousedown = function () {
      if (Interface.elem.sr_nextPage.V_usable) {
        if (State.searchIndex % 200 === 0) State.searchIndex += 200;
        else State.searchIndex = Math.ceil(State.searchIndex / 200) * 200;

        Interaction.populateSearchResults();
      }
    };

    Interface.elem.cw_ok.onmouseenter = function () {
      Interface.elem.cw_ok.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.cw_ok.onmouseleave = function () {
      Interface.elem.cw_ok.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.cw_ok.onmousedown = Interaction.acceptConfirmation;

    Interface.elem.cw_cancel.onmouseenter = function () {
      Interface.elem.cw_cancel.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.cw_cancel.onmouseleave = function () {
      Interface.elem.cw_cancel.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.cw_cancel.onmousedown = Interaction.clearConfirmWindow;

    Interface.elem.toolbar.oncontextmenu = function (e) {
      if (!e.ctrlKey) return false;
    };

    Interface.elem.tb_detail.onmousedown = Interaction.toggleDetail;
    Interface.elem.tb_mode.onmousedown = Interaction.toggleDisplayMode;

    Interface.elem.editOptions.oncontextmenu = function (e) {
      if (!e.ctrlKey) return false;
    };

    Interface.elem.eo_reset.onmousedown = function () {
      if (State.mapEdited) {
        Interaction.openConfirmWindow(
          Interaction.resetMapPosition,
          "Reset map data?\n\nAll unsaved work will be lost."
        );
      } else {
        Interaction.resetMapPosition();
      }
    };
    Interface.elem.eo_import.onmousedown = function () {
      if (State.mapEdited) {
        Interaction.openConfirmWindow(
          Interaction.loadMapPosition,
          "Load map data?\n\nAll unsaved work will be lost."
        );
      } else {
        Interaction.loadMapPosition();
      }
    };
    Interface.elem.eo_export.onmousedown = Interaction.saveMapPosition;

    Interface.elem.eo_edittype.onmousedown = Interaction.cycleEditSelectionType;
    Interface.elem.eo_editsys.onmousedown = Interaction.toggleEditSystem;
    Interface.elem.eo_editlabel.onmousedown = Interaction.toggleEditLabel;

    Interface.elem.eo_gridlock.onmousedown = Interaction.toggleEditGridLock;
    Interface.elem.eo_gridsplit.onmousedown = Interaction.cycleEditGridSplit;
    Interface.elem.eo_gridsub.onmousedown = Interaction.cycleEditGridSub;

    Interface.elem.eo_guidetext.onmousedown = Interaction.toggleSimpleNameText;
    Interface.elem.eo_simplespacer.onmousedown = Interaction.toggleSimpleSpacer;
    Interface.elem.eo_detailspacer.onmousedown = Interaction.toggleDetailSpacer;

    //Interface.elem.eo_showoffset.onmousedown = Interaction.toggleEditShowOffset;
    Interface.elem.eo_showbound.onmousedown = Interaction.toggleDebugBounds;

    Interface.elem.eo_exit.onmouseenter = function () {
      Interface.elem.eo_exit.style.backgroundColor = "rgba(64,64,64,1)";
    };
    Interface.elem.eo_exit.onmouseleave = function () {
      Interface.elem.eo_exit.style.backgroundColor = "rgba(32,32,32,1)";
    };
    Interface.elem.eo_exit.onmousedown = Interaction.exitEditMode;

    Interface.elem.eo_toggle.onmousedown = Interaction.toggleEditMode;

    Interface.elem.tb_searchHelpIcon.onmouseenter = Interaction.showSearchHelp;
    Interface.elem.tb_searchHelpIcon.onmouseleave = Interaction.hideSearchHelp;

    Viewport.resizeCallbacks.push(function () {
      Interaction.positionSearchResults();
      Interaction.positionConfirmation();
    });
    Interaction.positionSearchResults();
    Interaction.positionConfirmation();
  },
};
const Mouse = Interaction.mouse;

// Initialization
Universe.initializer.init();
Dispobj.initializer.init();
Viewport.init("full");
State.update();
Gradata.setDisplayMode("security");
Interface.init();
Interaction.init();
let FPS_Meter = false;
//if(typeof Stats == 'undefined') Stats = false;
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
    let canv, cont;

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
    let i = 0,
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
    let i = 1,
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
    let R = [State.truDot, State.truDot * 0.9, State.truDot * 1.2];

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
    let a = [0, 0],
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

      let opacity;
      if (b % sub) {
        if ((b % sub) % State.gridSub) {
          opacity = "0.02)";
        } else {
          opacity = "0.05)";
        }
      } else {
        opacity = "0.2)";
      }

      ctx.strokeStyle = "rgba(255, 255, 255," + opacity;
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
    let i = 0,
      count = Dispobj.system._v.length,
      sys;

    while (i < count) {
      sys = Helper.getElementInRefList(Dispobj.system, i, "_v");

      Layer.systems.drawBasic(sys);

      i++;
    }
  },
  redrawSystemIcons: function () {
    let i = 0,
      count = Dispobj.system._v.length,
      sys;

    while (i < count) {
      sys = Helper.getElementInRefList(Dispobj.system, i, "_v");

      Layer.systems.redrawIcon(sys);

      i++;
    }
  },
  drawSystemsIcon: function () {
    let i = 0,
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
    let TA = Layer.systems.getSystemAlpha(sys);

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
    let icon = canvas,
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
    let pColor = data.display.background,
      sColor = data.display.simple;

    let f = State.truDot * 1.75,
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
    let textPosX = State.sysSimpleOffset + State.sysTitleOffset,
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
    let j = 4;

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

    let pos = State.capDraw,
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
      infoTextSize = 10,
      title = data.display.title,
      info = data.display.info;

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
  drawDetailStation: function (data) {
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
  drawSystemStationService: function (station, pos) {
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

    let pos = {
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

    let pos = {
      x: State.capDraw.x - data.display.width / 2,
      y: State.capDraw.y + State.mainTextOffset,
    };

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold " + 10 + "px Consolas";
    ctx.fillStyle = data.display.effectTextColor;

    ctx.fillText(data.display.effectText, pos.x, pos.y);
  },

  drawOffset: function (d_sys) {
    let d_reg, u_sys, u_reg;
    let temp = { x: 0, y: 0 },
      pos = { x: 0, y: 0 },
      dist;
    let sysOffset = { x: 0, y: 0 },
      regOffset = { x: 0, y: 0 };

    u_sys = Universe.system[d_sys.name];
    u_reg = u_sys.region;
    d_reg = Dispobj.region[u_reg.name];

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

    dist = Math.sqrt(Math.pow(temp.x, 2) + Math.pow(temp.y, 2));

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
    ctx.strokeStyle = jump.color || "#666666";

    if (jump.dashed) ctx.setLineDash([2, 2]);
    Renderer.drawPolyline(jump.draw, true);
    if (jump.dashed) ctx.setLineDash([]);

    if (State.debugBounds) Renderer.drawBoundingBox(jump.bound, "#ff0000");
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

    if (dashed) ctx.setLineDash([2, 2]);
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
    if (Camera.scale > 35) Layer.labels.drawConLabels();

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
      if (Camera.scale < 40) return 0.75;
      else if (Camera.scale < 50) return 0.5;
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
