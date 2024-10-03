import { Member } from '../types'

const BASE_URL = 'http://localhost:5000'

export const apiAddMember = async (member: Member) => {
  return await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(member)
  })
}

export const apiEditMember = async (memberId: string, values) => {
  return await fetch(`${BASE_URL}/members/${memberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
}

export const apiDeleteMember = async (memberId: string) => {
  return await fetch(`${BASE_URL}/members/${memberId}`, {
    method: 'DELETE'
  })
}
