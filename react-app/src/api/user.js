import request from './requester';

const user = {
  getAll: params => request.get('auth/user', params),
  login: user => request.post('auth/login', user),
  register: user => request.post('auth/register', user),
  profile: () => request.get('auth/me'),
  changePassword: (param) => request.post('auth/change-password', param),
  getDetail: params => request.get(`auth/user/${params.id}`, params),
  update: params => request.post(`auth/user/${params.id}`, params),
  delete: params => request.delete(`auth/user/${params.id}`),
};

export default user;
