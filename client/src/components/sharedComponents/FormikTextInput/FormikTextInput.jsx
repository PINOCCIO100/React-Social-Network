import { useEffect, useRef } from 'react';
import styles from './FormikTextInput.module.scss';

import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';

const autoResize = (textAreaElem) => {
  const textAreaElemStyle = window.getComputedStyle(textAreaElem);
  const height = Number.parseInt(textAreaElemStyle.height);
  const maxHeight = Number.parseInt(textAreaElemStyle.maxHeight);

  textAreaElem.style.height = `auto`;
  textAreaElem.style.height = `${textAreaElem.scrollHeight}px`;
  if (!isNaN(maxHeight)) {
    textAreaElem.style.overflowY = height >= maxHeight ? 'auto' : 'hidden';
  }
}

export default function FormikTextInput(props) {

//1
  const messageValidation = Yup.object({
    message: Yup.string().max(255, 'Message must be at most 255 characters')
  })

  return (
    <Formik
      initialValues={{
        message: ''
      }}
      validationSchema={messageValidation}
      onSubmit={async ({ message }, { resetForm, setSubmitting }) => {
        // await dispatch(createMessage(message));
        await props.handleSubmit(message)
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form>
        <div className={[styles.TextInput, props.className].join(' ')}>
          <Field
            name='message'
            className={['scrollBar', styles.TextInput__inputArea].join(' ')}
            type='text'
            placeholder='Text your message...'
            as={CustomTextArea}
          />
          <ErrorMessage name='message' component='p' className={styles.TextInput__error} />
          <div className={styles.TextInput__buttonArea}>
            <button type='submit' className={styles.TextInput__button}>Send</button>
          </div>
        </div >
      </Form>
    </Formik>
  )
}

const CustomTextArea = (props) => {

  const { value } = props;
  const textAreaElem = useRef(null);
  useEffect(() => { autoResize(textAreaElem.current) }, [value])
  const { handleSubmit } = useFormikContext();
  return <textarea
    ref={textAreaElem}
    // Выглядит как костыль, но по другому textArea не сабмитится при нажатии на enter
    onKeyDown={(e) => { e.code === 'Enter' && e.ctrlKey && handleSubmit(e) }}
    {...props}
  />

}

