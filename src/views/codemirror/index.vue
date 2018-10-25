<template >
    <section class="app-code-mirror" ref="demo">
        <textarea ref="code" name="code" ></textarea>
    </section>
</template>

<script type="text/javascript" >
    const {CodeMirror} = require("src/assets/third/md/codemirror");
    export default {
        name: "AppCodeMirror",
        mounted() {
            let editor = CodeMirror.fromTextArea(this.$refs.code, {
                lineNumbers: true,
                theme: "night",
            });
        }
    }

    console.log(CodeMirror);
</script>

<style type="text/css" lang="less">
    @import "../../assets/third/md/codemirror.css";
    @import "../../assets/third/md/markdown.css";
    @import "../../assets/third/md/midnight.css";
    .app-code-mirror {
        width: 50%;
        float: left;
        box-sizing: border-box;
        border-right: 1px solid gray;
        height: 100%;
        .CodeMirror {
            height: 100%;
            font-size: 25px;
        }
    }
</style>
