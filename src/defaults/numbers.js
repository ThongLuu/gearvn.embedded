import React from 'react';
import _ from 'lodash';

export const round = v => {
  if (_.isString(v)) {
    v = _.toNumber(v);
  }
  return new Intl.NumberFormat('vi-VN').format(Math.round(v || 0));
}

export const number = v => {
  if (_.isString(v)) {
    v = _.toNumber(v);
  }
  return new Intl.NumberFormat('vi-VN').format(v);
}

export const currency = v => {
  if (_.isString(v)) {
    v = _.toNumber(v);
  }
  const n = (Math.round(v || 0)).toFixed(2);
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export const currencyBillion = v => {
  if (_.isString(v)) {
    v = _.toNumber(v);
  }
  const n = (Math.round(v || 0) / 1000000000).toFixed(2);
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}
