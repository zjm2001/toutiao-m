
import request from '@/utils/request'
/**
 * 请求联想建议
 */
export const getSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: { q }
  })
}
/**
 * 请求联想建议
 */
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
