import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.css';
import './style.css';

export const TablePagination = (props: {
  totalItems: number;
  pagesCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= props.pagesCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination
      aria-label="Page navigation example"
      className="d-flex justify-content-end"
    >
      <PaginationItem disabled>
        <PaginationLink first href="#" />
      </PaginationItem>
      {pageNumbers.map(pageNumber => {
        console.log(pageNumber);
        return (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              onClick={e => {
                props.setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem>
        <PaginationLink href="#" last />
      </PaginationItem>
    </Pagination>
  );
};
