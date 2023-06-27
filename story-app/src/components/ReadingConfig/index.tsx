import React from 'react';

import styles from './style.module.scss'
import { CommentOutlined, SettingFilled, UnorderedListOutlined } from '@ant-design/icons';
import ChapterListCard from '../ChapterListCard';
import classNames from 'classnames';
import ReadingSetting from '../ReadingSetting';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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

    const theme = useSelector((state: RootState) => state.readingConfig.theme)


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
            content: <ReadingSetting onClickClose={onClickClose} />
        }, {
            id: ConfigItem.Comment,
            icon: <CommentOutlined />,
            content: <div></div>
        },]
    }, [onClickClose])

    return (
        <div className={`${styles.readingConfigContainer}`} style={{ backgroundColor: theme }}>
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
                        style={{ backgroundColor: theme }}
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