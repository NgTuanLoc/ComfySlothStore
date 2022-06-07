import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: true,
      };
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSidebarOpen: false,
      };
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        loadingProducts: true,
        errorSingleProduct: false,
      };
    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        loadingProducts: false,
        products: action.payload,
        featuredProducts,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loadingProducts: false,
        errorProducts: true,
      };

    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        loadingSingleProduct: true,
        errorSingleProduct: false,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingSingleProduct: false,
        singleProduct: action.payload,
      };

    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        loadingSingleProduct: false,
        errorSingleProduct: true,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
