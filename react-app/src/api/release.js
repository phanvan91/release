import request from './requester';

const release = {
  getAll: params => request.get('release-by-environment', params),
  getDetail: params => request.get('release-lasted/' + params.id, params),
  create: params => request.post('release/register', params),
  delete: params => request.delete(`release/${params.id}`),
};

export default release;
