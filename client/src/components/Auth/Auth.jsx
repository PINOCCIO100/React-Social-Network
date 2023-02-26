import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Auth.module.scss';

//TODO: При неправильном пароле выводить сообщение

function Auth(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', onEnter)
    return () => {
      document.removeEventListener('keydown', onEnter);
    }
  });

  const onEnter = (e) => {
    if (e.code !== 'Enter') return;
    handleSubmit();
  }

  const onClick = (e) => {
    e.preventDefault();
    handleSubmit();
  }

  const handleSubmit = () => {
    props.submitUserData({ email, password });
    setEmail(''); setPassword('');
  }

  return (
    <div
      className={styles.Auth}>
      <div className={styles.Auth__form}>
        <p className={styles.Auth__label}>Email</p>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className={styles.Auth__email} />
        <p className={styles.Auth__label}>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className={styles.Auth__password} />
        <button onClick={onClick} className={styles.Auth__button}>Submit</button>
      </div>
    </div>
  );
}

export default Auth;