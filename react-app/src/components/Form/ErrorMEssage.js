import PropTypes from 'prop-types'

const ErrorMEssage = ({error}) => error && <p className="text-danger mb-1">{error.message}</p>

export default ErrorMEssage

ErrorMEssage.propTypes = {
  error: PropTypes.object,
}
