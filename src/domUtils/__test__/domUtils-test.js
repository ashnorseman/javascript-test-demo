/**
 * Created by AshZhang on 2016-4-8.
 */


import domUtils from '../index';


describe('dateUtils', () => {
	let fixture;


	beforeEach(() => {
		fixture = document.createElement('div');
		document.body.appendChild(fixture);
	});

	afterEach(() => {
		document.body.removeChild(fixture);
	});


	it('append dom contents', () => {
		fixture.innerHTML = '<span>TEST</span>';

		expect(domUtils.getText(fixture)).toEqual('TEST');
	});
});
