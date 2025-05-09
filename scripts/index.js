import { makeProgram } from "./boilerplate.js";
import { setGeometry } from "./buffers.js";
import { m4 } from "./matrix.js";

var color = [0, 0, 0, 1];

const vShader = `
    attribute vec4 a_position;
    
    uniform mat4 u_matrix;

    void main() {
        gl_Position = u_matrix * a_position;
    }
`;
const fShader = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
        gl_FragColor = u_color;
    }
`;

main();

function main() {
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    var program = makeProgram(gl, [vShader, fShader]);
    gl.useProgram(program);
    
    var positionLocation = gl.getAttribLocation(program, "a_position");

    var colorLocation = gl.getUniformLocation(program, "u_color");
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    var translation = [45, 150, 0];
    var angle = [40, 25, 325];
    var scale = [1, 1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];
    
    drawScene();

    /*window.addEventListener("keydown", keydownCon);

    function keydownCon(e) {
        if (e.key == "r") {
            resetF();  
        } else if (e.key == "t") {
            promptTranslation();
        }
    }*/

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform4fv(colorLocation, color);
        var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, angle[0]);
        matrix = m4.yRotate(matrix, angle[1]);
        matrix = m4.zRotate(matrix, angle[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
        gl.uniformMatrix3fv(matrixLocation, false, matrix);

        gl.drawArrays(gl.TRIANGLES, 0, 18);
    }
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/*
function deg2Rot(angle) {
    var angleRad = angle * Math.PI / 180;
    return [Math.sin(angleRad), Math.cos(angleRad)];
} */

function logValues(positions, rot, scale) { // ([x pos, y pos, z pos], [x rot, y rot, z rot], [x scale, y scale, z scale])
    console.clear();
    console.group("Position");
    console.log("X - " + positions[0]);
    console.log("Y - " + positions[1]);
    console.log("Z - " + positions[2]);
    console.groupEnd();
    console.group("Rotation");
    console.log("X - " + rot[0]);
    console.log("Y - " + rot[1]);
    console.log("Z - " + rot[2]);
    console.groupEnd();
    console.group("Scale");
    console.log("X - " + scale[0]);
    console.log("Y - " + scale[1]);
    console.log("Z - " + scale[2]);
    console.groupEnd();
}
