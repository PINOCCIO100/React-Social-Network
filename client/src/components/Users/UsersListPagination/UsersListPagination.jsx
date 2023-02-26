import s from './UsersListPagination.module.scss';

let key = Date.now();

export default function UsersListPagination(props) {
  let pages = [];
  for (let page = 1; page <= props.pagesCount; page++) {
    pages[page] = (
      <li
        onClick={() => props.onClick(page)}
        key={key++}
        className={page === props.currentPage ? s.activePage : ""}
      >{page}</li>
    )
  };
  return (
    <ul className={s.UsersListPagination}>
      {
        pages
      }
    </ul>
  );
}
