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
export function getMenu() {
  return request({
    url: `/menu/yangming`,
    method: "get",
    // data
  })
}
/**
 * 查询门店接口
 */
export function storeList() {
  return request({
    url: '/shop/sysShopList',
  method: 'post',
  // params
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
export function addWord(data){
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
      params:data
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
      params:data
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
      params:data
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
      params:data
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
    url:'/upload/uploadImage',
    method: 'post',
    params: data
  })
}

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
  *  { }
  */



