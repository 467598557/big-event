<template>
    <section class="app-component-header">
        <div class="app-component-header-content">
            <!--<el-input placeholder="请输入内容" v-model="searchText">-->
                <!--<el-button @click="onSearch" slot="append" icon="el-icon-search"></el-button>-->
            <!--</el-input> -->
            <span class="logo"></span>
            <el-dropdown v-if="user"  @command="handleCommand">
                <span class="el-dropdown-link">
                    {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </section>
</template>

<script type="text/javascript" >
    import {logout} from 'src/api/user';
    import {MixinStoreUser} from 'src/store/mixin';

    export default {
        name: "AppComponentHeader",
        data() {
            return {
                searchText: ""
            }
        },
        mixins: [MixinStoreUser],
        methods: {
            async handleCommand(command) {
                switch (command) {
                    case "personal":
                        this.$router.push("/manager");
                        break;
                    case "quit":
                        await logout();
                        this.$router.replace("/login");
                        break;
                }
            },
            onSearch() {
                if(!this.searchText) {
                    this.$message.warning("输入搜索条件再搜索哦~_~");
                    return;
                }

                this.$message("搜索功能正在紧锣密鼓的推敲和实现");
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped >
    .app-component-header {
        width: 100%;
        height: 60px;
        color: hsla(0,0%,100%,0.75);
        border-bottom: 1px solid #d5d5d5;
        box-sizing: border-box;
        .logo {
            width: 190px;
            height: 100%;
            display: block;
            float: left;
            background: url(./../../assets/logo.png) no-repeat left center;
            background-size: auto 100%;
        }
        &-content {
            width: 80%;
            height: 100%;
            min-width: 1024px;
            margin: 0 auto;
            .el-input {
                margin-top: 10px;
                width: 500px;
            }
            .el-dropdown {
                float: right;
                margin-top: 23px;
                cursor: pointer;
            }
        }
    }
</style>
