import React from 'react';
import styles from "./Heater.module.css";
import heaterPng from '../../assets/heater.png'
const Heater = ({active, setStart}) => {
    const classes = [styles.btn]
    if (active)
        classes.push(styles.active)

    return (
        <div className={styles.wrapper}>
            <button className={classes.join(' ')} onClick={() => setStart(start => !start)}>
                <img src={heaterPng} alt=""/>
            </button>
        </div>
    );
};

export default Heater;