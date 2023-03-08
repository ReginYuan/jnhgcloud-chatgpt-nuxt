import { fetchTMDB } from '~/composables/utils/tmdb'
// 获取用户详细信息
export function getInfo(params: any) {
  /**
   *参数
   *接口 string
   *配置请求方式和请求头数据 object
   *传递数据 object
   */
  return fetchTMDB(
    '/system/notice/list',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params
  )
}
