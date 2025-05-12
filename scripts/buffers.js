function setGeometry(gl) {
  const rect3D1 = get3DRectangle([0, 30], [0, 150], [0, 30]);
  const rect3D2 = get3DRectangle([30, 100], [0, 30], [0,30]);
  const rect3D3 = get3DRectangle([30, 67], [60, 90], [0, 30]);
  var positions = rect3D1.concat(rect3D2, rect3D3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
};

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
    x2, y1, z2,
    x1, y2, z2,
    x1, y2, z2,
    x2, y1, z2,
    x2, y2, z2,

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
    x1, y2, z1,
    x1, y1, z2,
    x1, y1, z2,
    x1, y2, z1,
    x1, y2, z2,

    // right
    x2, y1, z1,
    x2, y2, z1,
    x2, y1, z2,
    x2, y1, z2,
    x2, y2, z1,
    x2, y2, z2,
  ];
}

export { setGeometry, getRectangle, get3DRectangle };
