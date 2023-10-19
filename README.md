# v-viewer 插件的使用 在 vue3 中

> npm install v-viewer@next 安装依赖

> 在 mainjs 中导入

```
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
```

> 在组件中使用

```
               <viewer :images="srcList">
                  <img
                      :key="index"
                      v-for="(item,index) in srcList"
                      :src="item"
                      style="width: 128px; height: 128px"
                  />
                </viewer>
```

> github 中文网址 https://mirari.cc/posts/v-viewer#%25E6%258F%2592%25E4%25BB%25B6%25E9%2585%258D%25E7%25BD%25AE%25E9%25A1%25B9
