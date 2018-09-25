<template >
    <section class="app-view-index">
        <ul :style="{width:(groups.length+1)*350+'px'}">
            <li v-for="item in groups" :key="item.id" :class="{'group-isCollapse':item.status==2}">
                <header class="group-header" :data-priority="item.priority">
                    <span class="group-title">
                        {{item.text || ""}}
                    </span>
                    <div v-if="item.status==2" v-html="getGroupSimpleText(item)"></div>
                    <i class="app-icon" :class="{'app-icon-lock':item.security==1, 'app-icon-unlock':item.security==2}"></i>
                    <a href="javascript:void(0)" @click="toggleGroupStatus(item)" :class="{'el-icon-arrow-left':item.status==1,'el-icon-arrow-right':item.status==2}"></a>
                    <a href="javascript:void(0)" @click="addGroupEvent(item)" class="el-icon-circle-plus-outline"></a>
                    <a href="javascript:void(0)" @click="onShowGroupInfo(item)" class="el-icon-setting"></a>
                    <a href="javascript:void(0)" @click="onRemoveGroup(item)" class="el-icon-circle-close-outline"></a>
                </header>
                <div class="group-body">
                    <AppComponentEventItem :key="event.id" v-for="event in item.events" :event="event"
                        @onRemoveEvent="onRemoveEvent"
                        @onShowEventInfo="onShowEventInfo"
                    ></AppComponentEventItem>
                </div>
            </li>
            <li>
                <a href="javascript:void(0)" @click="onAddGroup" class="group-plus el-icon-circle-plus-outline"></a>
            </li>
        </ul>
        <AppComponentGroupInfo
            :is-show="isGroupInfoShow"
            :group="curGroupInfo"
            @onSaveSuccess="onGroupSaveSuccess"
            @onClose="onGroupInfoClose"></AppComponentGroupInfo>
        <AppComponentEventInfo
            :is-show="isEventInfoShow"
            :event="curEventInfo"
            @onClose="onEventInfoClose"
            @onSaveSuccess="onEventSaveSuccess"
        ></AppComponentEventInfo>
    </section>
</template>

