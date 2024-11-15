import AnimatedPage from '../components/AnimatedPage'
import Wrapper from '../components/Wrapper'

import { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useAuth } from '../hooks/useAuth'
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Undo,
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

import '../styles/documentEditor.css'
import testFetch from './hoc/testFetch'
import envirConfig from './envir_config/envirConfig'

export default function DocumentEditor() {
  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const ckeref = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const context = useAuth()
  useEffect(() => {
    testFetch(context.setServiceON, context)
  }, [context.user, context.serviceON, context])

  useEffect(() => {
    const testFetch = async () => {
      try {
        await fetch(envirConfig.serverURL, {
          method: 'POST',
          body: context?.user || 'default-token',
        }).then((data) => {
          if (data) {
            context.setServiceON(true)
          } else {
            context.setServiceON(false)
          }
        })
      } catch (e) {
        console.log(e.text)
      } finally {
        console.log('Fetched')
      }
    }

    testFetch()
  }, [context])

  const initEditorState = {
    type: '', // Тип запроса, он же заголовок
    adress: '', // получатель запроса
    sign: false, // запрашиваем печати
    stamp: false, // запрашиваем подписи
    fromWho: '', // сущность, от которой будет исходить запрос
    requestText: '', // текст
    user: context.user, // токен
    username: context.username, //имя пользователя
    timeStamp: new Date(),
  }

  const [editorState, setEditorState] = useState(initEditorState)

  const [reqeustConfirmed, setRequestConfirmed] = useState(false)

  useEffect(() => {
    setIsLayoutReady(true)
    if (context.item) {
      setEditorState(context.item)
    }

    return () => setIsLayoutReady(false)
  }, [context.item])

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'sourceEditing',
        'showBlocks',
        'selectAll',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'code',
        '|',
        'link',
        'insertTable',
        'codeBlock',
        'htmlEmbed',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Undo,
    ],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },
    initialData: editorState.requestText,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: `Товарищ, ${context.username}, смело жалуйся сюда! `,
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
  }

  const changeEditor = (e) => {
    setEditorState({
      ...editorState,
      requestText: ckeref.current.watchdog._editor.data.get(),
    })
  }

  const setRequestType = (e) => {
    setEditorState({
      ...editorState,
      [e.target.dataset.name]: e.target.textContent,
    })
    document
      .querySelector('.variant_chooser')
      .querySelectorAll('li')
      .forEach((el) => {
        if (el.classList.value.includes('active_chose')) {
          el.classList.remove('active_chose')
        }
      })
    e.target.classList.add('active_chose')
  }

  const setEntityType = (e) => {
    setEditorState({
      ...editorState,
      [e.target.dataset.name]: e.target.textContent,
    })

    document
      .querySelector('.entity_subselector')
      .querySelectorAll('li')
      .forEach((el) => {
        if (el.classList.value.includes('active_chose')) {
          el.classList.remove('active_chose')
        }
      })
    e.target.classList.add('active_chose')
  }

  const setRegal = (e) => {
    if (e.target.textContent === 'Подпись') {
      setEditorState({ ...editorState, sign: !editorState.sign })
    } else if (e.target.textContent === 'Подпись и печать') {
      setEditorState({ ...editorState, stamp: !editorState.stamp })
    } else {
      alert('Что-то пошло не так!')
    }

    e.target.classList.toggle('active_chose')
  }

  const freeFromInput = (e) => {
    setEditorState({ ...editorState, [e.target.name]: e.target.value })
    document.querySelectorAll('li').forEach((el) => {
      if (el.classList.value.includes('active_chose')) {
        el.classList.remove('active_chose')
      }
    })
  }

  const inputFocused = (e) => {
    e.target.value !== ''
      ? setEditorState({ ...editorState, type: e.target.value })
      : setEditorState(editorState)
  }

  const sendEditorForm = async (e) => {
    console.log(editorState)
    try {
      await fetch(envirConfig.serverURL + '/send_document_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editorState),
      }).then((data) =>
        data.ok ? setRequestConfirmed(true) : setRequestConfirmed(false)
      )
    } catch (e) {
      console.log(e)
    } finally {
      console.log('Data was sended')
    }
  }

  const getDocument = async () => {
    console.log('Trying to catch the file')

    try {
      await fetch(envirConfig.serverURL + '/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: context.username,
          user: context.user,
        }),
      }).then((data) =>
        data?.blob().then((blob) => {
          const fileUrl = window.URL.createObjectURL(blob)
          let alink = document.createElement('a')
          alink.href = fileUrl
          alink.download = editorState.type + ' ' + editorState.adress
          alink.click()
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      console.log('Document was catched')
    }
  }

  return (
    <div className="App">
      <Wrapper>
        <AnimatedPage>
          {reqeustConfirmed && (
            <div className="request_recieved">
              <h1>Запрос получен</h1>
              <div className="document_result_button_wrapper">
                <div
                  className="test_button"
                  onClick={(e) => {
                    setRequestConfirmed(false)
                    setEditorState(initEditorState)
                    getDocument(e)
                  }}
                >
                  Скачать запрос
                </div>

                <div
                  className="test_button"
                  onClick={() => {
                    setRequestConfirmed(false)
                    setEditorState(initEditorState)
                  }}
                >
                  Другой запрос?
                </div>
              </div>
            </div>
          )}
          {!reqeustConfirmed && (
            <div className="form_container">
              <h1 className="module_header">Документодел</h1>
              <div className="for_who">
                <label htmlFor="adress">
                  <p>Кому:</p>
                </label>
                <input
                  type="text"
                  name="adress"
                  placeholder={context.username + ', укажи, кому шлем'}
                  onChange={(e) => freeFromInput(e)}
                  onFocus={(e) => inputFocused(e)}
                  value={editorState.adress}
                />
              </div>
              <div className="variant_chooser">
                <ul>
                  <li
                    data-name="type"
                    onClick={(e) => {
                      setRequestType(e)
                    }}
                    className={
                      editorState.type === 'Запрос информации'
                        ? 'active_chose'
                        : ''
                    }
                  >
                    Запрос информации
                  </li>
                  <li
                    data-name="type"
                    onClick={(e) => {
                      setRequestType(e)
                    }}
                    className={
                      editorState.type === 'Письмо поддержки'
                        ? 'active_chose'
                        : ''
                    }
                  >
                    Письмо поддержки
                  </li>
                </ul>
              </div>
              <div className="free_form_input">
                <label htmlFor="type">
                  <p>Собственный запрос: </p>
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder={context.username + ', укажи свой заголовок'}
                  onChange={(e) => freeFromInput(e)}
                  onFocus={(e) => inputFocused(e)}
                  value={
                    editorState.type !== 'Письмо поддержки' &&
                    editorState.type !== 'Запрос информации'
                      ? editorState.type
                      : ''
                  }
                />
              </div>
              <div className="main-container">
                <div
                  className="editor-container editor-container_classic-editor"
                  ref={editorContainerRef}
                >
                  <div className="editor-container__editor">
                    <div ref={editorRef}>
                      {isLayoutReady && !reqeustConfirmed && (
                        <>
                          <CKEditor
                            editor={ClassicEditor}
                            config={editorConfig}
                            ref={ckeref}
                            onChange={changeEditor}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="entity_selector">
                <p>Выберите сущность: </p>
                <ul className="entity_subselector">
                  <div className="obzor">
                    <li
                      data-name="fromWho"
                      onClick={(e) => setEntityType(e)}
                      className={
                        editorState.fromWho === 'Томский Обзор'
                          ? 'active_chose'
                          : ''
                      }
                    >
                      Томский Обзор
                    </li>
                  </div>
                  <div className="makushin">
                    <li
                      data-name="fromWho"
                      onClick={(e) => setEntityType(e)}
                      className={
                        editorState.fromWho === 'Макушин медиа'
                          ? 'active_chose'
                          : ''
                      }
                    >
                      Макушин медиа
                    </li>
                  </div>
                </ul>
              </div>
              <div className="sign_stamp_selector">
                <p>Определите регалии:</p>
                <ul className="sign_stamp_subselector">
                  <li
                    className={editorState.sign ? 'sign active_chose' : 'sign'}
                    onClick={(e) => setRegal(e)}
                  >
                    Подпись
                  </li>
                  <li
                    className={
                      editorState.stamp ? 'stamp active_chose' : 'stamp'
                    }
                    onClick={(e) => setRegal(e)}
                  >
                    Подпись и печать
                  </li>
                </ul>
              </div>
              {editorState.requestText !== '' &&
                editorState.type !== '' &&
                editorState.adress !== '' && (
                  <div
                    className="test_button"
                    onClick={() => {
                      setEditorState({ ...editorState, timeStamp: Date.now() })

                      sendEditorForm()
                    }}
                  >
                    Отправить запрос
                  </div>
                )}
            </div>
          )}
        </AnimatedPage>
      </Wrapper>
    </div>
  )
}
