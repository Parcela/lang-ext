/*global describe, it */
"use strict";
var expect = require('chai').expect;
require("lang-ext");

describe('Testing object instance methods', function () {
	var obj = {a:1, b:2, c:3};
	it('each', function () {
		var a = '';
		obj.each(function (value, key) {
			a+=value + key;
		});
		expect(a).be.equal('1a2b3c');
	});
	it('keys', function () {
		expect(obj.keys()).be.eql(Object.keys(obj));
	});
	it('isEmpty', function () {
		expect(obj.isEmpty()).be.false;
		expect({}.isEmpty()).be.true;
	});
	it('map', function () {
		expect(obj.map(function (value, key) {
			return key + value;
		})).be.eql({a:'a1',b:'b2',c:'c3'});
	});
	it('shallowClone', function () {
		var a = obj.shallowClone();
		expect(a).be.eql(obj);
		a.a = 42;
		expect(a).not.be.eql(obj);
		expect(a.a).be.equal(42);
		expect(obj.a).be.equal(1);
	});
	describe('merge', function () {
		it('simple', function () {
			var a = {};
			expect(a.merge(obj)).be.eql(obj);
			expect(a).be.eql(obj);
		});
		it('existing, not forced',  function () {
			var a = {b:42};
			a.merge(obj);
			expect(a).be.eql({a:1,b:42,c:3});
		});
		it('existing, forced',  function () {
			var a = {b:42};
			a.merge(obj, true);
			expect(a).be.eql(obj);
		});
	});
	describe('mergePrototypes', function () {
		it('new empty class', function () {
			var ClassA = Object.createClass(),
			    a = new ClassA();
			ClassA.mergePrototypes(obj);
			expect(a.b).be.eql(2);
			expect(a.hasOwnProperty('b')).be.false;
		});
		it('existing class, not forced',  function () {
			var ClassA = Object.createClass(null, {b: 42}),
			    a = new ClassA();
			ClassA.mergePrototypes(obj);
			expect(a.b).be.eql(42);
			expect(a.hasOwnProperty('b')).be.false;
		});
		it('existing class, forced',  function () {
			var ClassA = Object.createClass(null, {b: 42}),
			    a = new ClassA();
			ClassA.mergePrototypes(obj, true);
			expect(a.b).be.eql(2);
			expect(a.hasOwnProperty('b')).be.false;
		});
	});
	describe('Object.merge', function () {
		it('should mix them up, b should not be overwritten', function () {
			expect(Object.merge(
				{a:1,b:2,c:3},
				{b:5,d:4}
			)).be.eql({a:1,b:2,c:3,d:4});
		});
		it('nulls should be skipped', function () {
			expect(Object.merge(undefined,{a:1,b:2})).be.eql({a:1,b:2});
		});
	});
});
