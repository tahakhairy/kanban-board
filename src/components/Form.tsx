import { useForm } from 'react-hook-form'
import Input from './Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react'

interface Form {
  title: string
  name: string
  age: number
  email: string
  phone: number
}

interface FormProps {
  addMember: (values: Form) => void
  editMember: (id: string, values: Form) => void
  formMethod: 'add' | 'edit' | 'delete' | null
  formData: Form
}

const Form = ({ addMember, editMember, formMethod, formData }: FormProps) => {
  const schema = yup.object({
    title: yup.string().trim().required('Field is required'),
    name: yup.string().trim().required('Field is required'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .min(21)
      .required('Field is required'),
    email: yup.string().email().trim().required('Field is required'),
    phone: yup
      .string()
      .matches(/^\+\d+$/, 'Phone number must start with +')
      .required('Field is required')
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: { age: 21 },
    resetOptions: {
      keepValues: false,
      keepIsSubmitted: false
    }
  })

  useEffect(() => {
    if (formMethod === 'edit' && formData) {
      reset(formData)
    }
  }, [formData])

  const onSubmit = (values: Form) => {
    if (formMethod === 'add') {
      addMember(values)
    } else if (formMethod === 'edit') {
      editMember(values.id, values)
    }
    reset()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 place-items-start place-content-center  mx-auto gap-4 m-8"
      >
        <Input
          id="title"
          placeholder="title"
          label="Title"
          type="text"
          {...register('title')}
          errors={errors.title?.message}
        />
        <Input
          id="name"
          placeholder="name"
          label="Name"
          type="text"
          {...register('name')}
          errors={errors.name?.message}
        />
        <Input
          id="age"
          placeholder="age"
          label="Age"
          type="number"
          {...register('age')}
          errors={errors.age?.message}
        />
        <Input
          id="email"
          placeholder="email"
          label="Email"
          type="email"
          {...register('email')}
          errors={errors.email?.message}
        />
        <Input
          id="phone"
          placeholder="phone"
          label="Phone"
          type="phone"
          {...register('phone')}
          errors={errors.phone?.message}
        />

        <button className="bg-blue-500 text-white rounded-md col-span-3 place-self-center px-5 py-2">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </div>
  )
}

export default Form
