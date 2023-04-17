import request from './requester';

const role = {
  getAll: params => request.get('auth/roles', params),
};

export default role;
