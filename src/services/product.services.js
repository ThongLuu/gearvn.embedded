import BaseServices from "./base.services";
import localStorageServices from "./localStorage.services";

const haravanEcom = process.env.HARAVAN_ECOM;

class ProductServices extends BaseServices {
    apiAddProductToCard = async (product_haravan_id) => {
        try {
            const cartToken = localStorageServices.get("hrvBeacon_s");

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    cookie: "cart_token=" + cartToken.value.sessionId,
                    "x-requested-with": "XMLHttpRequest",
                },

                body: "quantity=1&id=" + product_haravan_id,
            };
            let results = await fetch("https://gearvn-uat.myharavan.com/cart/add.js", config);
            return results;
        } catch (error) {
            console.log("🚀 ~ post ~ error:", error);
        }
    };

    apiAgetCard = async () => {
        try {
            const cartToken = localStorageServices.get("hrvBeacon_s");

            let config = {
                method: "get",
                maxBodyLength: Infinity,
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    cookie: "cart_token=" + cartToken.value.sessionId,
                    "x-requested-with": "XMLHttpRequest",
                }
            };
            let results = await fetch("https://gearvn-uat.myharavan.com/cart.js", config);
            return results;
        } catch (error) {
            console.log("🚀 ~ post ~ error:", error);
        }
    };
}

export default new ProductServices();
