import { useSolidityEditorContext } from '@/context';
import useActivePanelIds from '@/hooks/useActivePanelIds';
import { SolidityEditorRouterType } from '@/typings/interface';
import { monaco as monacoInstance } from '@cyberutopian/components/dist/code-editor/interface';
import { useRouterState } from '@cyberutopian/hooks';
import { FC, Fragment, useRef } from 'react';
import StateEntry from '../state-entry';
import Editor from './editor';
import OptionsBar from './options-bar';
import EditorTabs from './tabs-bar';

const PanelContent: FC<{ width: number; height: number }> = () => {
  const editorRef = useRef<monacoInstance.editor.IStandaloneCodeEditor>(null);

  const { leavePromiseRef } = useSolidityEditorContext();
  const { projectId, queryId, executionId, activeTab } = useActivePanelIds();

  const [state] = useRouterState<SolidityEditorRouterType>();

  console.log(activeTab);
  // // mql内容
  // const { loading: mqlLoading, data } = useCyberFetch['GET/api/v1/query/:projectId/:queryId/content'](
  //   {
  //     url: `/api/v1/query/${projectId}/${queryId}/content`,
  //     req: { executionId },
  //   },
  //   { manual: !projectId || !queryId },
  // );

  const handleSaveMql = async () => {
    // const result = await cyberFetch['POST/api/v1/query/:projectId/:queryId/save']({
    //   url: `/api/v1/query/${projectId}/${queryId}/save`,
    //   req: {
    //     mqlText: editorRef.current?.getValue(),
    //     queryName: activeTab?.fileName,
    //     saveType: 'mql',
    //   },
    // });
    // if (result.code === '200') {
    //   message.success('您的更改已保存成功');
    //   leavePromiseRef.current = true;
    // }
  };

  return (
    <Fragment>
      <EditorTabs />

      <div className="overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
        {/* {mqlLoading ? (
          <Loading />
        ) : ( */}
        <Fragment>
          <OptionsBar editorRef={editorRef} executionId={1} activeTab={activeTab} handleSaveMql={handleSaveMql} />
          <div className="flex justify-start items-start">
            <Editor
              editorRef={editorRef}
              activeTab={activeTab}
              width={500}
              dataSource={state.solidity?.contract}
              handleSaveMql={handleSaveMql}
            />
            <StateEntry clientWidth={300} clientHeight={500} />
          </div>
        </Fragment>
        {/* )} */}
      </div>
    </Fragment>
  );
};

export default PanelContent;
