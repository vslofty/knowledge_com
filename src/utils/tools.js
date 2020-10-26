//工具类
// import { MessageBox } from 'element-ui';

var Tools = function () { }

Tools.resetData = function (vm) {
    vm.pageIndex = 1
    vm.loadMore = false
    vm.loadAll = false
    vm.list = []
    vm.searchName = null
    vm.userState = null
    vm.userSigns = null
}

Tools.handleListData = function (vm, data, isReplace = false) {
    // console.log(vm, data.length)
    if (data && data.length > 0) {
        vm.list = !isReplace ? vm.list.concat(data) : data;
        if (data.length < vm.pageSize) {
            vm.loadAll = true
        }
    } else {
        vm.loadAll = true
    }
    if (vm.loadAll) {
        vm.loadMore = false
    }
    return vm;
}

Tools.throttle = function (delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}


Tools.handleGetParam = function (params) {
    var data = ''
    for (var key in params) {
        data = data + '&' + key + '=' + params[key]
    }
    return data.substring(1);
}

var tipNum = 0;
Tools.handleData = function (data, handleData = false) {
    return new Promise(function (resolve) {
        data.then(res => {
            res = res.data;
            if (res && res.isok) {
                if (handleData) {
                    var result = res.dataObj;
                    res.dataObj = {
                        Amout: res.Amout || 0,
                        Data: result
                    }
                    resolve(res.dataObj || true);
                } else {
                    resolve(res.dataObj || true);
                }
            } else {
                resolve(false);
                if (tipNum > 0) return;
                ++tipNum;
                // MessageBox.alert(res.Msg || '暂无信息', '提示', {
                //     confirmButtonText: '确定',
                //     callback: (action) => {
                //         console.log('点击了确定', action)
                //         tipNum = 0;
                //         if (res.code == 'nologin') {
                //             window.location.href = res.dataObj;
                //         }
                //     }
                // });
            }
        });
    })
}

Tools.formatDate = function (dateStr, type = 'YYYY-MM-DD') {
    var timestap = dateStr.match(/(\d+)/g, (m) => {
        return m;
    })[0]
    var dateObj = new Date(Number(timestap))
    var formatStr = this.formatTime(dateObj, type)
    return formatStr;
}

