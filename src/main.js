// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'


import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'



const app = createApp(App)
app.use(ElementPlus);
app.use(Viewer, {
    defaultOptions: {// 需要配置的属性 注意属性并没有引号title: false,toolbar: false}
            //   'inline': true,
            // 'button': true, //右上角按钮
            // // "navbar": true, //底部缩略图
            // "title": true, //当前图片标题
            // "toolbar": true, //底部工具栏
            // // "tooltip": true, //显示缩放百分比
            // "movable": true, //是否可以移动
            // "zoomable": true, //是否可以缩放
            // "rotatable": true, //是否可旋转
            // "scalable": true, //是否可翻转
            // "transition": true, //使用 CSS3 过度
            // "fullscreen": true, //播放时是否全屏
            // "keyboard": true, //是否支持键盘

    }
})
app.mount('#app');