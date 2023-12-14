
<template>
    <div>
        <div id="word_demo">
            <h1>标题</h1>
            <p style="color: green">绿色字</p>
            <p style="color: red">红色字</p>
            <p style="color: dodgerblue">蓝色字</p>
        </div>
        <button @click="downLoad('word_demo', '哈哈哈')">点击导出word</button>
    </div>
</template>

<script>
import { exportToWord } from '../utils/xlxs'

export default {
    methods: {
        downLoad(id, name) {
            exportToWord(id, name)
        },
    }
}
</script>