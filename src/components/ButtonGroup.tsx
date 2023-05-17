import React from 'react'
import { useLocalStorage } from '../hooks'
import { Modal } from './Modal'

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
    const [usingCustom, setUsingCustom] = useLocalStorage('custom ' + title, false)

    const [chooseCustom, setChooseCustom] = React.useState(false)
    const [customMin, setCustomMin] = React.useState(0)
    const [customSec, setCustomSec] = React.useState(0)
    const [customSets, setCustomSets] = React.useState(0)

    const defaultVal = () => (title.includes('Cooldown') ? 45 : 2)

    const checkCustom = (): string => {
        let val = title.includes('Cooldown') ? customMin * 60 + customSec : customSets
        if (val === 0) return 'Custom value cannot be 0'
        if (items.map(it => it.value).includes(val)) return 'Custom value is already an option'
        return ''
    }

    const displayCustom = (): string => {
        return title.includes('Cooldown')
            ? `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`
            : `${value}`
    }

    return (
        <>
            <Modal isOpen={chooseCustom}>
                <div className='w-10/12 rounded-lg border-[1px] bg-white p-4 shadow-lg sm:max-w-lg'>
                    <h3 className='text-lg font-semibold'>Custom value for {title}</h3>
                    {title.includes('Cooldown') && (
                        <>
                            <div className='my-2 flex w-full items-center justify-center p-2'>
                                <select
                                    className='mr-1 rounded-lg border-gray-300'
                                    value={customMin}
                                    onChange={ev => setCustomMin(parseInt(ev.target.value))}
                                >
                                    {minutes.map(min => (
                                        <option key={crypto.randomUUID()}>{min}</option>
                                    ))}
                                </select>
                                :
                                <select
                                    className='ml-1 rounded-lg border-gray-300'
                                    value={customSec}
                                    onChange={ev => setCustomSec(parseInt(ev.target.value))}
                                >
                                    {seconds.map(sec => (
                                        <option key={crypto.randomUUID()}>{sec}</option>
                                    ))}
                                </select>
                            </div>
                            {checkCustom() === '' && (
                                <>
                                    <button
                                        onClick={() => {
                                            setChooseCustom(false)
                                            setter(customMin * 60 + customSec)
                                        }}
                                        className='mt-6 w-full truncate rounded-lg bg-sky-500 p-1 px-2 text-white duration-150 hover:bg-sky-600'
                                    >
                                        Select
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    {title.includes('Sets') && (
                        <>
                            <div className='my-2 flex w-full items-center justify-center p-2'>
                                <select
                                    className='mr-1 rounded-lg border-gray-300'
                                    value={customSets}
                                    onChange={ev => setCustomSets(parseInt(ev.target.value))}
                                >
                                    {sets.map(set => (
                                        <option key={crypto.randomUUID()}>{set}</option>
                                    ))}
                                </select>
                            </div>
                            {checkCustom() === '' && (
                                <>
                                    <button
                                        onClick={() => {
                                            setChooseCustom(false)
                                            setter(customSets)
                                        }}
                                        className='mt-6 w-full truncate rounded-lg bg-sky-500 p-1 px-2 text-white duration-150 hover:bg-sky-600'
                                    >
                                        Select
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    {checkCustom() !== '' && (
                        <>
                            <span className='text-sm text-red-500'>{checkCustom()}</span>
                            <button
                                onClick={() => {
                                    setChooseCustom(false)
                                    setUsingCustom(false)
                                    setter(defaultVal())
                                }}
                                className='w-full truncate rounded-lg bg-red-500 p-1 px-2 text-white duration-150 hover:bg-red-600'
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </Modal>

            <div className='mt-4 flex w-full flex-col'>
                <h3>{title}</h3>
                <div className='flex w-full items-center justify-evenly rounded-lg border-2 border-indigo-500 text-indigo-500 shadow'>
                    {items.map(item => (
                        <button
                            key={crypto.randomUUID()}
                            aria-selected={!usingCustom && value === item.value}
                            onClick={() => {
                                setUsingCustom(false)
                                setter(item.value)
                            }}
                            className='w-1/4 truncate border-r-2 border-indigo-500 p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                        >
                            {item.display}
                        </button>
                    ))}
                    <button
                        aria-selected={usingCustom}
                        onClick={() => {
                            setUsingCustom(true)
                            setChooseCustom(true)
                        }}
                        className='w-1/4 truncate p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                    >
                        {usingCustom ? (
                            <span className='flex w-full items-center justify-center gap-1'>
                                {displayCustom()}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='-mr-1 h-5 w-5'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                                    />
                                </svg>
                            </span>
                        ) : (
                            'Custom'
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

const minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const seconds = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
const sets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
