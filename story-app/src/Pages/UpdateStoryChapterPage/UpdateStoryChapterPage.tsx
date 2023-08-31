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

export default function UpdateStoryChapterPage({
    updateStoryChapter,
    chapterList,
    getChapterList,
    createStoryChapterLoading,
    getChapterDetail,
    chapterDetail,
}: Props) {

    const { storyId, numberOrder }: any = useParams();

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
        getChapterDetail(storyId, numberOrder)
    }, [getChapterDetail, numberOrder, storyId])

    React.useEffect(() => {
        getChapterList(storyId, "chapterList", 1, 99999)
    }, [getChapterList, storyId])

    React.useEffect(() => {
        if (chapterDetail) {
            setState((prevState) => ({
                ...prevState,
                numberOrder: chapterDetail.numberOrder,
                chapterNumber: chapterDetail.chapterNumber,
                bookNumber: chapterDetail.bookNumber,
                bookName: chapterDetail.bookName,
                chapterName: chapterDetail.name,
                content: chapterDetail.content,
            }))
        }
    }, [chapterDetail])

    React.useEffect(() => {
        setState((prevState) => ({ ...prevState, bookName: bookNameOfExistBookNumber?.bookName ?? "" }))
    }, [bookNameOfExistBookNumber])

    const onChangeInput = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const onChangeTextArea = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const onClickUpdateChapter = React.useCallback(() => {
        updateStoryChapter(
            storyId,
            chapterDetail?._id,
            state.numberOrder,
            state.chapterNumber,
            state.bookNumber,
            state.bookName,
            state.chapterName,
            state.content
        )
    }, [chapterDetail?._id, state.bookName, state.bookNumber, state.chapterName, state.chapterNumber, state.content, state.numberOrder, storyId, updateStoryChapter])

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
            component: <Input className='custom-input' value={state.bookName} onChange={onChangeInput("bookName")} />
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
            <div className={`${styles.updateStoryChapterPageContainer} column`}>
                <div className='header-container flex'>
                    <img alt="" className='writing-book-icon' src={images.writingBook} />
                    <div className='header-label'>Sửa Chương</div>
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
                <Button loading={createStoryChapterLoading} className='submit-button-container center' type='primary' onClick={onClickUpdateChapter}>Cập nhật</Button>
            </div >
        </ProfileLayout>
    )

}