import React from 'react';
import styles from './Thermometer.module.css'
import thermPng from '../../assets/thermometer.png'

const Thermometer = ({value}) => {
    return (
        <div className={styles.wrapper}>
            {value}°C
            <div><img src={thermPng} alt=""/></div>
        </div>
    );
};

export default Thermometer;