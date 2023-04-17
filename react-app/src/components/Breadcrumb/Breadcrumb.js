import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Breadcrumb = ({
  breadcrumb,
  title,
  showButton,
  buttonAction,
  buttonText,
}) => (
  <div className="page-breadcrumb">
    <div className="row align-items-center">
      <div className="col-6">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 d-flex align-items-center">
            {breadcrumb.map((b, key) => (
              <Fragment key={key}>
                {b.url && (
                  <li className="breadcrumb-item">
                    <Link to={b.url} className="link">
                      {b.icon && <i className={b.icon}></i>}
                      {b.icon && ' '}
                      {b.name}
                    </Link>
                  </li>
                )}
                {!b.url && <li className="breadcrumb-item active">{b.name}</li>}
              </Fragment>
            ))}
          </ol>
        </nav>
        {title ? <h1 className="mb-0 fw-bold">{title}</h1> : null}
      </div>
      <div className="col-6">
        {showButton ? (
          <div className="text-end upgrade-btn">
            <Link to={buttonAction} className="btn btn-primary text-white">
              {buttonText}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  </div>
)

export default Breadcrumb

Breadcrumb.defaultProps = {
  breadcrumb: [],
  title: '',
  showButton: false,
}

Breadcrumb.propTypes = {
  title: PropTypes.string,
  breadcrumb: PropTypes.array,
  className: PropTypes.string,
  showButton: PropTypes.bool,
  buttonAction: PropTypes.func,
  buttonText: PropTypes.string,
}
