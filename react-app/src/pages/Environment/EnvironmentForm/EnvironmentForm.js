import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import Select from 'react-select'

import {
  useInitEnvironment,
  useCreateEnvironment,
  useResetEnvironment,
  useUpdateEnvironment,
} from 'hooks/environment';
import {
  useProjects,
} from 'hooks/project';

import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import ErrorMEssage from 'components/Form/ErrorMEssage';

import EnvironmentFormValidation from './EnvironmentFormValidation';

function EnvironmentForm({environment}) {
  const [projectParams] = useState({per_page: 0})
  const [projects] = useProjects(projectParams)
  const defaultValues = useInitEnvironment(environment, projects)
  useResetEnvironment()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(EnvironmentFormValidation)
  });

  useEffect(() => {
    if (environment) {
      reset(defaultValues)
    }
    // eslint-disable-next-line
  }, [environment, projects])

  const [loadingSubmit, onSubmit] = useCreateEnvironment({setError});
  const [loadingUpdate, onUpdate] = useUpdateEnvironment({setError});

  const optionsProject = projects.map(e => ({value: e.id, label: e.name}))

  return (
    <form onSubmit={handleSubmit(environment ? onUpdate : onSubmit)}>
      <div className="row mb-3">
        <div className="col-sm-4">
          Project <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Controller
            control={control}
            name={'project_id'}
            render={({ field: { onChange, value, ref } }) => (<Select
              ref={ref}
              onChange={onChange}
              options={optionsProject}
              placeholder="Select Project"
              className={errors?.project_id ? "border border-danger rounded-4" : ''}
              value={value}
            />)}
          />
          <ErrorMEssage error={errors?.project_id} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Environment name <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('name')}
            placeholder="Environment name"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Base url <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('baseurl')}
            placeholder="Base url"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Description
        </div>
        <div className="col-sm-8">
          <textarea rows="5" className="form-control" {...register('description')}></textarea>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col text-end">
          <Submit
            loading={environment ? loadingUpdate : loadingSubmit}
            className="btn btn-primary text-white"
            label={environment ? "Update" : "Create"}
          />
        </div>
      </div>
    </form>
  );
}

export default EnvironmentForm;

EnvironmentForm.defaultProps = {}

EnvironmentForm.propTypes = {
  environment: PropTypes.object,
}
