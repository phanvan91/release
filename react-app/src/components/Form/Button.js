import PropTypes from 'prop-types'

const Button = ({label, loading, className = '', onClick}) => (
  <>
    <button
      type="button"
      className={`submit-btn ${className}`}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : ''}
    </button>
  </>
);

export default Button

Button.defaultProps = {
  onClick: () => {}
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
}
