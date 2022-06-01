"use strict";
exports.__esModule = true;
exports.useAppSelector = exports.useAppStore = exports.createApplicationStore = void 0;
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var application_saga_1 = require("./application.saga");
var project_store_1 = require("./movie/project/project.store");
var page_store_1 = require("./page/page.store");
var projects_slice_1 = require("./projects/projects.slice");
var user_projects_slice_1 = require("./user-projects/user-projects.slice");
var user_store_1 = require("./user/user.store");
function createApplicationStore() {
    var sagaMiddleware = redux_saga_1["default"]();
    var store = redux_1.createStore(redux_1.combineReducers({
        user: user_store_1.userReducer,
        page: page_store_1.pageReducer,
        project: project_store_1.projectReducer,
        projects: projects_slice_1.projectsReducer,
        userProjects: user_projects_slice_1.userProjectsReducer
    }), redux_1.applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(application_saga_1["default"]);
    return store;
}
exports.createApplicationStore = createApplicationStore;
exports.useAppStore = function () {
    return react_redux_1.useStore();
};
exports.useAppSelector = function (selector) {
    return react_redux_1.useSelector(selector);
};
