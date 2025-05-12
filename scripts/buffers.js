function setGeometry(gl) {
  const rect1 = getRectangle(0, 0, 30, 150);
  const rect2 = getRectangle(30, 0, 100, 30);
  const rect3 = getRectangle(30, 60, 67, 90);
  var positions = rect1.concat(rect2, rect3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
};

function getRectangle(x1, y1, x2, y2) {
  return [
    x1, y1, 0,
    x2, y1, 0,
    x1, y2, 0,
    x1, y2, 0,
    x2, y1, 0,
    x2, y2, 0,
  ];
};

export { setGeometry, getRectangle };
