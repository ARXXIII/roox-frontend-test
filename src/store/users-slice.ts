import axios from 'axios'

import { RootState } from './store'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type Geo = {
	lat: string
	lng: string
}

type Address = {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: Geo
}

type Company = {
	name: string
	catchPhrase: string
	bs: string
}

interface User {
	id: number
	name: string
	username: string
	email: string
	address: Address
	phone: string
	website: string
	company: Company
	comment?: string
}

interface UsersState {
	users: User[]
}

const initialState: UsersState = {
	users: [],
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await axios.get<User[]>(
		'https://jsonplaceholder.typicode.com/users'
	)

	return response.data
})

export const fetchUserById = createAsyncThunk(
	'users/fetchUserById',
	async (id: number, { dispatch, getState }) => {
		const state = getState() as RootState
		const users = state.users.users

		if (users.length === 0) {
			// Если массив пустой, загружаем всех пользователей
			const allUsers = await dispatch(fetchUsers()).unwrap()

			const foundUser = allUsers.find((user) => user.id === id)
			if (foundUser) return foundUser
		}

		// Если массив users не пустой или пользователь не найден после загрузки всех
		const response = await axios.get<User>(
			`https://jsonplaceholder.typicode.com/users/${id}`
		)
		return response.data
	}
)

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<User>) => {
			const updatedUser = action.payload
			const index = state.users.findIndex(
				(user) => user.id === updatedUser.id
			)
			if (index !== -1) {
				state.users[index] = updatedUser
			} else {
				state.users.push(updatedUser)
			}
		},
		sortByCity(state) {
			state.users.sort((a, b) =>
				a.address.city.localeCompare(b.address.city)
			)
		},
		sortByCompany(state) {
			state.users.sort((a, b) =>
				a.company.name.localeCompare(b.company.name)
			)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				const fetchedUser = action.payload
				const existingUser = state.users.find(
					(user) => user.id === fetchedUser.id
				)
				if (!existingUser) {
					state.users.push(fetchedUser)
				}
			})
	},
})

export const { updateUser, sortByCity, sortByCompany } = usersSlice.actions
export default usersSlice.reducer
