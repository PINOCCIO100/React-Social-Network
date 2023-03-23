import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './SignIn.module.scss';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!'
  }
  if (!values.password) {
    errors.password = 'Required!'
  }
  return errors
}

export function SignIn(props) {
  return (
    <div className={styles.SignIn}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={validate}
        onSubmit={(values) => {
          props.submitUserData({
            email: values.email,
            password: values.password
          })
        }}
      >
        <Form className={styles.SignIn__form}>

          <label className={styles.SignIn__label} htmlFor='email'>Email</label>
          <Field className={styles.SignIn__email} name='email' type='text' />
          <ErrorMessage name='email' />

          <label className={styles.SignIn__label} htmlFor='password'>Password</label>
          <Field className={styles.SignIn__password} name='password' type='password' />
          <ErrorMessage name='password' />

          <button type='submit' className={styles.SignIn__button}>Submit</button>

        </Form>
      </Formik>
    </div>
  )
}

