import { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { TfiClose } from 'react-icons/tfi';
import { FiEdit2 } from 'react-icons/fi';
import { TransactionProductInterface } from '../../interfaces/TransactionProductInterface';
import {
  updateTransactionProducts,
  deleteTransactionProducts
} from '../../helpers/transactionProducts';
import './style.css';
import { calculateTotalPrice } from '../../helpers/NumberHelpers';
import { TransactionType } from '../../interfaces/Enums';
import { ProductInterface } from '../../interfaces/ProductInterface';
import ErrorHandler from '../../helpers/ErrorHandler';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const TransactionProductsTable = (props: {
  transactionId: number;
  transactionProduct: TransactionProductInterface | null;
  setTransactionProduct: React.Dispatch<
    React.SetStateAction<TransactionProductInterface | null>
  >;
  operation: string;
  transactionProducts: TransactionProductInterface[] | null;
  setTransactionProducts: React.Dispatch<
    React.SetStateAction<TransactionProductInterface[]>
  >;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionType: TransactionType;
  forCashier: boolean;
}) => {
  const [error, setError] = useState<string>('');
  const { register } = useForm();

  const changeQuantityValue = (
    ProductId: number,
    quantity: number,
    Product: ProductInterface,
    transactionProducts: TransactionProductInterface[]
  ) => {
    try {
      const updated = updateTransactionProducts({
        currentTransactionProducts: transactionProducts,
        ProductId: ProductId,
        quantity: quantity,
        type: props.transactionType,
        Product
      });

      props.setTransactionProducts(updated);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);
      } else {
        const exception = error as Error;
        setError(exception.message);
      }
    }
  };

  const handleEdit = (transactionProduct: TransactionProductInterface) => {
    props.setTransactionProduct(transactionProduct);
    props.setModal(true);
  };

  const handleRemove = (transactionProduct: TransactionProductInterface) => {
    props.setTransactionProducts(
      deleteTransactionProducts({
        ProductId: transactionProduct.Product.id || -1,
        currentTransactionProducts: props.transactionProducts || []
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setError('');
    }
  }, [error]);

  return (
    <div className="data-table transactionProducts-table">
      <Table responsive primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            {props.forCashier ? <></> : <th>#</th>}
            <th>Product title</th>
            {props.forCashier ? <></> : <th>Status</th>}
            <th>Price</th>
            <th>Quantity</th>
            {props.forCashier ? <></> : <th>Discount</th>}
            <th>SubTotal</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {!props.transactionProducts?.length ? (
            <div>
              {props.operation === 'add' ? '' : 'No Transactions Found'}
            </div>
          ) : (
            props.transactionProducts?.map(transactionProduct => {
              return (
                <tr key={transactionProduct.ProductId}>
                  {props.forCashier ? (
                    <></>
                  ) : (
                    <td>{transactionProduct.ProductId}</td>
                  )}
                  <td>{transactionProduct.Product.title}</td>
                  {props.forCashier ? (
                    <></>
                  ) : (
                    <td>{transactionProduct.status}</td>
                  )}
                  <td>${transactionProduct.unitPrice}</td>
                  <td>
                    <div className="quantity-content d-flex justify-content-center align-items-center">
                      <Button
                        color="primary"
                        onClick={_e => {
                          changeQuantityValue(
                            transactionProduct.ProductId || -1,
                            Number(transactionProduct.quantity) - 1,
                            transactionProduct.Product,
                            props.transactionProducts || []
                          );
                        }}
                      >
                        -
                      </Button>
                      <input
                        type="text"
                        name="quantity"
                        {...register}
                        className="quantity-input form-control"
                        value={transactionProduct.quantity}
                        onChange={e => {
                          changeQuantityValue(
                            transactionProduct.Product.id || -1,
                            Number(e.target.value),
                            transactionProduct.Product,
                            props.transactionProducts || []
                          );
                        }}
                      />

                      <Button
                        color="primary"
                        onClick={_e => {
                          changeQuantityValue(
                            transactionProduct.Product.id || -1,
                            Number(transactionProduct.quantity) + 1,
                            transactionProduct.Product,
                            props.transactionProducts || []
                          );
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  {props.forCashier ? (
                    <></>
                  ) : (
                    <td>
                      {(transactionProduct.Product.discount * 100.0).toFixed(2)}
                      %
                    </td>
                  )}
                  <td>
                    $
                    {calculateTotalPrice({
                      price: transactionProduct.unitPrice,
                      quantity: transactionProduct.quantity,
                      discount: transactionProduct.Product.discount || 0
                    }).toFixed(2)}
                  </td>
                  <td>
                    <div className="actions-td d-flex gap-2 align-items-center justify-content-center pe-2">
                      <button onClick={_e => handleEdit(transactionProduct)}>
                        <FiEdit2 className="text-blue" />
                        {props.forCashier ? '' : 'Edit'}
                      </button>
                      <button
                        onClick={_e => {
                          handleRemove(transactionProduct);
                        }}
                      >
                        <TfiClose className="text-danger" />
                        {props.forCashier ? '' : 'Remove'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};
