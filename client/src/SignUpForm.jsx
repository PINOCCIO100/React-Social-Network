import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import s from './SignUpForm.module.scss';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required!'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 character or less'
  }
  if (!values.lastName) {
    errors.lastName = 'Required!'
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 character or less'
  }
  if (!values.password) {
    errors.password = 'Required!'
  } else if (values.password.length < 4 || values.password.length > 20) {
    errors.password = 'Must be from 4 to 20 characters length'
  }
  if (!values.email) {
    errors.email = 'Required!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!'
  }
  return errors
}

export function SignUpForm2() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      console.log(values);
    }
  })
  return <form onSubmit={formik.handleSubmit} className={s.SignUpForm}>
    <label htmlFor="firstName">First Name</label>
    <input
      id='firstName'
      name='firstName'
      type='text'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.firstName}
    />
    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
    <label htmlFor="lastName">Last Name</label>
    <input
      id='lastName'
      name='lastName'
      type='text'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.lastName}
    />
    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
    <label htmlFor="email">Email Address</label>
    <input
      id='email'
      name='email'
      type='email'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
    />
    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
    <button type='submit'>Submit</button>
  </form>;
}

export function SignUpForm() {
  return (
    <div className={s.SignUpForm}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          email: '',
        }}
        validate={validate}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <label htmlFor='firstName'>First Name</label>
          <Field name='firstName' type='text' />
          <ErrorMessage name='firstName' />

          <label htmlFor='lastName'>Last Name</label>
          <Field name='lastName' type='text' />
          <ErrorMessage name='lastName' />

          <label htmlFor='password'>Password</label>
          <Field name='password' type='text' />
          <ErrorMessage name='password' />

          <label htmlFor='email'>Email</label>
          <Field name='email' type='text' />
          <ErrorMessage name='email' />

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
