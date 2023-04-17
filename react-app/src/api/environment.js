import request from './requester';

const environment = {
  getAll: params => request.get('environment', params),
  create: params => request.post('environment/create', params),
  update: params => request.post(`environment/${params.id}`, params),
  getDetail: params => request.get(`environment/${params.id}`, params),
  delete: params => request.delete(`environment/${params.id}`),
};

export default environment;
