<!--
导入excel
<template>
  <el-upload ref="uploadRef" class="upload-demo" action="" accept=".csv" :auto-upload="false" :show-file-list="false"
    :on-change="handleUploadChange">
    <el-button round icon="upload" type="primary">Import</el-button>
  </el-upload>
</template>
<script>
import * as XLSX from 'xlsx'
import { readFile } from './utils/xlxs'
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
</script> -->

<!-- 导出 -->
<template>
  <div id="app">
    <div><el-button type="success" @click="outExcel">导出excel</el-button></div>
    <el-table :data="jsonData" stripe style="width: 100%">
      <el-table-column prop="id" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="classes" label="学院">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { xlsx } from './utils/xlxs'
export default {
  data() {
    return {
      jsonData: [{
        id: '1',
        name: '小智',
        age: 18,
        classes: '商学院'
      },
      {
        id: '2',
        name: '小白',
        age: 19,
        classes: '商学院'
      },
      {
        id: '3',
        name: '小蓝',
        age: 12,
        classes: '商学院'
      },
      {
        id: '4',
        name: '小花',
        age: 14,
        classes: '商学院'
      },
      {
        id: '5',
        name: '小粉',
        age: 15,
        classes: '商学院'
      },
      {
        id: '6',
        name: '小黄',
        age: 16,
        classes: '商学院'
      },
      {
        id: '7',
        name: '小红',
        age: 17,
        classes: '商学院'
      },
      {
        id: '8',
        name: '小黑',
        age: 19,
        classes: '商学院'
      },
      ],
      listHander: {
        id: '学号',
        name: '姓名',
        age: '年龄',
        classes: '学院'
      }
    }
  },
  methods: {
    outExcel() {
      // this.jsonData是要导出的数据内容（表格里的内容），
      // this.listHander对应要导出内容的表头
      // 学生：指向的是excel文件名
      xlsx(this.jsonData, this.listHander, '学生')
    }
  },
}
</script>
<style></style>