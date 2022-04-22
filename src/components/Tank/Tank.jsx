import React from 'react';
import styles from './Tank.module.css'
import {config} from "../../config";

const Tank = ({level, isLeft}) => {
    return (
            <div className={styles.tank}>
                <div className={styles.value}>
                    Объем {Math.abs((level / config.litrePx)).toFixed(2) + "л"}
                </div>
                <div style={{height: `${level}px`}} className={styles.level}>

                </div>
                {isLeft
                    ? <div className={styles.meter} style={{bottom: 100, right: 0}}>1м</div>
                    : <div className={styles.meter} style={{bottom: 100}}>1м</div>
                }
                <div className={styles.meter} style={{bottom: 200}}>2м</div>
                <div className={styles.meter} style={{bottom: 300}}>3м</div>
            </div>
    );
};

export default Tank;