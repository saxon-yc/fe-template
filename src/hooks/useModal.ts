import { useState } from 'react'

export interface UseModal {
  isOpenModal: boolean
  confirmLoading: boolean
  showModal: () => void
  closeModal: () => void
  setConfirmLoading: (state: boolean) => void
}

export function useModal(): UseModal {
  const [isOpenModal, setIsModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setConfirmLoading(false)
  }
  return {
    isOpenModal,
    confirmLoading,
    showModal,
    closeModal,
    setConfirmLoading,
  }
}
