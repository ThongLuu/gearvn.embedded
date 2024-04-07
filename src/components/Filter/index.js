/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import _ from 'lodash';

import { StringWithOptionsField } from './components/StringWithOptions';
import { FromToField } from './components/FromTo';
import { AutoCompleteWithOptionsField } from './components/AutoCompleteWithOptions';
import { AutoCompleteField } from './components/AutoComplete';
import './style.scss';

export const FilterType = {
  STRING: 1,
  FROMTO: 2,
  AUTOCOMPLETE_WITH_OPTIONS: 3,
  STRING_WITH_OPTIONS: 4,
  DROPDOWN: 5,
  MULTISELECT: 6,
  AUTOCOMPLETE: 7,
};

const Filter = ({
  onApply,
  items = [],
  data,
  filterLabel = 'Lọc',
  filterIcon = 'pi pi-filter',
}) => {
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    setLocalItems([ ...items ]);
  }, []);

  // Handlers
  const handleChange = (e, d, data, field) => {
    let result = (e.target && e.target.value) ? e.target.value : e.value;
    if (_.isString(result)) {
      result = result.trim();
    }
    _.set(data, field, result);
    setLocalItems([ ...items ]);
  };

  const handleDateChange = (e, d, data, field) => {
    const result = (e.target && e.target.value) ? e.target.value : e.value;
    _.set(data, field[0], result[0]);
    _.set(data, field[1], result[1]);
    setLocalItems([ ...items ]);
  };

  const handleChangeWithOptions = (e, d, data, field) => {
    const result = e.value;
    if (result[0]) {
      _.set(data, field[0], result[0]);
      delete data[field[1]];
    } else {
      _.set(data, field[1], result[1]);
      delete data[field[0]];
    }
    setLocalItems([ ...items ]);
  };

  const handleEnter = e => {
    if (e.keyCode === 13 && onApply) {
      onApply({ ...data, page: 1 });
    }
  };

  const handleFilter = e => {
    const params = Object.assign({}, data);
    // eslint-disable-next-line no-unused-vars
    for (const p in params) {
      if (typeof params[p] === 'string') {
        params[p] = params[p].trim();
      }
    }
    if (onApply) {
      onApply({ ...params, page: 1 });
    }
  };

  // Renderers

  const renderStringField = (item, index) => {
    return (
      <div key={index}>
        <InputText
          title={item.placeholder || item.label}
          placeholder={item.placeholder}
          value={data[item.field]}
          onChange={(e, d) => {
            handleChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
        />
      </div>
    );
  };

  const renderFromToField = (item, index) => {
    const date1 = _.get(data, item.field[0]);
    const date2 = _.get(data, item.field[1]);
    const value = [date1, date2];
    return (
      <div key={index}>
        <FromToField
          title={item.placeholder || item.label}
          placeholder={item.placeholder}
          value={value}
          onChange={(e, d) => {
            handleDateChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
        />
      </div>
    );
  };

  const renderAutoCompleteField = (item, index) => {
    return (
      <div key={index}>
        <AutoCompleteField
          title={item.placeholder || item.label}
          value={data[item.field]}
          onChange={(e, d) => {
            handleChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
          {...item}
        />
      </div>
    );
  };

  const renderAutoCompleteWithOptionsField = (item, index) => {
    return (
      <div key={index}>
        <AutoCompleteWithOptionsField
          title={item.placeholder || item.label}
          value={data[item.field]}
          onChange={(e, d) => {
            handleChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
          {...item}
        />
      </div>
    );
  };

  const renderStringWithOptionsField = (item, index) => {
    const value1 = _.get(data, item.field[0]);
    const value2 = _.get(data, item.field[1]);
    const value = [value1, value2];
    return (
      <div key={index}>
        <StringWithOptionsField
          title={item.placeholder || item.label}
          value={value}
          onChange={(e, d) => {
            handleChangeWithOptions(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
          {...item}
        />
      </div>
    );
  };

  const renderDropdownField = (item, index) => {
    return (
      <div key={index}>
        <Dropdown
          {...item}
          title={item.placeholder || item.label}
          placeholder={item.placeholder}
          value={data[item.field]}
          filter
          showClear
          onChange={(e, d) => {
            handleChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
        />
      </div>
    );
  };

  const renderMultiselectField = (item, index) => {
    return (
      <div key={index}>
        <MultiSelect
          title={item.placeholder || item.label}
          placeholder={item.placeholder}
          value={data[item.field]}
          options={item.options}
          filter
          onChange={(e, d) => {
            handleChange(e, d, data, item.field);
            if (item.onChange) {
              item.onChange(e, d, data, item.field);
            }
          }}
          onKeyDown={handleEnter}
        />
      </div>
    );
  };

  /**
   * Main renderer to render filter controls on screen
   */
  const renderFilterFields = () => {
    const result = [];
    for (let i = 0; i < localItems.length; i += 1) {
      const item = items[i];
      switch (item.type) {
        case FilterType.STRING:
          result.push(renderStringField(item, i));
          break;
        case FilterType.FROMTO:
          result.push(renderFromToField(item, i));
          break;
        case FilterType.AUTOCOMPLETE_WITH_OPTIONS:
          result.push(renderAutoCompleteWithOptionsField(item, i));
          break;
        case FilterType.STRING_WITH_OPTIONS:
          result.push(renderStringWithOptionsField(item, i));
          break;
        case FilterType.DROPDOWN:
          result.push(renderDropdownField(item, i));
          break;
        case FilterType.MULTISELECT:
          result.push(renderMultiselectField(item, i));
          break;
        case FilterType.AUTOCOMPLETE:
          result.push(renderAutoCompleteField(item, i));
          break;
        default:
          result.push(null);
      }
    }
    return result;
  };

  return (
    <>
      {renderFilterFields()}
      <div>
        <Button label={filterLabel} icon={filterIcon} onClick={handleFilter} />
      </div>
    </>
  );
};

export default Filter;
