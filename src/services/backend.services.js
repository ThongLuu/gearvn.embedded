import BaseServices from "./base.services";

class BackendService extends BaseServices {
  // Tra cứu danh sách ticket theo SDT hoặc mã ticket
  postReadTickets(data) {
    const result = this.post('/api/services/tickets/ticket/read', '', '', data);
    return result;
  }

  // Tạo mới ticket
  postCreateTicket(data) {
    const result = this.post('/api/services/tickets/ticket', '', '', data);
    return result;
  }

  // Thêm file vào ticket
  postAddFiles(fileName, file, data) {
    const result = this.uploadFile('/api/services/tickets/files/' + data.id, '', '', fileName, file, data);
    return result;
  }

  // Cập nhật ticket
  putUpdateTicket(data) {
    const result = this.put('/api/services/tickets/ticket/' + data.id, '', '', data);
    return result;
  }

  // Lấy danh sách nội dung trao đổi trong chi tiết ticket
  getGetComments(data) {
    const result = this.get('/api/services/tickets/comment/' + data.id, '', '', data);
    return result;
  }

  // Tạo nội dung trao đổi mới
  getCreateComment(data) {
    const result = this.post('/api/services/tickets/comment/' + data.id, '', '', data);
    return result;
  }





  // Danh sách chờ tiếp nhận
  getDmsdocSaleYCGHCTC(data) {
    data.depot_id = this.getDepotId();
    const result = this.get('/private/dmsdoc/sale/YCGHCTC', 'getListSaleDmsdoc', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }

  // Danh sách đã tiếp nhận
  getDmsdocSaleNK(data) {
    data.depot_id = this.getDepotId();
    const result = this.get('/private/dmsdoc/sale/NK', 'getListSaleNKDmsdoc', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }

  // Danh sách phiếu trả kho
  getDmsdocSaleXKTH(data) {
    data.depot_id = this.getDepotId();
    const result = this.get('/private/dmsdoc/sale/XKTH', 'getListSaleXKTHDmsdoc', 'logistic', data);
    this.applyStt(result, ((data.page_index || 1) - 1) * (data.page_size || 10));
    return result;
  }

  // Tạo phiếu Tiếp nhận
  postDmsdocSalesNK(data) {
    const result = this.post('/private/dmsdoc/sale/NK', 'addSaleNK', 'logistic', data);
    return result;
  }
}

export default new BackendService();
