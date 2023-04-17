import { PATH_APP } from './paths';
import { Route, Routes } from 'react-router-dom'
import { Suspense, Fragment, lazy } from 'react';
import LoadingScreen from './../components/LoadingScreen';
import appRoutes from './appRoutes';
import Layout from 'components/Layout';
// import AuthWrapper from 'pages/Auth/Wrapper';
import AuthProtect from 'components/Auth/AuthProtect';
import GuestProtect from 'components/Auth/GuestProtect';

export function renderRoutes(routes = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const role = route.role || null;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          const renderPage = <Layout>
            {route.routes ? (
              renderRoutes(route.routes)
            ) : (
              <Component />
            )}
          </Layout>

          const element = route.guard
            ? <Guard role={role}>{renderPage}</Guard>
            : <Guard>{renderPage}</Guard>

          return (
            <Route
              key={i}
              path={route.path}
              exact={true}
              element={element}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

const routes = [
  {
    path: PATH_APP.login,
    guard: GuestProtect,
    layout: Layout,
    component: lazy(() => import('pages/Auth/Login'))
  },
  // {
  //   path: PATH_APP.register,
  //   guard: GuestProtect,
  //   layout: Layout,
  //   component: lazy(() => import('pages/Auth/Register'))
  // },
  {
    path: PATH_APP.changePassword,
    guard: AuthProtect,
    layout: Layout,
    component: lazy(() => import('pages/Auth/ChangePassword'))
  },
  
  {
    path: PATH_APP.root,
    layout: Layout,
    component: lazy(() => import('pages/Home'))
  },
  {
    path: PATH_APP.upload,
    guard: AuthProtect,
    // role: 'admin',
    layout: Layout,
    component: lazy(() => import('pages/Upload'))
  },
  {
    path: PATH_APP.releaseDetail,
    layout: Layout,
    component: lazy(() => import('pages/Release/Detail'))
  },
  {
    path: PATH_APP.releaseDetailSlug,
    layout: Layout,
    component: lazy(() => import('pages/Release/Detail'))
  },

  ...appRoutes,
];

export default routes;
