import { makeProgram } from "./boilerplate.js";
import { setGeometry } from "./buffers.js";

var color = [0, 0, 0, 1];

const vShader = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    uniform vec2 u_translation;
    uniform vec2 u_rotation;
    uniform vec2 u_scale;
    void main() {
        vec2 rotated = vec2(
            a_position.x * u_rotation.y + a_position.y * u_rotation.x,
            a_position.y * u_rotation.y - a_position.x * u_rotation.x);
        vec2 position = rotated + u_translation;
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
    var translationLocation = gl.getUniformLocation(program, "u_translation");
    var rotationLocation = gl.getUniformLocation(program, "u_rotation");
    // var scaleLocation = gl.getUniformLocation(program, "u_scale");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    var translation = [randomNumber(0, gl.canvas.width), randomNumber(0, gl.canvas.height)];
    var rotation = [0, 1];
    // var scale = [1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];
    
    drawScene();

    window.addEventListener("keydown", resetF);
    
    function resetF(e) {
        if (e.key == "r") {
            translation = [randomNumber(0, gl.canvas.width), randomNumber(0, gl.canvas.height)];
            var angle = randomNumber(0, 360);
            angleRads = angle * Math.PI / 180;
            rotation = [Math.sin(angleRads), Math.cos(angleRads)];
            color = [Math.random(), Math.random(), Math.random(), 1];
            drawScene();
            console.clear();
            console.log("Position - " + translation[0] + ", " + translation[1]);
            console.log("----------");
            console.log("Angle - " + angle);
            console.log("Radians - " + angleRads); 
            console.log("Sine - " + rotation[0]);
            console.log("Cosine - " + rotation[1]);
            console.log("----------");
            console.log("Color - " + color[0] + ", " + color[1] + ", " + color[2]);
        }
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
        gl.uniform2fv(translationLocation, translation);
        gl.uniform2fv(rotationLocation, rotation);
        // gl.uniform2fv(scaleLocation, scale);

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 18;
        gl.drawArrays(primitiveType, offset, count);
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
