import { ErrorMessage, Field, Formik, Form } from 'formik';
import styles from './SignIn.module.scss';
import * as Yup from 'yup';
import { WideCheckbox } from './WideCheckbox';

const signInSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean()
})

export function SignIn(props) {
  return (
    <div className={styles.SignIn}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false
        }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          props.handleLogin(values)
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

            <WideCheckbox className={styles.SignIn__checkboxBlock} name='rememberMe' type='checkbox' label={'Remember me'} />
            <button type='submit' className={styles.SignIn__button}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}


