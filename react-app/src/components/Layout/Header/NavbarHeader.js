import { useRole } from 'hooks/auth';
import { useToggleSibar } from 'hooks/siteSetting';
import Logo from '../../Logo'

function NavbarHeader () {
  const isAdmin = useRole('admin')
  const [, toggleSibar] = useToggleSibar()

  return (
    <div className="navbar-header" data-logobg="skin6">
      <Logo />
      {isAdmin ? (
        <a className="nav-toggler waves-effect waves-light d-block d-md-none pl-0" onClick={toggleSibar}>
          <i className="mdi mdi-menu"></i>
        </a>
      ) : null}
    </div>
  )
}

export default NavbarHeader
