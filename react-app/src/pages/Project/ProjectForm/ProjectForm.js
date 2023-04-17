import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useInitProject,
  useCreateProject,
  useResetProject,
  useUpdateProject,
} from 'hooks/project';

import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';

import ProjectFormValidation from './ProjectFormValidation';

function ProjectForm({project}) {
  const defaultValues = useInitProject(project)
  useResetProject()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ProjectFormValidation)
  });

  useEffect(() => {
    if (project) {
      reset(defaultValues)
    }
    // eslint-disable-next-line
  }, [project])

  const [loadingSubmit, onSubmit] = useCreateProject({setError});
  const [loadingUpdate, onUpdate] = useUpdateProject({setError});

  return (
    <form onSubmit={handleSubmit(project ? onUpdate : onSubmit)}>
      <div className="row mb-3">
        <div className="col-sm-4">
          Project name <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('name')}
            placeholder="Name"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Git url <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('giturl')}
            placeholder="Git url"
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
            loading={project ? loadingUpdate : loadingSubmit}
            className="btn btn-primary text-white"
            label={project ? "Update" : "Create"}
          />
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;

ProjectForm.defaultProps = {}

ProjectForm.propTypes = {
  project: PropTypes.object,
}
