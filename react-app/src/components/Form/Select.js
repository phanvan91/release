import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import ErrorMEssage from './ErrorMEssage';

const Select = forwardRef(({
  onChange,
  name,
  label,
  options,
  optionValue,
  optionName,
  errors,
}, ref) => (
  <>
    <select
      ref={ref}
      id={name}
      name={name}
      onChange={onChange}
      className={errors[name] ? 'form-control border border-danger' : 'form-control'}>
      <option value="">Select {label}</option>
      {options.map((option) => 
        <option
          value={option[optionValue] || option}
          key={option[optionValue] || option}>
          {option[optionName] || option}
        </option>)
      }
    </select>
    <ErrorMEssage error={errors[name]} />
  </>
));

Select.defaultProps = {
  optionValue: "id",
  optionName: "name",
}

Select.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.object,
  optionValue: PropTypes.string,
  optionName: PropTypes.string,
}

Select.displayName = 'Select'

export default Select
