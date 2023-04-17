import { Fragment } from 'react';
import { useParams } from 'react-router-dom'

import { useUserDetail } from 'hooks/user';

import UserForm from './UserForm'
import Breadcrumb from "components/Breadcrumb"
import LoadingScreen from "components/LoadingScreen"

const breadcrumbCreate = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'User', url: '/user', icon: null},
  {name: 'Create', url: null, icon: null},
]

const breadcrumbEdit = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'User', url: '/user', icon: null},
  {name: 'Edit', url: null, icon: null},
]

function UserFormPage() {
  const params = useParams()
  const [user, isLoading] = useUserDetail(params.id ? params : null);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={params.id ? breadcrumbEdit : breadcrumbCreate}
        title={params.id ? "User Edit" : "User Create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  {params.id ? "User Edit" : "Create new user"}
                </h4>
                <hr />
                <UserForm user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserFormPage;
