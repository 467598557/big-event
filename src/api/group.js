import {GET} from './../utils/request';

export function getList(data) {
    return GET("/group/list", data);
}

export async function add(data) {
    return GET("/group/add", data);
}

export async function remove(data) {
    return GET("/group/delete", data);
}

export async function update(data) {
    return GET("/group/update", data);
}

export async function updateStatus(data) {
    return GET("/group/updateStatus", data);
}

