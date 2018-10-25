<template>
    <section class="app-component-markdown">
        <div class="form" ref="form">
            <textarea ref="code" name="code"></textarea>
        </div>
        <div ref="preview" class="markdown-body preview">
        </div>
    </section>
</template>

<script type="text/javascript">
    const {CodeMirror} = require("src/assets/third/md/codemirror");
    // require("../../../third/md/markdown.js");
    const {showdown} = require("src/assets/third/md/showdown.js");
    console.log(showdown);
    export default {
        name: "AppComponentMarkdown",
        mounted() {
            let codeRef = this.$refs.code;
            let previewRef = this.$refs.preview;
            let converter = new showdown.Converter({
                "omitExtraWLInCodeBlocks": true,
                "noHeaderId": false,
                "prefixHeaderId": "",
                "ghCompatibleHeaderId": true,
                "headerLevelStart": 1,
                "parseImgDimensions": true,
                "simplifiedAutoLink": true,
                "excludeTrailingPunctuationFromURLs": false,
                "literalMidWordUnderscores": true,
                "strikethrough": true,
                "tables": true,
                "tablesHeaderId": false,
                "ghCodeBlocks": true,
                "tasklists": true,
                "smoothLivePreview": true,
                "smartIndentationFix": false,
                "disableForced4SpacesIndentedSublists": false,
                "simpleLineBreaks": false,
                "requireSpaceBeforeHeadingText": false,
                "ghMentions": false, "extensions": [], "sanitize": false
            });

            let editor = CodeMirror.fromTextArea(codeRef, {
                lineNumbers: true,
                theme: "night",
            });
            editor.on("change", function (e) {
                let html = converter.makeHtml(editor.getValue());
                previewRef.innerHTML = html;
            });
        }
    }
</script>

<style type="text/css" lang="less">
    @import "../../assets/third/md/codemirror.css";
    @import "../../assets/third/md/midnight.css";
    @import "../../assets/third/md/markdown.css";

    .app-component-markdown {
        width: 100%;
        height: 100%;
        .form {
            width: 50%;
            float: left;
            box-sizing: border-box;
            border-right: 1px solid gray;
            height: 100%;
        }
        .preview {
            width: 50%;
            float: left;
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 10px;
        }
        .CodeMirror {
            height: 100% !important;
            font-size: 25px;
        }
    }
</style>
