/**
 * Created by AshZhang on 2016-4-8.
 */


import dateUtils from '../index';


describe('dateUtils', () => {

	it('run tests successfully', () => {
		expect(1).toEqual(1);
	});

	it('loads the date module', () => {
		expect(dateUtils.addDate).toBeDefined();
	});
});
