import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import moment from 'moment';

export const AutoCompleteWithOptionsField = ({
  value,
  title,
  onChange,
  onKeyDown,
  placeholder,
  options,
  onSearch,
}) => {
  const menu = useRef(null);
  const [option, setOption] = useState(1);

  const handleInputChange = e => {
    onChange(e);
  };

  const handleOptionClick = e => {
    menu.current.toggle(e)
  };

  const renderContent = () => {
    const menuItems = [
      {
        items: [
          { label: 'Tìm kiếm gần đúng', icon: 'pi pi-circle', command: () => setOption(1) },
          { label: 'Tìm kiếm chính xác', icon: 'pi pi-circle-fill', command: () => setOption(2) },
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
        <AutoComplete
          title={title}
          value={value}
          placeholder={placeholder}
          suggestions={options}
          completeMethod={onSearch}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
        <Button
          className={`${icon} p-button-plain p-button-outlined`}
          onClick={handleOptionClick}
          type="button"
          title={title}
        />
        <Menu model={menuItems} popup ref={menu} id="popup_menu" />
      </div>
    );
  };

  return renderContent();
}