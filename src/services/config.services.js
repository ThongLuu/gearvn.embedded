import BaseServices from "./base.services";

class ConfigService extends BaseServices {

  // Lấy menu
  getCategoryCustomConfigView(data) {
    const result = this.get('/private/category/custom/config/view', 'getViewConfig', 'logistic', data);
    return result;
  }

  // Lấy thông tin lịch sử log intergrated với đối tác
  getDmsdocIntegratedLog(data) {
    const result = this.get('/private/dmsdoc/intergratedlog', 'getIntegratedLog', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }

  // Lấy thông tin lịch sử log hook với đối tác
  getDmsdocHooklog(data) {
    const result = this.get('/private/dmsdoc/hooklog', 'getHookLog', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }

  // Lấy thông tin lịch sử log intergrated từ SAP -> DMS
  getDmsdocIntegratedSapDmsLog(data) {
    const result = this.get('/private/dmsdoc/integratedsapdmslog', 'getIntegratedSapLog', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }
};
export default new ConfigService();