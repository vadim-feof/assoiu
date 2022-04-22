import React from 'react';
import styles from './Flowmeter.module.css'
import flowmeterPng from "../../assets/flowmeter.png";
import {config} from "../../config";
const Flowmeter = ({value, active}) => {
    const classes = [styles.btn]
    if (active)
        classes.push(styles.active)

    return (
        <div className={styles.wrapper}>
            {Math.abs((value / config.litrePx)).toFixed(2) }л/с
            <button className={classes.join(' ')}
                    disabled
            >
                <img src={flowmeterPng} alt=""/>
            </button>
        </div>
    );
};

export default Flowmeter;