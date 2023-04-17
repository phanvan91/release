import { Fragment } from 'react';
import ChangePasswordForm from './ChangePasswordForm'

function ChangePassword() {

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Change Password</h4>
                <hr />
                <ChangePasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ChangePassword;
