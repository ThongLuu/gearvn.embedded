import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { upload } from '../../utils/utils';
import './style.scss';

const UploadArea = ({
  label,
  placeholder,
  error,
  onChange,
  extensions,
}) => {
  const [fileName, setFileName] = useState(null);

  const handleUpload = useCallback(() => {
    upload({ ext: extensions }).then(({ file, data }) => {
      setFileName(file.name, () => {
        if (onChange) {
          onChange({ e: { target: { value: file } } }, { value: file });
        }
      });
    });
  }, [extensions, onChange]);

  return (
    <div className={`upload-area ${error ? 'input-error' : ''}`} onClick={handleUpload}>
      <div>{label}</div>
      <div>{fileName || placeholder}</div>
    </div>
  );
}

UploadArea.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  extensions: PropTypes.string,
  error: PropTypes.string,
};

export default UploadArea;
