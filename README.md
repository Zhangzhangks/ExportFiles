## xlsx 的使用方法

> ###### **https://www.jb51.net/javascript/293493m2y.htm#_label0 文档查看**
>
> ##### **npm install xlsx -S 安装插件**

### 1. 导入 excel 表格

> ```javascript
> /* 读取文件 */
> export const readFile = (file) => {
>   return new Promise((resolve) => {
>     let reader = new FileReader();
>     reader.readAsBinaryString(file);
>     reader.onload = (ev) => {
>       resolve(ev.target.result);
>     };
>   });
> };
> ```

## 2.页面中使用

> **####注意事项** > **vue2：import xlsx from ‘xlsx’** > **vue3：import \* as XLSX from ‘xlsx’**

```
<template>
 <el-upload
            ref="uploadRef"
            class="upload-demo"
            action=""
            accept=".csv"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleUploadChange"
        >
          <el-button round icon="upload" type="primary" >Import</el-button>
        </el-upload>
</template>
<script>
import * as XLSX from 'xlsx'
import { readFile } from '../../utils/xlsx'
export default {
  data() {
    return {
    }
  },
  methods: {
    async handleUploadChange(file) {
      let dataBinary = await readFile(file.raw);
      let workBook = XLSX.read(dataBinary, { type: 'binary', cellDates: true })
      let workSheet = workBook.Sheets[workBook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(workSheet)
      console.log(data)//这里已经能拿到转换后的json
}
}
}

</script>
```

## 导出文件

1.  npm install xlsx@0.17.0 file-saver@2.0.5 --save 安装依赖

> 值得注意的是再引用 xlsx 的时候 vue3 和 vue2 写法不同
> vue2：import xlsx from ‘xlsx’
> vue3：import \* as XLSX from ‘xlsx’

2. 封装工具类

```
import fs from 'file-saver'
import * as XLSX from 'xlsx'
export function xlsx(json, fields, filename = '.xlsx') {//导出xlsx
  json.forEach(item => {
    for (let i in item) {
      if (fields.hasOwnProperty(i)) {
        item[fields[i]] = item[i];
      }
      delete item[i]; //删除原先的对象属性
    }
  })
  let sheetName = filename //excel的文件名称
  let wb = XLSX.utils.book_new()  //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(json, { header: Object.values(fields) }) //将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws
  const defaultCellStyle = { font: { name: "Verdana", sz: 13, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } };//设置表格的样式
  let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true, defaultCellStyle: defaultCellStyle, showGridLines: false }  //写入的样式
  let wbout = XLSX.write(wb, wopts)
  let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  fs.saveAs(blob, filename + '.xlsx')
}
const s2ab = s => {
  var buf;
  if (typeof ArrayBuffer !== 'undefined') {
    buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  } else {
    buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
```

3. 在页面中使用

```javascript
<template>
  <div id="app">
    <div><el-button type="success" @click="outExcel">导出excel</el-button></div>
    <el-table
    :data="jsonData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="学号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
      <el-table-column
      prop="classes"
      label="学院">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {xlsx} from './utils/xlsx'
export default {
  data() {
    return {
      jsonData:[{
        id:'1',
        name:'小智',
        age:18,
        classes:'商学院'
      },
      {
        id:'2',
        name:'小白',
        age:19,
        classes:'商学院'
      },
      {
        id:'3',
        name:'小蓝',
        age:12,
        classes:'商学院'
      },
      {
        id:'4',
        name:'小花',
        age:14,
        classes:'商学院'
      },
      {
        id:'5',
        name:'小粉',
        age:15,
        classes:'商学院'
      },
      {
        id:'6',
        name:'小黄',
        age:16,
        classes:'商学院'
      },
      {
        id:'7',
        name:'小红',
        age:17,
        classes:'商学院'
      },
      {
        id:'8',
        name:'小黑',
        age:19,
        classes:'商学院'
      },
      ],
      listHander:{
        id:'学号',
        name:'姓名',
        age:'年龄',
        classes:'学院'
      }
    }
  },
  methods: {
    outExcel(){
        // this.jsonData是要导出的数据内容（表格里的内容），
        // this.listHander对应要导出内容的表头
        // 学生：指向的是excel文件名
      xlsx(this.jsonData,this.listHander,'学生')
    }
  },
}
</script>

```

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge"
      width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />IE / Edge | [<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox"
      width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />Firefox | [<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome"
      width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />Chrome | [<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari"
      width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />Safari | [<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png"
      alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />iOS Safari |
[<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png"
      alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />Samsung | [<img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera"
    width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br />Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions
