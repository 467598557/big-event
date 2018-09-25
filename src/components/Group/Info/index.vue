<template >
    <section v-show="isShow" v-cloak class="app-component-group-info">
        <section v-if="group" class="app-component-group-info-content">
            <header >
                设置分组信息
                <a href="javascript:void(0)" @click="onClose" class="el-icon-close"></a>
            </header>
            <div class="app-component-group-info-content-body">
                <el-input v-model="group.text" placeholder="请输入分组名称"></el-input>
                <div class="row">
                    优先级别:&nbsp;&nbsp;
                    <el-radio-group v-model="group.priority">
                        <el-radio class="priority priority-default" :label="1">默认</el-radio>
                        <el-radio class="priority priority-low" :label="2">低</el-radio>
                        <el-radio class="priority priority-middle" :label="3">中</el-radio>
                        <el-radio class="priority priority-high" :label="4">高</el-radio>
                    </el-radio-group>
                </div>
                <div class="row">
                    私密类型:&nbsp;&nbsp;
                    <el-radio-group v-model="group.security">
                        <el-radio :label="1">保密</el-radio>
                        <el-radio :label="2">公开</el-radio>
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
    import * as GroupApi from 'src/api/group';
    export default {
        name: "AppComponentGroupInfo",
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            group: {
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
                let result = await GroupApi.update(this.group);
                this.isFullscreenLoading = false;
                if(result.retCode === "0000") {
                    this.$emit("onSaveSuccess", this.group);
                } else {
                    this.$message.error(result.retMsg);
                }
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped >
    @import (reference) './../../../assets/less/common';

    .app-component-group-info {
        .fix-window-shader;
        &-content {
            width: 560px;
            height: 300px;
            overflow: hidden;
            margin-left: -280px;
            margin-top: -150px;
            padding: 20px 30px;
            padding-top: 0px;
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
