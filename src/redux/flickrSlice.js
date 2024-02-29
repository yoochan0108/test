import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFlickr = createAsyncThunk('flickr/request', async (opt) => {
	let url = '';
	const api_key = '2a1a0aebb34012a99c23e13b49175343';
	const method_interest = 'flickr.interestingness.getList';
	const num = 50;
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
	}
	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
	}
	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
	}
	const result = await axios.get(url);
	return result.data.photos.photo;
});

const flickrSlice = createSlice({
	name: 'flickr',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchFlickr.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchFlickr.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchFlickr.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default flickrSlice.reducer;

/*
  redux 시스템은 컴포넌트 외부에서 독립적으로 동작되야 하기 때문에
  부수효과(Side effect)를 발생시키지 않는 순수함수(Pure function) 형태로 작성되야함
*/
