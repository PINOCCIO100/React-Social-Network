import { useEffect, useRef } from 'react';
import s from './TextInputPostBlock.module.scss';

import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createPost } from '../../../../store/reducers/usersPostsReducer';

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

export default function TextInputPostBlock(props) {

  const dispatch = useDispatch();

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
        await dispatch(createPost(message));
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form>
        <div className={[s.TextInput, props.className].join(' ')}>
          <Field
            name='message'
            className={['scrollBar', s.TextInput__inputArea].join(' ')}
            type='text'
            placeholder='Text your post...'
            as={CustomTextArea}
          />
          <ErrorMessage name='message' component='p' className={s.TextInput__error} />
          <div className={s.TextInput__buttonArea}>
            <button type='submit' className={s.TextInput__button}>Post</button>
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
    // Выглядит как костыль, но по другому textArea не сабмитится
    onKeyDown={(e) => { e.code === 'Enter' && e.ctrlKey && handleSubmit(e) }}
    {...props}
  />

}

