import { Try, Success, Failure } from './fp/Try'
import { FetchError, encodeParams, GET, POST } from './fetch'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage'

export async function getAccessToken(){
  return getLocalStorage('access_token')
}

export async function logIn(email:string, password:string){
  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  const data = await POST(`login/user?email=${email}&password=${password}`,{headers})
  data.map((d:any)=>{
    if(d.status===0){
      const token = d.data
      setLocalStorage('access_token', token)
    }
  })
  return data
}
export function isLogIn() {
  return !!getLocalStorage('access_token')
}
export function logOut() {
  removeLocalStorage('access_token')
}
