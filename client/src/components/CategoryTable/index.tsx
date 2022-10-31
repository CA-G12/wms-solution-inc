import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { AxiosError } from 'axios';
import CategoryInterface from '../../interfaces/CategoryInterface';
import * as Category from '../../api/category';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import './style.css';

export const CategoryTable = (props: {
  setCategory: React.Dispatch<React.SetStateAction<CategoryInterface | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
}) => {
  const [categories, setCategories] = useState<Array<CategoryInterface> | null>(
    null
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [numOfPages, setNumOfPages] = useState<number>(0);

  const handleView = (id: number, name: string) => {
    props.setCategory({
      id,
      name,
      productsCount: 0
    });

    props.setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const list = await Category.getCategories({
          name: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        setIsPending(false);
        setCategories(list.data.items);
        setNumOfPages(Math.ceil(list.data.totalCount / itemsPerPage));
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        setIsPending(false);
      }
    };

    fetchData();
    props.setIsSucceed(false);
  }, [currentPage, props.isSucceed, props.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.search]);

  const handleRemove = async (id: number) => {
    try {
      await Category.deleteOneCategory(id);

      props.setIsSucceed(true);
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  return (
    <div className="data-table">
      <Table responsive primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>Category Name</th>
            <th>Product Count</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : !categories ? (
            <div>No Categories Found</div>
          ) : (
            categories.map(category => {
              return (
                <tr key={category.id}>
                  <td className="category-name">{category.name}</td>
                  <td className="product-count">{category?.productsCount}</td>
                  <td>
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                      <button
                        onClick={e => {
                          handleView(category.id, category.name);
                        }}
                      >
                        <FiEdit2 className="text-blue" /> Edit
                      </button>
                      <button
                        onClick={e => {
                          handleRemove(category.id);
                        }}
                      >
                        <TfiClose className="text-danger" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <TablePagination
        numOfPages={numOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
