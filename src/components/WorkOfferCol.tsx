import { apiDeleteMember } from '../api'
import { Member } from '../types'
import Column from './Column'

const FirstContactCol = ({ members, onDelete, onEdit }) => {
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
        id="wo_col"
        name="Preparing Work Offer"
        bgColor="#BED0DE"
        members={members}
        onDelete={deleteMember}
        onEdit={editMember}
      />
    </>
  )
}

export default FirstContactCol
