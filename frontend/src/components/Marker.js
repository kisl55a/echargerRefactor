import React from 'react';

import styles from './Main.module.css';

export default function Marker(props) {
    return (
        <div>
            {/* {console.log(props)} */}
            {
                (props.type.toLowerCase() === "fast") ?
                    (props.isTaken === 0 ? <img className={styles.station} alt="fastCharge" src={'/images/Charging.png'}></img> :
                        <img className={styles.stationTaken} alt="fastCharge" src={`/images/Charging.png`}></img>
                    )
                    :
                    (props.isTaken === 0 ? <img className={styles.station} alt="slowCharge" src={`/images/slow.png`}></img> :
                        <img className={styles.stationTaken} alt="slowCharge" src={`/images/slow.png`}></img>)
            }
        </div>
)}

