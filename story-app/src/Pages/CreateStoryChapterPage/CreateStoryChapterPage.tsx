import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import { useParams } from 'react-router-dom';
import ProfileLayout from '../../components/ProfileLayout';
import images from '../../assets';
import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';


interface Props extends ReduxProps { }

interface State {
    numberOrder: number,
    chapterNumber: number,
    bookNumber: number,
    bookName: string,
    chapterName: string,
    content: string,
}

export default function CreateStoryChapterPage({
    createStoryChapter,
    chapterList,
    getChapterList,
    createStoryChapterLoading
}: Props) {

    const { storyId }: any = useParams();

    const maxNumberOrder = React.useMemo(() => {
        if (chapterList.length === 0) return 1

        const numberOrders = chapterList.map((item) => item.numberOrder)

        return Math.max(...numberOrders)
    }, [chapterList])

    const newestChapter = React.useMemo(() => {
        return chapterList.find((item) => item.numberOrder === maxNumberOrder)
    }, [chapterList, maxNumberOrder])

    const [state, setState] = React.useState<State>({
        numberOrder: 1,
        chapterNumber: 1,
        bookNumber: 1,
        bookName: "",
        chapterName: "",
        content: "",
    })

    const bookNameOfExistBookNumber = React.useMemo(() => {
        return chapterList.find((item) => item.bookNumber === +state.bookNumber)
    }, [chapterList, state.bookNumber])

    React.useEffect(() => {
        getChapterList(storyId, "chapterList", 1, 99999)
    }, [getChapterList, storyId])

    React.useEffect(() => {
        if (chapterList.length) {
            setState((prevState) => ({
                ...prevState,
                numberOrder: maxNumberOrder + 1,
                chapterNumber: (newestChapter?.chapterNumber ?? 1) + 1,
                bookNumber: newestChapter?.bookNumber ?? 1,
                bookName: newestChapter?.bookName ?? ""
            }))
        }
    }, [chapterList.length, maxNumberOrder, newestChapter?.bookName, newestChapter?.bookNumber, newestChapter?.chapterNumber])

    React.useEffect(() => {
        setState((prevState) => ({ ...prevState, bookName: bookNameOfExistBookNumber?.bookName ?? "" }))
    }, [bookNameOfExistBookNumber])

    const onChangeInput = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const onChangeTextArea = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const onClickPostChapter = React.useCallback(() => {
        createStoryChapter(
            storyId,
            state.numberOrder,
            state.chapterNumber,
            state.bookNumber,
            state.bookName,
            state.chapterName,
            state.content
        )
    }, [createStoryChapter, state.bookName, state.bookNumber, state.chapterName, state.chapterNumber, state.content, state.numberOrder, storyId])

    const storyChapterFields = [
        {
            label: "STT",
            component: <Input min={1} className='custom-input' type='number' value={state.numberOrder} onChange={onChangeInput("numberOrder")} />
        },
        {
            label: "Chương thứ",
            component: <Input min={1} className='custom-input' type='number' value={state.chapterNumber} onChange={onChangeInput("chapterNumber")} />
        },
        {
            label: "Quyển số",
            component: <Input min={1} className='custom-input' type='number' value={state.bookNumber} onChange={onChangeInput("bookNumber")} />
        },
        {
            label: "Tên quyển",
            component: <Input disabled={!!bookNameOfExistBookNumber} className='custom-input' value={state.bookName} onChange={onChangeInput("bookName")} />
        },//! dau tien convert ve boolean co gia tri nguoc lai,!de thay doi gia tri boolean
        {
            label: "Tên chương",
            component: <Input className='custom-input' value={state.chapterName} onChange={onChangeInput("chapterName")} />
        },
        {
            label: "Nội dung",
            component: <TextArea
                className='custom-input description-input'
                value={state.content}
                onChange={onChangeTextArea("content")}
                autoSize={{ minRows: 5 }}
                showCount
            />
        },
    ]

    return (
        <ProfileLayout>
            <div className={`${styles.createStoryChapterPageContainer} column`}>
                <div className='header-container flex'>
                    <img alt="" className='writing-book-icon' src={images.writingBook} />
                    <div className='header-label'>Đăng Chương</div>
                </div>
                <div className='body-container column'>
                    {storyChapterFields.map((item) => (
                        <div className='item-container center' key={item.label} data-label={item.label}>
                            <div className='item-label'>{item.label}</div>
                            <div className='component-container'>
                                {item.component}
                            </div>
                        </div>
                    ))}
                </div>
                <Button loading={createStoryChapterLoading} className='submit-button-container center' type='primary' onClick={onClickPostChapter}>Đăng chương</Button>
            </div >
        </ProfileLayout>
    )

}