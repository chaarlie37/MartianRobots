# MartianRobots

## Description

Some robots will be deployed to Mars and need to be controlled from Earth. With this program the user can control them. Mars is represented as a grid and the robots are located with 2D coordinates and its orientation (North, Souh, West, East).

## Usage

### Method 1: installing source code (needs to have NodeJS installed)

1. Download source code from GitHub: [link](https://github.com/chaarlie37/MartianRobots/archive/refs/heads/master.zip)
2. Unzip source code into an empty folder
3. Open terminal and execute app.js
```bash
node app.js
```
4. Type input. First of all it needs two integers separated with a space representing the size of Mars. For example, if you need a 5x3 grid you type
```bash
5 3
```
and you press Enter.
Then you can type the robot instructions, consisting of: starting coordinates represented by two integers, initial orientation (N, S, W or E) in one line, and in another one the series of instructions without spaces, which consists of the letters F (the robot moves forward one grid point in the current orientation), L (the orientation turn left) or R (the orientation turn right).
For example, if you want to introduce a robot starting at coordinates (1, 1) looking East, with the instructions RFRFRFRF you need to type
```bash
1 1 E
RFRFRFRF
```

You can deploy as many robots as you want. A complete input, including three robots would be, for example:
```bash
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

When you finish deploying robots, to see the output you need to press Enter twice.

### Method 2: Using API Rest

An API Rest is available to use this program without installing it. Everyone can just introduce input with a browser or Postman with this link to have an output:
https://martianrobots-csm37.herokuapp.com/

Then you can type the robot instructions, consisting of: starting coordinates represented by two integers, initial orientation (N, S, W or E) in one line, and in another one the series of instructions without spaces, which consists of the letters F (the robot moves forward one grid point in the current orientation), L (the orientation turn left) or R (the orientation turn right).

To get a correct output you must type the input correctly as following:

```
https://martianrobots-csm37.herokuapp.com/<X_SIZE>-<Y_SIZE>/<INITIAL_X>_<INITIAL_Y>_<INITIAL_ORIENTATION>-<INSTRUCTIONS>
```

For example, if you want to set a grid size of 5x3, and a robot with initial coordinates (1, 1) looking East, with instructions RFRFRFRF you would query with this link:
```
https://martianrobots-csm37.herokuapp.com/5-3/1_1_E-RFRFRFRF
```

You can deploy as many robots as you want. To deploy more than one you simply separate robots information with character @. For example, this would be a complete input with 3 robots:

```
https://martianrobots-csm37.herokuapp.com/5-3/1_1_E-RFRFRFRF@3_2_N-FRRFLLFFRRFLL@0_3_W-LLFFFLFLFL
```

Output will be a JSON object containing a string with the final positions.

## Output

The output consists of the final coordinates of the robots and their orientation at the end of the instructions. If a robot moves off the edge of the grid, position will be the last one inside it with the word LOST. When a robot moves off it leaves a scent, so it prevents next robots to fall (they will ignore the instructions to move off).



