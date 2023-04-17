import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import {
  useProjects,
  useProjectsQueryParams,
  useProjectsResParams,
  useDeleteProject
} from 'hooks/project';

import Breadcrumb from "components/Breadcrumb"
import Pagination from "components/Pagination"
import ButtonDelete from "components/Form/ButtonDelete"

const breadcrumb = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Project List', url: null, icon: null},
]

function Product() {
  const navigate = useNavigate();
  const searchQuery = useProjectsQueryParams();
  const [projects] = useProjects(searchQuery);
  const resParams = useProjectsResParams();
  const [, handleDelete] = useDeleteProject(searchQuery);

  const changeParams = (type, value) => {
    const params = {...searchQuery}
    params[type] = value
    if (type !== 'page') {
      params.page = 1
    }
    navigate(
      {
        pathname: '/project',
        search: `?${queryString.stringify(params)}`,
      },
      { replace: true }
    )
  }

  const onPageChanged = (page) => {
    changeParams('page', page)
  }

  const deleteProject = (project) => {
    handleDelete({id: project.id})
  }

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={breadcrumb}
        title="Project List"
        showButton
        buttonText={'Create project'}
        buttonAction={"/project/create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card main-body-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-hover align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0">Name</th>
                        <th className="border-top-0">Git url</th>
                        <th className="border-top-0">Description</th>
                        <th className="border-top-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>{project.name}</td>
                          <td>{project.giturl}</td>
                          <td>{project.description}</td>
                          <td className="text-end">
                            <Link className="btn btn-sm btn-primary text-white" to={`/project/${project.id}/edit`}>
                              Edit
                            </Link>
                            <ButtonDelete onDelete={() => deleteProject(project)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav className="pagination-content">
                  {resParams.total ? <Pagination
                    totalRecords={+resParams.total}
                    pageLimit={+resParams.per_page}
                    pageNeighbours={2}
                    currentPage={+resParams.current_page}
                    onPageChanged={onPageChanged}
                    className="pt-0"
                  /> : null}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
