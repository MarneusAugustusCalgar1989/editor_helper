import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useAuth } from '../hooks/useAuth';

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
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import '../styles/documentEditor.css';

export default function DocumentEditor() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const ckeref = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const context = useAuth();
  const [editorState, setEditorState] = useState({
    type: '', // Тип запроса, он же заголовок
    adress: '', // получатель запроса
    regal: '', // запрашиваем печати и подписи
    fromWho: '', // сущность, от которой будет исходить запрос
    requestText: '', // текст
    user: context.user, // токен
  });

  const [reqeustConfirmed, setRequestConfirmed] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

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
    initialData: '',
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
  };

  const changeEditor = e => {
    setEditorState({
      ...editorState,
      requestText: ckeref.current.watchdog._editor.data.get(),
    });
  };

  const setRequestType = e => {
    setEditorState({
      ...editorState,
      [e.target.dataset.name]: e.target.textContent,
    });
    document.querySelectorAll('li').forEach(el => {
      if (el.classList.value.includes('active_chose')) {
        el.classList.remove('active_chose');
      }
    });
    e.target.classList.add('active_chose');
  };

  const freeFromInput = e => {
    setEditorState({ ...editorState, [e.target.name]: e.target.value });
    document.querySelectorAll('li').forEach(el => {
      if (el.classList.value.includes('active_chose')) {
        el.classList.remove('active_chose');
      }
    });
  };

  const inputFocused = e => {
    e.target.value !== ''
      ? setEditorState({ ...editorState, type: e.target.value })
      : setEditorState(editorState);
  };

  const sendEditorForm = async e => {
    console.log(editorState);

    await fetch('http://213.59.156.172:3000/send_document_data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editorState),
    }).then(data =>
      data.ok ? setRequestConfirmed(true) : setRequestConfirmed(false)
    );
  };

  return (
    <>
      {reqeustConfirmed && (
        <div
          className='request_recieved'
          onClick={() => {
            setRequestConfirmed(false);
          }}
        >
          <h1>Запрос получен</h1>
          <p>Отправить другой запрос?</p>
        </div>
      )}
      {!reqeustConfirmed && (
        <div className='form_container'>
          <div className='variant_chooser'>
            <ul>
              <li
                data-name='type'
                onClick={e => {
                  setRequestType(e);
                }}
              >
                Запрос информации
              </li>
              <li
                data-name='type'
                onClick={e => {
                  setRequestType(e);
                }}
              >
                Письмо поддержки
              </li>
            </ul>
          </div>
          <div className='free_form_input'>
            <input
              type='text'
              name='type'
              placeholder={context.username + ', укажи свой заголовок'}
              onChange={e => freeFromInput(e)}
              onFocus={e => inputFocused(e)}
            />
            <input
              type='text'
              name='adress'
              placeholder={context.username + ', укажи, кому шлем'}
              onChange={e => freeFromInput(e)}
              onFocus={e => inputFocused(e)}
            />
          </div>
          <div className='main-container'>
            <div
              className='editor-container editor-container_classic-editor'
              ref={editorContainerRef}
            >
              <div className='editor-container__editor'>
                <div ref={editorRef}>
                  {isLayoutReady && !reqeustConfirmed && (
                    <>
                      <CKEditor
                        editor={ClassicEditor}
                        config={editorConfig}
                        ref={ckeref}
                        onChange={changeEditor}
                      />
                      {editorState.requestText !== '' &&
                        editorState.type !== '' &&
                        editorState.adress !== '' && (
                          <button onClick={sendEditorForm}>
                            Отправить текст
                          </button>
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
