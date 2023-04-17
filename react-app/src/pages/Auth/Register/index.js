import RegisterForm from './RegisterForm'

function Register() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-md-flex">
                <div>
                  <h4 className="card-title">Register</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                  <RegisterForm />
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

export default Register;
