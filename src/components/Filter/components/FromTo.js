import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import moment from 'moment';

export const FromToField = ({
  value,
  title,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  const isDateValid = (d1, d2) => {
    if (d1 && d2) {
      d1 = moment(d1).startOf('day');
      d2 = moment(d2).startOf('day');
      switch (d2.diff(d1, 'd')){
        case 7:
          return 1;
        case 14:
          return 2;
        case 30:
          return 3;
        default:
          return 4;
      }
    }
    return 4;
  };

  // Is addressBar already contains the value? If yes then we need to show it by default
  const actualSelect = isDateValid(value[0], value[1]);
  const [select, setSelect] = useState(actualSelect);

  // Helpers
  const setDate = value => {
    const d1 = moment().startOf('day').toDate();
    const d2 = moment().startOf('day').subtract(value, 'd').toDate();
    onChange({ value: [d2, d1] })
  };

  useEffect(() => {
    // Execute one time, to set default date to filter
    if (actualSelect === 2) {
      setDate(14);
    }
  }, []);

  // Handlers
  const handleSelectChange = e => {
    setSelect(e.value);
    // eslint-disable-next-line default-case
    switch (e.value) {
      case 1:
        setDate(7);
        break;
      case 2:
        setDate(14);
        break;
      case 3:
        setDate(30);
        break;
    }
  };

  const handleCalendarChange = e => {
    onChange(e);
  };

  // Renderers
  const renderSelect = () => {
    const options = [
      { label: '7 ngày', value: 1 },
      { label: '2 tuần', value: 2 },
      { label: '1 tháng', value: 3 },
      { label: 'Khác', value: 4 },
    ];

    return (
      <Dropdown value={select} options={options} onChange={handleSelectChange} />
    );
  };

  const renderDisabledDate = date => {
    const d1 = moment(`${date.day}/${date.month + 1}/${date.year}`, 'DD/MM/YYYY').startOf('day');
    const d2 = moment().startOf('day');
    const isDisabled = d2 < d1;
    if (isDisabled) {
      return (
        <span style={{ textDecoration: 'line-through' }}>{date.day}</span>
      );
    }
    return date.day;
  }

  const renderCalendar = () => {
    return (
      <div className="p-inputgroup">
        <Calendar
          className="filter-field"
          locale="vi"
          maxDate={moment().toDate()}
          mask="99/99/9999 - 99/99/9999"
          dateFormat="dd/mm/yy"
          title={title}
          value={value}
          selectionMode="range"
          placeholder={placeholder}
          dateTemplate={renderDisabledDate}
          onChange={handleCalendarChange}
          onKeyDown={onKeyDown}
        />
        <Button
          icon="pi pi-chevron-left"
          className="p-button-secondary"
          title="Quay lại"
          onClick={() => handleSelectChange({ value: 2 })}
          type="button"
        />
      </div>
    );
  };

  const renderContent = () => {
    switch (select) {
      case 1:
      case 2:
      case 3:
        return renderSelect();
      default:
        return renderCalendar();
    }
  };

  return renderContent();
}