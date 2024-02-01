import { axiosClient } from "@/constants";

const ProductService = {
    getProducts: () => axiosClient.get('/san-pham')
}

export default ProductService