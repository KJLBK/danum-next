import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './ToastEditor.module.css';

const ToastEditor = forwardRef(
    ({ initialContent }, ref) => {
        const editorRef = useRef();

        useImperativeHandle(ref, () => ({
            getContent: () =>
                editorRef.current
                    .getInstance()
                    .getMarkdown(),
        }));

        return (
            <div className={styles.container}>
                <div className={styles.editorWrapper}>
                    <Editor
                        ref={editorRef}
                        toolbarItems={[
                            [
                                'heading',
                                'bold',
                                'italic',
                                'strike',
                            ],
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
                        initialValue='내용을 입력하세요.'
                        hideModeSwitch='true'
                    />
                </div>
            </div>
        );
    }
);

ToastEditor.displayName = 'ToastEditor';

export default ToastEditor;
