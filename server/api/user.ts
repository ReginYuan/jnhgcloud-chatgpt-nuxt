import { fetchTMDB } from '~/composables/utils/tmdb'
// 接口示例
export function getInfo(params: any) {
  /**
   *参数
   *接口 string
   *配置请求方式和请求头数据 object
   *传递数据 object
   */
  return fetchTMDB(
    'system/information/list',
    {
      method: 'get',
      headers: {
        isToken: false
      }
    },
    params
  )
}
