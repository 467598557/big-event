<template>
    <section class="app-view-manager-user">
        <el-row >
            <el-button-group>
                <el-button @click="onShowEditUserPanel" type="primary" icon="el-icon-edit"></el-button>
                <el-button @click="onAddAndEditUser" type="primary" icon="el-icon-plus"></el-button>
                <el-button @click="onRemoveUser" type="primary" icon="el-icon-close"></el-button>
            </el-button-group>
        </el-row>
        <el-table
            ref="multipleTable"
            :data="userList"
            style="width: 100%"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="昵称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码">
            </el-table-column>
            <el-table-column
                prop="type"
                :formatter="formatter"
                label="账户类型">
            </el-table-column>
        </el-table>
        <AppComponentUserInfo
            :user="curUserInfo" v-if="curUserInfo"
            v-show="isShowUserInfo"
            @onClose="onUserInfoClose"
            v-cloak></AppComponentUserInfo>
    </section>
</template>

<script type="text/javascript">
    import * as UserApi from 'src/api/user';
    import {UserTypeKeyObj, UserType} from 'src/config';
    import AppComponentUserInfo from 'src/components/User/Info';

    export default {
        name: "AppViewManagerUser",
        components: {
            AppComponentUserInfo
        },
        data() {
            return {
                isShowUserInfo: false,
                curUserInfo: null,
                userList: [],
                multipleSelection: []
            };
        },
        async mounted() {
            let result = await UserApi.getList();
            this.userList = result.retData;
        },
        methods: {
            formatter(row, column) {
                console.log("formatter", row, column);
                return UserTypeKeyObj[row.type].text;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onShowEditUserPanel() {
                if(!this.multipleSelection.length) {
                    return;
                }

                this.curUserInfo = this.multipleSelection[0];
                this.isShowUserInfo = true;
            },
            async onAddAndEditUser() {
                let result = await UserApi.add({
                    name: "新建用户",
                    password: "123456",
                    type: UserType.User.id
                });

                let user = result.retData;
                this.curUserInfo = user;
                this.isShowUserInfo = true;
                this.userList.unshift(user);
            },
            async onRemoveUser() {
                if(!this.multipleSelection.length) {
                    return;
                }

                let user = this.multipleSelection[0];
                let confirmResult = await  this.$confirm('此操作将永久删除该用户以及用户下内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                });
                if(confirmResult == "confirm") {
                    await UserApi.remove({
                        id: user.id
                    });

                    let userList = this.userList;
                    for(let i=0, len=userList.length; i<len; i++) {
                        if(userList[i].id == user.id) {
                            userList.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            onUserInfoClose() {
                this.isShowUserInfo = false;
                this.curUserInfo = null;
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-view-manager-user {
        margin: 10px;
    }
</style>
