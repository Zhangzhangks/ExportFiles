<template>
    <el-upload ref="uploadRef" class="upload-demo" accept=".xlsx" :auto-upload="false" :show-file-list="false"
        :on-change="handleUploadChange">
        <el-button round icon="upload" type="primary">Import</el-button>
    </el-upload>
    <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="id" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="classes" label="学院">
        </el-table-column>
    </el-table>
</template>
<script>
import * as XLSX from 'xlsx'
import { readFile } from '../utils/xlxs'
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async handleUploadChange(file) {
            let dataBinary = await readFile(file.raw);
            let workBook = XLSX.read(dataBinary, { type: 'binary', cellDates: true })
            let workSheet = workBook.Sheets[workBook.SheetNames[0]]
            const data = XLSX.utils.sheet_to_json(workSheet)
            console.log(data)//这里已经能拿到转换后的json
            this.list = data.map(item => {
                return {
                    id: item.学号,
                    name: item.姓名,
                    age: item.年龄,
                    classes: item.学院
                }
            })
            console.log(this.list);
        }
    }
}
</script>