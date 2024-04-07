import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { flatString } from '../../../utils/utils';
import _ from 'lodash';

export const AutoCompleteField = ({
  value,
  title,
  onChange,
  onKeyDown,
  placeholder,
  options,
  onSearch,
  multiple,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = e => {
    onChange(e);
  };

  const handleSearch = e => {
    if (onSearch) {
      onSearch(e, setFilteredOptions);
    } else {
      const result = [];
      for (let i = 0; i < options.length; i += 1) {
        if (flatString(options[i].label).indexOf(flatString(e.query)) >= 0) {
          result.push(options[i].label);
        }
      }
      setFilteredOptions(result);
    }
  }

  const renderContent = () => {
    return (
      <div className="p-inputgroup">
        <AutoComplete
          title={title}
          value={value}
          placeholder={placeholder}
          suggestions={filteredOptions}
          multiple={multiple}
          completeMethod={handleSearch}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  };

  return renderContent();
}