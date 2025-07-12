'use client'

import {
  useState
} from 'react'

import {useMutation} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {toast} from "sonner"
import OwnerInfoForm from '../../components/owner-info-form'
import RestaurantRegisterForm from '../../components/restaurant-register-form'
import {fetcher} from '../../utils/fetcher'


const RestaurantRegister = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetcher('/restaurant/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
    },
  })
  const [step, setStep] = useState<number>(0)
  const [formData, setFormData] = useState<any>({
    restaurant: {},
    user: {}
  })


  const onSubmit = async (value: any) => {
    setFormData({
      restaurant: formData.restaurant,
      user: value
    })

    let payload = {
      restaurant: formData.restaurant,
      user: value
    }

    console.log(payload, "payload")
    mutation.mutate(payload, {
      onSuccess: () => {
        console.log("hit on success restaurant register")
        toast.success('Restaurant has been created.', {
          description: "You can now login to your account to manage your restaurant",
        })
        navigate('/auth/login')
      },
      onError: (error: any) => {
        console.log(error, "hit error restaurant register")
        toast.error(error.message || 'Something went wrong', {
          description: "Please try again with different email",
        })
      },
    })
  }


  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-full mt-6">

      {step === 0 && <RestaurantRegisterForm
        initData={formData.restaurant}
        onSubmit={(data: any) => {
          setFormData({...formData, restaurant: data})
          setStep(1)
        }} />}
      {step === 1 && <OwnerInfoForm
        isPending={mutation.isPending}
        initData={formData.user}
        onSubmit={onSubmit}
        onBack={() => {
          setStep(0)
        }}
      />}

    </div>
  )
}

export default RestaurantRegister




