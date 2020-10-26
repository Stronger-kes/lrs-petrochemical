import request from "./request";

/**
 * 登录接口
 * @params {Objet} data {username:'用户名',password:密码}
 * 
 */

/**
 *  login登陆接口
 */
export const lrsLogin = (username, password, verifyCode) => request({
  url: '/login',
    method: 'post',
    params: {
      username,
      password,
      verifyCode
    }
})

/**
 * 菜单列表接口
 */
export const getMenu = () => request({
  url : `/menu/yangming`,
  method : "get",
  // data
})

/**
 * 查询门店接口
 */
export const storeList = () => request({
  url: '/shop/sysShopList',
  method: 'post',
  // params
})

/**
 * 添加门店接口
 **/

 export const addStore = (data) => request({
    url: '/shop/addSysShop',
    method: 'post',
    params: data
 })

 /**
  *  获取字典管理列表
  */
 export const getWordList = (data) => request({
  url: '/sysDict/list?pageSize=' + data.pageSize + "&pageNum=" + data.pageNum + '&type=' + data.type,
  method: 'get',
  // params:data
 })

 /**
  * 
  * 新增字典
  */
 export const addWord = (data) => request({
  url: '/sysDict/save',
  method: 'post',
  params:data
 })

 // 
/**
 * 修改字典
 */
export const updateWord = (data) =>request({
  url: '/sysDict/update',
  method: 'post',
  params:data
})

/**
 * 删除字典
 */
export const deleteWord = (data) => ({
  url: '/sysDict/delete/' + data,
  method: 'get',
  // params:data
})

// // 获取用户管理列表
// export const getUser = (data) => request({
//   url: '/user/list?pageNum=' + data.pageNum + 
//       "&pageSize=" + data.pageSize + 
//       '&username=' + data.username + 
//       '&createTimeFrom=' + data.createTimeFrom + 
//       '&createTimeTo=' + data.createTimeTo + 
//       '&status=' + data.status + 
//       '&mobile=' + data.mobile + 
//       '&deptId=' + data.deptId + 
//       '&sex=' + data.sex,
//       method: 'get',
//       // params:data
// })