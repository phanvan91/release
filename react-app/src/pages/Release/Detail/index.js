import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react';
import { useReleaseDetail } from 'hooks/release';
import { nl2br, generateReleaseLink } from 'utils/helper'
import { dateTimeFormat } from 'utils/datetime'


const PLATFORM = {
  'android': {name: 'Android', icon: "platform-android fab fa-android text-success", image: '/images/android.svg'},
  'ios': {name: 'IOS', icon: "platform-android fab fa-apple text-secondary", image: '/images/ios.svg'},
  'windows': {name: 'IOS', icon: "platform-android fab fa-apple text-secondary", image: '/images/windows.svg'},
}

function Home() {
  const query = useParams();
  const navigate = useNavigate();
  const [param, setParam] = useState(null)
  const [release] = useReleaseDetail(param);
  const [selected, setSelected] = useState({})
  useEffect(() => {
    if (release?.data?.length) {
      let item = release?.data.find(e => +e.id === +query.id)
      setSelected(item || release.data[0])
    }
  // eslint-disable-next-line
  }, [release])
  useEffect(() => {
    if (query.slug) {
      setParam({id: query.id})
    }
  // eslint-disable-next-line
  }, [query.slug])

  const bundleLink = generateReleaseLink(selected)

  const _selectItem = (item) => {
    setSelected(item)
    navigate(
      {
        pathname: `/release/${item.id}/${item.project?.name.split(' ').join('-')}-${item.platform}`,
      },
      { replace: true }
    )
  }

  return (
    <Fragment>
      <div className="container-fluid detail-container">
        <div className="row main-detail-banner">
          <div className="col-12">
            <div className="card  " >
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 text-center info-barcode">
                    <div className="qrcode">
                      {/*<QRCodeSVG value={bundleLink} />*/}
                      <QRCodeSVG
                        value={bundleLink}
                        size={230}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={false}
                        imageSettings={{
                          src: PLATFORM[selected?.platform]?.image,
                          x: undefined,
                          y: undefined,
                          height: 40,
                          width: 40,
                          excavate: false,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-7 col-lg-8 col-xl-9 text-sm-start text-center align-self-center info-detail">
                    <div className="info-detail__content">
                      <div className="release-name">
                        <h3>
                          {selected?.title}
                        </h3>
                      </div>
                      <div className="release-version">
                        <h4>
                          Version {selected?.version}
                        </h4>
                      </div>
                      <div className="button btn-download">
                        <a
                          href={bundleLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary text-white">
                          Download &amp; install
                        </a>
                        <span className="px-3 d-none d-md-inline-block update-on">
                          Update on: <strong>{dateTimeFormat(selected?.created_at)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row main-detail-info">
          <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 text-center">
            <div className="list-release mb-3">
              {release?.data?.map((item) => (
                <div key={item.id} className={`border pt-1 pb-1 ${item.id === selected.id ? 'active' : ''}`}>
                  <div className="item d-flex justify-content-between p-3" onClick={() => _selectItem(item)}>
                    <span>{item.version}</span>
                    <span>{dateTimeFormat(item?.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm-6 col-md-7 col-lg-8 col-xl-9 text-sm-start">
            <h5 className="mt-4 mb-3 info-detail-note__title">Release Notes</h5>
            <div className="p-3 ps-4 info-ver-detail">
              <p className="">
                Platform: <strong>{PLATFORM[selected?.platform]?.name}</strong>
              </p>
              <p className="">
                Project: <strong>{selected?.project?.name}</strong>
              </p>
              <p className="">
                Version: <strong>{selected?.version}</strong>
              </p>
              <p className="">
                Environment: <strong>{selected?.environment?.name}</strong>
              </p>
              <p className="">
                Base URL / API URL: <a href={selected?.environment?.baseurl} target="_blank" rel="noreferrer">
                  <strong>{selected?.environment?.baseurl}</strong>
                </a>
              </p>
              <p className="d-block d-md-none">
                Update on: <strong>{dateTimeFormat(selected?.updated_at)}</strong>
              </p>

            </div>
            
            <div className='mt-3 content-note' dangerouslySetInnerHTML={{__html: nl2br(selected?.note)}} />
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
