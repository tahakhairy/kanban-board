import { Member } from '../types'

const BASE_URL = 'http://localhost:5000'

export const apiFetchMembers = async () => {
  return await fetch(`${BASE_URL}/unclaimed_members`)
}

export const apiFetchFcMembers = async () => {
  return await fetch(`${BASE_URL}/fc_members`)
}

export const apiFetchWoMembers = async () => {
  return await fetch(`${BASE_URL}/wo_members`)
}

export const apiFetchSttMembers = async () => {
  return await fetch(`${BASE_URL}/stt_members`)
}

export const apiAddMember = async (member: Member) => {
  return await fetch(`${BASE_URL}/unclaimed_members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(member)
  })
}

export const apiEditMember = async (
  memberId: string,
  upadatedValues: Member
) => {
  return await fetch(`${BASE_URL}/unclaimed_members/${memberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(upadatedValues)
  })
}

export const apiDeleteMember = async (memberId: string) => {
  return await fetch(`${BASE_URL}/unclaimed_members/${memberId}`, {
    method: 'DELETE'
  })
}
