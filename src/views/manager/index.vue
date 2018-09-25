<template >
    <div class="app-view-manager">
        <header class="app-view-manager-header">
            后台管理系统
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
                    default-active="2"
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

            </section>
        </div>
    </div>
</template>

<script type="text/javascript" >
    export default  {
        name: "AppViewManager",
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            toggleAsideSimple() {
                this.isCollapse = !this.isCollapse;
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

