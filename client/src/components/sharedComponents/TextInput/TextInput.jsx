import { createRef, useEffect } from 'react';
import s from './TextInput.module.scss';

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

function TextInput({ getTextFromBLL, setTextToBLL, sendText, className, labels }) {
  const textAreaElem = createRef();
  useEffect(() => {
    // создаем ref на textarea и при рендере компонента и применяем к нему autoResize в useEffect   
    autoResize(textAreaElem.current);
  }, [textAreaElem]);

  const keyDownFunc = (e) => {
    if (e.code === 'Enter' && e.ctrlKey) {
      sendText();
    };
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDownFunc);
    return () => document.removeEventListener('keydown', keyDownFunc);
  });

  const onChange = (e) => {
    setTextToBLL(e.target.value);
    autoResize(e.target);
  }
  const onClick = () => {
    sendText();
  }
  return (
    <div className={[s.TextInput, className].join(' ')}>
      <textarea
        ref={textAreaElem}
        value={getTextFromBLL()}
        onChange={onChange}
        className='scrollBar'
        name="TextInput"
        placeholder={labels.placeholder}
      ></textarea>
      <div className={s.TextInput__buttonArea}>
        <button onClick={onClick} className={s.TextInput__button}>{labels.button}</button>
      </div>
    </div >
  );
}

export default TextInput