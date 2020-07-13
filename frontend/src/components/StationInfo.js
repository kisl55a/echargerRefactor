import React from 'react';
import styles from './Main.module.css';

// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const StationInfo = (props) => {
    function back() {
        props.setCurrentStationToNull();
    }
    return (<div className={styles.stationInfo}>

        <h4 className={styles.infoHeader}>
            {props.stationName}
        </h4>

        <div>
            Status: {(props.isTaken === 1) ? "Taken" : " Free"}
        </div>
        <div>
            Address: {props.address}
        </div>

        <div>
            Type: {props.type}
        </div>
        <div>
            Power: {props.power} <sup>kWh</sup>
        </div>
        <div>
            Price: {props.price}<sup>{props.measure}</sup>
        </div>
        {
            (props.isLoggedIn) ?
            <div>  Identifier: {props.UUID}</div> :
            <div></div>
        }
        <div> <button className={styles.cancelButtonMainPage} onClick={back}> Back </button></div>
    </div>)

}

export default StationInfo;