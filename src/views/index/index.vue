<template>
    <section class="app-view-index">
        <AppComponentHeader></AppComponentHeader>
        <ul class="group-list" :style="{width:(groups.length+1)*350+'px'}">
            <li v-for="item in groups" :key="item.id" :class="{'group-isCollapse':item.status==2}">
                <AppComponentGroupItem
                    :group="item"
                    :isCollapse="item.status==2"
                    @onShowInfo="onShowGroupInfo"
                    @onRemove="onRemoveGroup"
                ></AppComponentGroupItem>
            </li>
            <li>
                <a href="javascript:void(0)" @click="onAddGroup" class="group-plus el-icon-circle-plus-outline"></a>
            </li>
        </ul>
        <div class="user-list">
            <ul >
                <li class="user" v-for="userItem in users">
                    <p class="user-title" :class="{active:userItem.isCollapse}" @click="toggleUserCollapse(userItem)">
                        {{userItem.alias || userItem.name}}
                        <i v-if="!userItem.isCollapse" class="el-icon-arrow-down"></i>
                        <i v-if="userItem.isCollapse" class="el-icon-arrow-up"></i>
                    </p>
                    <ul class="group-list" v-if="userItem.groups.length" :class="{show:userItem.isCollapse}" :style="{width:(groups.length+1)*350+'px'}">
                        <li v-for="item in userItem.groups" :key="item.id" :class="{'group-isCollapse':item.status==2}">
                            <AppComponentGroupItem
                                :group="item"
                                :isCollapse="item.status==2"
                                @onShowInfo="onShowGroupInfo"
                                @onRemove="onRemoveGroup"
                                @onPreviewMarkdown="onPreviewMarkdown"
                            ></AppComponentGroupItem>
                        </li>
                    </ul>
                    <div v-else class="user-group-empty" :class="{show:userItem.isCollapse}">
                        没有数据呢
                    </div>
                </li>
            </ul>
        </div>
        <AppComponentFooter></AppComponentFooter>
        <AppComponentGroupInfo
            :is-show="isShowGroupInfo"
            :group="curGroupInfo"
            @onSaveSuccess="onGroupSaveSuccess"
            @onClose="onGroupInfoClose"></AppComponentGroupInfo>
        <section class="md-container" :class="{in: isMarkdownShow}">
            <AppComponentMarkdown
                    @onClose="onMarkdownClose" @onSubmitSuccess="onMarkdownSubmitSuccess"
                    :is-show="isMarkdownShow"
                    v-if="isMarkdownInited"></AppComponentMarkdown>
        </section>
        <section class="md-preview-container" :class="{in: isMarkdownPreviewShow}">
            <AppComponentMarkdownPreview
                    @onClose="onMarkdownPreviewClose"
                    :is-show="isMarkdownPreviewShow"
                    v-if="isMarkdownPreviewInited"></AppComponentMarkdownPreview>
        </section>
    </section>
</template>

