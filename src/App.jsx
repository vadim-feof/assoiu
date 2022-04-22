import React, {useEffect, useState} from 'react'
import './App.css';
import Tank from "./components/Tank/Tank";
import Valve from "./components/Valve/Valve";
import {useValve} from "./hooks/useValve";
import {config} from "./config";
import {useTransfer} from "./hooks/useTransfer";
import Pump from "./components/Pump/Pump";
import Flowmeter from "./components/Flowmeter/Flowmeter";
import SettingList from "./components/SettingList/SettingList";
import Heater from "./components/Heater/Heater";
import Thermometer from "./components/Thermometer/Thermometer";
import {useHeat} from "./hooks/useHeat";
import Pipe from "./components/Pipe/Pipe";

function App() {
    // Скорость подачи воды в первый бак
    const [inputFirstTank, setInputFirstTank] = useState(config.litrePx * 1000)
    // Первоначальный уровень первого бака
    const [firstTankLevel, setFirstTankLevel] = useState(100)
    // Открытие первого клапана
    const [start1, setStart1] = useValve(setFirstTankLevel, inputFirstTank)

    // Скорость передачи воды между баками
    const [transferSpeed, setTransferSpeed] = useState(config.litrePx * 50)
    // Первоначальный уровень второго бака
    const [secondTankLevel, setSecondTankLevel] = useState(0)
    // Открытие второго клапана
    const [toggleValve, setToggleValve] = useState(false)

    // Включение/отключение насоса
    const [transfer, setTransfer] = useTransfer(
        setFirstTankLevel, setSecondTankLevel, transferSpeed, toggleValve)

    // Скорость слива воды из второго бака
    const [drainFlow, setDrainFlow] = useState(config.litrePx * (-70))
    // Открытие слива воды из второго бака
    const [drain, setDrain] = useValve(setSecondTankLevel, drainFlow)

    // Температура первого нагревателя
    const [firstTemp, setFirstTemp] = useState(20)
    // Включение/отключение первого нагревателя
    const [firstHeatStart, setFirstHeatStart] = useHeat(setFirstTemp, 1)

    // Температура второго нагревателя
    const [secondTemp, setSecondTemp] = useState(20)
    // Включение/отключение второго нагревателя
    const [secondHeatStart, setSecondHeatStart] = useHeat(setSecondTemp, 1)

    useEffect(() => {
        if (secondTankLevel >= 100) {
            setTransfer(false)
            setToggleValve(false)
            setDrain(true)
        }
    }, [secondTankLevel])

    return (
        <div className="App">
            <div className="settings">
                <SettingList settings={[
                    {
                        name: 'Объем первого сосуда',
                        disabledCondition: start1 || (transfer && toggleValve),
                        value: firstTankLevel,
                        setValue: setFirstTankLevel,
                        minValue: 0, maxValue: 400,
                        isTank: true
                    },
                    {
                        name: 'Объем второго сосуда',
                        disabledCondition: (transfer && toggleValve) || drain,
                        value: secondTankLevel,
                        setValue: setSecondTankLevel,
                        minValue: 0, maxValue: 400,
                        isTank: true
                    },
                    {
                        name: 'Q1',
                        disabledCondition: start1,
                        value: inputFirstTank,
                        setValue: setInputFirstTank,
                        minValue: 0, maxValue: 400
                    },
                    {
                        name: 'Q2',
                        disabledCondition: transfer && toggleValve,
                        value: transferSpeed,
                        setValue: setTransferSpeed,
                        minValue: 0, maxValue: 400
                    },
                    {
                        name: 'Q3',
                        disabledCondition: drain,
                        value: drainFlow,
                        setValue: (value) => setDrainFlow(-value),
                        minValue: 0, maxValue: 400
                    }
                ]}/>
            </div>

            <div className="project">
                <div className="element valve1">
                    <Valve active={start1} setStart={setStart1}/>
                    КР1
                </div>
                <Pipe style={{width: 50, top: 80, left: 85}}/>
                <div className="element flowmeter1">
                    <div>
                        <Flowmeter value={inputFirstTank} active={start1}/>
                    </div>
                    Q1
                </div>
                <Pipe style={{width: 80, top: 80, left: 190}}/>
                <Pipe style={{width: 10, height: 70, top: 80, left: 270}}/>
                <div className="element thermometer1">
                    <div>
                        <Thermometer value={firstTemp}/>
                    </div>
                    T1
                </div>
                <div className="element heater1">
                    <Heater active={firstHeatStart} setStart={setFirstHeatStart}/>
                    NG1
                </div>
                <div className="tank1">
                    <Tank level={firstTankLevel} isLeft={true}/>
                </div>
                <Pipe style={{width: 10, height: 30, top: 550, left: 270}}/>
                <div className="element valve2">
                    <Valve active={toggleValve} setStart={setToggleValve}/>
                    КР2
                </div>
                <Pipe style={{width: 10, height: 30, top: 645, left: 270}}/>
                <Pipe style={{width: 180, top: 675, left: 270}}/>
                <Pipe style={{width: 10, height: 560, top: 125, left: 450}}/>
                <div className="element pump">
                    <Pump active={transfer} setStart={setTransfer}/>
                    N
                </div>
                <div className="element flowmeter2">
                    <div>
                        <Flowmeter value={transferSpeed} active={transfer && toggleValve}/>
                    </div>
                    Q2
                </div>
                <Pipe style={{width: 180, top: 125, left: 450}}/>
                <Pipe style={{width: 10, height: 25, top: 125, left: 620}}/>
                <div className="element thermometer2">
                    <div>
                        <Thermometer value={secondTemp}/>
                    </div>
                    T2
                </div>
                <div className="element heater2">
                    <Heater active={secondHeatStart} setStart={setSecondHeatStart}/>
                    NG2
                </div>
                <div className="tank2">
                    <Tank level={secondTankLevel}/>
                </div>
                <Pipe style={{width: 10, height: 70, top: 550, left: 620}}/>
                <Pipe style={{width: 300, top: 610, left: 620}}/>
                <div className="element valve3">
                    <Valve active={drain} setStart={setDrain}/>
                    КР3
                </div>
                <div className="element flowmeter3">
                    <div>
                        <Flowmeter value={drainFlow} active={drain}/>
                    </div>
                    Q3
                </div>
            </div>
        </div>
    );
}

export default App;
