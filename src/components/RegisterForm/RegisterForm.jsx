import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Email is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: 'Enter name',
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      )
        .unwrap()
        .then(() => {
          // console.log('login success');
          toast.success('register success');
        })
        .catch(() => {
          toast.error('register error');
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginBottom: 2 }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
