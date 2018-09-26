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

export function isTimeStr(str) {
    return /(\d+[-年]\d+[-月]\d+)/g.test(str);
}

export function splitTimeStrToGoodHTML(timeStr) {
    let html = "";
    (timeStr || "").replace(/(\d+-\d+-\d+)/g, "**$1**").replace(/(\d+年\d+月\d+日)/g, "**$1**").split("**").forEach(function (e) {
        if (!e) {
            return;
        }

        if(!isTimeStr(e)) {
            e.split("").forEach((e2)=> {
                html += `<p>${e2}</p>`;
            });
            return;
        }

        let textList = e.split(/[年月日-]/g);
        const TextIndexObj = {
            0: "年",
            1: "月",
            2: "日"
        };
        textList.forEach(function (e, index) {
            if (!e) return;
            let e2 = `<p>${e}</p>`;
            let e3 = `<p>${TextIndexObj[index] || ""}</p>`;
            // if (!index) {
                html += e2 + e3;
            // } else {
            //     html += e3 + e2;
            // }
        })
    });

    return html;
}
