// import fetch from '@/config/fetch'
import axios from '@/config/axios'

/**
 * 登陆
 */
export const login = data => axios('/user/login', data, 'POST');

/**
 * 获取用户权限等信息
 */
export const getUserInfo = _ => axios('/user/auth');

/**
 * 获取用户菜单操作权限
 */
export const getMenuInfo = menuId => axios(`/api/v1/menu/auth/${menuId}`);

/**
 * 退出
 */
export const signout = () => axios('/user/logout');

/**
 * 是否超级管理员
 */
export const isSuper = () => axios('/user/isSuper');

/**
 * 修改密码
 */
export const updatePwd = data => axios('/user/pwd', data, 'PUT');

/**
 * 修改用户基本信息
 */
export const updateUserInfo = data => axios('/user/info', data, 'PUT');

/**
 * 修改用户基本信息
 */
export const upLoadFile = data => axios('/file/upload', data, 'POST');

//*****************************************************************************/
//状态
//*****************************************************************************/

/**
 * 主表status信息
 */
// export const getMainStatus = () => axios('/api/getMainStatus');
export const getMainStatus = (data) => axios('/manager/adreference',data);
/**
 * 主表新增信息
 */
export const addMainStatus = (data) => axios('/manager/adreference', data, 'POST');
/**
 * 主表修改信息
 */
export const updateMainStatus = (data) => axios('/manager/adreference', data, 'PUT');
/**
 * 主表删除信息
 */
export const deleteMainStatus = (id) => axios(`/manager/adreference/${id}`, '', 'DELETE');
/**
 * 子表status信息
 */
// export const getMainStatus = () => axios('/api/getMainStatus');
export const getChildStatus = (data, id) => axios(`/manager/adreference/refList/${id}`, data);
/**
 * 子表新增信息
 */
export const addChildStatus = (data) => axios('/manager/adreference/refList/', data, 'POST');
/**
 * 子表修改信息
 */
export const updateChildStatus = (data) => axios('/manager/adreference/refList', data, 'PUT');
/**
 * 子表删除信息
 */
export const deleteChildStatus = (id) => axios(`/manager/adreference/refList/${id}`, '', 'DELETE');
/**
 * 获取某个状态的字表
 */
export const getSelectChildStatus =  (data, id) => axios(`/manager/adreference/refList/tree/${id}`, data)
//*****************************************************************************/
//产品
//*****************************************************************************/

/**
 * 获取产品信息列表
 */
export const getProducts = data=>axios('/product/list',data);

/**
 * 新增产品信息列表
 */
export const addProducts = (data) => axios('/product', data, 'POST');

/**
 * 删除产品信息列表
 */
export const deleteProducts = id =>axios(`/product/${id}`, '', 'delete');


/**
 * 修改产品信息列表
 */
export const updateProducts = data=>axios('/product',data, 'PUT');


//*****************************************************************************/
//项目
//*****************************************************************************/
/**
 * 获取项目信息列表
 */
export const getProjects = (data, mProductId) => axios(`/projects/${mProductId}`, data);

/**
 * 获取所有项目信息列表
 */
export const getAllProjects = data => axios('/projects', data);

/**
 * 新增项目信息列表
 */
export const addProjects = (data) => axios(`/project`, data, 'POST');

/**
 * 删除项目信息列表
 */
export const deleteProjects = id =>axios(`/project/${id}`, '', 'delete');


/**
 * 修改项目信息列表
 */
export const updateProjects = data=>axios('/project',data, 'PUT');




//*****************************************************************************/
//需求
//*****************************************************************************/

/**
 * 获取需求信息列表
 */
export const getRequirement = data=>axios('/requirement/list',data);

/**
 * 新增需求信息列表
 */
export const addRequirement = (data) => axios('/requirement', data, 'POST');

/**
 * 删除需求信息列表
 */
export const deleteRequirement = id =>axios(`/requirement/${id}`, '', 'delete');


/**
 * 修改需求信息列表
 */
export const updateRequirement = data=>axios('/requirement',data, 'PUT');

/**
 * 查询需求信息列表
 */
export const queryRequirement = data=>axios('/requirement/list/search',data, 'GET');





//*****************************************************************************/
//模块
//*****************************************************************************/

