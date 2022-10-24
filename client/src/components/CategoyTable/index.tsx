import { Table } from 'reactstrap';
import './style.css';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineEye } from 'react-icons/hi';
import './style.css';
import CategoryInterface from '../../interfaces/CategoryInterface';
import { useEffect, useState } from 'react';
import Category from '../../api/category';
import { TablePagination } from '../TablePagination';

export const CategoryTable = (props: {
  category: CategoryInterface | null;
  setCategory: React.Dispatch<React.SetStateAction<CategoryInterface | null>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [categories, setCategories] = useState<Array<CategoryInterface> | null>(
    null
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleView = (id: number, name: string) => {
    props.setCategory({
      id: 1,
      name: name,
      productCount: 3
    });
    props.setModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryList = await Category.getAll();
      setCategories(categoryList.data);
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="data-table">
      <Table responsive bordered primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>#</th>
            <th>Category Name</th>
            <th>Product Count</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {!categories ? (
            <div>No Categories Found</div>
          ) : (
            categories.map((category, index) => {
              return (
                <tr key={category.id}>
                  <th scope="row">{++index}</th>
                  <td className="category-name">{category.name}</td>
                  <td className="product-count">{category.productCount}</td>
                  <td className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                    <button
                      onClick={e => {
                        handleView(category.id, category.name);
                      }}
                    >
                      <HiOutlineEye className="text-blue" /> View
                    </button>
                    <button>
                      <TfiClose className="text-danger" /> Remove
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <TablePagination
        pagesCount={Math.ceil(
          (categories ? categories.length : 0) / itemsPerPage
        )}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={categories ? categories.length : 0}
      />
    </div>
  );
};
