function setGeometry(gl) {
  /* when I want to expand into a more modular system.
  data = [
    {"vector": {"x": [0,30], "y": [0,150], "z": [0,30]}, "colors": [front, back, top, bottom, left, right]},
    {"vector": {"x": [30, 100], "y": [0,30], "z": [0,30]}, "colors": [[R, G, B], [R, G, B], [R, G, B], [R, G, B], [R, G, B], [R, G, B]]},
    {"vector": {"x": [30, 67], "y": [60, 90], [0, 30]}, "colors": [front},
  ]
  */
  const rect3D1 = get3DRectangle([0, 30], [0, 150], [0, 30]);
  const rect3D2 = get3DRectangle([30, 100], [0, 30], [0,30]);
  const rect3D3 = get3DRectangle([30, 67], [60, 90], [0, 30]);
  var positions = rect3D1.concat(rect3D2, rect3D3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
};

function setColors(gl/*, data*/) {
  const colors = [[200, 70, 120], [80, 70, 200], [70, 200, 210], [210,100,70], [160, 160, 220], [210, 160, 70]];
  const color1 = get3DRectColors(colors);
  const color2 = get3DRectColors(colors);
  const color3 = get3DRectColors(colors);
  var colorBuffer = color1.concat(color2, color3);
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colorBuffer), gl.STATIC_DRAW);
}

function get3DRectColors(color) {
  var f = color[0]; // front
  var b = color[1]; // back
  var t = color[2]; // top
  var o = color[3]; // bottom
  var l = color[4]; // left
  var r = color[5]; // right
  return [
    f[0], f[1], f[2],
    f[0], f[1], f[2],
    f[0], f[1], f[2],
    f[0], f[1], f[2],
    f[0], f[1], f[2],
    f[0], f[1], f[2],

    b[0], b[1], b[2],
    b[0], b[1], b[2],
    b[0], b[1], b[2],
    b[0], b[1], b[2],
    b[0], b[1], b[2],
    b[0], b[1], b[2],

    t[0], t[1], t[2],
    t[0], t[1], t[2],
    t[0], t[1], t[2],
    t[0], t[1], t[2],
    t[0], t[1], t[2],
    t[0], t[1], t[2],

    o[0], o[1], o[2],
    o[0], o[1], o[2],
    o[0], o[1], o[2],
    o[0], o[1], o[2],
    o[0], o[1], o[2],
    o[0], o[1], o[2],

    l[0], l[1], l[2],
    l[0], l[1], l[2],
    l[0], l[1], l[2],
    l[0], l[1], l[2],
    l[0], l[1], l[2],
    l[0], l[1], l[2],

    r[0], r[1], r[2],
    r[0], r[1], r[2],
    r[0], r[1], r[2],
    r[0], r[1], r[2],
    r[0], r[1], r[2],
    r[0], r[1], r[2],
  ];
}

function getRectangle(x1, y1, x2, y2) {
  return [
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ];
};

function get3DRectangle(x, y, z) { // first example 
  var x1 = x[0]; // 0
  var x2 = x[1]; // 30
  var y1 = y[0]; // 0
  var y2 = y[1]; // 150
  var z1 = z[0]; // 0
  var z2 = z[1]; // 30
  return [
    // front
    x1, y1, z1,
    x2, y1, z1,
    x1, y2, z1,
    x1, y2, z1,
    x2, y1, z1,
    x2, y2, z1,

    // back
    x1, y1, z2,
    x1, y2, z2,
    x2, y1, z2,
    x1, y2, z2,
    x2, y2, z2,
    x2, y1, z2,

    // top,
    x1, y1, z1,
    x2, y1, z1,
    x1, y1, z2,
    x1, y1, z2,
    x2, y1, z1,
    x2, y1, z2,

    // bottom
    x1, y2, z1,
    x2, y2, z1,
    x1, y2, z2,
    x1, y2, z2,
    x2, y2, z1,
    x2, y2, z2,

    // left
    x1, y1, z1,
    x1, y1, z2,
    x1, y2, z1,
    x1, y1, z2,
    x1, y2, z2,
    x1, y2, z1,

    // right
    x2, y1, z1,
    x2, y2, z1,
    x2, y1, z2,
    x2, y1, z2,
    x2, y2, z1,
    x2, y2, z2,
  ];
}

export { setGeometry, getRectangle, get3DRectangle, setColors };
