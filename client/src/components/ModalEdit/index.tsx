import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Product } from '../../interfaces/ProductInterface';
import './styles.css';

export const ModalEdit = ({
  product,
  startEditMode,
  update
}: {
  product: Product;
  startEditMode: CallableFunction;
  update: CallableFunction;
}) => {
  const { control, handleSubmit } = useForm<Product>({
    defaultValues: product
  });
  const onSubmit: SubmitHandler<Product> = updatedProduct =>
    update(updatedProduct.id, updatedProduct);

  return (
    <div className="modal-container">
      <Form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <button
          aria-label="Close Modal"
          aria-labelledby="close-modal"
          className="_modal-close"
          onClick={() => startEditMode(-1)}
        >
          <span id="close-modal" className="_hide-visual">
            Close
          </span>
          <svg className="_modal-close-icon" viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="productTitle">Title</Label>
              <Controller
                render={({ field }) => <Input {...field} type="text" />}
                name="title"
                control={control}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="productPrice">price</Label>
              <Controller
                render={({ field }) => (
                  <Input {...field} type="number" min={0} />
                )}
                name="price"
                control={control}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="productDiscount">Discount</Label>
              <Controller
                render={({ field }) => (
                  <Input {...field} type="number" min={0} />
                )}
                name="discount"
                control={control}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="productInStock">In stock</Label>
              <Controller
                render={({ field }) => (
                  <Input {...field} type="number" min={0} />
                )}
                name="inStock"
                control={control}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="productIcon">Icon</Label>
          <Controller
            render={({ field }) => <Input {...field} type="date" />}
            name="createdAt"
            control={control}
          />
        </FormGroup>
        <Button color="primary" outline className="_submit-button">
          Edit
        </Button>
      </Form>
    </div>
  );
};
