import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';
import { api } from 'shared/api/api';

type ActionCreatoreType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, {
  rejectValue: RejectedValue;
}>

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;

	getState: () => StateSchema;

	actionCreator: ActionCreatoreType<Return, Arg, RejectedValue>;

	api: jest.MockedFunctionDeep<AxiosStatic>;

	navigate: jest.MockedFn<any>;

	constructor(
		actionCreator: ActionCreatoreType<Return, Arg, RejectedValue>,
		state?: DeepPartial<StateSchema>,
	) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn(() => state as StateSchema);
		this.navigate = jest.fn();
		this.api = mockedAxios;
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		const result = await action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });

		return result;
	}
}
