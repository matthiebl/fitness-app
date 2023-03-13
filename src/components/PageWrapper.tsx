import React from 'react'
import { useNavigate } from 'react-router-dom'

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className='h-screen w-screen'>
            <Navbar />
            <div className='flex min-h-full w-full justify-center pb-16 sm:pb-0 sm:pl-24'>{children}</div>
        </div>
    )
}

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <nav className='fixed bottom-0 left-0 h-16 w-full overflow-y-auto sm:h-full sm:w-24'>
            <div className='flex h-full w-full items-center justify-evenly bg-indigo-500 sm:flex-col sm:justify-start sm:gap-3 sm:p-4'>
                {navbarItems.map(item => (
                    <button
                        key={crypto.randomUUID()}
                        onClick={() => navigate(item.redirectTo)}
                        className={
                            'relative flex flex-col items-center justify-center rounded-full bg-indigo-700 p-2.5 text-white shadow hover:bg-indigo-800 sm:order-none sm:h-16 sm:w-16 sm:rounded-lg ' +
                            orderingMap[item.mobileOrder || 0]
                        }
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-7 w-7'
                        >
                            {item.svgPath}
                        </svg>
                        {item.text && (
                            <div className='bottom-2 hidden w-full translate-y-0.5 truncate text-xs sm:block'>
                                {item.text}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    )
}

type NavbarItemProps = {
    svgPath: React.ReactNode
    redirectTo: string
    text: string
    mobileOrder?: number
}

const navbarItems: NavbarItemProps[] = [
    {
        svgPath: (
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
        ),
        redirectTo: '/timer',
        text: 'Timer',
    },
]

const orderingMap: Record<number, string> = {
    0: 'order-none',
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
}
