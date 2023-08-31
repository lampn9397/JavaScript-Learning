import React from 'react';

import styles from './style.module.scss'
import { ReduxProps } from '.';
import ProfileLayout from '../../components/ProfileLayout';
import images from '../../assets';
import { AutoComplete, Button, Checkbox, Input, Select, SelectProps } from 'antd';
import { Story, StoryTag } from '@/constants/types/story';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import TextArea from 'antd/es/input/TextArea';
import ImageFilePreview, { ImageFile } from '../../components/ImageFilePreview';
import { Author } from '@/constants/types/author';
import { useParams } from 'react-router-dom';

interface Props extends ReduxProps { }

interface State {
    authorValue: string,
    authorLabel: string,
    category: string,
    tags: StoryTag["_id"][],
    description: string,
    attachFile: ImageFile
}

export default function UpdateMyStoryPage({
    storyGenres,
    getStoryGenre,
    categories,
    getStoryCategories,
    tags,
    getTags,
    createStory,
    updateStory,
    getAuthors,
    authors,
    getstoryDetail,
    detail,
}: Props) {

    const { storyId }: any = useParams();

    const [state, setState] = React.useState<State>({
        authorValue: "",
        authorLabel: "",
        category: "",
        tags: [],
        description: "",
        attachFile: { filePreview: null, fileSend: null },
    })

    React.useEffect(() => {
        if (!detail) return
        setState((prevState) => ({
            ...prevState,
            authorLabel: detail.author.name,
            tags: detail.tags.map((item: StoryTag) => item._id),
            description: detail.description,
            attachFile: { filePreview: detail.poster, fileSend: detail.poster }
        }))
    }, [detail])

    React.useEffect(() => {
        getStoryGenre()
        getStoryCategories()
        getTags()
        getAuthors()
        getstoryDetail({ slug: storyId })
    }, [getAuthors, getStoryCategories, getStoryGenre, getTags, getstoryDetail, storyId])

    React.useEffect(() => {
        if (storyGenres.length && categories.length) {
            setState((prevState) => ({
                ...prevState,
                storyGenre: storyGenres[0]._id,
                category: categories[0]._id,
            }))
        }
    }, [authors, categories, storyGenres])

    const onChangeInput = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const onChangeTextArea = React.useCallback((fieldName: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState) => ({ ...prevState, [fieldName]: event.target.value }))
    }, [])

    const genreOptions: SelectProps['options'] = React.useMemo(() => {
        return storyGenres.map((genre: Story["genre"]) => {
            return {
                label: genre.name,
                value: genre._id,
            }
        });
    }, [storyGenres]);

    const categoryOptions: SelectProps['options'] = React.useMemo(() => {
        return categories.map((category: Story["genre"]) => {
            return {
                label: category.name,
                value: category._id,
            }
        });
    }, [categories]);

    const tagOptions = React.useMemo(() => {
        return tags.map((tag: StoryTag) => {
            return {
                label: tag.name,
                value: tag._id,
            }
        });
    }, [tags]);

    const authorOptions = React.useMemo(() => {
        return authors.map((author: Author) => {
            return {
                label: author.name,
                value: author._id,
            }
        });
    }, [authors]);

    const onChangeGenreSelect = (value: string) => {
        setState((prevState) => ({ ...prevState, storyGenre: value }))
    };

    const onChangeCategorySelect = (value: string) => {
        setState((prevState) => ({ ...prevState, category: value }))
    };

    const onChangeTagCheckBox = (checkedValues: CheckboxValueType[]) => {
        setState((prevState) => ({ ...prevState, tags: checkedValues as State["tags"] }))
    };

    const onChangeImage = React.useCallback((image: ImageFile) => {
        setState((prevState) => ({ ...prevState, attachFile: image }))
    }, [])

    const onSelectAuthor = (value: string, option: any) => {
        setState((prevState) => ({
            ...prevState,
            authorValue: value,
            authorLabel: option.label
        }))
    };

    const onSearchAuthor = (value: string) => {
        setState((prevState) => ({
            ...prevState,
            authorLabel: value,
            authorValue: "",
        }))

        getAuthors(value)
    };

    const onClickUpdateStory = React.useCallback(() => {
        let authorSendingValue = state.authorValue || state.authorLabel

        if (state.authorLabel && !state.authorValue) {
            const author = authorOptions.find((item: any) => item.label === state.authorLabel)

            if (author) {
                authorSendingValue = author.value
            }
        }

        updateStory(
            storyId,
            authorSendingValue,
            state.category,
            state.tags,
            state.attachFile.fileSend,
            state.description
        )
    }, [authorOptions, state.attachFile.fileSend, state.authorLabel, state.authorValue, state.category, state.description, state.tags, storyId, updateStory])

    const storyFields = [
        {
            label: "Tên truyện",
            component: <Input className='custom-input' disabled value={detail?.name} onChange={onChangeInput("storyName")} />
        },
        {
            label: "Tác Giả",
            component: <AutoComplete
                placeholder="Tên tác giả"
                filterOption={false}
                value={state.authorLabel}
                onSelect={onSelectAuthor}
                onSearch={onSearchAuthor}
                options={authorOptions}
                className='custon-select'
            />
        },
        {
            label: "Thể loại",
            component: (
                <Select
                    style={{ width: '100%' }}
                    value={detail?.genre.name}
                    onChange={onChangeGenreSelect}
                    options={genreOptions}
                    disabled
                />
            )
        },
        {
            label: "Danh mục",
            component: (
                <Select
                    style={{ width: '100%' }}
                    value={state.category}
                    onChange={onChangeCategorySelect}
                    options={categoryOptions}
                />
            )
        },
        {
            label: "Danh mục con",
            component: (
                <div className={`${styles.checkboxGroupContainer}`}>
                    <Checkbox.Group
                        options={tagOptions}
                        onChange={onChangeTagCheckBox}
                        value={state.tags}
                    />
                </div>
            )
        },
        {
            label: "Giới thiệu",
            component: <TextArea
                className='custom-input description-input'
                value={state.description}
                onChange={onChangeTextArea("description")}
                maxLength={2000}
                autoSize={{ minRows: 5, maxRows: 5 }}
                showCount
            />
        },
        {
            label: "Bìa truyện",
            component: <ImageFilePreview
                onChange={onChangeImage}
                className={`${styles.customImageFile}`}
                value={state.attachFile.filePreview ?? ""}
            />
        },
    ]

    return (
        <ProfileLayout>
            <div className={`${styles.updateMyStoryPageContainer} column`}>
                <div className='header-container flex'>
                    <img alt="" className='writing-book-icon' src={images.writingBook} />
                    <div className='header-label'>Sửa truyện</div>
                </div>
                <div className='body-container column'>
                    {storyFields.map((item) => (
                        <div className='item-container center' key={item.label} data-label={item.label}>
                            <div className='item-label'>{item.label}</div>
                            <div className='component-container'>
                                {item.component}
                            </div>
                        </div>
                    ))}
                </div>
                <Button className='submit-button-container center' type='primary' onClick={onClickUpdateStory}>Cập nhật</Button>
            </div >
        </ProfileLayout>
    )

}