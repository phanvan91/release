import { Fragment } from 'react';
import UploadForm from './UploadForm'

function Upload() {

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Upload new release</h4>
                <hr />
                <UploadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Upload;
