import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Form from './components/Form'
import Scrollbar from 'smooth-scrollbar'
import { Member } from './types'
import UnclaimedColumn from './components/UnclaimedColumn'
import FirstContactCol from './components/FirstContactCol'
import WorkOfferCol from './components/WorkOfferCol'
import SendTherapistCol from './components/SendTherapistCol'

import {
  apiAddMember,
  apiEditMember,
  apiFetchFcMembers,
  apiFetchMembers,
  apiFetchSttMembers,
  apiFetchWoMembers
} from './api'

const App = () => {
  const [formMethod, setFormMethod] = useState<
    'add' | 'edit' | 'delete' | null
  >('add')

  const [members, setMembers] = useState<Member[]>([])
  const [fcMembers, setFcMembers] = useState<Member[]>([])
  const [woMembers, setWoMembers] = useState<Member[]>([])
  const [sttMembers, setSttMembers] = useState<Member[]>([])
  const [formData, setFormData] = useState<Member>()

  useEffect(() => {
    Scrollbar.initAll()

    const fetchMembers = async () => {
      const res = await apiFetchMembers()

      const data = await res.json()

      setMembers(data)
    }

    const fetchFcMembers = async () => {
      const res = await apiFetchFcMembers()

      const data = await res.json()

      setFcMembers(data)
    }

    const fetchWoMembers = async () => {
      const res = await apiFetchWoMembers()

      const data = await res.json()

      setWoMembers(data)
    }

    const fetchSttMembers = async () => {
      const res = await apiFetchSttMembers()

      const data = await res.json()

      setSttMembers(data)
    }

    fetchMembers()
    fetchFcMembers()
    fetchWoMembers()
    fetchSttMembers()
  }, [])

  const handleDelete = (deletedMemberId: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((m) => m.id !== deletedMemberId)
    )
  }

  const handleEdit = (method: 'edit', member: Member) => {
    setFormMethod(method)
    setFormData(member)
  }

  const addMember = async (newMember: Member) => {
    setFormMethod('add')
    const res = await apiAddMember(newMember)

    if (res.ok) {
      const newMember = await res.json()
      setMembers([...members, newMember])
    }

    return
  }

  const editMember = async (id: string, updatedMember: Member) => {
    const res = await apiEditMember(id, updatedMember)

    if (res.ok) {
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        )
      )
      setFormData(updatedMember)
      setFormMethod(null)
    }
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result

    console.log(destination)
    console.log(source)
    console.log(draggableId)
  }

  return (
    <div className="bg-[#D6E4EC] min-h-screen p-5">
      <header className="flex flex-col items-center justify-center text-2xl text-black mb-8 font-bold">
        <h1>Kanban Board</h1>
      </header>

      {/* Form Section */}
      <div className="w-1/2 mx-auto">
        <Form
          formMethod={formMethod}
          formData={formData}
          addMember={addMember}
          editMember={editMember}
        />
      </div>

      <div className="flex flex-row text-white">
        {/* Kanban Board Section */}
        <div className="flex flex-col w-full text-center">
          <div className="flex flex-row h-full justify-center gap-2">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <UnclaimedColumn
                members={members}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

              <FirstContactCol
                members={fcMembers}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

              <WorkOfferCol
                members={woMembers}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

              <SendTherapistCol
                members={sttMembers}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
