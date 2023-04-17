import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useInitUser,
  useResetUser,
  useUpdateUser,
} from 'hooks/user';
import { useRoles } from 'hooks/role';

import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import ErrorMEssage from 'components/Form/ErrorMEssage';

import UserFormValidation from './UserFormValidation';

function UserForm({user}) {
  const defaultValues = useInitUser(user)
  useResetUser()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(UserFormValidation)
  });

  const [roles] = useRoles()

  useEffect(() => {
    if (user) {
      reset(defaultValues)
    }
    // eslint-disable-next-line
  }, [user])

  const [loadingUpdate, onUpdate] = useUpdateUser({setError});

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="row mb-3">
        <div className="col-sm-4">
          Email
        </div>
        <div className="col-sm-8">
          <Input
            disabled
            {...register('email')}
            placeholder="email"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Username <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          <Input
            {...register('name')}
            placeholder="name"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Password
        </div>
        <div className="col-sm-8">
          <Input
            type="password"
            {...register('password')}
            placeholder="password"
            errors={errors}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          Roles <span className="text-danger">*</span>
        </div>
        <div className="col-sm-8">
          {roles.map((role, index) => (
            <div key={index}>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`role-${role.id}`}
                  value={role.id}
                  {...register('role_id')}
                />
                <label className="form-check-label" htmlFor={`role-${role.id}`}>
                  {role.display_name}
                </label>
              </div>
            </div>
          ))}
          <ErrorMEssage error={errors?.role_id} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col text-end">
          <Submit
            loading={loadingUpdate}
            className="btn btn-primary text-white"
            label={user ? "Update" : "Create"}
          />
        </div>
      </div>
    </form>
  );
}

export default UserForm;

UserForm.defaultProps = {}

UserForm.propTypes = {
  user: PropTypes.object,
}
