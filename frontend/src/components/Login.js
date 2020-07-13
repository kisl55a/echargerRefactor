import React from 'react'
import styles from './Main.module.css';

export default function Login(props) {
  function login(event) {
    event.preventDefault();
    props.login(
      event.target['name'].value,
      event.target['password'].value,
    );
    props.history.goBack();
  }

  function cancel(event) {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    // eslint-disable-next-line 
    <div className={styles.generalGrid, styles.registration}>
      <h2> Login </h2>
      <form onSubmit={login}>
        <div>
          Nickname
        </div>
        <input type="text" name="name" />
        <div>
          Password
        </div>
        <input type="password" name="password" />
        <button className={styles.cancelButton} onClick={cancel}>Cancel</button>
        <button className={styles.proceedButton} type="submit">Login</button>
      </form>
    </div>
  )
}
