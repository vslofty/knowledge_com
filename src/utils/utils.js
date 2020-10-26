

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

// 设置localStorage存储数据
export const setLocal = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  console.log('setLocal',content)
  localStorage.setItem(name, content);
};

// 获取localStorage存储数据
export const getLocal = name => {
  if (!name) return;
  let value = localStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (error) {
      value;
    }
  }
  return value;
};

// 删除localStorage存储数据
export const removeLocal = name => {
  if (!name) return;
  localStorage.removeItem(name);
};

// 设置sessionStorage存储数据
export const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  sessionStorage.setItem(name, content);
};

// 获取sessionStorage存储数据
export const getSession = name => {
  if (!name) return;
  let value = sessionStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (error) {
      value;
    }
  }
  return value;
};

// 删除sessionStorage存储数据
export const removeSession = name => {
  if (!name) return;
  sessionStorage.removeItem(name);
};

// 获取token
export const getToken = () => {
  // eslint-disable-next-line no-undef
  const data = getLocal('123');
  if (data && data.Token) {
    return data.Token;
  }
  return "";
};

export function transTime(time) {
  if (navigator.userAgent.toLocaleLowerCase().indexOf("window") < 0) {
    return time.replace(/-/g, "/");
  }
  return time;
}

/**
 * @method 时间格式化
 * @param {string} time
 * @param {string} format yyyy/mm/dd hh:ii:ss(2019/07/24 09:45:43) yy/m/d hh:ii:ss(19/07/24 09:45:43) yyyy/mm/dd w(2019/07/24 星期三) mm/dd/yyyy(07/24/2019)
 * @returns
 */
export const formatTime = (time, format = "yyyy-mm-dd") => {
  if (format === 1) {
    format = navigator.userAgent.includes('window') ? "YYYY-MM-DD HH:II:SS" : "YYYY/MM/DD HH:II:SS";
  }
  const d = typeof time == 'string' ? new Date(transTime(time)) : (time || new Date());
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
          return `星期${["日", "一", "二", "三", "四", "五", "六"][weekday]}`;
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

// 获取移动端 UA
export const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};

/**
 * @description 函数防抖
 * @param {Function} method 延时调用函数
 * @param {Number} wait 延迟时长
 * @param {Boolean} immediate 立即执行选项
 */
export const Ddebounce = (method, wait, immediate) => {
  if (typeof method != "function") {
    throw new TypeError("Expected a function");
  }
  let timeout;
  // Ddebounce函数为返回值
  // 使用Async/Await处理异步，如果函数异步执行，等待setTimeout执行完，拿到原函数返回值后将其返回
  // args为返回函数调用时传入的参数，传给method
  let Ddebounce = function (...args) {
    return new Promise(resolve => {
      // 用于记录原函数执行结果
      let result;
      // 将method执行时this的指向设为 debounce 返回的函数被调用时的this指向
      let context = this;
      // 如果存在定时器则将其清除
      if (timeout) {
        clearTimeout(timeout);
      }
      // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
      if (immediate) {
        // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
        // 这样确保立即执行后wait毫秒内不会被再次触发
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        // 如果满足上述两个条件，则立即执行并记录其执行结果
        if (callNow) {
          result = method.apply(context, args);
          resolve(result);
        }
      } else {
        // 如果immediate为false，则等待函数执行并记录其执行结果
        // 并将Promise状态置为fullfilled，以使函数继续执行
        timeout = setTimeout(() => {
          // args是一个数组，所以使用fn.apply
          // 也可写作method.call(context, ...args)
          result = method.apply(context, args);
          resolve(result);
        }, wait);
      }
    });
  };

  // 在返回的 Ddebounce 函数上添加取消方法
  Ddebounce.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return Ddebounce;
};

/**
 * @method 节流
 * @param {*} func
 * @param {*} delay
 */
export const Dthrottle = (func, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
};

/**
 * @description 复制
 * @param {Node} node input 节点
 */
export const isCopyInput = node => {
  node.focus();
  node.setSelectionRange(0, node.value.length);
  document.execCommand("copy");
};

/**
 * @description 复制
 * @param {Node} node dom节点
 */
export const isCopy = node => {
  let range = document.createRange();
  let selection = window.getSelection();
  range.selectNode(node);
  selection.removeAllRanges();
  selection.addRange(range);
  let bool = document.execCommand("copy", "false", null);
  document.execCommand("unselect", "false", null);
  if (bool) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description 判断对象是否相等
 * @param {Object} x
 * @param {Object} y
 */
export const deepEqual = (x, y) => {
  if (x === y) return true;
  if (typeof x == "object" && x != null && typeof y == "object" && y != null) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (let prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }
    return true;
  } else return false;
};

/**
 * @description Excel导出
 * @param {Function} callback 执行的回调，返回查询参数对象
 * @param {String} baseUrl excel下载基础地址
 */
export const excelOutput = (() => {
  var timer;
  return (baseUrl, callback) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (document.getElementById("downloadExcel")) {
        document.getElementById("downloadExcel").remove();
      }
      if (typeof callback !== "function") return;
      var queryObj = callback();
      if (!queryObj) return;
      var queryStr = "?";
      for (var key in queryObj) {
        queryStr += key + "=" + queryObj[key] + "&";
      }
      var url = baseUrl + queryStr;
      var downloadIframe = document.createElement("iframe");
      downloadIframe.id = "downloadExcel";
      downloadIframe.style.display = "none";
      downloadIframe.src = url;
      document.body.appendChild(downloadIframe);
    }, 500);
  };
})();

/**
 * @description 文件流下载
 * @param {Function} callback 执行的回调，返回查询参数对象
 * @param {String} baseUrl excel下载基础地址
 */
