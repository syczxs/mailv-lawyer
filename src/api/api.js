import {get, post} from './http'


// 登录
export const lawyerLogin = (params) => get('bizLawyer/login', params)
export const getMessage = (params) => get('bizLawyer/sendCode', params)
//获取律师信息
export const getLawyerInform= (params) => get('/lawyerIndex/getLawyer', params)
//排班接口
//1查询历史排班
export const getHistoryWork= (params) => get('lawyerIndex/queryLawyerScheduling', params)
// 报名排班
 export const applyWork= (params) => post('/lawyerIndex/addSchedule', params)
 //取消排班
 export const cancleApplyWork= (params) => post('/lawyerIndex/cancelSchedule', params)
 //查询律师当天排班
 export const searchToday= (params) => post('/lawyerIndex/queryLawyerSchedulingInfo', params)



// 上下线
export const  lowyer_online= (params) => post('/lawyerIndex/online', params)
export const  lowyer_offline= (params) => post('/lawyerIndex/offline', params)
//拒绝上线按钮
export const  cantOline= (params) => post('/lawyerIndex/refusedOnline', params)

//退出接口
export const  lawyerLeave= (params) => post('/bizLawyer/logout', params)





export const  video_pending= (params) => get('/lawyerIndex/queryIndexInfo', params)


// 查询转单律师
export const  otherLawyer= (params) => get('/lawyerIndex/selectLawyer', params)
// 发送转单请求
export const  send_change= (params) => get('/lawyerIndex/changeTransferStatus', params)


// 查询是否有转单接口
export const  monitor_change= (params) => get('/lawyerIndex/queryTransferInfo', params)
// 查询是否有未确认转单
export const  noConfirmChange= (params) => get('/lawyerIndex/queryUnreceivedTransfer', params)
// 确认转单
export const  confirm_change= (params) => get('/lawyerIndex/makeSureTransfer', params)
// 取消转单
export const  cancel_change= (params) => get('/lawyerIndex/cancelTransfer', params)

//退单
export const  delete_oreder= (params) => get('/lawyerIndex/returnOrder', params)
//查询是否有退单
export const  select_delete= (params) => get('/lawyerIndex/queryReturnOrder', params)




// 列表页面
export const  videoList= (params) => get('/lawyerIndex/queryLawyerVideoConsumedList', params)



//文件上传成功后的回调(初审)
export const  submitSuccessFirst= (params) => get('/lawyerIndex/submitTrial', params)
//文件上传成功后的回调(初审)
export const  submitSuccessSecond= (params) => get('/lawyerIndex/submitUser', params)

//文本律师接审查池的单子
export const  fixTextOrder= (params) => get('/lawyerIndex/takeOrder', params)

//文件详情页面
export const  select_textInform =(params) => get('/lawyerIndex/queryTextConsumedDetail', params)
//打回接口
export const  ordre_back =(params) => get('/lawyerIndex/sendBack', params)
//视频详细信息
export const  selectVideoByOrder =(params) => get('/lawyerIndex/queryVideoConsumedDetail', params)

//注册
export const  registerRole =(params) => get('/lawyerRegister/selectAllRoles', params)
export const  registerProfessions =(params) => get('/lawyerRegister/selectAllProfessions', params)
export const  phoneChack =(params) => get('/lawyerRegister/queryMobile', params)
export const  register =(params) => post('/lawyerRegister/register', params)


//视频开始计时
export const  startVideoTime =(params) => get('/lawyerIndex/beginTime', params)

//查询上线状态
export const  selectOnlineState =(params) => get('/lawyerIndex/queryOnline', params)

//查询律师订单编号
export const  settlementByLawyerId= (params) => get('/lawyerIndex/selectSettlementByLawyerAndYearMonth', params)
//查询律师本月金额
export const  settlementLawyerId= (params) => get('/lawyerIndex/selectAllSettlementByLawyerAndYearMonth', params)
//查询订单详细信息
export const  settlementByType= (params) => get('/lawyerIndex/selectSettlementByLawyerAndYearMonthAndType', params)
//心跳检测
export const  checkLogin= (params) => get('/lawyerIndex/heartbeat', params)
//诉讼查询
export const  allLitigation= (params) => get('/lawyerCase/caseListByPage', params)
//查询诉讼
export const  selectLitigationById= (params) => get('/lawyerCase/queryCaseDetailById', params)
//申请诉讼
export const  applyLitigation= (params) => get('/lawyerCase/applyApplication', params)
//撤销
export const cancelLitigation =(params)=> get('/lawyerCase/undoApplication',params)
//我的代理列表查询
export const myLitigation =(params)=> get('/lawyerCase/queryAllMyLawCase',params)
//查看我的代理详情
export const myLitigationInform =(params)=> get('/lawyerCase/queryMyLawCaseDetail',params)
//提交诉讼检查文件
// export const sendLitigationFile =(params)=> get('/lawyerCase/uploadFile',params)
export const sendLitigationFile =(params)=> get('/lawyerCase/uploadFileAndSaveBank',params)

//确认承接诉讼
export const confirmLitigation =(params)=> get('/lawyerCase/confirmLawCase',params)
//取消承接诉讼
export const confirmLitigationCancel =(params)=> get('/lawyerCase/refusedLawCase',params)
//委托阶段信息查询
export const commissionInform =(params)=>get('/lawyerCase/entrustStageDetail',params)
//委托阶段信息提交
export const commissionSend =(params)=>get('/lawyerCase/saveEntrustStageData',params)
//文件上传回调
export const upFileBack =(params)=>get('/lawyerCase/saveLawCaseFile',params)
//立案阶段查询
export const filingCaseSearch =(params)=>get('/lawyerCase/filingStageDetail',params)
//立案阶段提交
export const filingCaseSend =(params)=>get('/lawyerCase/saveFilingStageData',params)
//审判阶段查询
export const trialStageSearch =(params)=>get('/lawyerCase/trialStageDetail',params)
//审判阶段提交
export const trialStageSend =(params)=>get('/lawyerCase/saveTrialStageData',params)
//执行阶段查询
export const imSelect =(params)=>get('/lawyerCase/executionPhaseDetail',params)
//执行快递提交
export const imSend =(params)=>get('/lawyerCase/saveExecutionPhaseData',params)
//执行快递提交
export const recordSend=(params)=>get('/lawyerCase/addCaseProgressFeedBack',params)
//审判，快递单号和类别查询
export const trailSelect2=(params)=>get('/lawyerCase/toBeConfirmed',params)
//审判材料原件提交
export const confirmEvidence=(params)=>get('/lawyerCase/confirmEvidence',params)














