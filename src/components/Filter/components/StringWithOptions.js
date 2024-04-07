import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import moment from 'moment';
import _ from 'lodash';

export const StringWithOptionsField = ({
  value,
  title,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  // We initialize actual option and value here
  const actualOption = value[1] ? 2 : 1;
  const actualValue = value[actualOption - 1];

  const menu = useRef(null);
  const [option, setOption] = useState(actualOption);

  const handleInputChange = e => {
    if (option === 1) {
      onChange({ value: [e.target.value, undefined] });
    } else {
      onChange({ value: [undefined, e.target.value]});
    }
  };

  const handleOptionClick = e => {
    menu.current.toggle(e)
  };

  const handleOptionChange = v => () => {
    setOption(v);
    // Move current value to where it should be
    let currentValue = value[0] ? value[0] : value[1];
    if (_.isString(currentValue)) {
      currentValue = currentValue.trim();
    }
    if (v === 1) {
      onChange({ value: [currentValue, undefined] });
    } else {
      onChange({ value: [undefined, currentValue]});
    }
  };

  const renderContent = () => {
    const options = [
      {
        items: [
          { label: 'Tìm kiếm gần đúng', icon: 'pi pi-circle', command: handleOptionChange(1) },
          { label: 'Tìm kiếm chính xác', icon: 'pi pi-circle-fill', command: handleOptionChange(2) },
        ],
        template: item => {
          return (
            <span>{item.label}</span>
          );
        },
      },
    ];

    const icon = option === 1 ? 'pi pi-circle' : 'pi pi-circle-fill';
    const title = option === 1 ? 'Tìm kiếm gần đúng' : 'Tìm kiếm chính xác';

    return (
      <div className="p-inputgroup">
        <InputText
          key={option}
          title={placeholder}
          value={actualValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
        <Button
          className={`${icon} p-button-plain p-button-outlined`}
          onClick={handleOptionClick}
          type="button"
          title={title}
        />
        <Menu model={options} popup ref={menu} id="popup_menu" />
      </div>
    );
  };

  return renderContent();
}