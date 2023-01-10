import List from '../views/list.vue'
import Product from '../views/product.vue'
import Cart from '../views/cart.vue'
const routers = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        component: List
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: Product
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: Cart
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/list'
    }
];
export default routers;