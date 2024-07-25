import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const newReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>,
) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: Dev,
		preloadedState: initialState,
	});

	// TODO
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};
