import React from 'react';
import {config} from "../../../config";
import styles from "./Setting.module.css"

const Setting = ({name, disabled, value, setValue,  minValue, maxValue, isTank}) => {
    const changeValueCm = (cm) => {
        if (cm < minValue)
            cm = 0
        if (cm > maxValue)
            cm = 400
        setValue(cm)
    }

    const changeValueLitre = (liter) => {
        if (liter < minValue)
            liter = 0
        if (liter > maxValue)
            liter = maxValue
        setValue(liter)
    }

    return (
        <div className={styles.setting}>
            <div>{name}</div>
            <div className={styles.inputWrapper}>
                <input
                       disabled={disabled}
                       value={Math.abs((value / config.litrePx)).toFixed(2)}
                       onChange={e => changeValueLitre(e.target.value * config.litrePx)}
                       type="number"
                       min={minValue / config.litrePx}
                       max={maxValue / config.litrePx}
                />
                <div>{isTank ? " л" : " л/c"}</div>
            </div>
            {isTank &&
                <div className={styles.inputWrapper}>
                    <input
                           disabled={disabled}
                           value={(value).toFixed(2)}
                           onChange={e => changeValueCm(+e.target.value)}
                           type="number"
                           min={minValue}
                           max={maxValue}
                    />
                    <div>{" см"}</div>
                </div>
            }
        </div>
    );
};

export default Setting;