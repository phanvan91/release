import request from './requester';

const project = {
  getAll: params => request.get('project', params),
  create: params => request.post('project/create', params),
  update: params => request.post(`project/${params.id}`, params),
  getDetail: params => request.get(`project/${params.id}`, params),
  delete: params => request.delete(`project/${params.id}`),
};

export default project;
