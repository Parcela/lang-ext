/*global describe, it */
"use strict";
var expect = require('chai').expect;
require("lang-ext");

// Shape - superclass
//function Shape(x, y) {
//	this.x = x || 0;
//	this.y = y || 0;
//}
//
//// superclass method
//Shape.prototype.move = function (x, y) {
//	this.x += x;
//	this.y += y;
//};

var Shape = Object.createClass(function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
},{
	move: function (x, y) {
		this.x += x;
		this.y += y;
	}
});
var Circle = Shape.subClass(
	function (x, y, r) {
		this.r = r || 1;
		Circle.superclass.constructor.call(this, x, y);
	},{
		area: function () {
			return this.r * this.r * Math.PI;
		}
	}
);

describe('shape', function () {
	describe('empty constructor', function () {
		var s = new Shape();
		it('Should be located at 0,0', function () {
			expect(s.x).be.equal(0);
			expect(s.y).be.equal(0);
		});
	});
	describe('created with arguments', function () {
		var s = new Shape(1, 2);
		it('Should be located at 1,2', function () {
			expect(s.x).be.equal(1);
			expect(s.y).be.equal(2);
		});
		it('Should be an instance of Shape', function () {
			expect(s).be.an.instanceof(Shape);
		});
	});
});
describe('Circle', function () {
	describe('initialized circle', function () {
		var c = new Circle(1, 2, 3);
		it('should be instance of Shape and Circle', function () {
			expect(c).be.an.instanceof(Circle);
			expect(c).be.an.instanceof(Shape);
		});
		it('Should be located at 1,2, radious 3', function () {
			expect(c.x).be.equal(1);
			expect(c.y).be.equal(2);
			expect(c.r).be.equal(3);
		});
	});
	describe('Should be able to access methods of both classes', function () {

		var c = new Circle(1, 2, 3);
		it('Method of the parent class', function () {
			c.move(1, 1);
			expect(c.x).be.equal(2);
			expect(c.y).be.equal(3);
			expect(c.r).be.equal(3);
		});
		it('method of the new class', function () {
			expect(c.area()).be.closeTo(28.274, 0.001);
		});
	});
});
