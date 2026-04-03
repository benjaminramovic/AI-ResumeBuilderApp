import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: '',
        loading: true,
},
reducers: {
    login: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
    },
    logout: (state) => {
        state.user = null;
        state.token = '';
        localStorage.removeItem('token');
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    }
}
});

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
