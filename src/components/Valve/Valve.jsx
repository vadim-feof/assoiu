import React from 'react';
import styles from './Valve.module.css'
import valvePng from '../../assets/valve.png'

const Valve = ({active, setStart}) => {
    const classes = [styles.btn]
    if (active)
        classes.push(styles.active)
    return (
        <div className={styles.wrapper}>
            <button className={classes.join(' ')} onClick={() => setStart(start => !start)}>
                <img src={valvePng} alt=""/>
            </button>
        </div>
    );
};

export default Valve;