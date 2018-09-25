<template >
    <section class="app-component-user-info">
        <div class="app-component-user-info-content" v-if="user">
            <header >
                {{user.name}}
                <a href="javascript:void(0)" @click="onClose" class="el-icon-close"></a>
            </header>
            <div class="app-component-user-info-content-body">
                <el-input v-model="user.name" placeholder="请输入账号昵称"></el-input>
                <div class="row">
                    <el-input v-model="user.password" placeholder="请输入账号密码"></el-input>
                </div>
                <div class="row">
                    账号类型:&nbsp;&nbsp;
                    <el-radio-group v-model="user.type">
                        <el-radio v-for="(val) in UserType" :label="val.id">{{val.text}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="row text-center">
                    <el-button v-loading.fullscreen.lock="isFullscreenLoading" type="primary">保存</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/javascript" >
    import {UserType} from 'src/config';

    export default {
        name: "AppComponentUserInfo",
        props: {
            user: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                UserType,
                isFullscreenLoading: false
            };
        },
        methods: {
            onClose() {
                this.$emit("onClose");
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    @import (reference) './../../../assets/less/common';

    .app-component-user-info {
        .fix-window-shader;
        &-content {
            width: 560px;
            height: 325px;
            margin-left: -280px;
            margin-top: -150px;
            &-body {

            }
        }
    }
</style>
