import { POST } from '../utils/fetch'

// tslint:disable-next-line:no-any
export async function uploadImage(files: any) {
  console.log(files)
  const file = files[0]
  // tslint:disable-next-line:max-line-length
  const token = '9v6-757_VQ0n1SGjF-PIUVkRwpQNI0fb5y65eP3x:rx1GGrIXhk8Wmh0iB1Ab1_2TeYg=:eyJzY29wZSI6InZvbHVudGVlcngiLCJkZWFkbGluZSI6MTU2ODk0NTMxOH0='
  const headers = new Headers()
  headers.append('Authorization', `Uptoken ${token}`)
  const formdata = new FormData()

  formdata.append('contentType', 'multipart/form-data')
  formdata.append('token', token)
  formdata.append('file', file, file.name)

  // tslint:disable-next-line:max-line-length
  return await fetch('http://upload.qiniup.com', { headers, method: 'POST', body: formdata })
}
