export const apiRoutes = {
  login: (): string => `/Login`,
  register: (): string => `/Register`,
  currentUser: (): string => '/user',
  createProject: (): string => '/project',
  project: (projectId: string): string => `/project/${projectId}/summary`,
  projectScenes: (projectId: string): string => `/project/${projectId}/scenes`,
  scene: (sceneId: string): string => `/scene/${sceneId}`,
  sceneCoordinates: (sceneId: string): string => `${apiRoutes.scene(sceneId)}/coordinates`
}
