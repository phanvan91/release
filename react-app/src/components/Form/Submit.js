import PropTypes from 'prop-types'

const Submit = ({label, loading, className = ''}) => (
  <>
    <button
      type="submit"
      className={`submit-btn${className ? (' ' + className) : ''}`}
      disabled={loading}
    >
      {label}
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : ''}
    </button>
  </>
);

export default Submit

Submit.defaultProps = {}

Submit.propTypes = {
  label: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
}
