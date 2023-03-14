import React from 'react'

interface TimerProps {
    time: number
    set: number
    sets: number
    increment: () => void
}

export const Timer: React.FC<TimerProps> = ({ time, set, sets = 1, increment }) => {
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
