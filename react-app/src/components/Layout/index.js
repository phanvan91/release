import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRole } from 'hooks/auth';
import { useToggleSibar } from 'hooks/siteSetting';
import useBreakpoint from 'hooks/useBreakpoint';
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const isAdmin = useRole('admin');
  const [showSidebar] = useToggleSibar()
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (!isAdmin) {
      if (!document.body.classList.contains("no-sidebar")) {
        document.body.classList.add("no-sidebar")
      }
    } else {
      if (document.body.classList.contains("no-sidebar")) {
        document.body.classList.remove("no-sidebar")
      }
    }
  }, [isAdmin])

  return (
    <div
      id="main-wrapper"
      className={showSidebar ? "show-sidebar" : ""}
      data-layout="vertical"
      data-navbarbg="skin5"
      data-sidebartype={breakpoint.width < 768 ? "mini-sidebar" : 'full'}
      data-sidebar-position="absolute"
      data-header-position="absolute"
      data-boxed-layout="full"
    >
      <Header />
      {isAdmin ? <Sidebar /> : null}
      <div className={isAdmin ? "page-wrapper" : "page-wrapper mx-0"}>
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout

Layout.defaultProps = {}

Layout.propTypes = {
  children: PropTypes.object,
}
