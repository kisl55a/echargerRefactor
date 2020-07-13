import React from 'react'
import styles from './Main.module.css';

export default function Register(props) {

  function register(event) {
    event.preventDefault();
    if (event.target['password'].value !== event.target['password1'].value) {
    } else {
      props.register(
        event.target['username'].value,
        event.target['email'].value,
        event.target['password'].value,
      );
      if (props.message === "Created")
        props.history.goBack();
    }
  }

  function cancel(event) {
    event.preventDefault();
    props.history.goBack();
    props.setMessageToNull();
  }

  return (
    // eslint-disable-next-line 
    <div className={styles.generalGrid, styles.registration}>
      <form onSubmit={register}>
        <h2>Registration</h2>
        <div>
          Username
        </div>
        <input type="text" name="username" />
        <div>
          Email
        </div>
        <input type="text" name="email" />
        <div>
          Password
        </div>
        <input type="password" name="password" />
        <div>
          Password
        </div>
        <input type="password" name="password1" />
        <br></br>
        <button className={styles.cancelButton} onClick={cancel}>Back</button>
        <button className={styles.proceedButton} type="submit">Register</button>
        <div id="message" > {(props.message === "Incorrect username or password") ? "" : props.message} </div>
      </form>
    </div>
  )
}
