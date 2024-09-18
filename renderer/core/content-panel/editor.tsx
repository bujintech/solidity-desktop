import { solidity } from '@/config/tokenizer';
import { useSolidityEditorContext } from '@/context';
import { EditorTabItemType } from '@/typings/interface';
import { CodeEditor } from '@cyberutopian/components';
import {
  CodeEditorType,
  MonacoType,
  monaco as monacoInstance,
} from '@cyberutopian/components/dist/code-editor/interface';
import { FC, MutableRefObject, useEffect, useRef } from 'react';

const Editor: FC<{
  editorRef: MutableRefObject<monacoInstance.editor.IStandaloneCodeEditor | undefined | null>;
  dataSource: string | undefined;
  width: number;
  activeTab?: EditorTabItemType;
  handleSaveMql: () => void;
}> = ({ editorRef, activeTab, dataSource, width, handleSaveMql }) => {
  const monacoRef = useRef<MonacoType | null>(null);

  const { leavePromiseRef, cacheRef } = useSolidityEditorContext();

  useEffect(() => {
    if (activeTab?.key) {
      cacheRef.current = {
        ...cacheRef.current,
        [activeTab?.key]: dataSource || '',
      };
    }
  }, [dataSource, activeTab?.key]);

  const beforeMount: CodeEditorType['beforeMount'] = (monaco) => {
    monaco.languages.register({ id: 'solidity' });
    monaco.languages.setMonarchTokensProvider('solidity', solidity as any);
  };

  const onMount: CodeEditorType['onMount'] = (editor, monaco) => {
    editorRef.current = editor as unknown as monacoInstance.editor.IStandaloneCodeEditor;
    monacoRef.current = monaco as unknown as MonacoType;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      handleSaveMql();
    });
  };

  const onChange: CodeEditorType['onChange'] = (value) => {
    leavePromiseRef.current = false;

    if (activeTab?.key) {
      cacheRef.current = {
        ...cacheRef.current,
        [activeTab?.key]: value || '',
      };
    }
  };

  return (
    <CodeEditor
      beforeMount={beforeMount}
      onMount={onMount}
      onChange={onChange}
      language="solidity"
      width={`${width}px`}
      height="calc(100% - 24px)"
      value={dataSource || ''}
      options={{
        readOnly: activeTab?.readOnly,
      }}
    />
  );
};

export default Editor;
