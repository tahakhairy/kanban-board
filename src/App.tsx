import { useEffect, useState } from 'react'

import Form from './components/Form'
import Scrollbar from 'smooth-scrollbar'
import { Member } from './types'
import UnclaimedColumn from './components/UnclaimedColumn'
import { apiAddMember, apiEditMember } from './api'

const App = () => {
  const [formMethod, setFormMethod] = useState<
    'add' | 'edit' | 'delete' | null
  >('add')

  const [members, setMembers] = useState<Member[]>([])

  const [formData, setFormData] = useState<Member>()

  useEffect(() => {
    Scrollbar.init(document.querySelector('#my-scrollbar')!)

    const fetchMembers = async () => {
      const res = await fetch('http://localhost:5000/members')

      const data = await res.json()

      setMembers(data)
    }

    fetchMembers()
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
          <div className="flex flex-row h-full justify-between gap-2">
            <UnclaimedColumn
              members={members}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            {/* <Column name="First Contact" />
            <Column name="Preparing Work Offer" />
            <Column name="Send to Therapists" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
