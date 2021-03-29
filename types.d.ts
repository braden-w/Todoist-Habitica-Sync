export interface Req {
  event_data: EventData
  event_name: string
  initiator: Initiator
  user_id: number
  version: string
}

export interface EventData {
  added_by_uid: number
  assigned_by_uid: null
  checked: number
  child_order: number
  collapsed: number
  content: string
  date_added: string
  date_completed: string
  due: Due
  id: number
  in_history: number
  is_deleted: number
  labels: any[]
  legacy_project_id: number
  parent_id: null
  priority: number
  project_id: number
  responsible_uid: null
  section_id: null
  sync_id: null
  url: string
  user_id: number
}

export interface Due {
  date: string
  is_recurring: boolean
  lang: string
  string: string
  timezone: null
}

export interface Initiator {
  email: string
  full_name: string
  id: number
  image_id: string
  is_premium: boolean
}
