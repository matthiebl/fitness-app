import React from 'react'
import { PageWrapper } from '../components'

interface TimerPageProps {}

export const TimerPage: React.FC<TimerPageProps> = ({}) => {
    const [set, setSet] = React.useState(0)
    const [exercise, setExercise] = React.useState(0)
    const [cooldown, setCooldown] = React.useState(cooldownTimeItems[0].value)
    const [setNum, setSetNum] = React.useState(setItems[1].value)

    const incrementSet = () => {
        setSet(set + 1)
        if (set == setNum) {
            setSet(0)
            setExercise(exercise + 1)
        }
    }

    return (
        <PageWrapper>
            <main className='flex h-full w-full max-w-lg flex-col items-center p-8 px-12'>
                <div className='w-full text-center'>
                    <h2 className='text-xl font-semibold'>Exercise {exercise}</h2>
                    <h2 className='text-3xl font-bold'>Set {set}</h2>
                </div>
                <Timer time={cooldown} set={set} sets={setNum} increment={incrementSet} />
                <div className='mt-10 w-full' />
                <ButtonGroup
                    items={cooldownTimeItems}
                    title='Cooldown Time'
                    control={{ value: cooldown, setter: setCooldown }}
                />
                <ButtonGroup items={setItems} title='Sets' control={{ value: setNum, setter: setSetNum }} />

                <button
                    className='mt-10 w-full rounded-lg bg-red-500 p-1.5 px-2 text-white hover:bg-red-600'
                    onClick={() => {
                        setSet(0)
                        setExercise(0)
                    }}
                >
                    Reset
                </button>
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
        display: '1:00',
        value: 60,
    },
    {
        display: '1:30',
        value: 90,
    },
]

const setItems: ButtonItem[] = [
    {
        display: '2',
        value: 2,
    },
    {
        display: '3',
        value: 3,
    },
    {
        display: '4',
        value: 4,
    },
]

interface TimerProps {
    time: number
    set: number
    sets: number
    increment: () => void
}

const Timer: React.FC<TimerProps> = ({ time, set, sets = 1, increment }) => {
    const [cooldown, setCooldown] = React.useState(false)
    const [remaining, setRemaining] = React.useState(time)

    React.useEffect(() => setRemaining(time), [time])

    const startTimer = () => {
        if (set == 0 || set == sets) {
            finishTimer()
            return
        }
        setCooldown(true)
        const start = Date.now()
        const intervalId = setInterval(() => {
            const diff = (Date.now() - start) / 1000
            const newTime = time - diff
            setRemaining(newTime)
            if (newTime <= 0.01) finishTimer(intervalId)
        }, 1)
    }

    const finishTimer = (intervalId?: NodeJS.Timer) => {
        if (intervalId) clearInterval(intervalId)
        setRemaining(time)
        setCooldown(false)
        increment()
    }

    const formatTime = (remaining: number) => {
        const seconds = Math.min(time, Math.floor(1 + remaining))
        if (seconds < 60) return seconds
        return `${Math.floor(seconds / 60)}:${('0' + (seconds % 60)).slice(-2)}`
    }

    const waitMessage = (): string => {
        if (set == 0) return 'Start'
        if (set == sets) return 'Finish'
        return 'Cooldown'
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
                                <span className='text-7xl font-bold duration-300'>{formatTime(remaining)}</span>
                                <sub>{remaining >= 60 ? 'min' : 'sec'}</sub>
                            </>
                        ) : (
                            <span className='text-3xl font-bold'>{waitMessage()}</span>
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
