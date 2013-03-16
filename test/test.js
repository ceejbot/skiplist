/*global describe:true, it:true, before:true, after:true */

var
	chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should(),
	util = require('util'),
	Skiplist = require('../index')
	;

function makeAnimalList()
{
	var list = new Skiplist(20);
	list.insert('cat', 'Cats are cute.');
	list.insert('dog', 'Dogs are loyal.');
	list.insert('aardvark', 'Aardvarks are long-nosed.');
	list.insert('wallaby', 'Wallabies bounce.');
	list.insert('caracal', 'Caracals are pretty.');
	list.insert('leopard', 'Leopards are spotted.');
	list.insert('pangolin', 'Pangolins trundle.');
	list.insert('ayeaye', 'Ayeaye are weird drinkers.');

	return list;
}

describe('Skiplist', function()
{
	describe('#insert()', function()
	{
		it('adds an item to the skiplist', function()
		{
			var list = new Skiplist(10);
			list.length().should.equal(0);
			list.insert('key', 'value');
			list.length().should.equal(1);

			var result = list.match('key');
			result.should.equal('value');
		});

		it('updates an existing item', function()
		{
			var list = new Skiplist(10);
			list.length().should.equal(0);
			list.insert('key', 'value');
			list.length().should.equal(1);

			list.insert('key', 'another value');
			list.length().should.equal(1);

			var result = list.match('key');
			result.should.equal('another value');
		});
	});

	describe('#find()', function()
	{
		it('returns an array containing the entire contents of the list', function()
		{
			var list = makeAnimalList();
			var results = list.find();
			results.should.be.an('array');
			results.length.should.equal(8);
		});

		it('emits its items as events as well', function()
		{
			var list = makeAnimalList();
			var results = [];
			list.addListener('find', function(item)
			{
				results.push(item);
			});
			list.addListener('done', function()
			{
				results.length.should.equal(8);
			});

			list.find();
		});

		it('emits in sorted order', function()
		{
			var list = makeAnimalList();
			var results = [];
			list.addListener('find', function(item)
			{
				results.push(item);
			});
			list.addListener('done', function()
			{
				results[0][0].should.equal('aardvark');
				results[3][0].should.equal('cat');
				results[7][0].should.equal('wallaby');
			});

			list.find();
		});

		it('returns the result of a search reversed', function()
		{
			var list = makeAnimalList();
			var results = list.find(null, true);
			results.should.be.an('array');
			results.length.should.equal(8);
			results[7][0].should.equal('aardvark');
			results[4][0].should.equal('cat');
			results[0][0].should.equal('wallaby');
		});


		it('with a parameter, it emits items greater than the passed-in key', function()
		{
			var list = makeAnimalList();
			var results = list.find('dog');
			results.should.be.ok;
			results.should.be.an('array');
			results.length.should.equal(4);
		});
	});

	describe('#match()', function()
	{
		it('returns nodes with keys matching the input', function()
		{
			var list = makeAnimalList();
			var result = list.match('cat');
			result.should.be.ok;
			result.should.be.a('string');
			result.should.equal('Cats are cute.');
		});

		it('returns null when no match is found', function()
		{
			var list = makeAnimalList();
			var result = list.match('caz');
			assert.equal(result, null, 'should not have found something!');
		});
	});

	describe('#remove()', function()
	{
		it('removes items from the structure', function()
		{
			var list = makeAnimalList();
			var result = list.match('cat');
			result.should.be.ok;
			list.remove('cat').should.equal(true);
			assert.equal(list.match('cat'), null, 'cat did not get removed');
			list.length().should.equal(7);
		});

		it('returns false when asked to remove an item not in the list', function()
		{
			var list = makeAnimalList();
			assert.equal(list.remove('coati'), false, 'coati should not be in the list');
		});

		it('can delete all entries in the list', function()
		{
			var list = makeAnimalList();
			var items = list.find();
			for (var i = 0; i < items.length; i++)
				list.remove(items[i][0]);

			assert.equal(list.length(), 0);
		});
	});


});
