<template>
    <section class="app-component-markdown-preview">
        <h2 class="title" v-if="event">
            {{event.text}}
            <a title="关闭" @click="onClose" href="javascript:void(0)" class="el-icon-circle-close-outline"></a>
        </h2>
        <div ref="preview" class="content">
        </div>
    </section>
</template>

<script type="text/javascript">
    import * as Api from 'src/api/markdown';

    const {showdown} = require("src/assets/third/md/showdown.js");

    export default {
        name: "AppComponentMarkdownPreview",
        data() {
            return {
                converter: null,
                event: null
            }
        },
        watch: {
            async isShow() {
                if (this.isShow) {
                    this.event = this.$store.state.markdown.preview.relativedEvent;
                    this.getMarkdownAndRender();
                } else {
                    this.event = null;
                    this.$refs.preview.innerHTML = "";
                }
            }
        },
        mounted() {
            this.event = this.$store.state.markdown.preview.relativedEvent;
            this.converter = new showdown.Converter({
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
            this.getMarkdownAndRender();
        },
        methods: {
            onClose() {
                this.$store.dispatch("markdown/HidePreview").catch(() => {
                });
            },
            async getMarkdownAndRender() {
                let event = this.event;
                let markdownId = event.markdown;

                let result = await Api.get({
                    id: markdownId
                });

                let html = this.converter.makeHtml(result.retData.text);
                this.$refs.preview.innerHTML = html;
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-component-markdown-preview {
        width: 100%;
        height: 100%;
        .title {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #DDD;
            box-sizing: border-box;
            font-size: 20px;
            position: relative;
        }
        .content {
            width: 100%;
            float: left;
            height: ~"calc(100% - 50px)";
            overflow: hidden;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 10px;
        }
        .el-icon-circle-close-outline {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 30px;
        }
    }
</style>
