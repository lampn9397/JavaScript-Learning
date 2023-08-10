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

interface Props extends ReduxProps { }

interface State {
    storyName: string,
    authorValue: string,
    authorLabel: string,
    storyGenre: string,
    category: string,
    tags: StoryTag["_id"][],
    description: string,
    attachFile: ImageFile
}

export default function CreateStoryPage({
    storyGenres,
    getStoryGenre,
    categories,
    getStoryCategories,
    tags,
    getTags,
    createStory,
    getAuthors,
    authors,
}: Props) {

    const [state, setState] = React.useState<State>({
        storyName: "",
        authorValue: "",
        authorLabel: "",
        storyGenre: "",
        category: "",
        tags: [],
        description: "",
        attachFile: { filePreview: null, fileSend: null },
    })

    React.useEffect(() => {
        getStoryGenre()
        getStoryCategories()
        getTags()
        getAuthors()
    }, [getAuthors, getStoryCategories, getStoryGenre, getTags])

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

    const onClickPostStory = React.useCallback(() => {
        let authorSendingValue = state.authorValue || state.authorLabel

        if (state.authorLabel && !state.authorValue) {
            const author = authorOptions.find((item: any) => item.label === state.authorLabel)

            if (author) {
                authorSendingValue = author.value
            }
        }

        createStory(
            state.storyName,
            authorSendingValue,
            state.storyGenre,
            state.category,
            state.tags,
            state.attachFile.fileSend,
            state.description
        )
    }, [authorOptions, createStory, state.attachFile.fileSend, state.authorLabel, state.authorValue, state.category, state.description, state.storyGenre, state.storyName, state.tags])

    const storyFields = [
        {
            label: "Tên truyện",
            component: <Input className='custom-input' value={state.storyName} onChange={onChangeInput("storyName")} />
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
                    value={state.storyGenre}
                    onChange={onChangeGenreSelect}
                    options={genreOptions}
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
            component: <ImageFilePreview onChange={onChangeImage} className={`${styles.customImageFile}`} />
        },
    ]

    return (
        <ProfileLayout>
            <div className={`${styles.createStoryPageContainer} column`}>
                <div className='header-container flex'>
                    <img alt="" className='writing-book-icon' src={images.writingBook} />
                    <div className='header-label'>Đăng truyện</div>
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
                <Button className='submit-button-container center' type='primary' onClick={onClickPostStory}>Đăng truyện</Button>
            </div >
        </ProfileLayout>
    )

}