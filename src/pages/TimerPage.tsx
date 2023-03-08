import React from 'react'
import { PageWrapper } from '../components'

interface TimerPageProps {}

export const TimerPage: React.FC<TimerPageProps> = ({}) => {
    const [cooldown, setCooldown] = React.useState(0)
    return (
        <PageWrapper>
            <main className='flex h-full w-full max-w-lg flex-col items-center p-8 px-12'>
                <div className='w-full text-center'>
                    <h2 className='text-xl font-semibold'>Exercise 2</h2>
                    <h2 className='text-3xl font-bold'>Set 3</h2>
                </div>
                <Timer time={10} />
                <ButtonGroup
                    items={cooldownTimeItems}
                    title='Cooldown Time'
                    control={{ value: cooldown, setter: setCooldown }}
                />
            </main>
        </PageWrapper>
    )
}

const cooldownTimeItems: ButtonItem[] = [
    {
        display: '0:45',
        value: 45,
    },
    {
        display: '1:30',
        value: 90,
    },
    {
        display: '3:00',
        value: 180,
    },
]

interface TimerProps {
    time: number
}

const Timer: React.FC<TimerProps> = ({ time }) => {
    const [cooldown, setCooldown] = React.useState(false)
    const [remaining, setRemaining] = React.useState(time)

    const startTimer = () => {
        setCooldown(true)
        const start = Date.now()
        const intervalId = setInterval(() => {
            const diff = (Date.now() - start) / 1000
            const newTime = time - diff
            setRemaining(newTime)
            if (newTime <= 0.01) finishTimer(intervalId)
        }, 1)
    }

    const finishTimer = (intervalId: number) => {
        clearInterval(intervalId)
        setRemaining(time)
        setCooldown(false)
    }

    return (
        <button onClick={startTimer} disabled={cooldown} className='flex w-full justify-center py-4'>
            <div className='relative aspect-square w-full'>
                <div className='h-full w-full rounded-full p-3 shadow-lg'>
                    <div
                        className={
                            'flex h-full w-full flex-col items-center justify-center rounded-full bg-white p-4 shadow-inner ' +
                            timeColour(remaining, !cooldown)
                        }
                    >
                        {cooldown ? (
                            <>
                                <span className='text-7xl font-bold duration-300'>
                                    {Math.min(time, Math.floor(1 + remaining))}
                                </span>
                                <sub>sec</sub>
                            </>
                        ) : (
                            <span className='text-3xl font-bold'>Cooldown</span>
                        )}
                    </div>
                </div>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    className={
                        'duration-150-150 absolute top-0 left-0 h-full w-full -rotate-90 fill-none stroke-[12px] transition-colors ' +
                        timerColour(remaining)
                    }
                >
                    <circle
                        cx='50%'
                        cy='50%'
                        strokeDasharray='307%'
                        strokeDashoffset={(remaining / time) * 307 + '%'}
                        strokeLinecap='round'
                        className='timer'
                    />
                </svg>
            </div>
        </button>
    )
}

const timerColour = (time: number): string => {
    if (time <= 5) return 'stroke-red-500'
    return 'stroke-sky-500'
}

const timeColour = (time: number, waiting: boolean): string => {
    if (waiting) return 'text-green-500'
    if (time <= 5) return 'text-red-500'
    return 'text-sky-500'
}

type ButtonItem = {
    display: string
    value: number
}

interface ButtonGroupProps {
    items: ButtonItem[]
    title: string
    control: { value: number; setter: (n: number) => any }
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ items, title, control }) => {
    const { value, setter } = control
    return (
        <div className='mt-4 flex w-full flex-col'>
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
                    aria-selected={value === -1}
                    onClick={() => setter(3)}
                    className='w-1/4 truncate p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    Custom
                </button>
            </div>
            <div className='flex w-full items-center justify-evenly rounded-lg border-2 border-indigo-500 text-indigo-500'>
                <button
                    aria-selected={value === 0}
                    onClick={() => setter(0)}
                    className='w-1/4 truncate border-r-2 border-indigo-500 p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    0:45
                </button>
                <button
                    aria-selected={value === 1}
                    onClick={() => setter(1)}
                    className='w-1/4 truncate border-r-2 border-indigo-500 p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    1:30
                </button>
                <button
                    aria-selected={value === 2}
                    onClick={() => setter(2)}
                    className='w-1/4 truncate border-r-2 border-indigo-500 p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    3:00
                </button>
                <button
                    aria-selected={value === 3}
                    onClick={() => setter(3)}
                    className='w-1/4 truncate p-1 px-2 duration-150 aria-selected:bg-indigo-500 aria-selected:text-white'
                >
                    Custom
                </button>
            </div>
        </div>
    )
}
