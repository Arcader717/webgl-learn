function compileShader(gl, shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    throw ("Couldn't compile shader: " + gl.getShaderInfoLog(shader);
  }
  return shader;
};

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    throw ("Program failed to link: " + gl.getProgramInfoLog(program));
  }
  return program;
};

function makeProgram(gl, shaderSources) {
  var program = createProgram(gl, compileShader(gl, shaderSources[0], gl.VERTEX_SHADER), compileShader(gl, shaderSources[1], gl.FRAGMENT_SHADER));
  return program;
};

export { makeProgram };
