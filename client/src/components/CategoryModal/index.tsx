import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup
} from 'reactstrap';
import CategoryInterface from '../../interfaces/CategoryInterface';

export default function CategoryModal(props: {
  category: CategoryInterface | null;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    reset();
    toggle();
    if (props.category) {
      await axios.post('', { data });
    } else {
      await axios.post('', { data });
    }
    console.log(data);
  };

  const toggle = () => props.setModal(!props.modal);
  const changeUnmountOnClose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  useEffect(() => {
    if (props.category) {
      setValue('category', props.category.name);
    }
  }, [props.category]);

  console.log(props.category?.name);

  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={toggle}
        unmountOnClose={unmountOnClose}
      >
        <ModalHeader toggle={toggle}>
          {props.category ? 'Edit' : 'Add'} Category
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            {/* <input
              {...register('category')}
              // placeholder="Enter category name"
              className="mb-4"
              // defaultValue={props.category?.name}
              value={props.category?.name}
            /> */}
            {/* <input
              {...register('category')}
              placeholder="Enter category name"
              className="mb-4"
              value={props.category?.name}
            /> */}
            <input
              {...register('category')}
              placeholder="Enter category name"
              className="mb-4"
              defaultValue={props.category?.name}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">{props.category ? 'Edit' : 'Add'}</Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
