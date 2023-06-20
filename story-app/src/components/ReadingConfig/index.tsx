import React from 'react';

import styles from './style.module.scss'
import { CommentOutlined, SettingFilled, UnorderedListOutlined } from '@ant-design/icons';
import ChapterListCard from '../ChapterListCard';
import classNames from 'classnames';

interface Props {
}

interface State {
    selectedConfigItem: null | ConfigItem
}

enum ConfigItem {
    ListChapter = "ListChapter",
    Setting = "Setting",
    Comment = "Comment",
}

export default function ReadingConfig() {
    const [state, setState] = React.useState<State>({
        selectedConfigItem: null,
    })

    const onClickConfigItem = React.useCallback((item: typeof readingConfigs[0]) => () => {
        setState((prevState) => {
            const selectedConfigItem = prevState.selectedConfigItem === item.id ? null : item.id

            return { ...prevState, selectedConfigItem }
        })
    }, [])

    const onClickClose = React.useCallback(() => {
        setState((prevState) => ({ ...prevState, selectedConfigItem: null }))
    }, [])

    const readingConfigs = React.useMemo(() => {
        return [{
            id: ConfigItem.ListChapter,
            icon: <UnorderedListOutlined />,
            content: <ChapterListCard onClickClose={onClickClose} />
        }, {
            id: ConfigItem.Setting,
            icon: <SettingFilled />,
            content: <div></div>
        }, {
            id: ConfigItem.Comment,
            icon: <CommentOutlined />,
            content: <div></div>
        },]
    }, [])

    return (
        <div className={`${styles.readingConfigContainer}`}>
            {readingConfigs.map((item) => {
                const selected = state.selectedConfigItem === item.id

                return (
                    <div
                        key={item.id}
                        className={classNames({
                            "list-chapter": true,
                            "center": true,
                            "readingConfigItem": true,
                            "selectedReadingConfigItem": selected,
                        })}
                    >
                        <div className='icon-container center' onClick={onClickConfigItem(item)}>
                            {item.icon}
                        </div>
                        {selected && item.content}
                    </div>
                )
            })}
        </div>
    )
}