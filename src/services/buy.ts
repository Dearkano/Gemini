import { GET, POST, PUT } from '@/utils/fetch'

export async function getBuyList(){
  return GET('getBuyList')
}

export async function issueWish(params: any){
  return POST('issueWish', {params})
}
