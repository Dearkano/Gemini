import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function register(params: any) {
  return POST('register', {params})
}
