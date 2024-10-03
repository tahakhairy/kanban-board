import type { Member } from '../types'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

interface CardProps {
  member: Member
  onDelete: (member: Member) => void
  onEdit: (member: Member) => void
}
const Card = ({ member, onDelete, onEdit }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 text-black flex flex-col gap-2 justify-start *:text-start">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl">
          {member.title} {member.name}
        </p>
        <p className="text-xs text-gray-600">{member.age} yo</p>
      </div>
      <p>{member.email}</p>
      <div className="flex justify-between">
        <p className="text-gray-600 text-sm">{member.phone}</p>

        <div className="flex items-center gap-2">
          <FiEdit
            className="w-5 h-5 cursor-pointer"
            onClick={() => onEdit(member)}
          />
          <MdDelete
            className="w-5 h-5 cursor-pointer text-red-800"
            onClick={() => onDelete(member)}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
