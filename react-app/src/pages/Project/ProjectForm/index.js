import { Fragment } from 'react';
import { useParams } from 'react-router-dom'

import { useProjectDetail } from 'hooks/project';

import ProjectForm from './ProjectForm'
import Breadcrumb from "components/Breadcrumb"
import LoadingScreen from "components/LoadingScreen"

const breadcrumbCreate = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Project', url: '/project', icon: null},
  {name: 'Create', url: null, icon: null},
]

const breadcrumbEdit = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Project', url: '/project', icon: null},
  {name: 'Edit', url: null, icon: null},
]

function ProjectFormPage() {
  const params = useParams()
  const [project, isLoading] = useProjectDetail(params.id ? params : null);

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={params.id ? breadcrumbEdit : breadcrumbCreate}
        title={params.id ? "Project Edit" : "Project Create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  {params.id ? "Project Edit" : "Create new project"}
                </h4>
                <hr />
                <ProjectForm project={project} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProjectFormPage;
