import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import './style.scss';

export const Title = ({
  children,
}) => {
  return (
    <div className="c-title">
      {children}
    </div>
  );
};

const TopBar = () => {
  const topbarState = useSelector(state => state.topbarState);
  const [code, setCode] = useState(null);

  // Handlers
  const handleTraCuuClick = () => {
    if (code)
      window.open('/public/tra-cuu?external_code=' + code, '_blank');
  };

  const resultLeft = [];
  const resultRight = [];

  for (let i = 0; i < topbarState.topbar.leftItems.length; i += 1) {
    resultLeft.push(topbarState.topbar.leftItems[i]);
    resultLeft.push(<span className="g-margin-right-8px"></span>);
  }

  for (let i = 0; i < topbarState.topbar.rightItems.length; i += 1) {
    resultRight.push(<span className="g-margin-left-8px"></span>);
    resultRight.push(topbarState.topbar.rightItems[i]);
  }

  return (
    <span className="g-display-inline-flex justify-content-between" style={{ width: 'calc(100% - 40px)' }}>
      <div className="g-display-inline-flex justify-content-between">
        {resultLeft}
      </div>
      <div className="g-display-inline-flex justify-content-between">
        {resultRight}
      </div>
    </span>
  );
};

export default TopBar;
