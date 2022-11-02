import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner, Table } from 'reactstrap';
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
  const [itemsPerPage] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState([] as Product[]);
  const [filteredProducts, setFilteredProducts] = useState([] as Product[]);
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
      await deleteProductAPI(deleteProductId);
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
    setProducts([]);
    getAllProductsAPI(itemsPerPage, (currentPage - 1) * itemsPerPage)
      .then(result => {
        setProducts(result.data.products);
        setTotalItems(result.data.totalCount[0].count);
      })
      .catch(err => {
        console.log(err);
      });
  }, [updateTable, currentPage]);

  return (
    <div className="product-page-body">
      {!products.length ? (
        <div className="_load-products">
          <Spinner color="primary" type="grow">
            Loading...
          </Spinner>
        </div>
      ) : (
        <div>
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
          <div>
            <div className="_search-box">
              <FaSearch className="_search-icon" />
              <input
                placeholder="Looking for something?"
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="data-table">
            <Table responsive bordered primary rounded>
              <thead>
                <tr className="head bg-blue text-white">
                  <th>#</th>
                  <th></th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>DISCOUNT</th>
                  <th>IN STOCK</th>
                  <th>CREATED AT</th>
                  <th className="actions-th text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <TableProductRow
                    key={index}
                    product={product}
                    startEditMode={startEditMode}
                    deleteProduct={toggleAlertModal}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <TablePagination
            pagesCount={Math.ceil(totalItems / itemsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

function productSearch(productName: string, query: string) {
  return productName === query;
}

export default Products;
