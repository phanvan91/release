import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useInitChangePassword,
  useChangePassword,
  useResetChangePassword,
} from 'hooks/auth/changePassword';

import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';

import ChangePasswordFormValidation from './ChangePasswordFormValidation';

function UploadForm() {
  const defaultValues = useInitChangePassword()
  useResetChangePassword()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(ChangePasswordFormValidation)
  });

  const [loadingSubmit, onSubmit] = useChangePassword({setError});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <div className="col-sm-4">
          Current Password <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            type="password"
            {...register('password')}
            placeholder="********"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          New Password <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            type="password"
            {...register('new_password')}
            placeholder="********"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Confirm New Password <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            type="password"
            {...register('new_password_confirmation')}
            placeholder="********"
            errors={errors}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col text-end">
          <Submit
            loading={loadingSubmit}
            className="btn btn-primary text-white"
            label="Change"
          />
        </div>
      </div>
    </form>
  );
}

export default UploadForm;