<script type="text/javascript">
    import * as GroupApi from 'src/api/group';
    import * as EventApi from 'src/api/event';
    import * as UserApi from 'src/api/user';
    import AppComponentHeader from 'src/components/Header';
    import AppComponentFooter from 'src/components/Footer';
    import AppComponentMarkdown from 'src/components/Markdown/index';
    import AppComponentMarkdownPreview from 'src/components/Markdown/Preview/index';
    import AppComponentGroupItem from 'src/components/Group/Item';
    import AppComponentGroupInfo from 'src/components/Group/Info';

    import {MixinStoreUser, MixinStoreMarkdown} from 'src/store/mixin';

    export default {
        name: "AppViewIndex",
        components: {
            AppComponentGroupInfo,
            AppComponentGroupItem,
            AppComponentHeader,
            AppComponentFooter,
            AppComponentMarkdown,
            AppComponentMarkdownPreview
        },
        mixins: [MixinStoreUser, MixinStoreMarkdown],
        data() {
            return {
                curGroupInfo: null,
                curGroupOriInfo: null,
                isShowGroupInfo: false,
                groups: [],
                users: []
            }
        },
        async mounted() {
            await this.$store.dispatch("GetUserInfo").catch(() => { });
            const groupResult = await GroupApi.getList({
                user: this.user.id
            });
            const eventResult = await EventApi.getList({
                user: this.user.id
            });
            this.groups = this.combileGroupsAndEvents(groupResult.retData, eventResult.retData);

            const userResult = await UserApi.getList();
            userResult.retData.forEach((user)=> {
                user.groups = [];
                user.isCollapse = false;
            });

            let user = this.user;
            this.users = userResult.retData.filter((_user)=> {
                return user.id != _user.id;
            });
        },
        methods: {
            combileGroupsAndEvents(groups, events) {
                let groupEvents = {};
                events.forEach((event) => {
                    if (!groupEvents[event.group]) {
                        groupEvents[event.group] = [];
                    }

                    groupEvents[event.group].push(event);
                });
                groups = groups.map((group) => {
                    let events = groupEvents[group.id] || [];
                    events.sort((a, b)=> {
                        return a.index > b.index ? 1 : -1;
                    });
                    group.events = events;


                    return group;
                });

                return groups;
            },
            async onAddGroup() {
                let result = await GroupApi.add({
                    text: "新建分组",
                    priority: 1,
                    security: 1,
                    user: this.user.id
                });

                if (result.retCode === "0000") {
                    let group = result.retData;
                    group.events = [];
                    this.groups.push(group);
                    this.curGroupInfo = Object.assign({}, group);
                    this.curGroupOriInfo = group;
                    this.isShowGroupInfo = true;
                } else {
                    this.$message.error(result.retMsg);
                }
            },
            async onRemoveGroup(group) {
                let confirmResult = "confirm";
                if (group.events.length) {
                    confirmResult = await this.$confirm('此操作将永久删除该分组以及分组下内容, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    });
                }

                if (confirmResult == "confirm") {
                    await GroupApi.remove(group);
                    let groups = this.groups;
                    for (let i = 0, len = groups.length; i < len; i++) {
                        if (groups[i] == group) {
                            groups.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            onShowGroupInfo(group) {
                this.curGroupInfo = Object.assign({}, group);
                this.curGroupOriInfo = group;
                this.isShowGroupInfo = true;
            },
            onGroupInfoClose() {
                this.isShowGroupInfo = false;
            },
            onGroupSaveSuccess(group) {
                this.onGroupInfoClose();
                Object.assign(this.curGroupOriInfo, group);
            },
            toggleUserCollapse(user) {
                if(user.isCollapse) {
                    user.isCollapse = false;
                    return;
                }

                this.users.forEach((_user)=> {
                    _user.isCollapse = _user.id == user.id;
                });

                if(user.isCollapse) {
                    //
                    this.checkUserGroup(user);
                }
            },
            async checkUserGroup(user) {
                if(user.groups.length) {
                    return;
                }

                let groupResult = await GroupApi.getList({
                    user: user.id
                });
                let groups = groupResult.retData || [];
                if(!groups.length) {
                    return;
                }

                let eventResult = await EventApi.getListByGroups({
                    groups: JSON.stringify(groups.map((group)=> {
                        return group.id
                    }))
                });
                let events = eventResult.retData;

                user.groups = this.combileGroupsAndEvents(groups, events);
            },
            onMarkdownClose() {
                this.$store.dispatch("markdown/Hide").catch(() => { });
            },
            onMarkdownPreviewClose() {
                this.$store.dispatch("markdown/HidePreview").catch(() => { });
            },
            onMarkdownSubmitSuccess() {
            },
            onPreviewMarkdown(item, group) {
                console.log(item);
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    .app-view-index {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-x: auto;
        overflow-y: auto;
        .group-list {
            overflow: hidden;
            height: calc(100% - 60px);
            li {
                float: left;
                width: 350px;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid #D5D5D5;
                border-top: 0px;
                &.group-isCollapse {
                    width: 40px;
                }
            }
        }
        .el-icon-circle-plus-outline.group-plus {
            width: 100px;
            height: 100px;
            display: block;
            font-size: 100px;
            position: relative;
            top: 50%;
            margin: 0 auto;
            margin-top: -50px;
            opacity: 0.5;
            &:hover {
                opacity: 1;
            }
        }
        .user-list {
            width: 100%;
            border-top: 1px solid #D5D5D5;
            .user {
                border-bottom: 1px solid #D5D5D5;
                .user-title {
                    padding: 10px 0px;
                    text-indent: 15px;
                    cursor: pointer;
                    overflow: hidden;
                    color: gray;
                    &:hover, &.active {
                        background-color: #e5e9f2;
                    }
                    i {
                        float: right;
                        margin-right: 15px;
                    }
                }
                .group-list, .user-group-empty {
                    display: none;
                    &.show {
                        display: block;
                    }
                }
                .user-group-empty {
                    background-color: rgba(230, 162, 60, 0.3);
                    color: #666;
                    text-align: center;
                    line-height: 40px;
                    font-size: 12px;
                }
                .group-list {
                    height: 500px;
                }
            }
        }
        .md-container, .md-preview-container {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 100%;
            top: 0px;
            z-index: 1100;
            background: rgba(255, 255, 255, 1);
            overflow: hidden;
            -webkit-transition-duration: 200ms;
            -moz-transition-duration: 200ms;
            -ms-transition-duration: 200ms;
            -o-transition-duration: 200ms;
            transition-duration: 200ms;
            -webkit-transition-property: left;
            -moz-transition-property: left;
            -ms-transition-property: left;
            -o-transition-property: left;
            transition-property: left;
            iframe {
                width: 100%;
                height: 100%;
                border: 0px;
            }
            &.in {
                left: 0;
            }
        }
    }
</style>

