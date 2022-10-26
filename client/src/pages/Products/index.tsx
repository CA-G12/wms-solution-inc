import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getAllProducts, updateProduct } from '../../api/products';
import { ModalEdit } from '../../components/ModalEdit';
import { TableProductRow } from '../../components/TableProductRow';
import { Product } from '../../interfaces/ProductInterface';
import './style.css';

const Products = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [{ editMode, productId }, setEditMode] = useState({
    editMode: false,
    productId: '-1'
  });
  const [updatedItem, setUpdatedItem] = useState();

  const startEditMode = (productId: string) => {
    setEditMode({ editMode: !editMode, productId });
  };

  const update = (id: number, updatedProduct: Product) => {
    updateProduct(id, updatedProduct)
      .then(result => result.data)
      .then(product => setUpdatedItem(product))
      .catch(error => {
        console.error('error', error);
      });
  };
  useEffect(() => {
    getAllProducts()
      .then(result => {
        console.log('result', result);
        setProducts(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [updatedItem]);

  return (
    <div className="product-page-body">
      {editMode ? (
        <ModalEdit
          product={
            products.filter(
              (product: Product) => product.id?.toString() === productId
            )[0]
          }
          startEditMode={startEditMode}
          update={update}
        />
      ) : null}
      <Table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>DISCOUNT</th>
            {/* <th>IN STOCK</th> */}
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
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
