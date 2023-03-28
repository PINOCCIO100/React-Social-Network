import { ErrorMessage, Field, Formik, Form } from 'formik';
import styles from './SignIn.module.scss';
import * as Yup from 'yup';

const signInSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

export function SignIn(props) {
  return (
    <div className={styles.SignIn}>
      <Formik 
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          props.submitUserData({
            email: values.email,
            password: values.password
          })
        }}
      >
        {({ values, errors, touched }) => (
          <Form className={styles.SignIn__form}>

            <label className={styles.SignIn__label} htmlFor='email'>Email</label>
            <Field className={styles.SignIn__email} name='email' type='text' />
            <ErrorMessage name='email' />

            <label className={styles.SignIn__label} htmlFor='password'>Password</label>
            <Field className={styles.SignIn__password} name='password' type='password' />
            <ErrorMessage name='password' />

            <button type='submit' className={styles.SignIn__button}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

