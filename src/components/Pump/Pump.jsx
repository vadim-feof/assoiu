import React from 'react';
import pumpPng from '../../assets/pump.png'
import styles from "../Pump/Pump.module.css";
const Pump = ({active, setStart}) => {
    const classes = [styles.btn]
    if (active)
        classes.push(styles.active)

    return (
        <div className={styles.wrapper}>
            <button className={classes.join(' ')} onClick={() => setStart(start => !start)}>
                <img src={pumpPng} alt=""/>
            </button>
        </div>
    );
};

export default Pump;