import axios from "axios";
import _ from "lodash";
import localStorageServices from "./localStorage.services";

class BaseServices {
  constructor(baseUrl) {
    this.api = baseUrl || `${window.location.origin}/v1`; //process.env.BACKEND_HOST + '/v1';

    this.header = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      'Cache-Control': 'no-cache',
    };
  }

  applyStt(promise, first) {
    return promise.then(data => {
      for (let i = 0; i < data.data.length; i += 1) {
        data.data[i].stt = i + 1 + first;
        data.data[i].index = i;
      }
      return data;
    });
  }

  jsonToFormData(data) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  login() {
    const endpoint = this.api + '/api/login';
    this.headers = {
      Accept: "application/json",
      'Content-Type': "application/json",
      'Authorization': `Basic ${btoa('ticketAPI.C1403:12345678x@X')}`,
    };
    const options = {};
    const token = localStorageServices.get('token');
    if (token) {
      this.header['X-API-KEY'] = token.token;
      return new Promise((resolve, reject) => {
        resolve({});
      });
    }

    const instance = axios.create({
      baseURL: this.api,
      headers: { ...this.headers },
      validateStatus: this.validateStatus,
    });
    return instance
      .get(endpoint, options)
      .then(res => {
        localStorageServices.set('token', res.data);
        this.header['X-API-KEY'] = res.data.token;
        return res;
      })
      .catch(this.handleResponseError.bind(this));
  }

  get(api, action, controller, data) {
    let endpoint = this.api + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      }),
      options = {};

    if (data) {
      options = {
        params: data,
      };
    }

    return instance
      .get(endpoint, options)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }

  post(api, action, controller, data) {
    let endpoint = this.api + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      });

    return instance
      .post(endpoint, data)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }

  put(api, action, controller, data) {
    let endpoint = this.api + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      });

    return instance
      .put(endpoint, data)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }

  patch(api, action, controller, data) {
    let endpoint = this.api + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      });

    return instance
      .patch(endpoint, data)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }

  uploadFile(api, action, controller, fieldNameFile, file, data) {
    let formData = new FormData(file),
      endpoint = this.api + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      });

    formData.append(fieldNameFile, file);

    if (typeof data === "object" && data) {
      for (let key in data) {
        formData.append(key, data[key]);
      }
    }

    return instance
      .post(endpoint, formData)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }

  handleResponseSuccess(res) {
    return {
      code: res.data.code,
      success: res.data.success,
      ...res.data.data,
      status: res.status,
    };
  }

  handleResponseError(error) {
    let err = {};
    if (error.response) {
      if (error.response.status === 401) {
        error.response.data.message = 'Phiên truy cập đã hết hạn';
      } else if (error.response.status === 403) {
        error.response.data.message = 'Bạn không được cấp quyền truy cập. Vui lòng liên hệ quản trị viên';
      } else if (error.response.status === 404) {
        error.response.data.message = 'Không tìm thấy địa chỉ yêu cầu';
      } else if (error.response.status === 405) {
        error.response.data.message = 'Phương thức truy cập không được cấp phép';
      }
      if (
        typeof error.response.data === 'string' &&
        error.response.data.includes('Error occured while trying to proxy to:')
      ) {
        error.response.data = {
          message: 'Không thể kết nối đến hệ thống, vui lòng thử lại.',
        };
      }
      err = error.response.data;
      err.statusCode = error.response.status;
    }
    if (error instanceof Error) {
      err = {
        code: 0,
        // statusCode: error.response.status,
        message: (err.message || error.message) + (typeof error.data === 'string' ? ': ' + error.data : '' + ' ' + err.error),
      };
    } else {
      err = {
        code: 0,
        message: 'Không thể kết nối đến hệ thống, vui lòng thử lại.',
      };
    }
    return Promise.reject(err);
  }

  validateStatus(status) {
    return status >= 200 && status < 300;
  }

  ssoPut(api, action, controller, data) {
    let endpoint = this.ssoHost + api,
      headers = {
        ...this.header,
        controller,
        action,
      },
      instance = axios.create({
        baseURL: this.api,
        headers: { ...headers },
        validateStatus: this.validateStatus,
      });

    return instance
      .put(endpoint, data)
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleResponseError.bind(this));
  }
}

export default BaseServices;
