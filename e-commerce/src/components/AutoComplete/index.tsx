'use client';

import React from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface DataItem {
    value: string
    label: string
}

interface State {
    isOpenDropDown: boolean
}
interface Props {
    onChangeText: (text: string) => void
    placeholderText?: string
    className?: string
    isShowCloseIcon: boolean
    data: DataItem[]
    onClickClose: () => void
}

export default function AutoComplete({ onChangeText, placeholderText, className, isShowCloseIcon, onClickClose, data }: Props) {
    const [state, setState] = React.useState<State>({
        isOpenDropDown: false
    })

    const onChangeInput = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        onChangeText(e.target.value)
    }, [onChangeText])

    React.useEffect(() => {
        const onClickDocument = (e: Event) => {
            const target = e.target as Element

            if (target.closest('#auto-complete-input') || target.closest('#auto-complete-dropdown')) return

            setState((prevState) => ({ ...prevState, isOpenDropDown: false }))
        }

        document.addEventListener('click', onClickDocument)

        return () => {
            document.removeEventListener('click', onClickDocument)
        }
    }, [])

    React.useEffect(() => {
        setState((prevState) => ({ ...prevState, isOpenDropDown: data.length > 0 }))

    }, [data.length])

    return (
        <div className="flex flex-1 flex-col">
            <div className={`h-11 flex flex-1 bg-white rounded-md max-xs:flex-row-reverse ${className}`}>
                <XMarkIcon className="w-6 flex mx-2 xs:hidden" onClick={onClickClose} />
                <Input id='auto-complete-input' onChange={onChangeInput} placeholder={placeholderText} className="h-11 focus-visible:ring-0 border-l-transparent shadow-none [&>input]:h-11" />
                <MagnifyingGlassIcon className="w-6 mx-2 max-xs:mr-0 xs:flex" />
            </div>
            {state.isOpenDropDown && (
                <div className="relative w-full">
                    <div id='auto-complete-dropdown' className="absolute bg-white top-2 left-0 right-0 z-10 drop-shadow-xl rounded-md padd p-2">
                        {data.map((item) => (
                            <div key={item.value} className="hover:bg-gray-100 cursor-pointer truncate p-2 rounded-md">{item.label}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}