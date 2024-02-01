'use client';

import React from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface Props {
    onChangeText: (text: string) => void
    placeholderText?: string
    className?: string
    isShowCloseIcon: boolean
}

export default function AutoComplete({ onChangeText, placeholderText, className, isShowCloseIcon }: Props) {
    const onChangeInput = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        onChangeText(e.target.value)
    }, [onChangeText])

    return (
        <div className={`flex flex-1 bg-white rounded-md ${className}`}>
            <Input onChange={onChangeInput} placeholder={placeholderText} className="h-full" />
            <div className="flex justify-center items-center px-2">
                <MagnifyingGlassIcon className="w-6" />
            </div>
        </div>
    )
}