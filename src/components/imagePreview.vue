<template>
    <!-- 指令使用 -->
    <!-- <div v-viewer>
        <img v-for="src in images" :key="src" :src="src" />
    </div> -->
    <!-- 组件使用 -->
    <!-- <viewer :images="images">
        <img v-for="src in images" :key="src" :src="src">
    </viewer> -->
    <a v-if="images?.length" @click="showImagesInViewer(images)">查看</a>
</template>
<script>

// npm install v - viewer@next
export default {
    data() {
        return {
            images: [
                "https://picsum.photos/200/200",
                "https://picsum.photos/300/200",
                "https://picsum.photos/250/200"
            ]
        };
    },
    methods: {
        showImagesInViewer(urls) {
            urls instanceof Array &&
                urls?.length &&
                this.$viewerApi({ images: urls })
        },
    }
}
</script>