"use strict";
exports.__esModule = true;
exports.appRoutes = void 0;
exports.appRoutes = {
    root: function () { return '/'; },
    login: function () { return '/login'; },
    register: function () { return '/register'; },
    movie: function (movieId) {
        if (movieId === void 0) { movieId = ':movieId'; }
        return "/movie/" + movieId;
    },
    scenesEditor: function (movieId) {
        if (movieId === void 0) { movieId = ':movieId'; }
        return exports.appRoutes.movie(movieId) + "/scenes";
    },
    createMovie: function () { return '/movie/create'; },
    promo: function () { return '/'; },
    userProjects: function () { return '/my-movies'; }
};
