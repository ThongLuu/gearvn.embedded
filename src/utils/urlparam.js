import _ from 'lodash';
import moment from 'moment';

/* eslint-disable no-unused-vars */
function paramsToObject(entries) {
  const result = {};
  for (const entry of entries) {
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
}

function isJsonString(str) {
  try {
    const o = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function isJson(str) {
  try {
    JSON.stringify(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * This function encode params to current url
 * @param {*} context React component instance
 * @param {*} params json contain params
 */
function setUrlParams(navigate, params) {
  if (params.noUrl) return;
  if (params.sort && typeof params.sort !== 'string') params.sort = JSON.stringify(params.sort);
  params = _.cloneDeep(params);
  const arrayParams = {};
  for (let key in params) {
    if (params[key] === undefined) {
      delete params[key];
    } else if (_.isArray(params[key])) {
      arrayParams[key] = params[key];
      delete params[key];
    }
  }
  let paramString = new URLSearchParams(params).toString();
  Object.keys(arrayParams).forEach(key => {
    const arrayParam = arrayParams[key];
    let str = '';
    for (let i = 0; i < arrayParam.length; i += 1) {
      str += '"' + arrayParam[i] + '"';
      if (i < arrayParam.length - 1) {
        str += ',';
      }
    }
    paramString += '&' + key + '=[' + str + ']';
  });
  const search = window.location.search.substring(1);
  if (paramString === search) return;
  navigate.push(`?${paramString}`);
}

/**
 * This function decode params to json
 * @returns json contains params
 */
function getUrlParams() {
  const search = window.location.search.substring(1);
  if (!search || search === '') return {};
  const urlParams = new URLSearchParams(search);
  const entries = urlParams.entries();
  const params = paramsToObject(entries);
  if (params.sort) params.sort = JSON.parse(params.sort);
  const subjson = json => {
    let o = { ...json };
    for (let key in o) {
      if (o[key] === 'undefined') {
        delete o[key];
      } else if (isJsonString(o[key])) {
        const v = JSON.parse(o[key]);
        if (v && _.isArray(v)) {
          o[key] = JSON.parse(o[key]);
        } else if (v && _.isObject(v)) {
          o[key] = JSON.parse(o[key]);
          o[key] = subjson(o[key]);
        } else if (v && _.isString(v)) {
          const arr = o[key].split('');
          arr.splice(0, 1);
          arr.splice(arr.length - 1, 1);
          o[key] = arr.join('');
        }
      }
      if (key.toLowerCase().indexOf('date') >= 0) {
        o[key] = moment(o[key]).toDate();
      }
    }
    return o;
  };
  const result = subjson(params);
  return result;
}

/**
 * Execute setParams to update params state, then push these params to
 * history 
 */
export const useAddressBar = (setParams, history) => params => {
  setParams(params);
  setUrlParams(history, params);
};

export { setUrlParams, getUrlParams };
