import { GET, POST, PUT } from '@/utils/fetch'
import { IUser } from '@edu'
import host from '@/config/host'

export async function getMyInfo() {
  return GET('me')
}

export async function getUserById(id:string) {
  return GET(`getUserById?id=${id}`)
}

export async function getUserByName(username:string){
  return GET(`getUserByName?username=${encodeURIComponent(username)}`)
}

export async function getUserByBookName(bookName:string){
  return GET(`getUserByBookName?name=${encodeURIComponent(bookName)}`)
}
