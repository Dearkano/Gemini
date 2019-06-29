import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function getMyInfo() {
  return GET('me')
}

export async function getUserById(id:string) {
  return GET(`getUserById?id=${id}`)
}
