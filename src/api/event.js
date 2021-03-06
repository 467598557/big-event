import {GET, POST} from './../utils/request';

export function getList(data) {
    return GET('/event/list', data);
}

export function getListByGroups(data) {
    return GET('/event/listByGroups', data);
}

export function add(data) {
    return GET('/event/add', data);
}

export async function remove(data) {
    return GET("/event/delete", data);
}

export async function update(data) {
    return GET("/event/update", data);
}

export async function updateIndex(data) {
    return POST("/event/updateIndex", data);
}

export async function updateMarkdown(data) {
    return POST("/event/updateMarkdown", data);
}



