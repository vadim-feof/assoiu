import {useEffect, useState} from "react";

export const useTransfer = (setFirstTankLevel, setSecondTankLevel, transferSpeed, checkStart) => {
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (!checkStart) return
        let interval
        if (start) {
            interval = setInterval( () => {
                setFirstTankLevel(firstTankLevel => {
                    if (firstTankLevel >= transferSpeed) {
                        setSecondTankLevel(secondTankLevel => {
                            if (start && (secondTankLevel + transferSpeed).toFixed(2) <= 400) {
                                return secondTankLevel + transferSpeed
                            }
                            else {
                                setStart(false)
                                alert('ПЕРЕЛИВ ВТОРОГО СОСУДА!')
                                return 400
                            }
                        })
                        return firstTankLevel - transferSpeed
                    }
                    else {
                        setStart(false)
                        setSecondTankLevel(secondTankLevel => {
                            if (start && (secondTankLevel + firstTankLevel).toFixed(2) <= 400) {
                                return secondTankLevel + firstTankLevel
                            }
                            alert('ПЕРЕЛИВ ВТОРОГО СОСУДА!')
                            return 400
                        })
                        return 0
                    }
                })
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [start, checkStart])
    return [start, setStart]
}