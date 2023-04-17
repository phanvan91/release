import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { PATH_APP } from 'routes/paths';
import LoadingScreen from '../LoadingScreen';
import { useToken, useUser } from 'hooks/auth';
import { hasRole } from 'utils/entrust/hasRole';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node,
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
};

function AuthProtect({ children, role }) {
  const [isLoading, token] = useToken();
  const [, user] = useUser();

  if (isLoading !== false) {
    return <LoadingScreen />;
  }

  if (!token) {
    // return <Navigate to={PATH_APP.login + '?redirect=' + location.pathname + location.search} />;
    return <Navigate to={PATH_APP.login} />;
  }

  if (role && user && !hasRole(user, role)) {
    return <Navigate to={PATH_APP.root} />;
  }

  return children;
}

export default AuthProtect;
