<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">         
                    购物车
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                console.log('hei',this.$store.state.local)
                return this.$store.state.local
                //return JSON.parse(localStorage.getItem('todos'))
               //return JSON.parse(localStorage.getItem('todos'))
                //||this.$store.state.cartList
            }
        },
        /*watch:{
            cartList:{
                deep:true,
                handler(){
                console.log('hei')   
                //localStorage.setItem('todos',JSON.stringify(value))
                }
            },
        }*/
        /*mounted:function(){
            console.log("hi",JSON.parse(localStorage.getItem('todos')))
        }*/
    }
</script>