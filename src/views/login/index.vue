<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"
                      placeholder="账号" @keyup.enter.native="doLogin"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"
                      placeholder="密码" @keyup.enter.native="doLogin"></el-input>
        </el-form-item>
        <!--<div class="row">-->
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <router-link to="/register" class="register-btn">注册</router-link>
        <!--</div>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;"
                       @click.native.prevent="handleSubmit" :loading="logining">登录
            </el-button>
        </el-form-item>
        <div class="use-des-btn"><a @click="showUserDes" href="javascript:void(0)" >使用说明</a></div>
    </el-form>
</template>

<script>
    import {UserType} from 'src/config';

    export default {
        name: "AppViewLogin",
        data() {
            return {
                logining: false,
                ruleForm: {
                    name: localStorage.getItem("name") || '',
                    password: localStorage.getItem("password") || '123456'
                },
                rules: {
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleReset() {    
                this.$refs.ruleForm.resetFields();
            },
            doLogin(e) {
                if(e.keyCode != 13) {
                    return;
                }

                this.handleSubmit();
            },
            handleSubmit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if(!valid) {
                        this.logining = false;
                        return false;
                    }

                    this.logining = true;
                    let userInfo = this.ruleForm;
                    let user = await this.$store.dispatch("Login", userInfo).catch((err)=> {
                        this.logining = false;
                        this.$message({
                            message: err ? err.retMsg : "系统内部错误",
                            type: 'error'
                        });
                    });

                    localStorage.setItem("password", user.password);
                    localStorage.setItem("name", user.name);
                    user && this.$router.push("/main");
                });
            },
            showUserDes() {
                let content = `
                <ol >
                    <li>该工具为增强型记事本。</li>
                    <li>可以根据类型记录不同事件。</li>
                    <li>可以为事件编辑优先级。</li>
                    <li>支持低版本的任务状态处理。</li>
                    <li>可以在线编辑markdown文件。</li>
                </ol>`;
                this.$alert(content, '使用说明', {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true
                });
            }
        }
    }

</script>

<style lang="less" scoped>
    .login-container {
        border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
        .register-btn {
            float: right;
            font-size: 14px;
        }
        .use-des-btn {
            text-align: center;
            font-size: 12px;
        }
    }
</style>
