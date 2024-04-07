import _ from 'lodash';
import localStorageServices from "./localStorage.services";

export const permission = {
  hasPermission: list => {
    if (!list || (list === '')) {
      return true;
    }
    if (_.isString(list)) {
      list = list.split(',');
    }
    const permissionList = localStorageServices.get('permission') || [];
    const user = localStorageServices.get('user') || {};
    const profile = user.profile || {};
    const isMaster = profile.is_master;
    if (isMaster) {
      return true;
    }
    for (let i = 0; i < list.length; i += 1) {
      const p1 = list[i];
      for (let j = 0; j < permissionList.length; j += 1) {
        const p2 = permissionList[j];
        if (p1 === p2) return true;
      }
    }
    return false;
  },
  getDmsdocSaleYCGHCTC: 'logistic.getListSaleDmsdoc',
  getDmsdocSaleNK: 'logistic.getListSaleNKDmsdoc',
  getDmsdocSaleXKTH: 'logistic.getListSaleXKTHDmsdoc',
  postDmsdocSalesNK: 'logistic.addSaleNK',
  postDmsdocSaleGroupQuickPublish: 'logistic.quickPublishSaleDmsdocGroup',
  getCategoryDeliveryCancelReason: 'logistic.getListCancelReasonDelivery',
  getCategoryDeliveryReturnReason: 'logistic.getListReturnReasonDelivery',
  postDmsdocSaleXKTH: 'logistic.addSaleXKTH',
  getCategoryProfileSaleNK: 'logistic.getListProfileSaleNK',
  getCategoryProfileSaleXKTH: 'logistic.getListProfileSaleXKTH',
  getDepots: 'logistic.getListDepot',
  getDmsdocSaleScan: 'logistic.scanSaleDmsdoc',
  getCategoryAddressCity: 'logistic.getListCityAddress',
  getCategoryAddressDistrict: 'logistic.getListDistrictAddress',
  getCategoryAddressWard: 'logistic.getListWardAddress',
  getCategoryAddressValidate: 'logistic.validateAddress',
  putDmsdocSaleInfo: 'logistic.updateSaleDmsDocInfo',
  putDmsdocSaleGroup: 'logistic.mapSaleDmsdocGroup',
  getDmsdocSaleGroup: 'logistic.getListSaleDmsdocGroup',
  putDmsdocSaleGroupPublish: 'logistic.publishSaleDmsdocGroup',
  putDmsdocKtcPublish: 'logistic.publishKtcDmsdocGroup',
  postDmsdocSaleNKTH: 'logistic.addSaleNKTH',
  getDmsdocTimeline: 'logistic.getListTimeline2Dmsdoc',
  getDmsdocSaleByMobile: 'logistic.getSaleInfoByMobile',
  postDmsdocKtc: 'logistic.addKtcDmsdoc',
  getDmsdocKtc: 'logistic.getListKtcByGroupDmsdoc',
  getDmsdocScanMobile: 'logistic.getScanMobile',
  putDmsdocSaleCancel: 'logistic.cancelSaleDmsdoc',
  putDmsdocKtcCancel: 'logistic.cancelKtcDmsdoc',
  putDmsdocSaleGroupManualPublish: 'logistic.manualPublishGroupSaleDmsdoc',
  putDmsdocInfoShipping: 'logistic.updateShippingInfo',
  putDmsdocSaleManualUpdateStatus: 'logistic.manualUpdateStatusSaleDmsdoc',
};
