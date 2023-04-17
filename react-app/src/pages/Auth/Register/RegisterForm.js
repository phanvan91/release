import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegister, useResetRegister } from 'hooks/auth';
import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';

const schema = yup.object().shape({
  email: yup.string()
    .email()
    .required("The email field is required"),
  name: yup.string()
    .required("The username field is required"),
  password: yup.string()
    .required("The password field is required")
    .min(6, 'The password must be at least 6 characters.'),
  // password_confirmation: yup.string()
  //   .oneOf([yup.ref('password'), null], 'Passwords confirmation must match'),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // email: "phanvan92ff9@gmail.com",
      // password: "123456",
    },
    resolver: yupResolver(schema)
  });
  useResetRegister()

  const [isLoading, onSubmit] = useRegister({setError});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row align-items-center mb-3">
        <div className="col-sm-4">Username</div>
        <div className="col-sm-8">
          <Input
            {...register('name')}
            placeholder="Username"
            errors={errors}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <div className="col-sm-4">Email</div>
        <div className="col-sm-8">
          <Input
            {...register('email')}
            placeholder="Email"
            errors={errors}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <div className="col-sm-4">Password</div>
        <div className="col-sm-8">
          <Input
            type={'password'}
            {...register('password')}
            placeholder="******"
            errors={errors}
          />
        </div>
      </div>
      {/*<div className="row align-items-center mb-3">
        <div className="col-sm-4">Password confirmation</div>
        <div className="col-sm-8">
          <Input
            type={'password'}
            {...register('password_confirmation')}
            placeholder="password_confirmation"
            errors={errors}
          />
        </div>
      </div>*/}
      <div className="row align-items-center mb-3">
        <div className="col-sm-4"></div>
        <div className="col-sm-8">
          <Submit
            loading={isLoading}
            className="btn btn-primary text-white btn-block"
            label="Register"
          />
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
