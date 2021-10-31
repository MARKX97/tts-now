import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Input, Button, Form, Space
} from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import useAppSetting from '@/hook/appHook';
import { voiceTypeList, IFIcon } from '@/config';
import * as core from '@/utils/core';
import { AliTtsComplete, AliTtsOption } from '@/utils/aliyun/alitts';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const actionButtonStyle = css`
  display: flex;
  justify-content: space-between;
  height: 115px;
  align-items: center;
`;

const singleTxtStyle = {
  height: 'calc(100vh - 80px - 115px - 10px) !important',
  padding: '15px',
  margin: 0,
  overflow: 'hidden',
  marginBottom: '10px',
  lineHeight: '22px !important'
};

const Index = () => {
  const { appSetting, setAppSetting } = useAppSetting();

  // const [aliTtsInstance, setAliTtsInstance] = useState(core.createAliTTS(appSetting.aliSetting));
  // const [singleTtsFile, setSingleTtsFile] = useState<AliTtsComplete>()

  const getSingleTxt = () => (appSetting.customSetting.singleTxt
    && appSetting.customSetting.singleTxt !== null
    && appSetting.customSetting.singleTxt.length > 0
    && voiceTypeList[appSetting.ttsSetting.voiceIndex].text
      !== appSetting.customSetting.singleTxt
    ? appSetting.customSetting.singleTxt
    : voiceTypeList[appSetting.ttsSetting.voiceIndex].text);

  const [singleTxt, setSingleTxt] = useState(getSingleTxt());
  const singleFormRef: any = useRef(null);

  const singleTextChange = (e) => {
    setAppSetting({
      customSetting: Object.assign(appSetting.customSetting, {
        singleTxt: e.target.value
      })
    });
  };

  const playHandle = () => {
    core.checkAliSetting(appSetting.aliSetting, true);
  };

  const exportHandle = () => {
    core.checkAliSetting(appSetting.aliSetting, true);
  };

  useEffect(() => {
    if (
      singleFormRef
      && singleFormRef.current !== null
      && singleFormRef.current !== undefined
    ) {
      singleFormRef.current.setFieldsValue({ singleTxt: getSingleTxt() });
    }
  }, core.ttsUseEffectDeps(appSetting.ttsSetting));

  return (
    <Wrapper>
      <div css={actionButtonStyle}>
        <div css={{ fontSize: '24px', color: '#333' }}>文字转语音</div>
        <div>
          <Space>
            <Button
              type="primary"
              css={{
                backgroundColor: '#748bae',
                border: '0'
              }}
              size="large"
              icon={<IFIcon type="icon-icvoice" />}
              onClick={playHandle}
            >
              立即播放
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ExportOutlined />}
              onClick={exportHandle}
            >
              导出
            </Button>
          </Space>
        </div>
      </div>
      <Form ref={singleFormRef} initialValues={{ singleTxt }}>
        <Form.Item css={{ marginBottom: 0 }} name="singleTxt">
          <Input.TextArea
            css={singleTxtStyle}
            disabled={false}
            placeholder="请输入要合成的文字.."
            onChange={singleTextChange}
            allowClear
          />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Index;
