"use strict";
exports.__esModule = true;
exports.UserProjectsPage = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var Loader_1 = require("components/Loader");
var application_store_1 = require("root/store/application.store");
var projects_slice_1 = require("root/store/projects/projects.slice");
exports.UserProjectsPage = function () {
    var projects = application_store_1.useAppSelector(function (state) { return state.userProjects.value; });
    var pending = application_store_1.useAppSelector(function (state) { return state.userProjects.pending; });
    var dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        dispatch(projects_slice_1.userProjectsActions.fetch());
    }, []);
    if (pending) {
        return React.createElement(Loader_1.Loader, null);
    }
    return (React.createElement(React.Fragment, null, projects.map(function (project) { return (React.createElement("div", { key: project.projectId }, project.name)); })));
};
