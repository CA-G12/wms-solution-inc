import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineEye } from 'react-icons/hi';
import { AxiosError } from 'axios';
import { TablePagination } from '../TablePagination';
import ErrorHandler from '../../helpers/ErrorHandler';
import TransactionInterface from '../../interfaces/TransactionInterface';
import * as Transaction from '../../api/transaction';
import * as DateFormatting from '../../helpers/DateFormatting';
import './style.css';

export const TransactionsTable = (props: {
  setTransaction: React.Dispatch<
    React.SetStateAction<TransactionInterface | null>
  >;
  isSucceed: boolean;
  setIsSucceed: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  type: string;
}) => {
  const [transactions, setTransactions] =
    useState<Array<TransactionInterface> | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const list = await Transaction.search({
          type: props.type,
          search: props.search,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1)
        });

        setIsPending(false);
        setTransactions(list.data.items);
        setTotalItems(list.data.totalCount);
      } catch (error: unknown) {
        const exception = error as AxiosError;
        ErrorHandler.handleRequestError(exception, setError);

        setIsPending(false);
      }
    };

    fetchData();
    props.setIsSucceed(false);
  }, [currentPage, props.isSucceed, props.search, props.type]);

  const handleRemove = async (id: number) => {
    try {
      await Transaction.remove(id);
      props.setIsSucceed(true);
    } catch (error: unknown) {
      const exception = error as AxiosError;
      ErrorHandler.handleRequestError(exception, setError);
    }
  };

  return (
    <div className="data-table">
      <Table responsive bordered primary rounded>
        <thead>
          <tr className="head bg-blue text-white">
            <th>Transaction Type</th>
            <th>Transaction Date</th>
            <th>Issued By</th>
            <th>Products Count</th>
            <th>Total Price</th>
            <th className="actions-th text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : !transactions ? (
            <div>No Categories Found</div>
          ) : (
            transactions.map(transaction => {
              console.log(transaction);
              return (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{DateFormatting.formatDate(transaction.createdAt)}</td>
                  <td>{transaction['User.username']}</td>
                  <td>{transaction.productsCount}</td>
                  <td>${transaction.totalCost}</td>
                  <td className="actions-td d-flex gap-2 align-items-center justify-content-center pe-4">
                    <button>
                      <HiOutlineEye className="text-blue" /> View
                    </button>
                    <button
                      onClick={e => {
                        handleRemove(transaction.id);
                      }}
                    >
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
        pagesCount={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