<script type="text/javascript" >
    import * as GroupApi from 'src/api/group';
    import * as EventApi from 'src/api/event';
    import * as Config from 'src/config/index';
    import AppComponentEventInfo from 'src/components/Event/info';
    import AppComponentGroupInfo from 'src/components/Group/info';
    import AppComponentEventItem from 'src/components/Event/item';
    export default {
        name: "AppViewIndex",
        components: {
            AppComponentGroupInfo,
            AppComponentEventInfo,
            AppComponentEventItem
        },
        data() {
            return {
                groupUUID: 0,
                isGroupInfoShow: false,
                isEventInfoShow: false,
                curGroupInfo: null,
                curEventInfo: null,
                curGroupOriInfo: null,
                curEventOriInfo: null,
                groups: []
            }
        },
        async mounted() {
            const groupResult = await GroupApi.getList({
                user: Config.TestUserId
            });
            const eventResult = await EventApi.getList({
                user: Config.TestUserId
            });
            let groupEvents = {};
            eventResult.retData.forEach((event)=> {
                if(!groupEvents[event.group]) {
                    groupEvents[event.group] = [];
                }

                groupEvents[event.group].push(event);
            });
            this.groups = groupResult.retData.map((group)=> {
                group.events = groupEvents[group.id] || [];

                return group;
            });
        },
        methods: {
            async onAddGroup() {
                let result = await GroupApi.add({
                    text: "新建分组",
                    priority: 1,
                    security: 1,
                    user: Config.TestUserId
                });

                if(result.retCode === "0000") {
                    let group = result.retData;
                    group.events = [];
                    this.groups.push(group);
                    this.curGroupInfo = Object.assign({}, group);
                    this.curGroupOriInfo = group;
                    this.isGroupInfoShow = true;
                } else {
                    this.$message.error(result.retMsg);
                }
            },
            async onRemoveGroup(group) {
                let confirmResult = await  this.$confirm('此操作将永久删除该分组以及分组下内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                });
                if(confirmResult == "confirm") {
                    await GroupApi.remove(group);
                    let groups = this.groups;
                    for(let i=0, len=groups.length; i<len; i++) {
                        if(groups[i] == group) {
                            groups.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            onShowGroupInfo(group) {
                this.curGroupInfo = Object.assign({}, group);
                this.curGroupOriInfo = group;
                this.isGroupInfoShow = true;
            },
            onGroupInfoClose() {
                this.isGroupInfoShow = false;
            },
            onEventInfoClose() {
                this.isEventInfoShow = false;
            },
            onGroupSaveSuccess(group) {
                this.isGroupInfoShow = false;
                Object.assign(this.curGroupOriInfo, group);
            },
            onEventSaveSuccess(event) {
                this.isEventInfoShow = false;
                Object.assign(this.curEventOriInfo, event);
            },
            async toggleGroupStatus(group) {
                let nextStatus = group.status == 1 ? 2 : 1;
                await GroupApi.updateStatus({
                    user: Config.TestUserId,
                    id: group.id,
                    status: nextStatus
                });

                group.status = nextStatus;
            },
            async addGroupEvent(group) {
                let result = await EventApi.add({
                    text: "新建事件",
                    user: Config.TestUserId,
                    group: group.id
                });

                if(result.retCode === "0000") {
                    let event = result.retData;
                    group.events.push(event);
                } else {
                    this.$message.error(result.retMsg);
                }
            },
            onRemoveEvent(event) {
                let groups = this.groups;
                for(let i=0, len=groups.length; i<len; i++) {
                    let group = groups[i];
                    if(group.id == event.group) {
                        let events = group.events;
                        for(i=0, len=events.length; i<len; i++) {
                            if (events[i].id == event.id) {
                                events.splice(i, 1);
                                break;
                            }
                        }
                        return;
                    }
                }
            },
            onShowEventInfo(item) {
                this.curEventInfo = Object.assign({}, item);
                this.curEventOriInfo = item;
                this.isEventInfoShow = true;
            },
            getGroupSimpleText(item) {
                let textList = (item.text || "").split("");
                let html = "";
                textList.forEach((text)=> {
                    html += `<p>${text}</p>`
                });
                html += `<p style="color:gray;font-size:12px;"> (${item.events.length})</p>`;
                return html;
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
        >ul {
            overflow: hidden;
            height: 100%;
            li {
                float: left;
                width: 350px;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid #D5D5D5;
                &.group-isCollapse {
                    width: 40px;
                    text-align: center;
                    .group-body {
                        display: none;
                    }
                    .group-header {
                        width: 100%;
                        height: auto;
                        text-align: center;
                        border-bottom: none;
                        line-height: 20px;
                        .app-icon {
                            margin-left: 10px;
                        }
                        a {
                            margin-right: 0px;
                        }
                        .el-icon-arrow-right {
                            margin-top: 15px;
                        }
                        .el-icon-circle-close-outline, .el-icon-circle-plus-outline {
                            display: none;
                        }
                        .group-title {
                            display: none;
                        }
                    }
                }
            }
        }
        .el-icon-circle-plus-outline.group-plus {
            width: 100px;
            height: 100px;
            display: block;
            font-size: 100px;
            margin: 0 auto;
            position: relative;
            top: 50%;
            margin-top: -50px;
            opacity: 0.5;
            &:hover {
                opacity: 1;
            }
        }
        .group-header {
            height: 35px;
            width: 100%;
            border-bottom: 1px solid #D5D5D5;
            line-height: 34px;
            text-align: right;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            .app-icon {
                float: left;
                margin-left: 5px;
                margin-top: 9px;
            }
            .group-title {
                left: 10px;
                top: 0px;
                float: left;
                margin-left: 10px;
            }
            a {
                font-size: 25px;
                margin-right: 10px;
                display: inline-block;
                margin-top: 4px;
            }
            &[data-priority="2"] {
                color: #67C23A;
            }
            &[data-priority="3"] {
                color: #E6A23C;
            }
            &[data-priority="4"] {
                color: #F56C6C;
            }
        }
        .group-body {
            height: calc(100% - 35px);
            text-align: center;
            overflow: hidden;
            overflow-y: auto;
        }
    }
</style>
