import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function getMyInfo() {
  return GET<{ message: string, status: number, data: IUser[] }>('user/detail').then(res => Promise.resolve(res.map(r => r.data)))
}
