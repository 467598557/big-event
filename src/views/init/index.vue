<template >
    <div class="app-view-init">
        <section class="app-view-init-content" v-if="!isInited">
            <h2 class="init-title">说明</h2>
            <div class="init-des">
                <p>{{des}}</p>
            </div>
            <el-button v-if="!isInitedJustNow" type="primary" @click="initUser">初始化</el-button>
        </section>
        <section class="app-view-init-content" v-if="isInited">
            <h2 class="init-title">说明</h2>
            <div class="init-des">
                <p>您已经初始化过，点击<router-link to="/login" >登录</router-link>。</p>
            </div>
        </section>
    </div>
</template>

<script type="text/javascript" >
    import * as UserApi from '../../api/user';

    export default {
        name: "AppViewInit",
        data() {
            return {
                isInited: false,
                isInitedJustNow: false,
                des: ""
            }
        },
        async mounted() {
            let result = await UserApi.getInitStatus();

            this.isInited = result.retData;
            if(!this.isInited) {
                this.des = "请谨慎使用该功能。";
            }
        },
        methods: {
            async initUser() {
                let result = await UserApi.init().catch((e)=> {
                    this.$message.warn(e.retMsg || "网络错误")
                });

                this.des = result.retMsg;
                if(result.retCode === "0000") {
                    this.isInitedJustNow = true;
                }
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped="">
    .app-view-init {
        width: 100%;
        height: 100%;
        background: #F2F2F2;
        &-content {
            width: 500px;
            height: auto;
            margin: auto;
            padding-top: 100px;
            text-align: center;
        }
        .init-des {
            line-height: 80px;
        }
    }
</style>