import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import CopyToClipboard from '../CopyToClipboard'
import { dateTimeFormat } from 'utils/datetime'
import ButtonDelete from "../Form/ButtonDelete"

import { useRole } from 'hooks/auth';
const RenderPlafForm  = (type) =>{
  let classPlafForm = ''
  switch(type) {
    case 'android':
      classPlafForm = 'platform-android fab fa-android text-success fa-3x';
      break;
    case 'ios':
      classPlafForm = 'platform-apple fab fa-apple text-secondary fa-3x';
      break;
    default:
      classPlafForm = 'platform-windows  fab fa-windows fa-3x';
  }
  return classPlafForm;
}

function ReleaseListDesktop ({releases, resParams, onPageChanged, onDelete}) {
  const isAdmin = useRole('admin');
  return (
    <Fragment>
      <div className="card main-body-table">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table mb-0 table-hover align-middle text-nowrap">
              <thead>
                <tr>
                  <th className="border-top-0"></th>
                  <th className="border-top-0">Updated at</th>
                  <th className="border-top-0">Project</th>
                  <th className="border-top-0">Environment</th>
                  <th className="border-top-0">Version</th>
                  <th className="border-top-0">Title</th>
                  <th className="border-top-0"></th>
                </tr>
              </thead>
              <tbody>
                {releases.map((release, key) => (
                  <tr key={release.id}>
                    <td><i className={RenderPlafForm(release.platform)}></i></td>
                    <td>{dateTimeFormat(release.updated_at)}</td>
                    <td>{release.project_name}</td>
                    <td className='white-space-norwrap '>
                      <label className='m-0 pr-1'>{release.env_name}</label>
                      <br />
                      <small>{release.baseurl}</small>
                    </td>
                    <td>{release.version}</td>
                    <td>{release.title}</td>
                    <td className="text-end">
                      <Link
                        className="btn btn-sm btn-primary text-white"
                        to={`/release/${release.id}/${release.project_name.split(' ').join('-')}-${release.platform}`}
                      >
                        Detail
                      </Link>
                      <CopyToClipboard
                        text="Share"
                        content={`${window.location.origin}/release/${release.id}/${release.project_name.split(' ').join('-')}-${release.platform}`}
                        index={key}
                        textCopied="Copied share link to clipboard"
                      />
                      {isAdmin ? <ButtonDelete onDelete={() => onDelete(release)} className="mx-0" /> : null}
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
    </Fragment>
  )
}

export default ReleaseListDesktop

ReleaseListDesktop.defaultProps = {}

ReleaseListDesktop.propTypes = {
  releases: PropTypes.array,
  resParams: PropTypes.object,
  onPageChanged: PropTypes.func,
  onDelete: PropTypes.func,
}
