// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  app: '/'
};

export const PATH_APP = {
  root: ROOTS.app,
  login: path(ROOTS.app, 'login'),
  register: path(ROOTS.app, 'register'),
  upload: path(ROOTS.app, 'upload'),
  releaseDetail: path(ROOTS.app, 'release/:id'),
  releaseDetailSlug: path(ROOTS.app, 'release/:id/:slug'),
  changePassword: path(ROOTS.app, 'change-pasword'),

  project: path(ROOTS.app, 'project'),
  projectCreate: path(ROOTS.app, 'project/create'),
  projectEdit: path(ROOTS.app, 'project/:id/edit'),

  environment: path(ROOTS.app, 'environment'),
  environmentCreate: path(ROOTS.app, 'environment/create'),
  environmentEdit: path(ROOTS.app, 'environment/:id/edit'),
  
  user: path(ROOTS.app, 'user'),
  userCreate: path(ROOTS.app, 'user/create'),
};
