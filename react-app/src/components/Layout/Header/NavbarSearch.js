function NavbarSearch () {

  return (
    <li className="nav-item search-box">
      <a className="nav-link waves-effect waves-dark" href="#">
        <i className="mdi mdi-magnify me-1"></i> <span className="font-16">Search</span>
      </a>
      <form className="app-search position-absolute">
        <input type="text" className="form-control" placeholder="Search &amp; enter" />
        {' '}
        <a className="srh-btn"><i className="mdi mdi-window-close"></i></a>
      </form>
    </li>
  )
}

export default NavbarSearch
