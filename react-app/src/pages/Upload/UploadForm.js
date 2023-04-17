import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import { useInitRelease, useCreateRelease, useResetRelease } from 'hooks/release';
import { useProjects, /*asyncProjects*/ } from 'hooks/project';
import { useEnvironments, /*asyncEnvironments*/ } from 'hooks/environment';

import Input from 'components/Form/Input';
import Select2 from 'components/Form/Select2';
import Submit from 'components/Form/Submit';

import UploadFormValidation from './UploadFormValidation';

const platforms = [
  {value: 'android', label: 'Android'},
  {value: 'ios', label: 'IOS'},
  {value: 'windows', label: 'Windows'},
]

function UploadForm() {
  const defaultValues = useInitRelease()
  useResetRelease()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(UploadFormValidation)
  });

  const [projectParams] = useState({per_page: 0})
  const [projects] = useProjects(projectParams)
  const environmentParams = useMemo(() => ({
    per_page: 0,
    project_id: watch('project').value
    // eslint-disable-next-line
  }), [watch('project')])
  const [environments] = useEnvironments(environmentParams);

  const [loadingSubmit, onSubmit] = useCreateRelease({setError});

  const optionsProject = projects.map(e => ({value: e.id, label: e.name}))
  const optionEnvironments = watch('project').value ? environments.map(e => ({value: e.id, label: e.name})) : []

  useEffect(() => {
    if (watch('project')) {
      setValue("environment", "")
    }
    // eslint-disable-next-line
  }, [watch('project')]);

  // const requestProjects = inputValue => {
  //   return asyncProjects({
  //     name: inputValue,
  //     per_page: 0,
  //   })
  // }

  // const requestEnvironments = inputValue => {
  //   return asyncEnvironments({
  //     name: inputValue,
  //     per_page: 0,
  //     project_id: watch('project').value
  //   })
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <div className="col-sm-4">
          Project <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Select2
            name={'project'}
            options={optionsProject}
            errors={errors}
            control={control}
            // request={requestProjects}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Platform <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Select2
            name={'platform'}
            options={platforms}
            errors={errors}
            control={control}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Environment <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Select2
            name={'environment'}
            options={optionEnvironments}
            errors={errors}
            control={control}
            // request={requestEnvironments}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Version <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('version')}
            placeholder="Version"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Release title <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('title')}
            placeholder="Title"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Release notes
        </div>
        <div className="col-sm-8">
          <textarea rows="5" className="form-control" {...register('note')}></textarea>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Bundle <span className="text-danger">*</span>
        </div>
        {watch('platform')?.value === 'windows' ? (
          <div className="col-sm-8">
            <div className="row col">
              <label>
                <h5>Select file windows</h5>
                <Input
                  type="file"
                  {...register('windows')}
                  placeholder="windows"
                  errors={errors}
                />
              </label>
            </div>
          </div>
        ) : null}
        {watch('platform')?.value === 'android' ? (
          <div className="col-sm-8">
            <div className="row col">
              <label>
                <h5>Select file APK</h5>
                <Input
                  type="file"
                  {...register('apk')}
                  placeholder="apk"
                  errors={errors}
                />
              </label>
            </div>
          </div>
        ) : null}
        {watch('platform')?.value === 'ios' ? (
          <div className="col-sm-8">
            <div className="row col">
              <label>
                <h5>Select file .ipa</h5>
                <Input
                  type="file"
                  {...register('ipa')}
                  placeholder="ipa"
                  errors={errors}
                />
              </label>
            </div>
            <div className="row mt-3">
              <div className="col">
                <h5>Plist meta</h5>
                <label className="row">
                  <div className="col-sm-3"> Bundle-identifier:</div>
                  <div className="col-sm-9">
                    <Input
                      {...register('bundleIdentifier')}
                      placeholder="Bundle identifier"
                      errors={errors}
                    />
                  </div>
                </label>
                <label className="row">
                  <div className="col-sm-3"> Bundle-version:</div>
                  <div className="col-sm-9">
                    <Input
                      {...register('bundleVersion')}
                      placeholder="Bundle version"
                      errors={errors}
                    />
                  </div>
                </label>
                <label className="row">
                  <div className="col-sm-3">Title:</div>
                  <div className="col-sm-9">
                    <Input
                      {...register('bundleTitle')}
                      placeholder="Bundle title"
                      errors={errors}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <hr />
      <div className="row">
        <div className="col text-end">
          <Submit
            loading={loadingSubmit}
            className="btn btn-primary text-white"
            label="Upload"
          />
        </div>
      </div>
    </form>
  );
}

export default UploadForm;
