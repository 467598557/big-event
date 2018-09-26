export const TestUserId = "e1d07790-be10-11e8-9985-655aa7277bc6";

export const UserType = {
    User: {
        id: 1,
        text: "普通用户"
    },
    Manager: {
        id: 2,
        text: "管理员"
    },
    Admin: {
        id: 3,
        text: "大总管"
    }
};

let _UserTypeKeyObj = {};
for(let key in UserType) {
    let obj = UserType[key];
    _UserTypeKeyObj[obj.id] = obj;
}
export const UserTypeKeyObj = _UserTypeKeyObj;

let _UserManagerPageRoleObj = {};
_UserManagerPageRoleObj[UserType.User.id] = ["/manager/info", "/manager"];
_UserManagerPageRoleObj[UserType.Admin.id] = _UserManagerPageRoleObj[UserType.Manager.id] = ["/manager/info", "/manager/config", "/manager/user", "/manager"];
export const UserManagerPageRoleKey = _UserManagerPageRoleObj;

let _UserManagerPageRoleList = {};
_UserManagerPageRoleList[UserType.User.id] = [
    {
        path: "/manager/info",
        text: "个人信息",
        key: "info",
        icon: "user-info"
    }
];
_UserManagerPageRoleList[UserType.Manager.id] = _UserManagerPageRoleList[UserType.Admin.id] = [
    {
        path: "/manager/info",
        text: "个人信息",
        key: "info",
        icon: "user-info"
    }, {
        path: "/manager/config",
        text: "系统设置",
        key: "config",
        icon: "system-setting"
    }, {
        path: "/manager/user",
        text: "用户管理",
        key: "user",
        icon: "user-manager"
    }
];
export const UserManagerPageRoleList = _UserManagerPageRoleList;
