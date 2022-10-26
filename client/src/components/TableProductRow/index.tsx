import { Product } from '../../interfaces/ProductInterface';
import './styles.css';

export const TableProductRow = ({
  product,
  startEditMode
}: {
  product: Product;
  startEditMode: CallableFunction;
}) => {
  const date = new Date(
    product.createdAt || 'October 13, 2014 11:13:00' //TODO DELETE THE DUMMY DATE
  ).toLocaleString('en-US', {
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'long'
  });
  const price = Number(product.price).toFixed(2);

  return (
    <tr className="table-primary">
      <td>{product.title}</td>
      <td>{`$${price}`}</td>
      <td>{product.discount}</td>
      {/* <td>{product.inStock}</td> */}
      <td>{date}</td>
      <td>
        <div className="actions-container">
          <img
            className="row-action"
            src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-open-call-to-action-bearicons-glyph-bearicons.png"
            alt="See button"
          />
          <img
            className="row-action"
            src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png"
            alt="Edit button"
            onClick={() => {
              startEditMode(product.id?.toString());
            }}
          />
          <img
            className="row-action"
            src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
            alt="Delete button"
          />
        </div>
      </td>
    </tr>
  );
};
