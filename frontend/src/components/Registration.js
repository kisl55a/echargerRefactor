import React from "react";
import styles from "./Main.module.css";
import { useAlert } from "react-alert";

export default function Register(props) {
  const alert = useAlert();
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    const re = /^([a-zA-Z0-9@*#]{8,15})$/;
    return re.test(password);
  };
  async function register(event) {
    event.preventDefault();

    if (event.target["password"].value !== event.target["password1"].value) {
      alert.error("Passwords are different", {
        timeout: 3000, // custom timeout just for this one alert
      });
    } else if (
      !validateEmail(event.target["email"].value) ||
      event.target["username"].value.trim == ""
    ) {
      alert.error("Invalid email or username", {
        timeout: 3000, // custom timeout just for this one alert
      });
    } else if (!validatePassword(event.target["password"].value)) {
      alert.error(
        "Password must consists of at least 8 characters and not more than 15 characters.",
        {
          timeout: 8000, // custom timeout just for this one alert
        }
      );
    } else {
      props.register(
        event.target["username"].value,
        event.target["email"].value,
        event.target["password"].value
      );
      props.history.goBack();
    }
  }

  function cancel(event) {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    // eslint-disable-next-line
    <div className={(styles.generalGrid, styles.registration)}>
      <form onSubmit={register}>
        <h2>Registration</h2>
        <div>Username</div>
        <input type="text" name="username" />
        <div>Email</div>
        <input type="text" name="email" />
        <div>Password</div>
        <input type="password" name="password" />
        <div>Password</div>
        <input type="password" name="password1" />
        <br></br>
        <button className={styles.cancelButton} onClick={cancel}>
          Back
        </button>
        <button className={styles.proceedButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
