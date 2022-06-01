"use strict";
exports.__esModule = true;
exports.apiRoutes = void 0;
exports.apiRoutes = {
    login: function () { return "/Login"; },
    register: function () { return "/Register"; },
    currentUser: function () { return '/user'; },
    createProject: function () { return '/project'; },
    project: function (projectId) { return "/project/" + projectId + "/summary"; },
    projectScenes: function (projectId) { return "/project/" + projectId + "/scenes"; },
    scene: function (sceneId) { return "/scene/" + sceneId; },
    sceneVideo: function (sceneId) { return exports.apiRoutes.scene(sceneId) + "/video"; },
    sceneCoordinates: function (sceneId) { return exports.apiRoutes.scene(sceneId) + "/coordinates"; },
    connection: function () { return "/nodes-connection"; },
    userProjects: function () { return "/user/projects"; }
};
