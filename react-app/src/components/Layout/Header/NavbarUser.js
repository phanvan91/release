import { useReducer, Fragment, useRef } from 'react'
import { Link } from "react-router-dom";
import { useToken, useUser, useLogout } from 'hooks/auth';
import useClickOutSide from 'hooks/useClickOutSide';
import { PATH_APP } from 'routes/paths';
import { generateUsernameIcon } from 'utils/helper'
import profileDefaultImg from "assets/images/users/1.jpg"
// import profileImg from "assets/images/users/profile.png"

function NavbarUser () {
  const [, token] = useToken();
  const [, user] = useUser();
  const logout = useLogout()
  const [dropdownOpen, setDropdownOpen] = useReducer(p => !p, false)

  const ref = useRef();
  useClickOutSide(ref, () => dropdownOpen ? setDropdownOpen() : null);

  const handleLogout = () => {
    logout()
  }

  return (
    <li className="nav-item dropdown" ref={ref}>
      <a
        className={`nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic ${dropdownOpen ? 'show' : ''}`}
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={setDropdownOpen}>
        {token && user
          ? (
            <span className="btn btn-circle d-flex btn-info text-white align-items-center justify-content-center">
              {generateUsernameIcon(user?.name)}
            </span>
          ) : <img src={profileDefaultImg} alt="user" className="rounded-circle" width="31" />
        }
        {/*<img src={token ? profileImg : profileDefaultImg} alt="user" className="rounded-circle" width="31" />*/}
      </a>
      <ul
        className={`dropdown-menu dropdown-menu-end user-dd animated ${dropdownOpen ? 'show' : ''}`}
        aria-labelledby="navbarDropdown"
        onClick={setDropdownOpen}>
        {token ? (
          <Fragment>
            {/*<a className="dropdown-item">
              <i className="mdi mdi-account-outline m-r-5 m-l-5"></i>
              My Profile
            </a>*/}
            <Link className="dropdown-item" to={PATH_APP.changePassword}>
              <i className="ti-shield m-r-5 m-l-5"></i>
              Change password
            </Link>
            <a className="dropdown-item" onClick={handleLogout}>
              <i className="mdi mdi-logout m-r-5 m-l-5"></i>
              Logout
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <Link className="dropdown-item" to={PATH_APP.login}>
              <i className="mdi mdi-login m-r-5 m-l-5"></i>
              Login
            </Link>
            {/*<Link className="dropdown-item" to={PATH_APP.register}>
              <i className="mdi mdi-account-plus m-r-5 m-l-5"></i>
              Register
            </Link>*/}
          </Fragment>
        )}
      </ul>
    </li>
  )
}

export default NavbarUser
