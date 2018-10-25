<template >
    <section v-show="isShow" v-cloak class="app-component-event-info">
        <section v-if="event" :data-type="event.type" class="app-component-event-info-content">
            <header >
                设置事件信息
                <a href="javascript:void(0)" @click="onClose" class="el-icon-close"></a>
            </header>
            <div class="app-component-event-info-content-body">
                <el-input v-model="event.text" placeholder="请输入事件名称"></el-input>
                <div class="row">
                    事件类型:&nbsp;&nbsp;
                    <el-radio-group v-model="event.type">
                        <el-radio :label="1">普通</el-radio>
                        <el-radio :label="2">任务</el-radio>
                        <el-radio :label="3">MarkDown</el-radio>
                    </el-radio-group>
                </div>
                <div class="row" v-if="event.type==2">
                    事件状态:&nbsp;&nbsp;
                    <el-radio-group v-model="event.status">
                        <el-radio :label="1">未开始</el-radio>
                        <el-radio :label="2">进行中</el-radio>
                        <el-radio :label="3">已完成</el-radio>
                    </el-radio-group>
                </div>
                <div class="row" v-if="event.type==2">
                    优先级别:&nbsp;&nbsp;
                    <el-radio-group v-model="event.priority">
                        <el-radio class="priority priority-default" :label="1">默认</el-radio>
                        <el-radio class="priority priority-low" :label="2">低</el-radio>
                        <el-radio class="priority priority-middle" :label="3">中</el-radio>
                        <el-radio class="priority priority-high" :label="4">高</el-radio>
                    </el-radio-group>
                </div>
                <div class="row text-center">
                    <el-button @click="onSave" v-loading.fullscreen.lock="isFullscreenLoading" type="primary">保存</el-button>
                </div>
            </div>
        </section>
    </section>
</template>

<script type="text/javascript" >
    import * as EventApi from 'src/api/event';
    export default {
        name: "AppComponentEventInfo",
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            event: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                isFullscreenLoading: false
            }
        },
        methods: {
            onClose() {
                this.$emit("onClose");
            },
            async onSave() {
                this.isFullscreenLoading = true;
                let result = await EventApi.update(this.event);
                this.isFullscreenLoading = false;
                if(result.retCode === "0000") {
                    this.$emit("onSaveSuccess", this.event);
                } else {    
                    this.$message.error(result.retMsg);
                }
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped >
    @import (reference) "../../../assets/less/common";

    .app-component-event-info {
        .fix-window-shader;
        &-content {
            width: 560px;
            height: 300px;
            overflow: hidden;
            margin-left: -280px;
            margin-top: -150px;
            &[data-type="2"] {
                height: 350px;
            }
        }
        header {
            text-align: center;
            height: 80px;
            font-size: 24px;
            line-height: 80px;
            box-sizing: border-box;
            border-bottom: 1px solid #F2F2F2;
            position: relative;
        }
        .priority {
            &.priority-normal {
                color: #909399;
            }
            &.priority-low {
                color: #67C23A;
            }
            &.priority-middle {
                color: #E6A23C;
            }
            &.priority-high {
                color: #F56C6C;
            }
        }
    }
</style>
