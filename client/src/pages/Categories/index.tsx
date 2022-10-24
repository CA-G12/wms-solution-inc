import { Button, Table } from 'reactstrap';
import './style.css';
import { useForm } from 'react-hook-form';
import { FaBeer, FaRegEdit } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineEye } from 'react-icons/hi';
import { CategoryTable } from '../../components/CategoyTable';
import { useEffect, useState } from 'react';
import Category from '../../api/category';
import CategoryInterface from '../../interfaces/CategoryInterface';
import CategoryModal from '../../components/CategoryModal';

type FormData = {
  search: string;
};

const Categories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => console.log(data));

  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryInterface | null>(null);

  const handeAddClick = () => {
    setCategory(null);
    setModal(true);
  };

  return (
    <section className="data-table bg-white p-4">
      <header>
        <h3 className="h6 fw-bold mb-5">Categories</h3>
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <form onSubmit={onSubmit}>
            <div className="search-input">
              <GoSearch />
              <input
                type="search"
                {...register('search')}
                className="p-2 border border-border outline-none rounded"
                placeholder="Search"
              />
            </div>
          </form>
          <div className="right ms-auto">
            <div>
              <Button color="primary" onClick={e => handeAddClick()}>
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CategoryTable
        category={category}
        setCategory={setCategory}
        modal={modal}
        setModal={setModal}
      />
      <CategoryModal category={category} modal={modal} setModal={setModal} />
    </section>
  );
};

export default Categories;
