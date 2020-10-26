import axios from "./api";
import { dtBase } from './baseUrl';
import qs from 'querystring';
import { getLocal } from "../utils";

/**
 * @method 登录
 * @param {*} loginname
 * @param {*} password
 */
export const login = (loginname, password) => {
    return axios({
        url: "/liveajax/salelogin",
        method: "POST",
        data: {
            loginname,
            password
        },
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 退出登录
 * @returns
 */
export const saleCheckOut = () => {
    return axios({
        url: "/liveajax/saleCheckOut",
        method: "POST",
        data: {},
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 获取直播版本对应数据
 * @param {*} starttime 开始时间
 * @param {*} endtime 结束时间
 * @param {*} version 1通用版，2教培版、3电商版、4广电版
 * @returns
 */
export const getLiveDate = (starttime, endtime, version) => {
    return axios({
        url: "/liveajax/LiveVersionStatistics",
        method: "POST",
        data: {
            starttime,
            endtime,
            version
        }
    });
};

/**
 * @method 获取省份/城市/区
 * @param {*} parentCode 请求AreaCode(省份为空)
 * @returns
 */
export const getAreaData = (parentCode = "") => {
    return axios({
        url: "/liveajax/GetAreaData",
        method: "POST",
        data: {
            parentCode
        }
    });
};

/**
 * @method 获取所属行业
 * @returns
 */
export const getSystemTagInfo = () => {
    return axios({
        url: "/liveajax/GetSystemTagInfo",
        method: "POST",
        data: {}
    });
};

/**
 * @method 获取一级/二级行业标签
 * @param {*} parentTag 请求tradecode(一级行业标签为空)
 * @returns
 */
export const getSystemTagInfos = (parentTag = "") => {
    return axios({
        url: "/liveajax/GetSystemTagInfos",
        method: "POST",
        data: {
            parentTag
        }
    });
};

/**
 * @method 获取所有业务员列表
 * @returns
 */
export const getSalesSromotion = () => {
    return axios({
        url: "/liveajax/GetSalesSromotion",
        method: "POST",
        data: {}
    });
};

/**
 * @method 直播间列表表格数据/搜索
 * @param {*} liveversion 直播间版本 (-1全部, 0免费版, 10企业版, 1高级企业版, 6企业旗舰版, 3基础版, 8流量版)
 * @param {*} authstatus 认证状态/审核状态 (-1全部, 0未认证, 1企业(待审核), 2企业(已通过), 3企业(不通过), 4企业(待完善), 5个人(待审核), 6个人(已通过), 7个人(不通过), 8个人(待完善))
 * @param {*} livestate 直播状态 (-3全部, 1正常, 0已过期, -1已删除, -2已过期+已删除)
 * @param {*} agentrank 身份等级 (-1全部, 0未设置, 1市级代理, 2县级代理, 3企业用户, 4省级代理, 5行业版, 6免费版, 7合作县代理, 10官方直播平台, 11微赞付费用户)
 * @param {*} paystate 付费状态 (1新增, 2续费, 3流失)
 * @param {*} tag 所属行业
 * @param {*} salesmanId 业务员
 * @param {*} province 省
 * @param {*} city 城市
 * @param {*} area 区
 * @param {*} liveaddtime_start 直播间开通时间 start
 * @param {*} liveaddtime_end 直播间开通时间 end
 * @param {*} livedeadtime_start 直播间到期时间 start
 * @param {*} livedeadtime_end 直播间到期时间 end
 * @param {*} topicstarttime_start 最近开播时间 start
 * @param {*} topicstarttime_end 最近开播时间 end
 * @param {*} paystatetime_start 付费状态开始时间 start
 * @param {*} paystatetime_end 付费状态结束时间 end
 * @param {*} key 关键词
 * @param {*} pindex 当前页码
 * @param {*} psize 当前页总条数
 * @param {*} version 直播间版本
 * @returns
 */
export const liveVersionSiteList = (params = {}) => {
    return axios({
        url: "/liveajax/LiveVersionSiteList",
        method: "POST",
        data: params
    });
};

// 预约版 直播间列表表格数据/搜索（参数注释同上）
export const saleGetLiveVersionRecord = (params = {}) => {
    return axios({
        url: "/liveajax/SaleGetLiveVersionRecord",
        method: "POST",
        data: params
    });
};

/**
 * @method 获取认证信息
 * @param {*} zbid
 * @returns
 */
export const getSaleGetEntInfo = zbid => {
    return axios({
        url: "/liveajax/SaleGetEntInfo",
        method: "POST",
        data: {
            zbid
        },
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 修改登录密码
 * @param {*} oldpwd
 * @param {*} newpwd
 * @returns
 */
export const getSaleReSetPwd = (oldpwd, newpwd) => {
    return axios({
        url: "/liveajax/SaleReSetPwd",
        method: "POST",
        data: {
            oldpwd,
            newpwd
        }
    });
};

/**
 * @method 获取直播间操作日志
 * @param {*} zbid 直播间Id
 * @param {*} pindex 当前页码
 * @param {*} psize 当前页总条数
 * @returns
 */
export const getSaleGetLiveLog = (params = {}) => {
    return axios({
        url: "/liveajax/SaleGetLiveLog",
        method: "POST",
        data: params
    });
};

/**
 * @method 修改标签
 * @param {*} zbid 直播间ID
 * @param {*} tagId 标签ID
 * @param {*} TagSecValue 二级标签ID
 * @returns
 */
export const saleSaveLiveTagInfo = (zbid, tagId, TagSecValue) => {
    return axios({
        url: "/liveajax/SaleSaveLiveTagInfo",
        method: "POST",
        data: { zbid, tagId, TagSecValue }
    });
};

/**
 * @method 获取二级所对应的一级
 * @param {*} tagId 标签ID
 * @returns
 */
export const getTagFirst = tagId => {
    return axios({
        url: "/liveajax/GetTagFirst",
        method: "POST",
        data: { tagId }
    });
};

/**
 * @method 获取单个直播间信息
 * @param {*} zbid 直播间ID
 * @param {*} version 操作版本
 * @returns
 */
export const saleGetLiveInfo = (zbid, version) => {
    return axios({
        url: "/liveajax/SaleGetLiveInfo",
        method: "POST",
        data: {
            zbid,
            version
        },
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 获取云导播开通列表
 * @param {*} zbid
 * @returns
 */
export const getLcpsRecordList = zbid => {
    return axios({
        url: "/liveajax/GetLcpsRecordList",
        method: "POST",
        data: {
            zbid
        }
    });
};

/**
 * @method 获取通用版导购版订单开通列表
 * @param {*} zbid,toolname
 * @returns
 */
export const getOrderRecordList = (params = {}) => {
    return axios({
        url: "/liveajax/GetOrderRecordList",
        method: "POST",
        data: params
    });
};

/**
 * @method 云导播开通记录操作
 * @param {*} zbid 直播间Id
 * @param {*} Id 云导播记录Id  0代表新增
 * @param {*} routes 云导播路数
 * @param {*} endtime 过期时间
 * @param {*} datafrom 0:单独购买  1:版本赠送
 * @returns
 */
export const lcpsRecordOper = (params = {}) => {
    return axios({
        url: "/liveajax/LcpsRecordOper",
        method: "POST",
        data: params
    });
};

/**
 * @method 云导播开通记录操作
 * @param {*} zbid 直播间Id
 * @param {*} Id 订单记录Id  0代表新增
 * @param {*} price 订单金额
 * @param {*} toolname 订单类型(单场直播、直播执行、观众流量限制、预存款)
 * @returns
 */
export const orderRecordOper = (params = {}) => {
    return axios({
        url: "/liveajax/OrderRecordOper",
        method: "POST",
        data: params
    });
};

/**
 * @method 删除/启用直播间
 * @param {*} zbid 直播间ID
 * @param {*} state 1启用 0禁用
 * @param {*} reason 原因
 * @returns
 */
export const saleLiveOper = (zbid, state, reason) => {
    return axios({
        url: "/liveajax/SaleLiveOper",
        method: "POST",
        data: {
            zbid,
            state,
            reason
        }
    });
};

/**
 * @method 保存直播销售信息
 * @param {*} zbid 直播间ID
 * @param {*} agentrank 代理等级
 * @param {*} tag 行业标签
 * @param {*} isopenchangedata 是否开启数据设置
 * @param {*} isopenvotegift 是否开启付费投票
 * @param {*} openpartnerser 是否开启合伙人
 * @param {*} isdistributiongeneralize 是否开启分销
 * @param {*} iscontainselfbusiness 是否开启分销-自有商户号
 * @param {*} isopenhomelive 是否开启家居直播
 * @param {*} homelivecount 家居直播数量
 * @param {*} isopenvrlive 是否开启VR直播
 * @param {*} vrlivecount VR直播数量
 * @param {*} province 省份
 * @param {*} city 城市
 * @param {*} country 区域
 * @param {*} contacts 联系人
 * @param {*} phone 手机号码
 * @param {*} wechatNum 微信号
 * @param {*} liveversion 直播间版本
 * @param {*} deadtime 过期时间
 * @param {*} price 价格
 * @param {*} paystate 付费状态
 * @param {*} buyremark 购买备注
 * @param {*} customcontnt 定制内容
 * @param {*} salesmanId 业务员
 * @param {*} version 版本
 * @param {*} payfrom 支付来源
 * @param {*} paytype 付费类型
 * @returns
 */
export const saleSaveLiveInfo = (params = {}) => {
    return axios({
        url: "/liveajax/SaleSaveLiveInfo",
        method: "POST",
        data: params
    });
};

/**
 * @method 获取流量统计图表
 * @param {*} key 直播间ID
 * @param {*} starttime 开始时间
 * @param {*} endtime 结束时间
 * @param {*} timetype 时间类型：1-日统计, 2-月统计
 * @param {*} datatype 数据类型：1-直播间, 2-话题
 * @returns
 */
export const flowLiveStatisticsChart = (
    key,
    starttime,
    endtime,
    timetype,
    datatype
) => {
    return axios({
        url: dtBase + "/dtapi/PlatformStatistics/FlowLiveStatisticsChart",
        method: "POST",
        data: {
            key,
            starttime,
            endtime,
            timetype,
            datatype
        }
    });
};

/**
 * @method 流量统计图表导出
 */
export const ExportFlowLiveStatisticsChart = (
    queryParams
) => {
    // return `${dtBase}/dtapi/ExcelFlow/ExportFlowLiveStatisticsChart?isexport=true&exporttype=liveflowchart&${qs.stringify(queryParams)}`;
    return `${dtBase}/dtapi/ExcelFlow/ExcelFlowLiveStatisticsChart?isexport=true&exporttype=liveflowchart&${qs.stringify(queryParams)}`;
};

/**
 * @method 获取流量统计表格
 * @param {*} type 类型: 1-直播间, 2-话题
 * @param {*} zbid 直播间ID
 * @param {*} key 话题名称/ID
 * @param {*} orderby 查询顺序
 * @param {*} orderbyfield 
 * @param {*} pindex 页码
 * @param {*} pSize 页数
 * @param {*} starttime 开始时间
 * @param {*} endtime 结束时间
 * @returns
 */
export const flowLiveStatisticsTable = (
    type,
    zbid,
    key,
    orderby,
    orderbyfield,
    pindex,
    psize,
    starttime,
    endtime,
) => {
    return axios({
        url: dtBase + "/dtapi/PlatformStatistics/GetTopicTrafficTable",
        method: "POST",
        data: {
            type,
            zbid,
            key,
            orderby,
            orderbyfield,
            pindex,
            psize,
            starttime,
            endtime,
        }
    });
};

/**
 * @method 流量统计表格导出
 */
export const ExcelLiveTrafficTable = (
    queryParams
) => {
    return `${dtBase}/dtapi/ExcelFlow/ExcelTopicTrafficTable?isexport=true&exporttype=liveflowtable&${qs.stringify(queryParams)}`
};

/**
 * @method 获取订单类型
 * @returns
 */
export const getCinOrderTyeList = () => {
    return axios({
        url: "/liveajax/GetCinOrderTyeList",
        method: "GET",
        data: {}
    });
};

/**
 * @method 获取手续费列表
 * @param {*} zbid 直播间ID
 * @param {*} ordertype 订单类型
 * @param {*} livetype 直播类型
 * @param {*} pindex 当前页码
 * @param {*} psize 当前页总条数
 * @returns
 */
export const getCommissionList = (zbid, ordertype, livetype, pindex, psize) => {
    return axios({
        url: "/liveajax/GetCommissionList",
        method: "POST",
        data: {
            zbid,
            ordertype,
            livetype,
            pindex,
            psize
        }
    });
};

/**
 * @method 保存手续费
 * @param {*} id 列表 ID
 * @param {*} zbid 直播间ID
 * @param {*} value 修改手续费值
 * @param {*} ordertype 订单类型
 * @param {*} livetype 直播类型
 * @param {*} status 状态 1:正常 0:禁用  -1:删除
 * @returns
 */
export const setCommission = (id, zbid, value, ordertype, livetype, status) => {
    return axios({
        url: "/liveajax/SetCommission",
        method: "POST",
        data: {
            id,
            zbid,
            value,
            ordertype,
            livetype,
            status
        }
    });
};

/**
 * @method 获取并发限制列表
 * @param {*} zbId 直播间ID
 * @returns
 */
export const getTopicConcurrentInfo = zbId => {
    return axios({
        url: "/liveajax/GetTopicConcurrentInfo",
        method: "POST",
        data: {
            zbId
        }
    });
};

/**
 * @method 获取并发限制列表
 * @param {string} starttime 开始时间
 * @param {string} endtime 结束时间
 * @param {string} key 搜索关键词
 * @param {number} state 状态
 * @param {number} pindex 当前页码
 * @param {number} psize 当前页总条数
 * @returns
 */
export const getTopicConcurrentList = (
    starttime,
    endtime,
    key,
    state,
    pindex,
    psize
) => {
    return axios({
        url: "/liveajax/GetTopicConcurrentList",
        method: "POST",
        data: {
            starttime,
            endtime,
            key,
            state,
            pindex,
            psize
        }
    });
};

/**
 * @method 添加/修改并发数限制、取消单独限制
 * @param {*} type add添加, save編輯, cencal取消限制
 * @param {*} zbId 直播间ID
 * @param {*} concurrentval 并发值
 * @param {*} starttime 开始时间
 * @param {*} endtime 结束时间
 * @param {*} remark 备注
 * @param {*} recordId 记录Id 针对编辑和取消
 * @returns
 */
export const saveConcurrentInfo = (
    type,
    zbId,
    concurrentval,
    starttime,
    endtime,
    remark,
    recordId
) => {
    return axios({
        url: "/liveajax/SaveConcurrentInfo",
        method: "POST",
        data: {
            type,
            zbId,
            concurrentval,
            starttime,
            endtime,
            remark,
            recordId
        }
    });
};

/**
 * @method 获取商城参数配置
 * @returns
 */
export const getCommodityConfig = (data = {}) => {
    return axios({
        url: "/liveajax/GetCommodityConfig",
        method: "POST",
        data,
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 修改商城参数设置
 * @param {*} timeOutRefundDays 未发货自动退款天数
 * @param {*} masterDealRefundDays 商家处理退款天数
 * @param {*} buyerReplyRefundDays 买家响应退款天数
 * @returns
 */
export const setcommodityconfig = (data = {}) => {
    return axios({
        url: "/liveajax/setcommodityconfig",
        method: "POST",
        data,
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 获取并发限制列表
 * @param {string} starttime 开始时间
 * @param {string} endtime 结束时间
 * @param {string} searchVal 搜索关键词
 * @param {number} state 状态
 * @param {number} page 当前页码
 * @param {number} size 当前页总条数
 * @returns
 */
export const getSametimeLiveLimitList = (
    starttime,
    endtime,
    searchVal,
    state,
    page,
    size
) => {
    return axios({
        url: "/liveajax/GetSametimeLiveLimitList",
        method: "POST",
        data: {
            starttime,
            endtime,
            searchVal,
            state,
            page,
            size
        }
    });
};

/**
 * @method 添加/修改同时开播限制、取消同时开播限制
 * @param {*} modifyType Add添加, Update編輯, Cancel取消限制
 * @param {*} zbId 直播间ID
 * @param {*} liveNum 同时开播数
 * @param {*} starttime 开始时间
 * @param {*} endtime 结束时间
 * @param {*} remark 备注
 * @returns
 */
export const saveSametimeLiveLimit = (
    modifyType,
    zbId,
    liveNum,
    starttime,
    endtime,
    remark,
    id
) => {
    return axios({
        url: "/liveajax/SaveSametimeLiveLimit",
        method: "POST",
        data: {
            modifyType,
            zbId,
            liveNum,
            starttime,
            endtime,
            remark,
            id
        }
    });
};

/**
 * @method 获取同时开播记录
 * @param {*} zbId 直播间ID
 * @returns
 */
export const getSametimeLiveLimit = zbId => {
    return axios({
        url: "/liveajax/GetSametimeLiveLimit",
        method: "POST",
        data: {
            zbId
        }
    });
};

/**
 * @method 获取同时开播记录
 * @param {*} isDeposit （开关状态  1开启  0关闭）
 * @param {*} depositAmount 定金金额
 * @returns
 */
export const setPayUpgradeSetting = (data = {}) => {
    return axios({
        url: "/liveajax/PayUpgradeSetting",
        method: "POST",
        data
    });
};

/**
 * @method 保存直播销售信息
 * @param {*} zbid 直播间ID
 * @param {*} zbversion 直播间版本名称
 * @param {*} paytype 付费类型
 * @returns
 */
export const createCrmOrder = (params = {}) => {
    return axios({
        url: "/liveajax/CreateCrmOrder",
        method: "POST",
        data: params
    });
};

/**
 * @method 删除crm同步的数据
 * @param {*} zbid 直播间ID
 * @returns
 */
export const updateCrmOrderStatus = (params = {}) => {
    return axios({
        url: "/liveajax/UpdateCrmOrderStatus",
        method: "POST",
        data: params
    });
};

export const getToken = (code) => {
    return axios({
        url: "/liveajax/GetOauthToken",
        method: "POST",
        data: {
            code
        },
        headers: {
            showLoading: false
        }
    });
};

/**
 * @method 获取邀请有礼列表
 * @param {string} sdate 邀请开始时间
 * @param {string} edate 邀请结束时间
 * @param {number} types 搜索类型 1=邀请人昵称，2=邀请人ID，3=被邀请人昵称，4=被邀请人ID
 * @param {string} key 搜索关键词
 * @param {number} state 状态
 * @param {number} pindex 当前页码
 * @param {number} psize 当前页总条数
 * @param {boolean} export 是否导出
 * @returns
 */
export const getQInviteList = (params, host) => {
    if (params.export) {
        return `${host}/liveajax/GetQInviteList?${qs.stringify(params)}&token=${getLocal("token")}`;
    } else {
        return axios({
            url: "/liveajax/GetQInviteList",
            method: "POST",
            data: {
                sdate: params.sdate,
                edate: params.edate,
                types: params.types,
                key: params.key,
                state: params.state,
                pindex: params.pindex,
                psize: params.psize,
                export: params.isexport,
            }
        });
    }
};

export const oprateInvite = (params) => {
    return axios({
        url: "/liveajax/OprateInvite",
        method: "POST",
        data: params
    });
};

export default {
    login,
    saleCheckOut,
    getLiveDate,
    getAreaData,
    getSystemTagInfo,
    getSalesSromotion,
    liveVersionSiteList,
    saleGetLiveVersionRecord,
    getSaleGetEntInfo,
    getSaleReSetPwd,
    getSaleGetLiveLog,
    saleSaveLiveTagInfo,
    saleGetLiveInfo,
    getLcpsRecordList,
    getOrderRecordList,
    lcpsRecordOper,
    orderRecordOper,
    saleLiveOper,
    saleSaveLiveInfo,
    flowLiveStatisticsChart,
    flowLiveStatisticsTable,
    getCinOrderTyeList,
    getCommissionList,
    setCommission,
    getTopicConcurrentInfo,
    getTopicConcurrentList,
    saveConcurrentInfo,
    getTagFirst,
    getCommodityConfig,
    setcommodityconfig,
    getSystemTagInfos,
    getSametimeLiveLimitList,
    saveSametimeLiveLimit,
    getSametimeLiveLimit,
    setPayUpgradeSetting,
    ExportFlowLiveStatisticsChart,
    ExcelLiveTrafficTable,
    createCrmOrder,
    updateCrmOrderStatus,
    getQInviteList,
    oprateInvite,
    getToken
};