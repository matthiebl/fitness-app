import React from 'react'
import { useNavigate } from 'react-router-dom'

export type NavbarItem = {
    svgPath: React.ReactNode
    redirectTo: string
    text: string
    mobileOrder?: number
}

interface NavbarProps {
    items?: NavbarItem[]
}

export const Navbar: React.FC<NavbarProps> = ({ items = [] }) => {
    const navigate = useNavigate()

    return (
        <nav className='fixed bottom-0 left-0 z-30 h-20 w-full overflow-y-auto sm:h-full sm:w-[88px]'>
            <div className='flex h-full w-full items-center justify-evenly sm:flex-col sm:justify-start sm:gap-3'>
                {items.map(item => (
                    <button
                        key={crypto.randomUUID()}
                        onClick={() => navigate(item.redirectTo)}
                        className={
                            'rounded-full bg-indigo-700 p-3 text-white shadow hover:bg-indigo-800 sm:order-none sm:mt-[14px] sm:p-4 ' +
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
                        {/* {item.text && (
                            <div className='bottom-2 hidden w-full translate-y-0.5 truncate text-xs sm:block'>
                                {item.text}
                            </div>
                        )} */}
                    </button>
                ))}
            </div>
        </nav>
    )
}

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