export const downloadFile = (() => {
  return (baseUrl = "", callback = () => { }) => {
    if (baseUrl === "") {
      throw new Error("路径不能为空");
    }
    const queryObj = callback() || {};
    var queryStr = "?";
    for (let key in queryObj) {
      queryStr += key + "=" + queryObj[key] + "&";
    }
    const url = baseUrl + queryStr;
    const elemA = document.createElement("a");
    const elemBody = document.body;
    elemA.href = url;
    elemBody.appendChild(elemA);
    elemA.click();
    setTimeout(() => {
      elemBody.removeChild(elemA);
    }, 500);
  };
})();

/**
 * @description 防抖
 * @param {Function} callback 执行的回调
 * @param {Number} time 时间间隔
 */
export const debounce = (() => {
  var timer;
  return (callback, time) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, time);
  };
})();

/**
 * @description 获取cookie
 * @param {String} cookieName
 */
export const getCookie = cookieName => {
  var result;
  const cookie = document.cookie;
  var arr = cookie.split(";");
  for (let item of arr) {
    let name = item.slice(0, item.indexOf("=")).replace(/\s+/, "");
    let value = item.slice(item.indexOf("=") + 1);
    if (name == cookieName) {
      result = value;
    }
  }
  if (!result) {
    window.location.replace(`${window.location.origin}/admin/#/404`);
  }
  return result;
};

/**
 * @description 获取页面功能权限
 * @param {String} menuList 权限队列
 * @param {String} pageUrl 页面路由
 */
export const getPageFun = (() => {
  var result;
  return (pageUrl, menuList) => {
    for (var item of menuList) {
      if (!item.subs) {
        if (item.index === pageUrl) {
          result = item.funcs;
        }
      } else {
        getPageFun(pageUrl, item.subs);
      }
    }
    return result;
  };
})();

//
/**
 * @description 获取 URL 的参数
 * @return {Object} {} 参数对象
 */
export function getParams() {
  var url = location.search; //获取url中"?"符后的字串

  var theRequest = {};
  var strs = "";
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      var keyvalue = strs[i].split("=");
      if (keyvalue[1] !== "") {
        theRequest[keyvalue[0]] = unescape(keyvalue[1]);
      }
    }
  }
  return theRequest;
}

/**
 * clone 数据
 * @param {Object|Array} data clone 目标
 * @return void
 */
export function clone(data) {
  let obj = {};
  try {
    obj = JSON.parse(JSON.stringify(data));
  } catch (error) {
    obj = {
      msg: "json 转换失败！"
    };
  }
  return obj;
}

/**
 * 比较两个日期之间的差数
 * @param {Type} timeStr 时间字符串或时间戳
 * @param {Type} date 时间对象
 * @return object {days,hours,minutes,seconds}
 */
export function getCountDownObjByStr(timeStr, date) {
  date = date || new Date();
  if (typeof timeStr == "string") {
    timeStr = timeStr.trim().replace(/-/g, "/");
  }
  var diffTime = new Date(timeStr) - date; //计算剩余的毫秒数
  if (isNaN(diffTime) || diffTime <= 0) {
    return null;
  }
  var days = parseInt(diffTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
  var hours = parseInt((diffTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
  var minutes = parseInt((diffTime / 1000 / 60) % 60, 10); //计算剩余的分钟
  var seconds = parseInt((diffTime / 1000) % 60, 10); //计算剩余的秒数

  return {
    days: formatNumber(days),
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds)
  };
}

// 格式化单位数字
export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 替换hml < & />
 * @param {Type} html 参数描述
 * @param {Boolean} isF 转为正常html
 * @return void
 */
export function escapeHtml(html, isF) {
  if (isF) {
    return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  } else {
    const htmlStr = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return htmlStr.replace(/&lt;script/g, "").replace(/&lt;\/script&gt;/g, "");
  }
}

// 裁剪图片
export function formatImage(url, size) {
  const resize = `?imageMogr2/auto-orient/thumbnail/${size ? size : 600}x`;
  let newurl = url.split("?")[0] || "";
  return newurl.replace("i2.vzan.", "i2cut.vzan.") + resize;
}

// 生成随机字符串
export function generateString() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isWindow() {
  return navigator.userAgent.toLocaleLowerCase().includes("window");
}

// 时间字符串转时间对象
export function timeStringToDate(str) {
  if (typeof str === "object") {
    return str;
  }
  if (str.includes("T")) {
    return new Date(str);
  }
  if (isWindow()) {
    return new Date(str);
  } else {
    return new Date(str.replace(/-/g, "/"));
  }
}


//金额保留小数点2位
export function formatMoney(value) {
  if (value === 0) {
    return 0;
  } else if (!value) {
    return "--";
  } else if (!Number(value)) {
    return "--";
  }
  return (value / 100).toFixed(2);
}
/**
 * 获取url中的参数
 * @param {*参数名称} name
 */
export function GetUrlParam (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null)
      return decodeURI(r[2]);
  return ""; //返回参数值
}

//获取新的授权信息
export function getNewToken () {
  var tokenObj = localStorage.getItem('Authorization_');
  try {
    tokenObj = JSON.parse(tokenObj);   
    var time = tokenObj.tokenExpires;
    time = time.substring(0, 19);
    time = time.replace(/-/g, '/');
    var timestamp = new Date(time).getTime();
    // 根据毫秒数构建 Date 对象
    var date = new Date(timestamp);
    if (date < new Date())
    {
        localStorage.setItem("Authorization_", null);
        window.location.href = "https://live.vzan.com/home/newzblogin";
    }
    return 'Bearer ' + tokenObj.token;
  } catch (error) {
      return 'Bearer token not find';
  }
}
