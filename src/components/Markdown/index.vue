<template>
    <section class="app-component-markdown">
        <div class="form" ref="form">
            <textarea ref="code" name="code"></textarea>
        </div>
        <div ref="preview" class="markdown-body preview">
        </div>
        <div class="btn-group">
            <el-button @click="onClose">取消且关闭</el-button>
            <el-button @click="onSubmit" type="primary">保存</el-button>
        </div>
    </section>
</template>

<script type="text/javascript">
    import * as Api from 'src/api/markdown';
    import * as EventApi from 'src/api/event';
    const {CodeMirror} = require("src/assets/third/md/codemirror");
    const {showdown} = require("src/assets/third/md/showdown.js");
    export default {
        name: "AppComponentMarkdown",
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                editor: null
            }
        },
        watch: {
            async isShow() {
                if(this.isShow) {
                    this.editor.setValue("");
                    this.getMarkdownAndRender();
                } else {
                    this.editor.setValue("");
                }
            }
        },
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

            this.editor = editor;

            this.getMarkdownAndRender();
        },
        methods: {
            async getMarkdownAndRender() {
                let relativedEvent = this.$store.state.markdown.relativedEvent;
                if(relativedEvent.markdown) {
                    let result = await Api.get({
                        id: relativedEvent.markdown
                    });

                    this.editor.setValue(result.retData.text);
                }
            },
            onClose() {
                this.$emit("onClose");
            },
            async onSubmit() {
                // 更新
                let relativedEvent = this.$store.state.markdown.relativedEvent;
                let param = {
                    id: relativedEvent.markdown,
                    text: this.editor.getValue(),
                    user: relativedEvent.user,
                    event: relativedEvent.id
                };
                let result = null;
                if(relativedEvent.markdown) {
                    result = await Api.update(param).catch((e)=> {
                        result = e;
                        this.$message.error(e.retMsg);
                    });
                } else {
                    result = await Api.add(param).catch((e)=> {
                        result = e;
                        this.$message.error(e.retMsg);
                    });
                }

                if(result.retCode === "0000") {
                    if(!relativedEvent.markdown) {
                        relativedEvent.markdown = result.retData.id;
                        await EventApi.updateMarkdown({
                            id: relativedEvent.id,
                            markdown: relativedEvent.markdown
                        });
                    }

                    this.$message.success("保存成功");
                    this.$emit("onSubmitSuccess");
                }
            }
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
        .form, .preview {
            padding-bottom: 50px;
        }
        .btn-group {
            position: absolute;
            left: 0px;
            bottom: 0px;
            width: 100%;
            height: 50px;
            background: #fff;
            text-align: center;
            border-top: 1px solid #F2F2F2;
            line-height: 50px;
            button {
                width: 150px;
            }
            button:last-child {
                margin-left: 50px;
            }
        }
    }
</style>
