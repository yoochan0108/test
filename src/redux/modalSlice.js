import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { IsOpen: false },
	reducers: {
		open: (state) => (state.modal = true),
		close: (state) => (state.modal = false),
	},
});
export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