/**
 * 获取模块信息列表
 */
export const getModule = data=>axios('/module/list',data);

/**
 * 新增需求信息列表
 */
export const addModule = (data) => axios('/module', data, 'POST');

/**
 * 删除需求信息列表
 */
export const deleteModule = id =>axios(`/module/${id}`, '', 'delete');


/**
 * 修改需求信息列表
 */
export const updateModule = data=>axios('/module',data, 'PUT');





//*****************************************************************************/
//计划于思考
//*****************************************************************************/

/**
 * 获取信息列表
 */
export const getConsideration = data=>axios('/consideration/list',data);

/**
 * 新增信息列表
 */
export const addConsideration = (data) => axios('/consideration', data, 'POST');

/**
 * 删除信息列表
 */
export const deleteConsideration = id =>axios(`/consideration/${id}`, '', 'delete');

// * 通过项目获取模块
// */
export const getModuleByProjectId = ( data, projectId ) =>axios(`/module/project/${projectId}`,data);

/**
* 通过项目获取模块
*/
export const getModuleByProductId = ( data, productId ) =>axios(`/module/product/${productId}`,data);

/**
/**
 * 修改信息列表
 */
export const updateConsideration = data=>axios('/consideration',data, 'PUT');




//*****************************************************************************/
//系统表
//*****************************************************************************/

/**
 * 获取系统表信息
 */
export const getTable = data =>axios(`/table/list`,data);


/**
 * 新增系统表
 */
export const addTable = (data) => axios('/table', data, 'POST');

/**
 * 删除系统表
 */
export const deleteTable = id =>axios(`/table/${id}`, '', 'delete');


/**
 * 修改系统表
 */
export const updateTable = data=>axios('/table',data, 'PUT');


//*****************************************************************************/
//故障
//*****************************************************************************/

/**
 * 获取故障信息列表
 */
export const getFault = data=>axios('/fault/list',data);

/**
 * 新增故障信息列表
 */
export const addFault = (data) => axios('/fault', data, 'POST');

/**
 * 删除故障信息列表
 */
export const deleteFault = id =>axios(`/fault/${id}`, '', 'delete');


/**
 * 修改故障信息列表
 */
export const updateFault = data=>axios('/fault',data, 'PUT');




//*****************************************************************************/
//用户
//*****************************************************************************/

/**
 * 获取用户信息列表
 */
export const getUser = (data, id) =>axios(`/user/list/${id}`,data);

/**
 * 新增用户信息列表
 */
export const addUser = (data) => axios('/user', data, 'POST');

/**
 * 删除用户信息列表
 */
export const deleteUser = id =>axios(`/user/${id}`, '', 'delete');


/**
 * 修改用户信息列表
 */
export const updateUser = data=>axios('/user',data, 'PUT');

/**
 * 获取用户组织树
 */
export const getUserTree = _ =>axios('/org/user/tree');


//*****************************************************************************/
//菜单
//*****************************************************************************/

/**
 * 获取菜单信息列表
 */
export const getMenu = (data, id) =>axios(`/menu/list/${id}`,data);

/**
 * 通过菜单ID获取当前菜单信息
 */
export const getParentMenu = menuId => axios(`/menu/${menuId}`)

/**
 * 获取菜单信息列表
 */
export const getMenuTree = _ =>axios('/menu/tree');

/**
 * 新增菜单信息列表
 */
export const addMenu = (data) => axios('/menu', data, 'POST');

/**
 * 删除菜单信息列表
 */
export const deleteMenu = id =>axios(`/menu/${id}`, '', 'delete');


/**
 * 修改菜单信息列表
 */
export const updateMenu = data=>axios('/menu',data, 'PUT');

//*****************************************************************************/
//角色
//*****************************************************************************/

/**
 * 获取角色信息列表
 */
export const getRole = data =>axios(`/role/list`,data);


/**
 * 新增角色列表
 */
export const addRole = (data) => axios('/role', data, 'POST');

/**
 * 删除橘色列表
 */
export const deleteRole = id =>axios(`/role/${id}`, '', 'delete');


/**
 * 修改角色列表
 */
export const updateRole = data=>axios('/role',data, 'PUT');


//*****************************************************************************/
// 组织
//*****************************************************************************/

