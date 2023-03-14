import React from 'react'

export function useLocalStorage<T>(key: string, initial: T): [T, (t: T) => void] {
    initial = JSON.parse(localStorage.getItem(key) || JSON.stringify({ v: initial })).v

    const [state, setState] = React.useState<T>(initial)

    const setter = (t: T) => {
        localStorage.setItem(key, JSON.stringify({ v: t }))
        setState(t)
    }

    return [state, setter]
}
