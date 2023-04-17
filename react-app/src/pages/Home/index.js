import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import Select from 'react-select'

import { useReleasesQueryParams, useReleases, useReleasesResParams, useDeleteRelease } from 'hooks/release';
import { useProjects } from 'hooks/project';
import { useEnvironments } from 'hooks/environment';
import { useToken } from 'hooks/auth';
import useBreakpoint from 'hooks/useBreakpoint';

import ReleaseListDesktop from 'components/Release/list.desktop'
import ReleaseListMobile from 'components/Release/list.mobile'

const optionsPlatform = [
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'IOS' },
  { value: 'windows', label: 'Windows' },
]

function Home() {
  const navigate = useNavigate();
  const searchQuery = useReleasesQueryParams();
  const [releases] = useReleases(searchQuery);
  const [, handleDelete] = useDeleteRelease(searchQuery);
  const resParams = useReleasesResParams();

  const breakpoint = useBreakpoint();
  const [, token] = useToken();

  const [projectParams] = useState({per_page: 0})
  const [projects] = useProjects(projectParams)

  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate(
        {
          pathname: '/',
        },
        { replace: true }
      )
    }
    // eslint-disable-next-line
  }, [])

  const [environmentParams, setEnvironmentParams] = useState({
    per_page: 0,
    project_id: searchQuery.project_id || null
  })
  const [environments] = useEnvironments(searchQuery.project_id ? environmentParams : null);

  const changeParams = (type, value) => {
    const params = {...searchQuery}
    params[type] = value
    if (type !== 'page') {
      params.page = 1
    }
    if (type === 'project_id') {
      params.env_id = undefined
      setEnvironmentParams(p => ({...p, project_id: value}))
    }
    navigate(
      {
        pathname: '/',
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

  const optionsProject = projects.map(e => ({value: e.id, label: e.name}))
  const optionEnvironments = searchQuery.project_id ? environments.map(e => ({value: e.id, label: e.name})) : []

  return (
    <Fragment>
      <div className="container-fluid home-container">
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
                      <div className="col-sm-6 col-md-4 col-12">
                        <div className="d-flex align-items-center select2-common">
                          <label htmlFor="env_id" className="visually-hidden">environment</label>
                          <Select
                            options={optionEnvironments}
                            value={optionEnvironments.find(e => e.value == searchQuery.env_id) || null}
                            onChange={(value) => onChangeFilter('env_id', value)}
                            placeholder="Select Environment"
                            isClearable
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-12">
                        <div className="d-flex align-items-center select2-common">
                          <label htmlFor="platform" className="visually-hidden">platform</label>
                          <Select
                            options={optionsPlatform}
                            value={optionsPlatform.find(e => e.value == searchQuery.platform)}
                            onChange={(value) => onChangeFilter('platform', value)}
                            placeholder="Select Platform"
                            isClearable
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  {token ? <div className="col-md-3 col-lg-5">
                    <div className="text-md-end mt-md-0 mt-2">
                      <Link to={'/upload'} className="btn btn-primary mb-2 me-2 text-white">
                        <i className="mdi mdi-upload me-1"></i> Upload
                      </Link>
                    </div>
                  </div> : null}
                </div>
              </div>
            </div>
            {breakpoint.width >= 768 ? (
              <ReleaseListDesktop
                releases={releases}
                resParams={resParams}
                onPageChanged={onPageChanged}
                onDelete={handleDelete}
              />
            ) : (
              <ReleaseListMobile
                releases={releases}
                resParams={resParams}
                onPageChanged={onPageChanged}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
