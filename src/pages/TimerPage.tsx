import React from 'react'
import { ButtonGroup, PageWrapper, TButtonItem, Timer } from '../components'
import { useLocalStorage } from '../hooks'

interface TimerPageProps {}

export const TimerPage: React.FC<TimerPageProps> = ({}) => {
    const [set, setSet] = useLocalStorage<number>('set', 0)
    const [exercise, setExercise] = useLocalStorage<number>('exercise', 1)
    const [cooldown, setCooldown] = useLocalStorage<number>('cooldown', cooldownTimeItems[0].value)
    const [setNum, setSetNum] = useLocalStorage<number>('sets', setItems[1].value)

    const incrementSet = () => {
        setSet(set + 1)
        if (set == setNum) {
            setSet(0)
            setExercise(exercise + 1)
        }
    }

    return (
        <PageWrapper>
            <main className='flex h-full w-full max-w-lg flex-col items-center p-8 px-12 sm:mr-[88px]'>
                <div className='w-full text-center text-gray-700'>
                    <h2 className='text-xl font-semibold'>Exercise {exercise}</h2>
                    <h2 className='text-3xl font-bold'>
                        Set {set}/{setNum}
                    </h2>
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
                    className='mt-10 w-full rounded-lg bg-indigo-500 p-1.5 px-2 text-white hover:bg-indigo-600'
                    onClick={() => {
                        setSet(0)
                        setExercise(1)
                    }}
                >
                    Reset
                </button>
            </main>
        </PageWrapper>
    )
}

const cooldownTimeItems: TButtonItem[] = [
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

const setItems: TButtonItem[] = [
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
