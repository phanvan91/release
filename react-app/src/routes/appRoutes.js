import { PATH_APP } from './paths';
import { lazy } from 'react';
import Layout from 'components/Layout';
// import AuthWrapper from 'pages/Auth/Wrapper';
import AuthProtect from 'components/Auth/AuthProtect';

const AppRoutes = [
  // {
  //   path: '/project/*',
  //   layout: null,
  //   routes: [
  //     {
  //       path: PATH_APP.project.list,
  //       guard: AuthProtect,
  //       role: 'admin',
  //       layout: Layout,
  //       component: lazy(() => import('pages/Project'))
  //     },
  //     {
  //       path: PATH_APP.project.create,
  //       guard: AuthProtect,
  //       role: 'admin',
  //       layout: Layout,
  //       component: lazy(() => import('pages/Project/ProjectForm'))
  //     },
  //   ]
  // },
  {
    path: PATH_APP.project,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Project'))
  },
  {
    path: PATH_APP.projectCreate,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Project/ProjectForm'))
  },
  {
    path: PATH_APP.projectEdit,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Project/ProjectForm'))
  },

  {
    path: PATH_APP.environment,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Environment'))
  },
  {
    path: PATH_APP.environmentCreate,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Environment/EnvironmentForm'))
  },
  {
    path: PATH_APP.environmentEdit,
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Environment/EnvironmentForm'))
  },

  // {
  //   path: PATH_APP.user,
  //   guard: AuthProtect,
  //   role: 'admin',
  //   layout: Layout,
  //   component: lazy(() => import('pages/User'))
  // },
  {
    path: PATH_APP.user + '/*',
    guard: AuthProtect,
    role: 'admin',
    layout: Layout,
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('pages/User'))
      },
      {
        exact: true,
        path: '/:id/edit',
        component: lazy(() => import('pages/User/UserForm'))
      },
      {
        exact: true,
        path: 'create',
        component: lazy(() => import('pages/User/Create'))
      },
    ]
  }
];

// console.log(AppRoutes, 'AppRoutesAppRoutesAppRoutes');

export default AppRoutes;
