import { makeProgram } from "./boilerplate.js";
import { setGeometry, setColors } from "./buffers.js";
import { m4 } from "./matrix.js";

var color = [0, 0, 0, 1];

const vShader = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    
    uniform mat4 u_matrix;

    varying vec4 v_color;

    void main() {
        gl_Position = u_matrix * a_position;
        v_color = a_color;
    }
`;
const fShader = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;
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
    var colorLocation = gl.getAttribLocation(program, "a_color");
    
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl);

    var translation = [45, 150, 0];
    var angle = [40, 25, 325];
    var scale = [1, 1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];
    
    drawScene();

    window.addEventListener("keydown", keydownCon);

    function keydownCon(e) {
        if (e.key == "r") {
            askRotation();
        } else if (e.key == "t") {
            askTranslation();
        } else if (e.key == "s") {
            askScale()
        }
    }

    function askRotation() {
        var x = window.prompt("Desired X rotation");
        var y = window.prompt("Desired Y rotation");
        var z = window.prompt("Desired Z rotation");
        if (x == "") { x = angle[0] };
        if (y == "") { y = angle[1] };
        if (z == "") { z = angle[2] };
        angle = [x, y, z];
        drawScene();
    };

    function askTranslation() {
        var x = window.prompt("Desired X translation");
        var y = window.prompt("Desired Y translation");
        var z = window.prompt("Desired Z translation");
        if (x == "") { x = translation[0] };
        if (y == "") { y = translation[1] };
        if (z == "") { z = translation[2] };
        translation = [x, y, z];
        drawScene();
    }

    function askScale() {
        var x = window.prompt("Desired X scale");
        var y = window.prompt("Desired Y scale");
        var z = window.prompt("Desired Z scale");
        if (x == "") { x = scale[0] };
        if (y == "") { y = scale[1] };
        if (z == "") { z = scale[2] };
        scale = [x, y, z];
        drawScene();
    }

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.useProgram(program);
        
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
        
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        var size = 3;
        var type = gl.UNSIGNED_BYTE;
        var normalize = true;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);
        
        var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, angle[0]);
        matrix = m4.yRotate(matrix, angle[1]);
        matrix = m4.zRotate(matrix, angle[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
        gl.uniformMatrix4fv(matrixLocation, false, matrix);

        gl.drawArrays(gl.TRIANGLES, 0, 18*6);
        logValues(translation, angle, scale);
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
};
