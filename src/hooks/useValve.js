import {useEffect, useState} from "react";

export const useValve = (setTankLevel, transferSpeed) => {
    const [start, setStart] = useState(false)
    useEffect(() => {
        let interval
        if (start) {
            interval = setInterval( () => {
                setTankLevel(tankLevel => {
                    if ((tankLevel + transferSpeed).toFixed(2) <= 400
                            && (tankLevel + transferSpeed).toFixed(2) >= 0)
                        return tankLevel + transferSpeed
                    else if ((tankLevel + transferSpeed).toFixed(2) <= 0)
                        return 0
                    else
                        return tankLevel
                })
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [start])
    return [start, setStart]
}