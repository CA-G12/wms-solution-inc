import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Table } from 'reactstrap';
import {
  getAllProductsAPI,
  updateProductAPI,
  deleteProductAPI
} from '../../api/products';
import { DeleteModal } from '../../components/DeleteModal';
import { ModalEdit } from '../../components/ModalEdit';
import { TablePagination } from '../../components/TablePagination';
import { TableProductRow } from '../../components/TableProductRow';
import { Product } from '../../interfaces/ProductInterface';
import './style.css';

const Products = () => {
  const [itemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [products, setProducts] = useState([] as Product[]);
  const [{ editMode, productId }, setEditMode] = useState({
    editMode: false,
    productId: '-1'
  });
  const [updateTable, setUpdateTable] = useState(false);
  const [{ alertModal, deleteProductId }, setDeleteModal] = useState({
    alertModal: false,
    deleteProductId: -1
  });

  const startEditMode = (productId: string) => {
    setEditMode({ editMode: !editMode, productId });
  };

  const update = async (id: number, updatedProduct: Product) => {
    try {
      const result = await updateProductAPI(id, updatedProduct);
      if (result.status === 404) throw new Error('Product has not found.');
      const product = result.data;
      if (!product) throw new Error('Something went wrong !!!');
      startEditMode('-1');
      setUpdateTable(!updateTable);
    } catch (error) {
      const exception = error as Error;
      toast.error(exception.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const deleteProduct = async () => {
    try {
      const result = await deleteProductAPI(deleteProductId);
      if (result.status !== 202)
        throw new Error('Something went wrong, please try again later.');
      setUpdateTable(!updateTable);
    } catch (error) {
      const exception = error as Error;
      toast.error(exception.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const toggleAlertModal = (id: number) => {
    setDeleteModal({ alertModal: !alertModal, deleteProductId: id });
  };

  useEffect(() => {
    getAllProductsAPI()
      .then(result => {
        console.log('result', result);
        setProducts(result.data);
        setTotalItems(result.data.length);
      })
      .catch(err => {
        console.log(err);
      });
  }, [updateTable]);

  return (
    <div className="product-page-body">
      <DeleteModal
        deleteProduct={deleteProduct}
        modal={alertModal}
        toggle={toggleAlertModal}
      />
      <ModalEdit
        product={
          products.filter((product: Product) => product.id == productId)[0]
        }
        modal={editMode}
        startEditMode={startEditMode}
        update={update}
      />
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            <th>IN STOCK</th>
            <th>CREATED AT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product, index) => (
              <TableProductRow
                key={index}
                product={product}
                startEditMode={startEditMode}
                deleteProduct={toggleAlertModal}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </Table>
      <TablePagination
        pagesCount={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ToastContainer />
    </div>
  );
};

export default Products;
