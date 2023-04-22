import React from 'react';

import styles from './style.module.scss'
import { StarFilled, StarOutlined } from '@ant-design/icons';

interface Props {
    ratingNumber: number,
    size?: number,
}

// type IndexType = 1 | 2 | 3 |4 //ket qua cua index as keyof typeof ratingLabel

export default function RatingStar({ ratingNumber, size = 25 }: Props) {
    const starArray = React.useMemo(() => {
        const ratingLabel = {
            0: "Rất Tệ",
            1: "Không Hay Lắm",
            2: "Bình Thường",
            3: "Hay",
            4: "Rất Hay",
        }
        return Array.from({ length: 5 }, (item, index) => ratingLabel[index as keyof typeof ratingLabel]) //ep kieu du lieu cho index ve 1,2,3,4
    }, [])

    const starStyle = React.useMemo((): React.CSSProperties => ({
        fontSize: size
    }), [size])

    return (
        <div className={`${styles.starRatingContainer} flex`}>
            {starArray.map((item, index) => {
                if (ratingNumber >= index + 1)
                    return (
                        <StarFilled className='star-rating' title={item} key={index} style={starStyle} />
                    )

                return (
                    <StarOutlined className='star-rating' title={item} key={index} style={starStyle} />
                )
            })}
        </div>
    )
}
