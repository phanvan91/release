import { forwardRef } from 'react';
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form';
import Select2 from 'react-select'
import ErrorMEssage from './ErrorMEssage';

const Select = forwardRef(({
  name,
  options,
  errors,
  control,
  // eslint-disable-next-line
}, ref) => (
  <>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref: customRef } }) => (<Select2
        ref={customRef}
        onChange={onChange}
        options={options}
        placeholder={"Select " + name}
        className={errors[name] ? "border border-danger rounded-4" : ''}
        value={value}
      />)}
    />
    <ErrorMEssage error={errors[name]} />
  </>
));

Select.defaultProps = {}

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.object,
  control: PropTypes.object,
}

Select.displayName = 'Select2'

export default Select
