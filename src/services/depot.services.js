import BaseServices from "./base.services";
import localStorageServices from "./localStorage.services";

class DepotServices extends BaseServices {
  getDepots() {
    return localStorageServices.get("depots");
  }
  setDepot(depot) {
    localStorageServices.set("depot", depot);
  }
  getCurrentDepot() {
    return localStorageServices.get("store");
  }
}

export default new DepotServices();
