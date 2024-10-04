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
        id="stt_col"
        name="Sent to Therapist"
        bgColor="#BED0DE"
        members={members}
        onDelete={deleteMember}
        onEdit={editMember}
      />
    </>
  )
}

export default FirstContactCol
