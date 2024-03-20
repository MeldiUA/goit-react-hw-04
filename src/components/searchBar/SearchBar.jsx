import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const notify = () =>
    toast('Enter the query', {
      icon: '😉',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, action) => {
        if (values.query === '') {
          notify();
          return;
        }
        onSearch(values.query);
        action.resetForm();
      }}
    >
      <Form className={css.form}>
        <h1 className={css.title}>Your picture finder</h1>
        <Field
          className={css.inputSearch}
          name="query"
          type="text"
          placeholder="Search images and photos"
        ></Field>
        <button className={css.searchBtn} type="submit">
          Search
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
