import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { isOpen: false },
	reducers: {
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggle } = menuSlice.actions;
export default menuSlice.reducer;
