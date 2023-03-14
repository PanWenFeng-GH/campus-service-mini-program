import {
  request
} from '../utils/api'

/** 首页 */
export function pageIndex() {
  return request("/api/page/index")
}

/** 预约首页 */
export function pageBook() {
  return request("/api/page/appoint")
}
/** 场馆列表 */
export function venueList(page) {
  return request("/api/venue/lists", {
    data: {
      page
    }
  })
}
/** 场馆详情 */
export function venueDetail(venue_id) {
  return request("/api/venue/detail", {
    data: {
      venue_id
    }
  })
}
/* 预订详情页 */
export function venueDepartAppoint({
  venue_id,
  ref_date,
  depart_id
}) {
  return request("/api/venue.depart/appoint", {
    data: {
      venue_id,
      ref_date,
      depart_id
    }
  })
}
/** 资讯首页 */
export function articlesList(page) {
  return request("/api/page/articles", {
    data: {
      page
    }
  })
}
/** 资讯详情 */
export function articleDetail(article_id) {
  return request("/api/article/detail", {
    data: {
      article_id
    }
  })
}
/* 我的活动 */
export function userActivityOrderLists(page, status = '') {
  return request("/api/user.activity.order/lists", {
    data: {
      page,
      status,
    }
  })
}
/* 全部活动列表 */
export function activityLists(page) {
  return request("/api/activity/lists", {
    data: {
      page,
    }
  })
}

/* 活动报名 */
export function activitySubmit(activity_id) {
  return request("/api/activity/submit", {
    data: {
      activity_id,
    }
  })
}
/* 活动详情 */
export function activityDetail(activity_id) {
  return request("/api/activity/detail", {
    data: {
      activity_id,
    }
  })
}
/* 使用帮助 */
export const wxappHelp = () => request("/api/wxapp/help")
/* 用户协议 */
export const wxappProtocols = () => request("/api/wxapp/protocols")
/* 预定 */
export const venueDepartSubmit = ({
  ref_date, // 预定日期
  depart_id, // 分场ID
  time, // 预约时间
  price
}) => request("/api/venue.depart/submit", {
  data: {
    ref_date, // 预定日期
    depart_id, // 分场ID
    time, // 预约时间
    price
  },
})
/* 我的预约 */
export function userAppointOrderLists(page, status = '') {
  return request("/api/user.appoint.order/lists", {
    data: {
      page,
      status
    }
  })
}
/* 预约详情 */
export function userAppointOrderDetail(depart_appoint_user_id) {
  return request("/api/user.appoint.order/detail", {
    data: {
      depart_appoint_user_id,
    }
  })
}
/* 取消预约 */
export function userAppointOrderCacel(depart_appoint_user_id) {
  return request("/api/user.appoint.order/cancel", {
    data: {
      depart_appoint_user_id
    }
  })
}

/* 获取预约页面数据 */
export function apiUserAppointGetdata(user_id) {
  return request("/api/user.appoint/getdata", {
    data: {
      user_id
    }
  })
}
/* 获取预约页面数据 */
export function userAppointDubmit({
  venue_id,
  depart_id,
  order_price,
  bath_card_id,
  bath_key_id,
  user_id,
  mobile,
  card_no,
  real_name,
  depart,
}) {
  return request("/api/user.appoint/submit", {
    data: {
      venue_id,
      depart_id,
      order_price,
      bath_card_id,
      bath_key_id,
      user_id,
      mobile,
      card_no,
      real_name,
      depart,
    }
  })
}

/* 获取核销二维码 */
export function getVerificationQrCode(depart_appoint_user_id) {
  return request("/api/user.appoint.order/getVerificationQrCode", {
    data: {
      depart_appoint_user_id,
    }
  })
}
/* 我的小程序码 */
export function getQrCode() {
  return request("/api/user/getQrCode")
}
/* 补充电话 */
export function setMobile(mobile) {
  return request("/api/user/setMobile", {
    data: {
      mobile
    }
  })
}
/* 获取手机号 */
export function getDecryptData({
  encrypted_data,
  iv
}) {
  return request("/api/user/getDecryptData", {
    data: {
      encrypted_data,
      iv
    }
  })
}
/* 获取课程 */
export function coachDdetail() {
  return request("/api/coach/detail")
}
/* 登记核销(线上预约)  */
export function userAppointVerification({
  depart_appoint_user_id,
  bath_card_id,
  bath_key_id
}) {
  return request("/api/user.appoint/verification", {
    data: {
      depart_appoint_user_id,
      bath_card_id,
      bath_key_id
    }
  })
}
/* 获取邀请二维码 */
export function userAppointOrdergetQrCode(depart_appoint_user_id) {
  return request("/api/user.appoint.order/getQrCode", {
    data: {
      depart_appoint_user_id
    }
  })
}