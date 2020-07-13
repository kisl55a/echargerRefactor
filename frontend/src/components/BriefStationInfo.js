import React from 'react';
import styles from './Main.module.css';

const StationInfo = (props) => {

    function setCurrentStation() {
        props.setStation(props.info)
    }

    if (props.info.isTaken !== 1) {
        return (<div className={styles.zebra}>

            <div className={styles.searchRes} onClick={setCurrentStation}>
                {props.info.stationName}
            </div>
        </div>)
    } else {
        return (<div className={styles.zebra}>
            
            <div className={styles.searchResTaken} onClick={setCurrentStation}>
                {props.info.stationName}
            </div>
        </div>)
    }


}

export default StationInfo;