import React from 'react';
import { InputNumber as RInputNumber } from 'primereact/inputnumber';

export const InputNumber = props => {
  return (
    <RInputNumber
      mode="decimal"
      minFractionDigits={0}
      maxFractionDigits={2}
      locale="vi-VN"
      {...props}
    />
  );
};