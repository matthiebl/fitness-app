import React from 'react'
import { Navbar, NavbarItem } from './Navbar'

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className='h-screen w-screen'>
            <Navbar items={navbarItems} />
            <div className='flex min-h-full w-full justify-center pb-20 sm:pb-0 sm:pl-[88px]'>{children}</div>
        </div>
    )
}

const navbarItems: NavbarItem[] = [
    {
        svgPath: (
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
        ),
        redirectTo: '/timer',
        text: 'Timer',
    },
]
