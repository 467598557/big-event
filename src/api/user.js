import {GET} from './../utils/request';
import {POST} from "../utils/request";

export function getList(data) {
    return GET('/user/list', data);
}

export function add(data) {
    return GET('/user/add', data);
}

export async function remove(data) {
    return GET("/user/delete", data);
}

export async function update(data) {
    return GET("/user/update", data);
}

export async function updatePassword(data) {
    return GET("/user/updatePassword", data);
}

export async function login(data) {
    return GET("/user/login", data);
}

export async function getUserInfo() {
    return GET("/user/getUserInfo");
}

export async function logout() {
    return GET("/user/logout");
}

export async function init() {
    return POST("/user/init");
}

export async function getInitStatus() {
    return GET("/user/getInitStatus");
}