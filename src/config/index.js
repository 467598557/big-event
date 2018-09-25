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
