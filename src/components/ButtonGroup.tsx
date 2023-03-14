import React from 'react'

export type TButtonItem = {
    display: string
    value: number
}

interface ButtonGroupProps {
    items: TButtonItem[]
    title: string
    control: { value: number; setter: (n: number) => any }
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ items, title, control }) => {
    const { value, setter } = control
    return (
        <div className='mt-4 flex w-full flex-col shadow-sm'>
            <h3>{title}</h3>
            <div className='flex w-full items-center justify-evenly rounded-lg border-2 border-indigo-500 text-indigo-500'>
                {items.map(item => (
                    <button
                        key={crypto.randomUUID()}
                        aria-selected={value === item.value}
                        onClick={() => setter(item.value)}
                        className='w-1/4 truncate border-r-2 border-indigo-500 p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                    >
                        {item.display}
                    </button>
                ))}
                <button
                    disabled
                    aria-selected={value === -1}
                    onClick={() => setter(3)}
                    className='w-1/4 truncate p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    Custom
                </button>
            </div>
        </div>
    )
}
