import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { hideLoading, showLoading } from "../../components/Loading/redux/actions";
import backendServices from "../../services/backend.services";
import axios from "axios";
import productServices from "../../services/product.services";
import DialogComponent from "../Dialog";
import Filter, { FilterType } from "../Filter";
import { setUrlParams, getUrlParams } from "../../utils/urlparam";
import { toast } from "../Page/redux/actions";

import "../Page/style.scss";
import "./Style.scss";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const SuggestProductComponent = ({ filterLabel = "Lọc", filterIcon = "pi pi-filter", searchPlaceholder="Nhập Mua kèm chuột bạn cần tìm" }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [params, setParams] = useState({});
    const [localFilters, setLocalFilters] = useState({});
    const [searchKey, setSearchKey] = useState('');

    const Compatible = [
        {
            label: "Tương thích",
            value: "",
        },
        {
            label: "MacOS",
            value: "mac-os",
        },
        {
            label: "Windows",
            value: "windows",
        },
        {
            label: "Linux",
            value: "linux",
        },
    ];

    const Connection = [
        {
            label: "Kết nối",
            value: "",
        },
        {
            label: "Dây USB",
            value: "usb-line",
        },
        {
            label: "USB Receiver",
            value: "usb-receiver",
        },
        {
            label: "Bluetooth",
            value: "bluetooth",
        },
    ];

    const Application = [
        {
            label: "Tính năng",
            value: "",
        },
        {
            label: "Dùng cho laptop",
            value: "use-laptop",
        },
    ];

    const Utility = [
        {
            label: "Tiện ích(chuột)",
            value: "",
        },
        {
            label: "Kết nối đa thiết bị",
            value: "multi-device",
        },
        {
            label: "Click không nghe tiếng",
            value: "click-no-sound",
        },
        {
            label: "Dùng pin sạc",
            value: "use-battery",
        },
    ];

    const filters = {
        items: [
            { type: FilterType.MULTISELECT, placeholder: "Tương thích", field: "compatible", options: Compatible },
            { type: FilterType.MULTISELECT, placeholder: "Kết nối", field: "connection", options: Connection },
            { type: FilterType.MULTISELECT, placeholder: "Tính năng", field: "application", options: Application },
            { type: FilterType.MULTISELECT, placeholder: "Tiện ích(chuột)", field: "utility", options: Utility },
        ],
        data: params,
    };

    const [data, setData] = useState([
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
                rate: 3.9,
                count: 120,
            },
        },
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts ",
            price: 22.3,
            description:
                "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            rating: {
                rate: 4.1,
                count: 259,
            },
        },
    ]);

    // useEffect(() => {
    //     handleGetData();
    // }, [data.data]);

    // const handleGetData = (params) => {
    //     dispatch(showLoading());
    //     axios("https://fakestoreapi.com/products")
    //         .then((data) => {
    //           console.log(data.data);
    //             setData(data.data.slice(0, 2));
    //         })
    //         .catch((err) => {
    //             dispatch(toast({ detail: err.message }));
    //         })
    //         .finally(() => {
    //             dispatch(hideLoading());
    //         });
    // };

    const handleURLParams = () => {
        const params = getUrlParams();
        let newFilter;
        if (filters) {
            newFilter = { ...filters.data, ...localFilters, ...params };
        } else {
            newFilter = { ...localFilters, ...params };
        }
        setLocalFilters(newFilter);
        return newFilter;
    };

    const handleApply = (items) => {
        const newFilter = {
            ...items,
        };
        handleGetData(newFilter);
        setLocalFilters(newFilter);
    };

    const handleGetData = (params) => {
        dispatch(showLoading());
        axios("https://fakestoreapi.com/products")
            .then((data) => {
                setData(data.data.slice(0, 2));
                setTotalItem(data.total);
            })
            .catch((err) => {
                dispatch(toast({ detail: err.message }));
            })
            .finally(() => {
                dispatch(hideLoading());
            });
    };

    const renderSuggestProduct = (product) => {
        return (
            <div className="d-flex mb-4" key={product.id}>
                <div style={{ width: "128px", height: "128px" }} className="position-relative">
                    <img src={product.image} style={{ height: "100%" }} />
                    <input type="checkbox" style={{ transform: "scale(1.5)", position: "absolute", left: 0, bottom: 0 }} />
                </div>
                <div className="d-flex flex-column" style={{ fontSize: "17px" }}>
                    <div className="pb-2">{product.title}</div>
                    <div className="d-flex pb-2">
                        <div className="mr-3" style={{ color: "var(--color-primary)" }}>
                            <strong>{product.price}</strong>
                        </div>
                        <div style={{ color: "gray" }}>
                            <del>{product.price}</del>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            style={{ fontWeight: 500 }}
                            onClick={() => {
                                productServices.apiAddProductToCard(1104211547);
                            }}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const RenderFilters = () => {
        if (!filters || filters.items.length === 0) return null;
        return <Filter {...filters} onApply={handleApply} filterLabel={filterLabel} filterIcon={filterIcon} />;
    };

    const RenderDialogBodySuggestProduct = () => {
        return (
            <>
                <div className="search-input">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="Search" />
                    </span>
                </div>
                <div className="filter-title">Chọn theo tiêu chí</div>
                <div className="card-body catalog g-overflow-hidden">
                    <div className="filter">
                        <RenderFilters />
                    </div>
                </div>
                <div>
                    <div className="filter-title">Sắp xếp theo</div>
                    <div className="filter-button-container">
                        <Button label="Giá Cao - Thấp" className="p-button-outlined p-button-secondary" icon="pi pi-sort-amount-down-alt" />
                        <Button label="Giá Thấp - Cao" className="p-button-outlined p-button-secondary" icon="pi pi-sort-amount-down" />
                        <Button label="Khuyến mãi Hot" className="p-button-outlined p-button-success p-button-secondary" icon="pi pi-percentage" />
                        <Button label="Xem nhiều" className="p-button-outlined p-button-info p-button-secondary" icon="pi pi-eye" />
                    </div>
                </div>
            </>
        );
    };

    useEffect(() => {
        const filters = handleURLParams();
        handleGetData(filters);
    }, []);

    return (
        <div className="product-combo-promo-box combo-promo--app" id="combo-promo--app" style={{ border: "none", overflow: "visible" }}>
            <div className="mt-3" style={{ fontWeight: 500, fontSize: "18px" }}>
                <h4>Gợi ý mua kèm</h4>
                <div className="d-flex flex-column">
                    {data.map((p) => renderSuggestProduct(p))}
                    <DialogComponent buttonClassname="btn btn-outline-primary w-100 mb-4" buttonStyle={{ fontWeight: 500 }} buttonTitle="Xem thêm sản phẩm với giá ưu đãi" dialogFieldName="displayBasic" bodyDialog={<RenderDialogBodySuggestProduct />} />
                    <div className="d-flex align-items-baseline">
                        <div className="btn btn-danger mr-3" style={{ background: "var(--color-primary)" }}>
                            Mua thêm <strong>1</strong> sản phẩm
                        </div>
                        <div>
                            Tiết kiệm:
                            <span style={{ color: "var(--color-primary)" }}>
                                <strong>900.000đ</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestProductComponent;
