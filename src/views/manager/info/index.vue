<template >
    <section class="app-view-manager-info">
        <div class="app-view-manager-info-content">
            <el-form :model="form" :rules="rules" ref="ruleForm"
                     label-position="left" label-width="0px"
                     class="demo-ruleForm">
                <el-form-item prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" auto-complete="off"
                              placeholder="旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" auto-complete="off"
                              placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input type="password" v-model="form.rePassword" auto-complete="off"
                              placeholder="确认密码"></el-input>
                </el-form-item>
                <div class="row">
                    <el-button type="primary" style="width:100%;"
                               @click.native.prevent="handleSubmit" v-loading.fullscreen.lock="isFullscreenLoading">登录
                    </el-button>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script type="text/javascript" >
    import {updatePassword} from 'src/api/user';

    export default {
        name: "AppViewManagerInfo",
        data() {
            let validateNewPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.form.rePassword !== '') {
                        this.$refs.ruleForm.validateField('rePassword');
                    }
                    callback();
                }
            };
            let validateRePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.form.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                oldPassword: "",
                newPassword: "",
                rePassword: "",
                isFullscreenLoading: false,
                form: {
                    oldPassword: "",
                    newPassword: "",
                    rePassword: ""
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入当前密码', trigger: 'blur'},
                    ],
                    newPassword: [
                        {validator: validateNewPassword, trigger: 'blur'},
                    ],
                    rePassword: [
                        {validator: validateRePassword, trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            async handleSubmit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (!valid) {
                        return;
                    }

                    let result = await updatePassword(this.form).catch((err)=> {
                        this.$message.error(err.retMsg);
                    });

                    if(result.retCode === "0000") {
                        this.$message("密码修改成功");
                        this.form.oldPassword = this.form.newPassword = this.form.rePassword = "";
                    }
                });
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-view-manager-info {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        &-content {
            width: 560px;
            box-sizing: border-box;
            .row {
                margin-bottom: 15px;
            }
        }
    }
</style>

