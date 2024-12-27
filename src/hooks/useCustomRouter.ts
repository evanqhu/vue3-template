import { useRouter } from "vue-router"

export const useCustomRouter = () => {
  const router = useRouter()
  const { params, query } = router.currentRoute.value
  const { channel } = params
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const fullChannel = channel ? `/${channel}` : ""
  const fullQueryString = queryString ? `?${queryString}` : ""

  const customPush = (path: string) => {
    router.push(`${fullChannel}${path}${fullQueryString}`)
  }

  return customPush
}
