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

    const testData = [{
        label: 'namfffffffffffffffffffffffff ffffffffffffffffffnamfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffs',
        value: 'nam'
    }, {
        label: 'tri',
        value: 'tri'
    }, {
        label: 'tuan',
        value: 'tuan'
    },]

    const onClickSearch = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpen: true }))
    }, [])

    const onClickClose = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, isOpen: false }))
    }, [])

    const onChangeText = React.useCallback(() => { }, [])

    return (
        <nav className="bg-[#231f20] flex items-center px-2 xs:px-4 gap-3 relative h-24">
            {!state.isOpen && (<Image alt='' className='w-32' src={images.logo} />)}

            <AutoComplete
                data={testData}
                isShowCloseIcon={state.isOpen}
                onChangeText={onChangeText}
                onClickClose={onClickClose}
                className={classNames({
                    "h-10 xs:flex": true,
                    "hidden": !state.isOpen,
                })}
            />

            {!state.isOpen && (<div className="flex-1 xs:hidden" />)}

            {!state.isOpen && (<MagnifyingGlassCircleIcon className="w-8 min-w-8 text-white xs:hidden" onClick={onClickSearch} />)}

            {!state.isOpen && (<UserCircleIcon className="w-8 min-w-8 text-white" />)}

            {!state.isOpen && (<ShoppingCartIcon className="w-8 min-w-8 text-white" />)}
        </nav>
    )
}