import { GET, POST, PUT } from '@/utils/fetch'
import { IResource } from '@edu'
import host from '@/config/host'
export async function getResources() {
  return GET<{ message: string, status: number, data: IResource[] }>('admin/resourcelist').then(res => Promise.resolve(res.map(r => r.data)))
}

export async function downloadResource(id: string) {
  //return GET(`agency/download/${id}`)
  window.open(`${host.api}/agency/download/${id}`)
}
