import { GET, POST, PUT } from '@/utils/fetch'
import { IBook } from '@gemini'
import host from '@/config/host'

export async function uploadBook(params:any){
  return await POST('upload', {params})
}

export async function getAllBooks() {
  return await GET<IBook[]>('all')
}

export async function getBooksByClass(type:string, page:number){
  return await GET<IBook[]>(`getBooksByClass?type=${type}&page=${page}`)
}

export async function getBookByName(name: string){
  return await GET<IBook>(`getBookByName?name=${name}`)
}

export async function buy(bookName:string, price:number){
  return await POST('buy', {params:{bookName,price}})
}

