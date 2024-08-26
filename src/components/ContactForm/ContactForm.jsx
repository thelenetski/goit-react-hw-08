import css from './ContactForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { Button, TextField } from '@mui/material';

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(addContact(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.contactForm}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name and Surname"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          id="number"
          name="number"
          label="Number"
          type="tel"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          sx={{ marginBottom: 2 }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add new contact
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
