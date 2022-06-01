"use strict";
exports.__esModule = true;
exports.useRoutes = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthPage_1 = require("./components/pages/auth/AuthPage");
var RegPage_1 = require("./components/pages/register/RegPage");
var ScenesEditor_1 = require("./components/pages/movie/scenes-editor/ScenesEditor");
var appRoutes_1 = require("./appRoutes");
var AuthorizedRoute_1 = require("components/common/AuthorizedRoute");
var CreateMoviePage_1 = require("components/pages/movie/movie-project/CreateMoviePage");
var MoviePlayer_1 = require("components/pages/movie/player/MoviePlayer");
var PromoPage_1 = require("components/pages/promo/PromoPage");
var UserProjects_1 = require("components/pages/user-projects/UserProjects");
exports.useRoutes = function () {
    return (react_1["default"].createElement(react_router_dom_1.Switch, null,
        react_1["default"].createElement(react_router_dom_1.Route, { path: appRoutes_1.appRoutes.promo(), exact: true, component: PromoPage_1.PromoPage }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: appRoutes_1.appRoutes.login(), exact: true, component: AuthPage_1.AuthPage }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: appRoutes_1.appRoutes.register(), component: RegPage_1.RegPage, exact: true }),
        react_1["default"].createElement(AuthorizedRoute_1.AuthorizedRoute, { path: appRoutes_1.appRoutes.createMovie(), component: CreateMoviePage_1.CreateMoviePage, exact: true }),
        react_1["default"].createElement(react_router_dom_1.Route, { path: appRoutes_1.appRoutes.movie(), component: MoviePlayer_1.MoviePlayer, exact: true }),
        react_1["default"].createElement(AuthorizedRoute_1.AuthorizedRoute, { path: appRoutes_1.appRoutes.scenesEditor(), component: ScenesEditor_1.ScenesEditor, exact: true }),
        react_1["default"].createElement(AuthorizedRoute_1.AuthorizedRoute, { path: appRoutes_1.appRoutes.userProjects(), component: UserProjects_1.UserProjectsPage, exact: true }),
        react_1["default"].createElement(react_router_dom_1.Redirect, { to: appRoutes_1.appRoutes.createMovie() })));
};
