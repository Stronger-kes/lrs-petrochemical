import request from "./request";

/**
 * 登录接口
 * @params {Objet} data {username:'用户名',password:密码}
 * 
 */

/**
 *  login登陆接口
 */
export function lrsLogin(username, password, verifyCode) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username,
      password,
      verifyCode
    }
  })
}

/**
 * 菜单列表接口
 */
export function getMenu(data) {
  return request({
    url: '/menu/' + data,
    method: 'GET',
  })
}
/**
 * 查询门店接口
 */
export function storeList(data) {
  return request({
    url: '/shop/sysShopList',
    method: 'post',
    params: data
  })
}
/**
 * 添加门店接口
 **/
export function addStore(data) {
  return request({
    url: '/shop/addSysShop',
    method: 'post',
    params: data
  })
}

// 删除门店
export function deleteStore(data) {
  return request({
    url: '/shop/delete/' + data,
    method: 'delete',
  })
}

// 修改门店
export function updateStore(data) {
  return request({
    url: '/shop/update',
    method: 'post',
    params: data
  })
}


/**
 * 
 * 根据用户id查询门店信息接口
 * URL: /shop/findUnameByUid/{id}
 * 请求方式：POST
 */
export function getFindUnameByUid(data) {
  return request({
    url: '/shop/findUnameByUid/' + data,
    method: 'post'
  })
}

/**
 * 
 * 品牌管理-根据id查找品牌
 * URL:"/sysBrand/findById/{number}"
 * 请求方式： GET
 */

 export function brandIdentity(data) {
   return request({
     url: '/sysBrand/findById/' + data,
     method: 'GET'
   })
 }

/**
 *  获取字典管理列表
 */
export function getWordList(data) {
  return request({
    url: '/sysDict/list?pageSize=' + data.pageSize + "&pageNum=" + data.pageNum + '&type=' + data.type,
    method: 'get',
    // params:data
  })
}
/**
 * 
 * 新增字典
 */
export function addWord(data) {
  return request({
    url: '/sysDict/save',
    method: 'post',
    params: data
  })
}
// 
/**
 * 修改字典
 */
export function updateWord(data) {
  return request({
    url: '/sysDict/update',
    method: 'post',
    params: data
  })
}

/** 
 * 删除字典
 */
export function deleteWord(data) {
  return request({
    url: '/sysDict/delete/' + data,
    method: 'get',
    // params:data
  })
}

// 获取用户管理列表
export function getUser(data) {
  return request({
    url: '/user/list?pageNum=' + data.pageNum +
      "&pageSize=" + data.pageSize +
      '&username=' + data.username +
      '&createTimeFrom=' + data.createTimeFrom +
      '&createTimeTo=' + data.createTimeTo +
      '&status=' + data.status +
      '&mobile=' + data.mobile +
      '&deptId=' + data.deptId +
      '&sex=' + data.sex,
    method: 'get',
    // params:data
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    params: data
  })
}

// 获取角色列表
export function roleList() {
  return request({
    url: '/role/list',
    method: 'get',
    // params:{

    // }
  })
}

// 获取部门列表
export function branchList() {
  return request({
    url: '/dept/select/tree',
    method: 'get',
    // params:{

    // }
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    params: data
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/user/delete/' + data,
    method: 'get',
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    params: data
  })
}

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: '/role/list?pageNum=' + data.pageNum + "&pageSize=" + data.pageSize,
    method: 'get',
  })
}

// 删除角色
export function deleteMenu(data) {
  return request({
    url: 'menu/delete/' + data,
    method: 'get',
  })
}

// 树形菜单
export function menuTree() {
  return request({
    url: '/menu/tree',
    method: "get",
    // data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    params: data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    params: data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/role/delete/' + data,
    method: 'delete',
  })
}

// 修改用户
export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    params: data
  })
}

/**
 * 上传图片
 */
export function UnploadPictures(data) {
  return request({
    url: '/upload/uploadImage',
    method: 'post',
    params: data
  })
}

/**
 * 
 * ========================优惠券接口====================================>
 */

 /**
  *  营销中心->优惠券管理
  *  URL: "/coupon/pageList"
  *  请求方式 POST
  */
export function getCouponPageList(params) {
  return request({
    url: '/coupon/pageList',
    method: 'post',
    params
  })
}

/**
 * 优惠券管理-查询优惠券信息信息
 * URL: "/coupon/{couponId}"
 * 请求方式 GET
 */
export function CouponManagementEnquiry() {
  return request({
    url: '/coupon/{couponId}',
    method: 'GET',
  })
}

/**
 * 优惠券管理-修改优惠券信息
 * URL:"/coupon/update"
 * 请求方式： PUT
 */
export function getCouponUpdate(data) {
  return request({
    url: '/coupon/update',
    method: 'PUT',
    params: data
  })
}

/**
 * 优惠券管理-新增优惠券
 * URL: /coupon/add
 * 请求方式 POST
 */

 export function addCouponUpdate(data) {
  return request({
    url: '/coupon/add',
    method: 'post',
    params: data
  })
 }  

 /**
  * 优惠券管理-根据id删除优惠券
  * Url: "/coupon/delete/{couponId}"
  * 请求方式 GET
  */
 export function removerCouponUpdate(data) {
   return request({
     url:'/coupon/delete/' + data,
     method: 'GET',
   })
 }


/**
 * ===============================商品管理=======================================
 */

 /**
 * 名称：商品管理页面的List列表
 * URL: "/shopGoods/list"
 * 请求方式: POST
 */

export function getPageList(data) {
  return request({
    url: '/shopGoods/list',
    method: 'post',
    params: data
  })
}

/**
 * 名称： 商品管理
 * URL: '/shopGoods/save'
 * 请求方式： POST
 */
 export function addTheGoods(data){
   return request({
     url: '/shopGoods/save',
     method: 'POST',
     data
   })
 }

/**
 * 名称： 修改商品
 * URL: '/shopGoods/update'
 * 请求方式： POST
 */
 export function updatedTheGoods(data) {
   return request({
      url: '/shopGoods/update',
      method: 'POST',
      params: data
   })
 }
/**
 * 名称： 删除商品
 * URL: '/shopGoods/delete'
 * 请求方式： GET
 */
export function deleteTheGoods(data){
  return request({
    url: '/shopGoods/delete',
    method: 'GET',
    params:data
  })
}