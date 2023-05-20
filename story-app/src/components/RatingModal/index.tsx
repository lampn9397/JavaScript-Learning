import Modal from 'antd/es/modal/Modal';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './style.module.scss'
import RatingStar from '../RatingStar';

interface Props {
    open: boolean,
    oncancel: () => void,
    onSubmitRating: (rating: number, feedback: string) => void,
    ratingStoryLoading: boolean,
}

export default function RatingModal({ open, oncancel, onSubmitRating, ratingStoryLoading }: Props) {
    const [state, setState] = React.useState({
        storyRating: 0,
        starDescrip: "",
        storyFeedback: "",
    })

    const onMouseEnter = React.useCallback((item: string, index: number) => {
        setState((prevState) => ({ ...prevState, storyRating: index + 1, starDescrip: item }))
    }, [])

    const onChangeFeedback = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, storyFeedback: event.target.value }))
    }, [])

    const onClickFeedbackButt = React.useCallback(() => {
        onSubmitRating(state.storyRating, state.storyFeedback)
    }, [onSubmitRating, state.storyFeedback, state.storyRating])

    React.useEffect(() => {
        if (open) {
            setState((prevState) => ({ ...prevState, storyRating: 0, starDescrip: "", storyFeedback: "" }))
        }
    }, [open])

    return (
        <Modal open={open} onCancel={oncancel} footer={null} className={`${styles.authModalContainer} column`}>
            <div className='rating-title'>Đánh Giá</div>
            <div className='descrip'>Đánh Giá Số Sao</div>
            <div className='star-rating-row flex'>
                <RatingStar
                    size={36}
                    ratingNumber={state.storyRating}
                    onMouseEnter={onMouseEnter}
                    starSpacing={8}
                />
                <div className='star-descrip'>{state.starDescrip}</div>
            </div>
            <div className='descrip'>Đánh Giá Truyện &#40;Không quá 300 chữ&#41;</div>
            <TextArea
                placeholder="Nhập Đánh Giá"
                autoSize={{ minRows: 4, maxRows: 4 }}
                maxLength={300}
                showCount
                onChange={onChangeFeedback}
                value={state.storyFeedback}
            />
            <button
                className='custom-but self-center'
                onClick={onClickFeedbackButt}
                disabled={ratingStoryLoading}
            >
                {ratingStoryLoading && <Spin indicator={<LoadingOutlined style={{ color: "white" }} />} />}
                Gửi Đánh Giá
            </button>
        </Modal>
    )
}