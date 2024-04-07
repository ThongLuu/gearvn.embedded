import moment from 'moment';
import _ from 'lodash';
import localStorageServices from './localStorage.services';
import configs from './services.configs';
import BaseServices from "./base.services";

class AuthServices extends BaseServices {
  isExpired() {
    let authInfo = localStorageServices.get('token');

    return !authInfo || !authInfo.token || !authInfo.expired_at || moment().unix() >= moment(authInfo.expired_at, 'DD-MM-YYYY HH:mm:ss').unix();
  }

  hasPermission(want) {
    let permission = localStorageServices.get('permission') || [];
    let user = localStorageServices.get('user') || {};
    const { profile = {} } = user;
    const { is_master } = profile;

    if (!permission || !permission.length || !want) {
      return false;
    }

    if (typeof want === 'string') {
      want = [want];
    }
    const admin = is_master === 1;

    return !!_.intersection(permission, want).length || !!admin;
  }
}

export default new AuthServices();


/*
import { Auth } from 'aws-amplify';

const instanceRequest = new BaseServices(configs.auth_host);

export let authProps = {};
export const setAuthProps = props => {
  authProps = props;
}
export default {
  me: async () => instanceRequest.get('/v2/api/me'),
  isExpired: async () => {
    const authData = await Auth.currentSession()
    if (authData === null) {
      return true;
    }
    if (authData.isValid() && authData.getAccessToken().getExpiration() < moment(new Date())) {
      return true;
    }
    return false
    // return moment(authData.expired_at, 'DD-MM-YYYY HH:mm:ss') < moment(new Date());
  },
  hasPermission: want => {
    if (want == null || want === undefined || want === '') return true;
    const profile = localStorageService.get('user').profile || {};
    const permission = localStorageService.get('permission');
    if (permission == null) {
      return false;
    }
    const data = _.find(permission, o => {
      return new RegExp(want).test(o);
    });
    const admin = profile.is_master === 1;

    return !_.isUndefined(data) || !!admin;
  },
  hasPermissionWithPolicy: want => {
    if (want == null || want === undefined || want === '') return true;
    const profile = localStorageService.get('user').profile || {};
    const permission = localStorageService.get('permissions');
    if (permission == null) {
      return false;
    }
    const data = _.find(permission, o => {
      return new RegExp(want).test(o);
    });
    const admin = profile.is_master === 1;

    return !_.isUndefined(data) || !!admin;
  },
};
*/