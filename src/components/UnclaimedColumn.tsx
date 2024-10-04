import { apiDeleteMember } from '../api'
import { Member } from '../types'
import Column from './Column'

const UnclaimedColumn = ({ members, onDelete, onEdit }) => {
  const deleteMember = async (member: Member) => {
    const res = await apiDeleteMember(member.id, member.belongs)
    if (res.ok) {
      onDelete(member)
    }
  }

  const editMember = (member: Member) => {
    onEdit('edit', member)
  }

  return (
    <>
      <Column
        id="unclaimed_col"
        name="Unclaimed"
        members={members}
        onDelete={deleteMember}
        onEdit={editMember}
      />
    </>
  )
}

export default UnclaimedColumn
