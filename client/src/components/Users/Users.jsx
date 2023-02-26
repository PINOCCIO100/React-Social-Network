import s from './Users.module.scss';
import UsersListContainer from './UsersList/UsersListContainer';
import UsersListPaginationContainer from './UsersListPagination/UsersListPaginationContainer';

function Users() {
  return (
    <div className={s.Users}>
      <UsersListPaginationContainer />
      <UsersListContainer />
    </div>
  );
}

export default Users;