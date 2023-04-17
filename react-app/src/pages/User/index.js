import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { useUsersQueryParams, useUsers, useUsersResParams, useDeleteUser } from 'hooks/user';

import Breadcrumb from "components/Breadcrumb"
import Pagination from "components/Pagination"
import ButtonDelete from "components/Form/ButtonDelete"

const breadcrumb = [
  {name: '', url: '/', icon: 'mdi mdi-home-outline fs-4'},
  {name: 'User List', url: null, icon: null},
]

const roleColor = {
  "user": 'info',
  "admin": 'success',
}

function Product() {
  const navigate = useNavigate();

  const searchQuery = useUsersQueryParams();
  const [users] = useUsers(searchQuery);
  const resParams = useUsersResParams();
  const [, handleDelete] = useDeleteUser(searchQuery);

  const changeParams = (type, value) => {
    const params = {...searchQuery}
    params[type] = value
    if (type !== 'page') {
      params.page = 1
    }
    navigate(
      {
        pathname: '/user',
        search: `?${queryString.stringify(params)}`,
      },
      { replace: true }
    )
  }

  const onPageChanged = (page) => {
    changeParams('page', page)
  }

  const deleteUser = (user) => {
    handleDelete({id: user.id})
  }

  return (
    <Fragment>
      <Breadcrumb
        breadcrumb={breadcrumb}
        title="User List"
        showButton
        buttonText={'Create user'}
        buttonAction={"/user/create"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card main-body-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-hover align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th className="border-top-0">ID</th>
                        <th className="border-top-0">Name</th>
                        <th className="border-top-0">Email</th>
                        <th className="border-top-0">Roles</th>
                        <th className="border-top-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {(user.roles || []).map(e => (
                              <span
                                className={`mx-1 badge bg-${roleColor[e.role_name]}`}
                                key={`role${user.id}-${e.id}`}
                              >
                                {e.display_name}
                              </span>
                            ))}
                          </td>
                          <td className="text-end">
                            {/*{!hasRole(user, 'admin') ? (*/}
                            <Link
                              className="btn btn-sm btn-primary text-white"
                              to={`/user/${user.id}/edit`}
                            >
                              Edit
                            </Link>
                            <ButtonDelete onDelete={() => deleteUser(user)} />
                            {/*) : null}*/}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
