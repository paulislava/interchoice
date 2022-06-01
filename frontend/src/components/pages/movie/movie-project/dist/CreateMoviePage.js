"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.CreateMoviePage = void 0;
var React = require("react");
var react_final_form_1 = require("react-final-form");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var FormInput_1 = require("components/common/fields/form-input/FormInput");
var project_actions_1 = require("root/store/movie/project/project.actions");
var FileInput_1 = require("components/common/fields/file-input/FileInput");
var application_store_1 = require("root/store/application.store");
var appRoutes_1 = require("root/appRoutes");
var GradientButton_1 = require("components/common/buttons/gradient-button/GradientButton");
exports.CreateMoviePage = function () {
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var project = application_store_1.useAppSelector(function (state) { return state.project.value; });
    react_1.useEffect(function () {
        if (project)
            history.push(appRoutes_1.appRoutes.scenesEditor(project.projectId));
    }, [project]);
    return (React.createElement(react_final_form_1.Form, { onSubmit: function (formData) {
            dispatch(project_actions_1.createProject.request(formData));
        } }, function (props) { return (React.createElement("form", { onSubmit: props.handleSubmit },
        React.createElement(react_final_form_1.Field, { name: 'Name' }, function (props) { return (React.createElement(FormInput_1.FormInput, __assign({ placeholder: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435', label: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435' }, props.input))); }),
        React.createElement(react_final_form_1.Field, { name: 'Overview' }, function (props) { return (React.createElement(FileInput_1.FileInput, __assign({}, props.input, { onChange: function () { return false; }, onChoose: function (value) { return props.input.onChange(value); }, label: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0432\u044C\u044E' }))); }),
        React.createElement(react_final_form_1.Field, { name: 'ShortDescription' }, function (props) { return (React.createElement(FormInput_1.FormInput, __assign({ placeholder: '\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435', label: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435', multiline: true }, props.input))); }),
        React.createElement(react_final_form_1.Field, { name: 'FullDescription' }, function (props) { return (React.createElement(FormInput_1.FormInput, __assign({ placeholder: '\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435', label: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435', multiline: true }, props.input))); }),
        React.createElement(GradientButton_1.GradientButton, { type: 'submit' }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0444\u0438\u043B\u044C\u043C"))); }));
};
