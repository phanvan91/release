import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import ErrorMEssage from './ErrorMEssage';

const Input = forwardRef(({
  type = 'text',
  onChange,
  placeholder,
  name,
  errors,
  disabled = false
}, ref) => (
  <>
    <input
      ref={ref}
      id={name}
      name={name}
      onChange={onChange}
      type={type}
      className={errors[name] ? 'form-control border border-danger' : 'form-control'}
      placeholder={placeholder}
      disabled={disabled}
    />
    <ErrorMEssage error={errors[name]} />
  </>
));

Input.defaultProps = {
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
}

Input.displayName = 'Input'

export default Input
