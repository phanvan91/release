import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import Select from 'react-select'

import { useProjects } from 'hooks/project';
import {
  useEnvironments,
  useEnvironmentsQueryParams,
  useEnvironmentsResParams,
  useDeleteEnvironment,
} from 'hooks/environment';

import Breadcrumb from "components/Breadcrumb"
import Pagination from "components/Pagination"
import ButtonDelete from "components/Form/ButtonDelete"

const breadcrumb = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'Environment List', url: null, icon: null},
]

function Product() {
  const navigate = useNavigate();
  const [projectParams] = useState({
    per_page: 10,
    page: 1,
  })
  const [projects] = useProjects(projectParams)

  const searchQuery = useEnvironmentsQueryParams();
  const [environments] = useEnvironments(searchQuery);
  const resParams = useEnvironmentsResParams();
  const [, handleDelete] = useDeleteEnvironment(searchQuery);

  const changeParams = (type, value) => {
    const params = {...searchQuery}
    params[type] = value
    if (type !== 'page') {
      params.page = 1
    }
    navigate(
      {
        pathname: '/environment',
        search: `?${queryString.stringify(params)}`,
      },
      { replace: true }
    )
  }

  const onPageChanged = (page) => {
    changeParams('page', page)
  }

  const onChangeFilter = (type, value) => {
    changeParams(type, value?.value)
  }

  const deleteEnvironment = (environment) => {
    handleDelete({id: environment.id})
  }

  const optionsProject = projects.map(e => ({value: e.id, label: e.name}))

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={breadcrumb}
        title="Environment List"
        showButton
        buttonText={'Add environment'}
        buttonAction={"/environment/create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card filter-content">
              <div className="card-body ">
                <div className="row">
                  <div className="col-md-9 col-lg-7">
                    <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                      <div className="col-sm-6 col-md-4 col-12">
                        <div className="d-flex align-items-center select2-common">
                          <label htmlFor="project_id" className="visually-hidden">project_id</label>
                          <Select
                            options={optionsProject}
                            value={optionsProject.find(e => e.value == searchQuery.project_id)}
                            onChange={(value) => onChangeFilter('project_id', value)}
                            placeholder="Select Project"
                            isClearable
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card main-body-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-hover align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0">project</th>
                        <th className="border-top-0">Name</th>
                        <th className="border-top-0">Base url</th>
                        <th className="border-top-0">Description</th>
                        <th className="border-top-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {environments.map((environment) => (
                        <tr key={environment.id}>
                          <td>{environment.project?.name}</td>
                          <td>{environment.name}</td>
                          <td>{environment.baseurl}</td>
                          <td>{environment.description}</td>
                          <td className="text-end">
                            <Link className="btn btn-sm btn-primary text-white" to={`/environment/${environment.id}/edit`}>
                              Edit
                            </Link>
                            <ButtonDelete onDelete={() => deleteEnvironment(environment)} />
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
