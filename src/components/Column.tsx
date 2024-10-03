import { Member } from '../types'
import Card from './Card'

interface ColumnProps {
  name: string
  members: Member[]
  onDelete: (member: Member) => void
  onEdit: (member: Member) => void
}

const Column = ({ members, name, onDelete, onEdit }: ColumnProps) => {
  return (
    <div className="flex-1">
      <div className="bg-[#D6E4EC] border border-[#A6BCCF] max-h-[600px] overflow-y-auto mt-2 rounded-xl max-w-[350px] px-4 py-2 flex flex-col gap-3">
        <div className="flex justify-between items-center m-2">
          <h2 className="font-medium text-xl text-black">{name}</h2>
          <span className="w-fit h-fit rounded-full px-2 bg-[#F5F5F5] text-black">
            {members.length}
          </span>
        </div>

        <div id="my-scrollbar" data-scrollbar>
          <div className="flex flex-col gap-3 py-2">
            {members.map((member, index) => (
              <Card
                member={member}
                key={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Column
