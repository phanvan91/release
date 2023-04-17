import NavbarHeader from './NavbarHeader'
// import NavbarSearch from './NavbarSearch'
import NavbarUser from './NavbarUser'

function Header () {

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        <NavbarHeader />
        <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
          <ul className="navbar-nav float-start me-auto">
            <li className="nav-item">
              <span className="pr-name">Release zone</span>
            </li>
            {/*<NavbarSearch />*/}
          </ul>
          <ul className="navbar-nav float-end">
            <NavbarUser />
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
