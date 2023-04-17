import { Fragment } from 'react';

import Breadcrumb from "components/Breadcrumb"
import RegisterForm from './../Auth/Register/RegisterForm'

const breadcrumbCreate = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'User', url: '/user', icon: null},
  {name: 'Create', url: null, icon: null},
]

function UserCreate() {
  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={breadcrumbCreate}
        title={"User Create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  {"Create new user"}
                </h4>
                <hr />
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserCreate;
