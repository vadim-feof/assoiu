import React from 'react';
import Setting from "./Setting/Setting";

const SettingList = ({settings}) => {

    return (
        <div className="SettingList">
            {settings.map( setting =>
                <Setting key={setting.name}
                         disabled={setting.disabledCondition}
                         value={setting.value}
                         setValue={setting.setValue}
                         name={setting.name}
                         minValue={setting.minValue}
                         maxValue={setting.maxValue}
                         isTank={setting.isTank}
                />
            )}
        </div>
    );
};

export default SettingList;