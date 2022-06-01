"use strict";
exports.__esModule = true;
exports.userProjectsActions = exports.userProjectsReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    value: [],
    pending: false,
    error: null
};
var projectsSlice = toolkit_1.createSlice({
    name: 'userProjectsSelector',
    initialState: initialState,
    reducers: {
        fetch: function (state) {
            state.pending = true;
        },
        fetchSuccess: function (state, action) {
            state.pending = false;
            state.value = action.payload;
        },
        fetchFailure: function (state, action) {
            state.pending = false;
            state.error = action.payload;
        }
    }
});
exports.userProjectsReducer = projectsSlice.reducer, exports.userProjectsActions = projectsSlice.actions;
