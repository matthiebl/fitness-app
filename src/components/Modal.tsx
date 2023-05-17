import React from 'react'

interface ModalProps {
    isOpen: boolean
    children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children }) => (
    <div
        data-open={isOpen}
        className='fixed top-0 left-0 z-40 hidden h-screen w-screen items-center justify-center backdrop-blur-sm data-[open=true]:flex'
    >
        {children}
    </div>
)
