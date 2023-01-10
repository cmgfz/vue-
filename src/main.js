import { createApp } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';

import product_data from './product';


const router = createRouter({
    history:createWebHashHistory(),
    routes:Routers
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

// 数组排重
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}
/*if(localStorage.getItem("todos")===null){
    localStorage.setItem("todos",[])
}*/
const store = new Vuex.Store({
    state: {
        productList: [],
        cartList: [],
        local:JSON.parse(localStorage.getItem("todos"))
        //JSON.parse(localStorage.getItem("todos"))
    },
    getters: {
        /*getLocal:state=>{
            state.local=localStorage.getItem("todos")
            return state.local
        },*/
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations: {
        //添加缓存
        /*setLocal(state,local){
            localStorage.setItem("todos",local)
            state.local=local
        },*/
        // 添加商品列表
        setProductList (state, data) {
            state.productList = data;
            //localStorage.setItem("todos",state.cartList)
        },
        // 添加到购物车
        addCart (state, id) {
            // 先判断购物车是否已有，如果有，数量+1
            /*const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count ++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                }) 
            }*/
            //const local=JSON.parse(localStorage.getItem("todos"))
            const isAdded = state.local.find(item => item.id === id);
            if (isAdded) {
                isAdded.count ++;
            } else {
                state.local.push({
                    id: id,
                    count: 1
                })
            }
            localStorage.setItem('todos',JSON.stringify(state.local))
            console.log(JSON.parse(localStorage.getItem("todos")))
        },
        // 修改商品数量
        editCartCount (state, payload) {
            const product = state.local.find(item => item.id === payload.id);
            product.count += payload.count;
            localStorage.setItem('todos',JSON.stringify(state.local))
        },
        // 删除商品
        deleteCart (state, id) {
            const index = state.local.findIndex(item => item.id === id);
            state.local.splice(index, 1);
            localStorage.setItem('todos',JSON.stringify(state.local))
        },
        // 清空购物车
        emptyCart (state) {
            state.cartList = [];
            localStorage.setItem('todos',JSON.stringify(state.cartList))
        }
    },
    actions: {
        // 请求商品列表
        getProductList (context) {
            // 真实环境通过 ajax 获取，这里用异步模拟
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        // 购买
        buy (context) {
            // 真实环境应通过 ajax 提交购买请求后再清空购物列表
            return new Promise(resolve=> {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
        }
    }
});
const app=createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
/*new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});*/