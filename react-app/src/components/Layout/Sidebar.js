import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { Link, useMatch } from "react-router-dom";
// get icon from https://materialdesignicons.com/
import {
  mdiViewDashboard,
  mdiServer,
  mdiProjectorScreenVariant,
  mdiAccountGroup,
} from '@mdi/js';

import { PATH_APP } from 'routes/paths';

const color = '#757575'
const colorSelected = '#fff'

const activeRoute = {
  [PATH_APP.root]: PATH_APP.root,
  [PATH_APP.project]: PATH_APP.project + '/*',
  [PATH_APP.environment]: PATH_APP.environment + '/*',
  [PATH_APP.user]: PATH_APP.user + '/*',
}

MenuLink.defaultProps = {
}

MenuLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
  icon: PropTypes.any,
}

function MenuLink({ label, to, activeOnlyWhenExact, icon }) {
  let match = useMatch({
    path: activeRoute[to],
    exact: activeOnlyWhenExact
  });

  return (
    <li className={match ? "sidebar-item selected" : "sidebar-item"}>
      <Link
        to={to}
        className={`sidebar-link waves-effect waves-dark sidebar-link${match ? " active" : ""}`}
      >
        <Icon
          path={icon}
          title={label}
          size={1}
          color={match ? colorSelected : color}
        />
        <span className="hide-menu mx-2">{label}</span>
      </Link>
    </li>
  );
}

const Sidebar = () => (
  <aside className="left-sidebar" data-sidebarbg="skin6">
    <div className="scroll-sidebar">
      <nav className="sidebar-nav">
        <ul id="sidebarnav">
          <MenuLink to={PATH_APP.root} label="Release" icon={mdiViewDashboard}/>
          <MenuLink to={PATH_APP.project} label="Project" icon={mdiProjectorScreenVariant} />
          <MenuLink to={PATH_APP.environment} label="Environment" icon={mdiServer} />
          <MenuLink to={PATH_APP.user} label="User" icon={mdiAccountGroup} />
        </ul>
      </nav>
    </div>
  </aside>
)

export default Sidebar
