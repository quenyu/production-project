import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage/localstorage';
import axios from 'axios';

interface LoginByUsername {
  username: string,
  password: string,
}

export const loginByUsername = createAsyncThunk<User, LoginByUsername, { rejectValue: string }>(
	'users/fetchByIdStatus',
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await axios.post<User>('http://localhost:8000/login', {
				username, password,
			});

			if (!response.data) {
				throw new Error();
			}

			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
			thunkAPI.dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(('error'));
		}
	},
);
