import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const ToastEditor = forwardRef(
    ({ initialContent = '' }, ref) => {
        // 기본값 설정
        const editorRef = useRef();

        useImperativeHandle(ref, () => ({
            getContent: () =>
                editorRef.current
                    .getInstance()
                    .getMarkdown(),
        }));

        return (
            <Editor
                ref={editorRef}
                toolbarItems={[
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    [
                        'ul',
                        'ol',
                        'task',
                        'indent',
                        'outdent',
                    ],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                ]}
                height='500px'
                initialEditType='wysiwyg'
                previewStyle='vertical'
                initialValue={initialContent} // 초기값 설정
                hideModeSwitch='true'
            />
        );
    }
);
ToastEditor.displayName = 'ToastEditor';

export default ToastEditor;
