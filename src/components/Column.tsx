import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Member } from '../types'
import Card from './Card'

interface ColumnProps {
  id: string
  name: string
  bgColor?: string
  members: Member[]
  onDelete: (member: Member) => void
  onEdit: (member: Member) => void
}

const Column = ({
  members,
  name,
  bgColor = '#D6E4EC',
  onDelete,
  onEdit,
  id
}: ColumnProps) => {
  return (
    <div className="flex-1">
      <div
        className="border border-[#A6BCCF] max-h-[600px] overflow-y-auto mt-2 rounded-xl max-w-[350px] px-4 py-2 flex flex-col gap-3"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex justify-between items-center m-2">
          <h2 className="font-medium text-xl text-black">{name}</h2>
          <span className="w-fit h-fit rounded-full px-2 bg-[#F5F5F5] text-black">
            {members.length}
          </span>
        </div>

        <Droppable droppableId={id}>
          {(provided) => (
            <div data-scrollbar>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="flex flex-col gap-3 py-2">
                  {members.map((member, index) => (
                    <Draggable
                      key={member.id}
                      draggableId={member.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            member={member}
                            key={index}
                            onDelete={onDelete}
                            onEdit={onEdit}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default Column
