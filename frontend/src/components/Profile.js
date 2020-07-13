import React from 'react'
import styles from './Main.module.css';
import HistoryRow from './HistoryRow'
export default function Profile(props) {

  function cancel(event) {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    <div>
      {(props.userHistory.length !== 0) ?
        <table>
          <tr>
            <th>Station Number</th>
            <th>Date</th>
            <th>Energy(kWt)</th>
            <th>Time of usage(min)</th>
            <th>Cost(EUR)</th>
          </tr>
          <tbody>
            {props.userHistory.map((item, i) => (
              <HistoryRow key={i} {...item} />
            ))}
          </tbody>
        </table>
        : " You have no charges"
      }
      <button className={styles.cancelButton} onClick={cancel}>Back</button>
      <div id="message" className={styles.hidden}> {props.message} </div>

    </div>
  )
}
