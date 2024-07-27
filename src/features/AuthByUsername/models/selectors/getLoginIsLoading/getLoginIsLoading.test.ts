import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
	test('Boolean value', () => {
		const state: DeepPartial<StateSchema> = {
			login: {
				isLoading: true,
			},
		};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
	});
	test('Empty value', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
	});
});
