const mars = require('./app');
const assert = require('assert');


describe('MartianRobots with size 5 3', function () {
        mars.init('5 3');
        describe('1 1 E' +
            'RFRFRFRF', function () {
                it('should return 1 1 E\n', function () {
                        assert.equal(mars.run('1 1 E', 'RFRFRFRF'), '1 1 E\n');
                });
        });
        describe('3 2 N' +
        'FRRFLLFFRRFLL', function () {
                it('should return 3 3 N LOST\n', function () {
                        assert.equal(mars.run('3 2 N', 'FRRFLLFFRRFLL'), '1 1 E\n3 3 N LOST\n');
                });
        });
        describe('0 3 W' +
            'LLFFFLFLFL', function () {
                it('should return 3 3 N LOST\n', function () {
                        assert.equal(mars.run('0 3 W', 'LLFFFLFLFL'), '1 1 E\n3 3 N LOST\n2 3 S\n');
                });
        });
        mars.saveStats();
});



