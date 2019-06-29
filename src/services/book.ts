import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function uploadBook(params:any){
  console.log(params)
  return await POST('upload', {params})
}
