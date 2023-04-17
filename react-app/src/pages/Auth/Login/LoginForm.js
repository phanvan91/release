import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin, useResetLogin } from 'hooks/auth';
import Input from 'components/Form/Input';
import Submit from 'components/Form/Submit';

const schema = yup.object().shape({
  email: yup.string().email().required("The email field is required"),
  password: yup.string().required("The password field is required"),
});

function Login() {
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
  useResetLogin()

  // const [showPassword, setShowPassword] = useReducer(p => !p, false)

  const [isLoading, onSubmit] = useLogin({setError});

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-md-flex">
                <div>
                  <h4 className="card-title">Login</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                          placeholder="Password"
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="row align-items-center mb-3">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-8">
                        <Submit
                          loading={isLoading}
                          className="btn btn-primary text-white btn-block"
                          label="Login"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-sm-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
