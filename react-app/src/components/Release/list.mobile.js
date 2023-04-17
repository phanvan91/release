import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
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
      classPlafForm = 'platform-windows  fab fa-windows text-info fa-3x';
  }
  return classPlafForm;
}

function ReleaseListMobile ({releases, resParams, onPageChanged, onDelete}) {
  const isAdmin = useRole('admin');

  const fetchMoreData = () => {
    onPageChanged(+resParams.current_page + 1)
  }
  const last_page = Math.ceil(resParams.total / +resParams.per_page)
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={releases.length}
        next={fetchMoreData}
        hasMore={+resParams.current_page < last_page}
        loader={null}
      >
        {releases.map((release, key) => (
          <div className="card item-card-mobile" key={release.id}>
            <div className="card-body">
              <div className=" content-row">
                <div className="item-card-mobile__icon">
                  <div className="white-box text-left">
                    <i className={RenderPlafForm(release.platform)}></i>
                  </div>
                </div>
                <div className="item-card-mobile__info">
                  <p className='updated_at'>{dateTimeFormat(release.updated_at)}</p>
                  <h4 className='name'>{release.project_name}</h4>
                  <p className='title'>{release.title}</p>
                  <p className='name-environment'>
                    {release.env_name}
                    <br />
                    <small>{release.environment?.baseurl}</small>
                  </p>
                </div>
                <div className="item-card-mobile__btn">
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
                  {isAdmin ? <ButtonDelete onDelete={() => onDelete(release)} className="mt-2 mx-0" /> : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </Fragment>
  )
}

export default ReleaseListMobile

ReleaseListMobile.defaultProps = {}

ReleaseListMobile.propTypes = {
  releases: PropTypes.array,
  resParams: PropTypes.object,
  onPageChanged: PropTypes.func,
  onDelete: PropTypes.func,
}
