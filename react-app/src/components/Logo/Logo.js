import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
// import LogoIconImg from "../../assets/images/logo-icon.png"
// import LogoLightIconImg from "../../assets/images/logo-light-icon.png"
// import LogoTextImg from "../../assets/images/logo-text.png"
import LogoLightMobile from "../../assets/images/logo-mobile.svg"

const LogoIconImg = "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM29NSmc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bbd18e9ae3da72080ee81f503b10920e9dbf1aaa/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--ee4e4854f68df0a745312d63f6c2782b5da346cd/Screen%20Shot%202022-03-18%20at%2010.06.31.png"
const LogoLightIconImg = "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM29NSmc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bbd18e9ae3da72080ee81f503b10920e9dbf1aaa/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--ee4e4854f68df0a745312d63f6c2782b5da346cd/Screen%20Shot%202022-03-18%20at%2010.06.31.png"

const Logo = ({ to }) => (
  <Link to={to} className="navbar-brand">
    <b className="logo-icon">
      <img src={LogoIconImg} alt="homepage" className="dark-logo w-100 h-100" />
      <img src={LogoLightIconImg} alt="homepage" className="light-logo w-100 h-100" />
      <img src={LogoLightMobile} alt="homepage" className="light-logo-mobile d-none w-100 h-100" />
    </b>
    {/*<span className="logo-text">
      <img src={LogoTextImg} alt="homepage" className="dark-logo" />
      <img src={LogoLightTextImg} className="light-logo" alt="homepage" />
    </span>*/}
  </Link>
)

export default Logo

Logo.defaultProps = {
  to: '/'
}

Logo.propTypes = {
  to: PropTypes.string,
}
