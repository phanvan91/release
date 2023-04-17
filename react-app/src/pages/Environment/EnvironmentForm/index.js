import { Fragment } from 'react';
import { useParams } from 'react-router-dom'

import { useEnvironmentDetail } from 'hooks/environment';

import EnvironmentForm from './EnvironmentForm'
import Breadcrumb from "components/Breadcrumb"
import LoadingScreen from "components/LoadingScreen"

const breadcrumbCreate = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Environment', url: '/environment', icon: null},
  {name: 'Create', url: null, icon: null},
]

const breadcrumbEdit = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Environment', url: '/environment', icon: null},
  {name: 'Edit', url: null, icon: null},
]

function EnvironmentFormPage() {
  const params = useParams()
  const [environment, isLoading] = useEnvironmentDetail(params.id ? params : null);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={params.id ? breadcrumbEdit : breadcrumbCreate}
        title={params.id ? "Environment Edit" : "Environment Create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  {params.id ? "Environment Edit" : "Create new environment"}
                </h4>
                <hr />
                <EnvironmentForm environment={environment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EnvironmentFormPage;
