import { connect } from "react-redux";
import { compose } from "redux";
import { setCurrentPage, getUsers } from '../../../store/reducers/usersPageReducer';

import UsersListPagination from "./UsersListPagination";

function UsersListPaginationAPI(props) {
  const onClick = (page) => {
    props.setCurrentPage(page);
    props.getUsers();
  }
  return (
    <UsersListPagination
      onClick={onClick}
      pagesCount={props.pagesCount}
      currentPage={props.currentPage} />
  );
}

export default compose(
  connect(
    (state) => ({
      pagesCount: Math.ceil(state.UsersPage.totalUsersCount / state.UsersPage.pageSize),
      currentPage: state.UsersPage.currentPage,
    }),
    {
      setCurrentPage,
      getUsers,
    }
  ),
)(UsersListPaginationAPI)