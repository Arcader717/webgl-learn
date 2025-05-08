import { makeProgram } from "./boilerplate.js";
import { setGeometry } from "./buffers.js";
import { m3 } from "./m3.js";

var color = [0, 0, 0, 1];

const vShader = `
    attribute vec2 a_position;
    
    uniform vec2 u_resolution;
    uniform mat3 u_matrix;
    void main() {
        vec2 position = (u_matrix * vec3(a_position, 1)).xy;
        vec2 zeroToOne = position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
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

    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    var translation = [randomNumber(0, gl.canvas.width), randomNumber(0, gl.canvas.height)];
    var angle = 0;
    var scale = [1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];
    
    drawScene();

    window.addEventListener("keydown", keydownCon);

    function keydownCon(e) {
        if (e.key == "r") {
            resetF();  
        } else if (e.key == "t") {
            promptTranslation();
        }
    }
    
    function resetF() {
        translation = [randomNumber(0, gl.canvas.width), randomNumber(0, gl.canvas.height)];
        angle = randomNumber(0,360);
        scale = [randomNumber(-5.01, 5.01), randomNumber(-5.01, 5.01)];
        color = [Math.random(), Math.random(), Math.random(), 1];
        drawScene();
        console.clear();
        console.log("Position - " + translation[0] + ", " + translation[1]);
        console.groupCollapsed("Rotation");
        console.log("Angle - " + angle);
        console.log("Radians - " + angleRads); 
        console.log("Sine - " + rotation[0]);
        console.log("Cosine - " + rotation[1]);
        console.groupEnd();
        console.groupCollapsed("Scale");
        console.log("Scale X - " + scale[0]);
        console.log("Scale Y - " + scale[1]);
        console.groupEnd();
        console.log("Color - " + color[0] + ", " + color[1] + ", " + color[2]);
    }
    
    function promptTranslation() {
        var minx = -translation[0]
        var maxx = gl.canvas.width - translation[0]
        var miny = -translation[1]
        var maxy = gl.canvas.height - translation[1]
        var transx = window.prompt("Insert x translation (must be an integer)")
        if (typeof transx !== typeof "") {
            console.log("Translation x was not filled out");
            return;
        }
        transx = Number(transx);
        if (!Number.isInteger(transx)) {
            console.log("Translation x was not an integer");
            return;
        };
        if (!(minx <= transx <= maxx)) {
            console.log("Translation x would put it out of bounds. Acceptable range: " + minx + " - " + maxx);
            return;
        }
        translation[0] = translation[0] + transx;
        var transy = window.prompt("Insert y translation (must be an integer)")
        if (typeof transy !== typeof "") {
            console.log("Translation y was blank");
            return;
        }
        transy = Number(transy);
        if (!Number.isInteger(transy)) {
            console.log("translation y was not an integer");
            return;
        }
        if (!(miny <= transy <= maxy)) {
            console.log("That translation would put it out of bounds. Acceptable range: " + miny + " - " + maxy);
            return;
        }
        translation[1] = translation[1] + transy;
        drawScene()
    }

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform4fv(colorLocation, color);
        var transM = m3.translation(translation[0], translation[1]);
        var rotM = m3.rotation(angle * Math.PI / 180);
        var scaleM = m3.scaling(scale[0], scale[1]);
        var matrix = m3.multiply(transM, rotM);
        matrix = m3.multiply(matrix, scaleM)
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
