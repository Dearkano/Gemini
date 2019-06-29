import { GET, POST, PUT } from '@/utils/fetch'
import {IRecentMessage, IMessageContent} from '@gemini'
export async function getRecentMessage(){
  return GET<IRecentMessage[]>('getRecentMessage')
}

export async function getMessageContent(id: string, from: number){
  return GET<IMessageContent[]>(`getMessage?id=${id}&from=${from}`)
}

export async function sendMessage(id:string, content:string){
  return POST('sendMessage', {params:{
    id,
    content
  }})
}

