<template >
    <div class="app-view-manager">
        <header class="app-view-manager-header">
            后台管理系统
            <el-dropdown v-if="user" >
                <span class="el-dropdown-link">
                    {{user.name}}<a class="logout-btn" @click="logout" href="javascript:void(0)" >登出</a>
                </span>
            </el-dropdown>
        </header>
        <div class="app-view-manager-body">
            <aside class="app-view-manager-body-aside" :class="{'simple-mode':isCollapse}">
                <div class="aside-controller">
                    <a href="javascript:void(0)" @click="toggleAsideSimple">
                        <SvgIcon class="aside-go" icon-class="aside-go" v-if="!isCollapse"></SvgIcon>
                        <SvgIcon class="aside-back" icon-class="aside-back" v-if="isCollapse"></SvgIcon>
                    </a>
                </div>
                <el-menu
                    :default-active="curActiveMenuIndex"
                    @select="onMenuSelected"
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <SvgIcon icon-class="user-manager"></SvgIcon>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <SvgIcon icon-class="system-setting"></SvgIcon>
                        <span slot="title">系统设置</span>
                    </el-menu-item>
                </el-menu>
            </aside>
            <section class="app-view-manager-body-content">
                <router-view/>
            </section>
        </div>
    </div>
</template>

<script type="text/javascript" >
    import {UserType} from 'src/config/index';
    import {logout} from 'src/api/user';

    export default  {
        name: "AppViewManager",
        data() {
            return {
                isCollapse: false,
                curActiveMenuIndex: "1"
            }
        },
        computed: {
            user() {
                return this.$store.state.user.user;
            }
        },
        async mounted() {
            let store = this.$store;
            let userInfoResult = await store.dispatch("GetUserInfo");
            if(!userInfoResult && userInfoResult.type > UserType.User.id) {
                this.$router.replace("/login");
            }

            let curPath = this.$router.history.current.path;
            if(curPath.lastIndexOf("user") > 0) {
                this.curActiveMenuIndex = "1";
            } else if(curPath.lastIndexOf("config") > 0) {
                this.curActiveMenuIndex = "2";
            }
        },
        methods: {
            toggleAsideSimple() {
                this.isCollapse = !this.isCollapse;
            },
            onMenuSelected(index) {
                switch(+index) {
                    case 1:
                        this.$router.push("/manager/user");
                        break;
                    case 2:
                        this.$router.push("/manager/config");
                        break;
                }
            },
            async logout() {
                await logout();
                this.$router.replace("/login");
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-view-manager {
        width: 100%;
        height: 100%;
        overflow: hidden;
        &-header {
            height: 80px;
            line-height: 80px;
            background: #373d41;
            padding: 0;
            color: #fff;
            font-size: 20px;
            text-indent: 15px;
            .logout-btn {
                margin-left: 10px;
                color: #fff;
            }
            .el-dropdown {
                float: right;
                margin-right: 15px;
                color: rgba(255, 255, 255, 0.8);
            }
        }
        &-body {
            display: flex;
            position: absolute;
            top: 80px;
            bottom: 0px;
            width: 100%;
            &-aside {
                width: 200px;
                height: 100%;
                background-color: #333744;
                -webkit-transition-duration: 200ms;
                -moz-transition-duration: 200ms;
                -ms-transition-duration: 200ms;
                -o-transition-duration: 200ms;
                transition-duration: 200ms;
                .aside-controller {
                    background: #4a5064;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    font-size: 20px;
                    a {
                        color: rgba(255, 255, 255, 0.6);
                        display: block;
                    }
                }
                &.simple-mode {
                    width: 60px;
                    li span {
                        opacity: 0;
                        transition-duration: 100ms;
                        transition-delay: 0ms;
                    }
                }
                .el-menu {
                    border-right: none;
                    .svg-icon {
                        margin-right: 5px;
                    }
                    .el-menu-item {
                        color: #fff;
                        background-color: #545c64;
                    }
                    .is-active {
                        background-color: #00c1de;
                    }
                }
                .svg-icon {
                    width: 20px;
                    height: 20px;
                }
                .aside-go, .aside-back {
                    vertical-align: top;
                    margin-top: 5px;
                }
            }
            &-content {
                flex: 1;
            }
        }
    }
</style>

