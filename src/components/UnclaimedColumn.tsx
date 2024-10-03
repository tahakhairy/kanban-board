import { apiDeleteMember } from '../api'
import { Member } from '../types'
import Column from './Column'

const UnclaimedColumn = ({ members, onDelete, onEdit }) => {
  const deleteMember = async (member: Member) => {
    const res = await apiDeleteMember(member.id)
    if (res.ok) {
      onDelete(member.id)
    }
  }

  const editMember = (member: Member) => {
    onEdit('edit', member)
  }

  return (
    <>
      <Column
        name="Unclaimed"
        members={members}
        onDelete={deleteMember}
        onEdit={editMember}
      />
    </>
  )
}

export default UnclaimedColumn
