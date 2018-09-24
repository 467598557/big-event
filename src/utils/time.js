function fillNumToTwoCount(num) {
    if(num < 10) {
        num = "0"+num;
    }

    return num;
}

export function timeSpanReadableString(timeSpan) {
    let date = new Date(timeSpan);
    let y = date.getFullYear() + '-';
    let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let d = fillNumToTwoCount(date.getDate()) + ' ';
    let h = fillNumToTwoCount(date.getHours()) + ':';
    let m = fillNumToTwoCount(date.getMinutes()) + ':';
    let s = fillNumToTwoCount(date.getSeconds());

    return y + month + d + h + m + s;
}