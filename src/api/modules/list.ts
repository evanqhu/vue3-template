// @ts-nocheck
/** 分模块接口请求函数（不与 redux 交互） */
import type * as List from "@/api/interfaces/list"
import request from "@/api/service"

/** 查询合同列表 */
/** 案例 1️⃣ (不使用 try catch) */
export const getContractList = async (_params: List.ContractListReq) => {
  const result = await request.get<List.ContractListRes>("/get", {
    cancelRequest: false
  })
  const { data } = result
  return data
}

export const getContractList2 = async (_params: List.ContractListReq) => {
  const result = await request.post<List.ContractListRes>("/post", _params, {
    cancelRequest: false
  })
  const { data } = result
  return data
}

/** 案例 2️⃣ (使用 try catch) */
// 使用 try catch：当 await 后面的异步函数 rejected 时，程序执行 catch 中的代码，不会中断
// 这样有利于处理异常情况，可以指定出现异常时该接口的返回值
// export const getContractList = async (params: List.ContractListReq) => {
//   try {
//     const result = await request.get<List.ContractListRes>('/api/get-list', {
//       cancelRequest: true,
//     });
//     const { data } = result;
//     return data;
//   } catch () {
//     return {};
//   }
// };

/** 案例 3️⃣ (使用 catch) */
// 直接在 await 后面使用 catch 函数：当 await 后面的异步函数 rejected 时，程序执行 catch 中的代码，不会中断
// export const getContractList = async (params: List.ContractListReq) => {
//   const result = await request
//     .get<List.ContractListRes>("/ap/get-list", {
//       cancelRequest: false // 默认为 true
//     })
//     .catch(() => ({}))
//   const { data } = result
//   return data
// }

/** 案例 4️⃣ (使用辅助函数) */
// const handleRequest = async (asyncFunc) => {
//   try {
//     const result = await asyncFunc
//     return [result, null]
//   } catch (error) {
//     return [null, error]
//   }
// }

// export const getContractList = async (params: List.ContractListReq) => {
//   const [result, error] = await handleRequest(
//     request.get<List.ContractListRes>("/api/get-list", {
//       cancelRequest: false // 默认为 true
//     })
//   )
//   if (error) return {}
//   const { data } = result
//   return data
// }