Tools.formatTime = function (time, format = "yyyy-mm-dd") {
    const d = time ? new Date(time) : new Date();
    const t = i => {
        return (i < 10 ? "0" : "") + i;
    };

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const weekday = d.getDay();

    return format.replace(
        /(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi,
        function (r) {
            switch (r.toUpperCase()) {
                case "YY":
                    return ("" + year).substr(2);
                case "YYYY":
                    return year;
                case "M":
                    return month;
                case "MM":
                    return t(month);
                case "D":
                    return day;
                case "DD":
                    return t(day);
                case "H":
                    return hour;
                case "HH":
                    return t(hour);
                case "I":
                    return minutes;
                case "II":
                    return t(minutes);
                case "S":
                    return seconds;
                case "SS":
                    return t(seconds);
                case "W":
                    return `星期${
                        ["日", "一", "二", "三", "四", "五", "六"][weekday]
                        }`;
                case "WW":
                    return [
                        "Sunday",
                        "Monday",
                        "TuesDay",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ][weekday];
            }
        }
    );
};

//扩展一个对象
Tools.extend = function (target, src) {
    for (var key in src) {
        target[key] = src[key]
    }
    return target
}

//获取相对值
Tools.getRelativeValue = function (mon, son, relMon) {
    var relSon = son * relMon / mon
    return Math.floor(relSon)
}

//路由入栈
Tools.goNewPage = function (target, url, query) {
    target.$router.push({
        path: url,
        query: query
    });
}

//路由出栈
Tools.goBack = function (target, delta = -1) {
    target.$router.go(delta)
}

//显示弹窗(确定， 取消)
Tools.showModal = function (target, msg, title, confirmText, cancelText) {
    return new Promise(function (resolve) {
        // MessageBox.confirm(msg, title || "提示", {
        //     confirmButtonText: confirmText || '确定',
        //     cancelButtonText: cancelText || '取消',
        //     type: 'warning',
        //     center: true
        // }).then(() => {
        //     resolve(true)
        // }).catch(() => {
        //     resolve(false)
        // });
    })
}

//提示
Tools.toast = function (target, msg, icon, duration = 2000) {
    target.$message({
        message: msg,
        type: icon,
        duration: duration
    });
}

//显示加载
var targetInstance;
Tools.showLoading = function (msg = 'Loading') {
    targetInstance = this.$loading({
        lock: true,
        text: msg,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

//关闭提示
Tools.hideToast = function () {
    targetInstance.close();
}

Tools.repalceHttps = function (url) {
    return url.replace(/^https?/g, 'https')
}

Tools.cloneDeep = function (obj) {
    return JSON.parse(JSON.stringify(obj))
}

Tools.removePropertys = function (obj, keys) {
    var i = keys.length,
        key;
    while (i--) {
        key = keys[i]
        delete obj[key]
    }

    return obj
}

Tools.checkPhone = function (target, phone) {
    if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))) {
        target.toast(target, '手机号码有误，请重填', 'error')
        return false;
    }
    return true
}

Tools.checkSignName = function (target, name) {
    if (!(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test(name))) {
        this.toast(target, '标签只允许设置中文、数字以及字母', 'error')
        return false;
    }
    return true
}

// 验证码倒计时
Tools.timeDjs = function (target) {
    let timeOutCode = target.data.timeOutCode;
    timeOutCode--;
    target.setData({
        timeOutCode
    })
    let time = setInterval(() => {
        timeOutCode--;
        if (timeOutCode == 0) {
            clearInterval(time)
            timeOutCode = 60;
        }
        target.setData({
            timeOutCode
        })
    }, 1000);
}

// 时间 个数转十数
Tools.addZero = function (num) {
    return num < 10 ? '0' + num : num
}

Tools.handleDate = function (date) {
    if (!date) return;
    date = this.formatDate(date, 'YYYY-MM-DD HH:mm:dd');
    var d = new Date(Date.parse(date.replace(/-/g, "/")));
    var curDate = new Date();
    var dateArr = date.split(' ');
    var dateArray = dateArr[0].split('-');
    return {
        startime: dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日 ' + dateArr[1],
        isStart: d < curDate ? false : true
    }
}

// 判断时间是否为今天（iday==0为今天）
Tools.judgeTimeIsToday = function (date) {
    var d1 = new Date(date.split(' ')[0]);
    var dd = new Date();
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    var d2 = new Date(y + '/' + m + '/' + d);
    var iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
    return iday;
}

// 判断时间是否超过规定的几个小时（默认5小时）
Tools.judgeTimeIsOverdue = function (date, timeNum = 5) {
    var startDate = new Date(Date.parse(date.replace(/-/g, "/")));
    var nowD = new Date();
    var ms = nowD.getTime() - startDate.getTime();
    // console.log(ms, Number((ms / 1000 / 60 / 60).toFixed(1)), timeNum)
    if (ms < 0) return 0;
    return Number((ms / 1000 / 60 / 60).toFixed(1)) > timeNum ? true : false;
}

// 格式化日期
Tools.handleFormatDate = function (date) {
    var year = date.getFullYear();
    var month = this.addZero(date.getMonth() + 1);
    var day = this.addZero(date.getDate());
    var hour = this.addZero(date.getHours());
    var minute = this.addZero(date.getMinutes());
    var second = this.addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 秒数换算时分秒
Tools.getCompleteTime = function (value,flag=false) {
    if (value !== 0) {
        let secondTime = parseInt(value); // 秒
        let minuteTime = 0; // 分
        let hourTime = 0; // 小时
        if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
            // 获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            // 获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            // 如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                // 获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                // 获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        if(flag){
            return `${parseInt(hourTime) ? (parseInt(hourTime) + '小时') : ''}${parseInt(minuteTime)}分钟`
        }else{
            return `${this.addZero(parseInt(hourTime))}:${this.addZero(parseInt(minuteTime))}:${this.addZero(parseInt(secondTime))}`
        }
    } else {
        return '0分钟'
    }
}

// 名字除首尾第一个字外其他都为*
Tools.formatName = function (name) {
    let newStr;
    if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < ((len > 4) ? 4 : len); i++) {
            char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
        newStr = name;
    }
    return newStr;
}

