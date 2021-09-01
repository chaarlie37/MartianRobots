const readline = require('readline');
const fs = require('fs');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let MAX_X;
let MAX_Y;

let robot = {};

let instructions = [];

let scents = [];

let output = '';

let lostRobots = 0;

let userInput = function () {
    rl.question('', function (coordinates) {
        rl.question('', function (instruction) {
            run(coordinates, instruction, robot);
            userInput();
        });
    });
}

rl.question('', function (size) {
    init(size);
    userInput();
});

function moveRobot(instruction, robot, max_x, max_y) {
    let lost = false;
    switch (instruction) {
        case 'F':
            const result = moveForward(robot, max_x, max_y);
            lost = result.lost;
            robot = result.robot;
            break;
        case 'L':
            robot.orientation = (robot.orientation + 90) % 360;
            break;
        case 'R':
            robot.orientation = (((robot.orientation - 90) % 360) + 360) % 360;
            break;
    }
    return {
        robot: robot,
        lost: lost
    };
}

function moveForward(robot, max_x, max_y) {
    let previous = Object.assign({}, robot);
    switch (robot.orientation) {
        case 90:
            robot.y++;
            break;
        case 270:
            robot.y--;
            break;
        case 180:
            robot.x--;
            break;
        case 0:
            robot.x++;
            break;
    }
    let lost = false;
    if (robot.x > max_x || robot.y > max_y || robot.x < 0 || robot.y < 0){
        robot = previous;
        lost = !scents[robot.x][robot.y];
        scents[robot.x][robot.y] = true;
    }
    return {
        robot: robot,
        lost: lost
    };
}

function parseOrientation(orientation) {
    switch (orientation) {
        case 0:
            return 'E';
        case 90:
            return 'N';
        case 180:
            return 'W';
        case 270:
            return 'S';
    }
}

const init = function (size) {
    MAX_X = parseInt(size.split(' ')[0]);
    MAX_Y = parseInt(size.split(' ')[1]);
    robot = {};

    instructions = [];

    scents = [];

    output = '';

    lostRobots = 0;
    for (let i = 0; i <= MAX_X; i++){
        scents.push(new Array(MAX_Y));
        for (let j = 0; j <= MAX_Y; j++){
            scents[i][j] = false;
        }
    }
}

const saveStats = function(){
    fs.writeFileSync('output.txt', 'Martian Robots\n' +
        '-------------------------------\n' +
        'Size of Mars: ' + MAX_X + ' ' + MAX_Y + '\n' +
        'Initial coordinates and orientation: ' + robot.x + ' ' + robot.y + ' ' + parseOrientation(robot.orientation) + '\n' +
        'Instructions: ' + instructions + '\n' +
        '\nOutput: ' + output + '\n' +
        'Number of lost robots: ' + lostRobots, function (error) {
        if (error){
            console.error(error);
        }
    });
}

const run = function(coordinates, instruction){

    if (coordinates === ''){
        rl.close();
        console.log(output);
        saveStats();
        process.exit(0);
    }
    robot.x = parseInt(coordinates.split(' ')[0]);
    robot.y = parseInt(coordinates.split(' ')[1]);
    switch (coordinates.split(' ')[2]) {
        case 'N':
            robot.orientation = 90;
            break;
        case 'S':
            robot.orientation = 270;
            break;
        case 'W':
            robot.orientation = 180;
            break;
        case 'E':
            robot.orientation = 0;
            break;
    }

    instructions = [];
    for (let i = 0; i < instruction.length; i++){
        instructions.push(instruction.charAt(i));
    }

    let result;
    for (let i = 0; i < instructions.length; i++){
        result = moveRobot(instructions[i], robot, MAX_X, MAX_Y);
        robot = result.robot;
        if (result.lost){
            break;
        }
    }
    if (result.lost){
        output = output.concat(result.robot.x + ' ' + result.robot.y + ' ' + parseOrientation(result.robot.orientation) + ' LOST\n');
        lostRobots++;
    } else {
        output = output.concat(result.robot.x + ' ' + result.robot.y + ' ' + parseOrientation(result.robot.orientation) + '\n');
    }


    return output;
}




module.exports = {run: run, init: init, saveStats: saveStats};
