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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.FormInput = void 0;
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
var react_input_mask_1 = require("react-input-mask");
var styles_styl_1 = require("./styles.styl");
function FormInput(props) {
    var _a, _b;
    var onValueChange = props.onValueChange, fieldProps = __rest(props, ["onValueChange"]);
    var onChange = fieldProps.onChange, onBlur = fieldProps.onBlur, onFocus = fieldProps.onFocus, value = fieldProps.value, inputProps = __rest(fieldProps, ["onChange", "onBlur", "onFocus", "value"]);
    var invalid = Boolean(((_a = props.meta) === null || _a === void 0 ? void 0 : _a.touched) && props.meta.invalid);
    var type = props.type;
    var mask = '';
    if (type === 'date') {
        type = 'text';
        mask = '99.99.9999';
    }
    if (type === 'tel') {
        mask = '+7 (999) 999 99-99';
    }
    var onChangeFinal = function (event) {
        if (onChange)
            onChange(event);
        if (onValueChange)
            onValueChange(event.currentTarget.value);
    };
    var input = (React.createElement(TextField_1["default"], __assign({}, (mask ? inputProps : fieldProps), { type: type, variant: 'outlined', inputProps: {
            className: 'browser-default'
        }, InputProps: {
            classes: {
                root: styles_styl_1["default"].field,
                input: styles_styl_1["default"].input,
                focused: styles_styl_1["default"].focused
            }
        }, InputLabelProps: {
            classes: {
                root: styles_styl_1["default"].label,
                focused: styles_styl_1["default"].focusedLabel
            }
        }, classes: {
            root: styles_styl_1["default"].root
        }, className: [styles_styl_1["default"].fieldContainer, invalid ? styles_styl_1["default"].dirty : undefined].join(' '), onChange: mask ? undefined : onChangeFinal })));
    return (React.createElement("div", { className: styles_styl_1["default"].container },
        mask && (React.createElement(react_input_mask_1["default"], { onChange: onChangeFinal, onFocus: onFocus, onBlur: onBlur, value: String(value), mask: mask }, function () { return input; })),
        !mask && input,
        invalid && React.createElement("div", { className: styles_styl_1["default"].error }, (_b = props.meta) === null || _b === void 0 ? void 0 : _b.error)));
}
exports.FormInput = FormInput;
