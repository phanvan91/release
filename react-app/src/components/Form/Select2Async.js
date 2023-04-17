import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import ErrorMEssage from './ErrorMEssage';

const Select2Async = forwardRef(({
  name,
  errors,
  control,
  request,
  // eslint-disable-next-line
}, ref) => {
  // eslint-disable-next-line
  const [inputValue, setIputValue] = useState('')

  const loadOptions = (
    inputValue,
    callback
  ) => {
    if (inputValue) {
      request(inputValue)
        .then(res => {
          let options = res.map(item => ({
            value: item.id,
            label: item.name
          }))
          callback(options);
        })
    } else {
      callback([]);
    }
  };

  const handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');
    setIputValue(inputValue);
    return inputValue;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, ref: customRef } }) => (<AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={handleInputChange}

          ref={customRef}
          onChange={onChange}
          // options={options}
          placeholder={"Select " + name}
          className={errors[name] ? "border border-danger rounded-4" : ''}
          // value={value}
        />)}
      />
      <ErrorMEssage error={errors[name]} />
    </>
  )
});

Select2Async.defaultProps = {
  request: () => {}
}

Select2Async.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.object,
  control: PropTypes.object,
  request: PropTypes.func,
}

Select2Async.displayName = 'Select2Async'

export default Select2Async
