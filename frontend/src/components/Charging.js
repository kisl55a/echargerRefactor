import React from 'react'
import styles from './Main.module.css';

export default function Charging(props) {
  function startCharging(event) {
    event.preventDefault();
    props.startCharging(
      event.target['identifier'].value,
    );
  }

  return (
    <div>
      {(props.isCharging)
        ?
        <div className={styles.chargingInfo}>
          <h5 className={styles.infoHeader}> Station UUID:
         {props.UUID.toUpperCase()} </h5>
          <div>The price:
        {props.currentCharge.cost} <sup>EUR</sup> </div>
          <div> Your time:
        {props.currentCharge.timeOfUsage} <sup>min</sup> </div>
          Your energy:
        {props.currentCharge.energy} <sup>kWh</sup>
          <br></br>
          <button className={styles.cancelButtonMainPage} onClick={props.stopCharging}> Stop charging</button>
        </div>
        : <form onSubmit={startCharging}>
          <div>
            Enter the Identifier
      </div>
          <input type="text" name="identifier" maxLength="4" style={{ textTransform: 'uppercase'}}/>
          <button type='submit' className={styles.buttonGreen}> Start charging</button>
        </form>
      }
    </div>
  )
}
