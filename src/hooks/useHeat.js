import {useEffect, useState} from "react";

export const useHeat = (setTemp, heatSpeed) => {
    const [start, setStart] = useState(false)

    useEffect(() => {
        let interval
        if (start) {
            interval = setInterval( () => {
                setTemp(temp => {
                    if (temp < 95)
                        return temp + heatSpeed
                    return temp
                })
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [start])
    return [start, setStart]
}