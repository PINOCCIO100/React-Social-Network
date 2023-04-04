import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './SignUpForm.module.scss';

const validationSchema = Yup.object({
  firstName: Yup.string().required().max(25),
  lastName: Yup.string().required().max(30),
  password: Yup.string().required(),
  email: Yup.string().required().email(),
})


export function SignUpForm() {
  return (
    <div className={styles.SignUpForm}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {(formik) => (
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
        )}
      </Formik>
    </div>
  )
}
