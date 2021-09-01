const express = require('express');
const bodyParser = require('body-parser');
const mars = require('./app');

const app = express();
console.log('Server started.');

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());

const router = express.Router();
app.use('/', router);

router.get('/:size/:input', (req, res) => {
    let size = req.params.size;
    size = size.replace('-', ' ');
    mars.init(size);
    let input = req.params.input;
    input = input.replace(/_/g, ' ');
    console.log(input);
    let splittedInput = input.split('@');
    let output;
    for (let i = 0; i < splittedInput.length; i++){
        output = mars.run(splittedInput[i].split('-')[0], splittedInput[i].split('-')[1]);
    }
    res.status(200).json({
       output: output
    });
});

// 5-3/1_1_E-RFRFRFRF@3_2_N-FRRFLLFFRRFLL@0_3_W-LLFFFLFLFL

module.exports = {api: app};
