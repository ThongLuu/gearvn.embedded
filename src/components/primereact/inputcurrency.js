import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

export const InputCurrency = props => {
  return (
    <InputNumber
      mode="currency"
      currency="VND"
      locale="vi-VN"
      {...props}
    />
  );
};