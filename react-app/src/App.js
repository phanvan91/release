import routes, { renderRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useToken, useProfile } from 'hooks/auth';
import { setupAxios, setAxiosToken } from 'api/requester';
import LoadingScreen from './components/LoadingScreen';

// import i18n (needs to be bundled ;)) 
// import './i18n';

import 'theme/scss/style.scss';

const history = createBrowserHistory();

function App() {
  setupAxios()
  const [, token] = useToken();

  // setup axios token
  setAxiosToken(token)
  const [, loading] = useProfile();

  if (loading !== false) {
    return <LoadingScreen />
  }
  
  return (
    <BrowserRouter history={history}>
      {renderRoutes(routes, loading)}
    </BrowserRouter>
  );
}

export default App;
