<template >
    <section class="app-component-event" :data-id="event.id"
             @mouseenter="()=>{this.isShowBtns=true;}"
             @mouseleave="()=>{this.isShowBtns=false;}" v-if="event">
        <p class="app-component-event-text" :data-priority="event.priority">{{event.text}}({{getEventTypeText(event.type)}})</p>
        <p class="other-info">
            {{readableCreateTime}}<span v-if="event.type==2">（{{statusText}}）</span>
            <span class="btns" v-if="isCurUser" :class="{show:isShowBtns}">
                <a href="javascript:void(0)" @click="onEditMarkdown" class="el-icon-edit" v-if="event.type==3"></a>
                <a href="javascript:void(0)" @click="onShowEventInfo" class="el-icon-setting"></a>
                <a href="javascript:void(0)" @click="onRemoveEvent" class="el-icon-circle-close-outline"></a>
            </span>
            <span class="btns show" v-else>
                <a href="javascript:void(0)" v-if="event.type==3" @click="onPreviewMarkdown" class="el-icon-view"></a>
            </span>
        </p>
    </section>
</template>

<script type="text/javascript" >
    import * as EventApi from 'src/api/event';
    import {timeSpanReadableString} from 'src/utils/time';
    import {MixinStoreUser} from 'src/store/mixin';
    import {getTextByType} from 'src/utils/event';

    export default {
        name: "AppComponentEventItem",
        props: {
            event: {
                type: Object,
                default: null
            }
        },
        mixins: [MixinStoreUser],
        data() {
            return  {
                isShowBtns: false
            }
        },
        computed: {
            readableCreateTime() {
                return timeSpanReadableString(this.event.createTime);
            },
            statusText() {
                switch(this.event.status) {
                    case 1:
                        return "未开始";
                    case 2:
                        return "进行中";
                    case 3:
                        return "已完成";
                }
            },
            isCurUser() {
                return this.user.id == this.event.user;
            }
        },
        methods: {
            onShowEventInfo() {
                this.$emit("onShowEventInfo", this.event);
            },
            onEditMarkdown() {
                this.$store.dispatch("markdown/Show", this.event).catch(()=>{});
            },
            getEventTypeText(type) {
                return getTextByType(type);
            },
            async onRemoveEvent() {
                await EventApi.remove({
                    user: this.user.id,
                    id: this.event.id
                });

                this.$emit("onRemoveEvent", this.event);
            },
            onPreviewMarkdown() {
                // this.$emit("onPreviewMarkdown", this.event);
                this.$store.dispatch("markdown/ShowPreview", this.event).catch(()=>{});
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-component-event {
        width: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        line-height: 25px;
        border-bottom: 1px solid #D5D5D5;
        text-align: left;
        font-size: 16px;
        &-text {
            &[data-priority="2"] {
                color: #67C23A;
            }
            &[data-priority="3"] {
                color: #E6A23C;
            }
            &[data-priority="4"] {
                color: #F56C6C;
            }
        }
        .el-icon-setting, .el-icon-circle-close-outline, .el-icon-edit, .el-icon-view {
            font-size: 20px;
        }
        .el-icon-setting, .el-icon-edit {
            margin-right: 10px;
        }
        .other-info {
            font-size: 12px;
            color: gray;
            overflow: hidden;
        }
        .btns {
            float: right;
            visibility: hidden;
            &.show {
                visibility: visible;
            }
        }
    }
</style>
