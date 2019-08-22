import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero" //生产环境
// 获取地址 http://www.imovietrailer.com/#/
Vue.prototype.import_key = "lee87727257"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
