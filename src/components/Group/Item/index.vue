<template >
    <section class="app-componet-group" :class="{'group-isCollapse': isCollapse}" v-if="group">
        <header class="group-header" :data-priority="group.priority">
                    <span class="group-title" :title="group.text||''">
                        {{group.text || ""}}
                    </span>
            <div v-if="group.status==2" style="font-size:12px;" v-html="getGroupSimpleText(group)"></div>
            <i class="app-icon"
               :class="{'app-icon-lock':group.security==1, 'app-icon-unlock':group.security==2}"></i>
            <a href="javascript:void(0)" @click="toggleGroupStatus(group)"
               :class="{'el-icon-arrow-left':group.status==1,'el-icon-arrow-right':group.status==2}"></a>
            <a href="javascript:void(0)" @click="addGroupEvent(group)" class="el-icon-circle-plus-outline"></a>
            <a href="javascript:void(0)" @click="onShowGroupInfo(group)" class="el-icon-setting"></a>
            <a href="javascript:void(0)" @click="onRemoveGroup(group)" class="el-icon-circle-close-outline"></a>
        </header>
        <div class="group-body">
            <AppComponentEventItem :key="event.id" v-for="event in group.events" :event="event"
               @onRemoveEvent="onRemoveEvent"
               @onShowEventInfo="onShowEventInfo"
            ></AppComponentEventItem>
        </div>
        <AppComponentEventInfo
            :is-show="isShowEventInfo"
            :event="curEventInfo"
            @onClose="onEventInfoClose"
            @onSaveSuccess="onEventSaveSuccess"
        ></AppComponentEventInfo>
    </section>
</template>

<script type="text/javascript" >
    import * as GroupApi from 'src/api/group';
    import * as EventApi from 'src/api/event';
    import {splitTimeStrToGoodHTML, isTimeStr} from 'src/utils/time';
    import AppComponentGroupInfo from 'src/components/Group/info';
    import AppComponentEventItem from 'src/components/Event/item';
    import AppComponentEventInfo from 'src/components/Event/info';
    import {MixinStoreUser} from 'src/store/mixin';

    export default {
        name: "AppComponetGroupItem",
        props: {
            group: {
                type: Object,
                default: null
            },
            isCollapse: {
                type: Boolean,
                default: false
            }
        },
        mixins: [MixinStoreUser],
        components: {
            AppComponentEventItem,
            AppComponentEventInfo,
            AppComponentGroupInfo
        },
        data() {
            return  {
                curEventInfo: null,
                curEventOriInfo: null,
                isShowEventInfo: false
            };
        },
        methods: {
            onRemoveEvent(event) {
                let group = this.group;
                let events = group.events;
                for (i = 0, len = events.length; i < len; i++) {
                    if (events[i].id == event.id) {
                        events.splice(i, 1);
                        break;
                    }
                }
            },
            onShowEventInfo(item) {
                this.curEventInfo = Object.assign({}, item);
                this.curEventOriInfo = item;
                this.isShowEventInfo = true;
            },
            onEventInfoClose() {
                this.isShowEventInfo = false;
            },
            onEventSaveSuccess(event) {
                this.isShowEventInfo = false;
                Object.assign(this.curEventOriInfo, event);
            },
            getGroupSimpleText(item) {
                let text = item.text || "";
                let html = "";
                if(isTimeStr(text)) {
                    html = splitTimeStrToGoodHTML(item.text || "");
                } else {
                    item.text.split("").forEach((e)=> {
                        html += `<p>${e}</p>`;
                    });
                }
                html += `<p style="color:gray;"> (${item.events.length})</p>`;
                return html;
            },
            async addGroupEvent(group) {
                let result = await EventApi.add({
                    text: "新建事件",
                    user: this.user.id,
                    group: group.id
                });

                if (result.retCode === "0000") {
                    let event = result.retData;
                    group.events.push(event);
                } else {
                    this.$message.error(result.retMsg);
                }
            },
            async toggleGroupStatus(group) {
                let nextStatus = group.status == 1 ? 2 : 1;
                await GroupApi.updateStatus({
                    user: this.user.id,
                    id: group.id,
                    status: nextStatus
                });

                group.status = nextStatus;
            },
            onShowGroupInfo(group) {
                this.$emit("onShowInfo", group);
            },
            onRemoveGroup(group) {
                this.$emit("onRemove", group);
            }
        }
    }
</script>

<style type="text/css" lang="less" >
    .app-componet-group {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
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
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                text-align: left;
            }
            a {
                font-size: 20px;
                margin-right: 5px;
                display: inline-block;
                margin-top: 6.5px;
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