// 轮询
Tools.polling = function (cb, interval, timeout, failCb) {
    interval = interval || 100
    timeout = timeout || 5 * 1000

    var startTime = Date.now()


    if (cb()) {
        return;
    }

    var timer = setInterval(function () {
        if (cb()) {
            clearInterval(timer)
            return;
        }

        if (Date.now() - startTime >= timeout) {
            clearInterval(timer)
            failCb()
        }
    }, interval)

    return timer
}

// 为scroll，resize等频繁触发的事件限流
Tools.createThrottleFn = function (cb, delay = 50) {
    var startTime = Date.now()
    return function (e) {
        var this$1 = this
        var currTime = Date.now()
        if (currTime - startTime >= delay) {
            cb.call(this$1, e)
            startTime = currTime
        }
    }
}

//省市区截取
Tools.getArea = function (str) {
    let area = {}
    let index11 = 0
    let index1 = str.indexOf("省")
    if (index1 == -1) {
        index11 = str.indexOf("自治区")
        if (index11 != -1) {
            area.Province = str.substring(0, index11 + 3)
        } else {
            area.Province = str.substring(0, 0)
        }
    } else {
        area.Province = str.substring(0, index1 + 1)
    }

    let index2 = str.indexOf("市")
    if (index11 == -1) {
        area.City = str.substring(index11 + 1, index2 + 1)
    } else {
        if (index11 == 0) {
            area.City = str.substring(index1 + 1, index2 + 1)
        } else {
            area.City = str.substring(index11 + 3, index2 + 1)
        }
    }

    let index3 = str.lastIndexOf("区")
    if (index3 == -1) {
        index3 = str.indexOf("县")
        area.Country = str.substring(index2 + 1, index3 + 1)
    } else {
        area.Country = str.substring(index2 + 1, index3 + 1)
    }
    return area;
}

Tools.initViewCts = function (view) {
    return view > 10000 ? (Number(view) / 10000).toFixed(2) + '万' : view;
}

Tools.checkFormBaseType = function (target, form, fromKeys, formErrors) {
    var value
    for (var key in fromKeys) {
        value = form[key]
        if (value === '') {
            target.toast(target, formErrors[key], 'warning')
            return false
        }
    }
    return true
}


// 防抖
Tools.createThrottleShakeFn = function (delay, cb) {
    var timer;
    return function throttleShake() {
        var page = this
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            cb.call(page)
        }, delay)
    }
}

const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

// 设置localStorage存储数据
Tools.setLocal = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    localStorage.setItem(name, content)
}

// 获取localStorage存储数据
Tools.getLocal = name => {
    if (!name) return;
    let value = localStorage.getItem(name)
    if (value !== null) {
        try {
            value = JSON.parse(value)
        } catch (error) {
            value
        }
    }
    return value
}

// 删除localStorage存储数据
Tools.removeLocal = name => {
    if (!name) return
    localStorage.removeItem(name)
}

// 设置sessionStorage存储数据
Tools.setSession = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    sessionStorage.setItem(name, content)
}

// 获取sessionStorage存储数据
Tools.getSession = name => {
    if (!name) return;
    let value = sessionStorage.getItem(name)
    if (value !== null) {
        try {
            value = JSON.parse(value)
        } catch (error) {
            value
        }
    }
    return value
}

// 删除sessionStorage存储数据
Tools.removeSession = name => {
    if (!name) return;
    sessionStorage.removeItem(name)
}

Tools.objectIsNotNull = function (obj) {
    return Object.keys(obj).length > 0 ? true : false;
}

export default Tools