/**
 * 获取组织信息列表
 */
export const getOrg = (data, id)=>axios(`/org/list/${id}`,data);


/**
 * 获取当前组织信息
 */
export const getNowOrg = (data, id)=>axios(`/org/${id}`,data);



/**
 * 新增组织信息列表
 */
export const addOrg = (data) => axios('/org', data, 'POST');

/**
 * 删除组织信息列表
 */
export const deleteOrg = id => axios(`/org/${id}`, '', 'delete');

/**
 * 获取组织ID树
 */
export const getOrgTreeData = () => axios('/org/tree', '')

/**
 * 获取行政区划
 */
export const getCityCodeData = () => axios('/administrative/tree', '')

/**
 * 修改组织信息列表
 */
export const updateOrg = data=>axios('/org', data, 'PUT');


//*****************************************************************************/
// 命令指令
//*****************************************************************************/

/**
 * 获取命令指令信息列表
 */
export const getCmd = data=>axios('/command',data);

/**
 * 新增命令指令信息列表
 */
export const addCmd = (data) => axios('/command', data, 'POST');

/**
 * 删除命令指令信息列表
 */
export const deleteCmd = id => axios(`/command/${id}`, '', 'delete');


/**
 * 修改命令指令信息列表
 */
export const updateCmd = data=>axios('/command', data, 'PUT');


//*****************************************************************************/
// 任务
//*****************************************************************************/

/**
 * 获取任务信息列表
 */
export const getTask = data=>axios('/task/list',data);

/**
 * 新增任务信息列表
 */
export const addTask = (data) => axios('/task', data, 'POST');

/**
 * 删除任务信息列表
 */
export const deleteTask = id => axios(`/task/${id}`, '', 'delete');


/**
 * 修改任务信息列表
 */
export const updateTask = data=>axios('/task', data, 'PUT');



/**
 * 获取用户信息
 */
export const getAdminInfo = () => axios('/admin/info');


/**
 * 获取会议纪要信息列表
 */
export const getSummarys = data => axios('/summary/list', data);

/**
 * 新增会议纪要信息列表
 */
export const addSummary = data => axios('/summary', data, 'POST');
/**
 * 获取会议纪要详细信息
 */
export const getResturantDetail = restaurant_id => axios('/summary/list/' + restaurant_id);

/**
 * 获取会议纪要数据总条数
 */
export const getSummarysCount = data => axios('/summary/count');

/**
 * 更新会议信息
 */
export const updateSummary = data => axios('/summary', data, 'PUT');
/**
 * 删除会议纪要
 * @param {*} summary_id 
 */
//export const deleteSummary = summary_id => axios('/summary/list/' + summary_id, {}, 'DELETE');
export const deleteSummary = summary_id => axios('/summary/' + summary_id, summary_id, 'DELETE');

export const querySummaryItem = summary_id => axios( '/summaryItem/' + summary_id );

export const addSummaryItem = data => axios('/summaryItem/' , data, 'POST');

export const deleteSummaryItem = summary_id => axios('/summaryItem/' + summary_id, summary_id, 'DELETE');

export const updateSummaryItem = data => axios('/summaryItem/', data, 'PUT');



/**
 * dashboard统计
 * 获取产品统计清单
 */
export const getProductStatistics=(userId)=>axios('/statistics/product',userId);

/**
 * dashboard统计
 * 获取项目统计清单
 */
export const getProjectStatistics=(userId)=>axios('/statistics/project',userId);

/**
 * dashboard统计
 * 获取需求统计清单
 */
export const getRequireStatistics=(userId)=>axios('/statistics/require',userId);

/**
 * dashboard统计
 * 获取会议纪要统计清单
 */
export const getSummaryStatistics=(userId)=>axios('/statistics/summmary',userId);

/**
 * dashboard统计
 * 获取故障单统计清单
 */
export const getFaultStatistics=(userId)=>axios('/statistics/fault',userId);

/**
 * dashboard统计
 * 获取我的任务统计清单
 */
export const getTaskStatistics=(userId)=>axios('/statistics/task',userId);

/**
 * 获取会议纪操作要日志记录
 * @param {} data 
 */
export const getSummaryLogs = (data ,id)=>axios(`/log/list/${id}`,data);


