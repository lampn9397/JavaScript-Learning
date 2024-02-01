'use client';

import images from "@/assets";
import Image from "next/image";
import AutoComplete from "../AutoComplete";
import React from "react";
import { MagnifyingGlassCircleIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";

interface State {
    isOpen: boolean
}

interface Props { }

export default function NavBar() {
    const [state, setState] = React.useState<State>({
        isOpen: false
    })

    const onClickSearch = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpen: true }))
    }, [])

    const onChangeText = React.useCallback(() => { }, [])

    return (
        <nav className="bg-[#231f20] flex items-center px-2 xs:px-4 gap-3 relative">
            <Image alt='' className='w-32' src={images.logo} />

            <AutoComplete onChangeText={onChangeText} className={classNames({
                "h-10 xs:flex": true,
                "hidden": !state.isOpen,
                "flex absolute inset-x-3 top-7": state.isOpen
            })} />

            <div className="flex-1 xs:hidden" />

            <MagnifyingGlassCircleIcon className="w-8 min-w-8 text-white xs:hidden" onClick={onClickSearch} />

            <UserCircleIcon className="w-8 min-w-8 text-white" />

            <ShoppingCartIcon className="w-8 min-w-8 text-white" />
        </nav>
    )
}