import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Select, Button, InputNumber, message, Skeleton } from 'antd';
import { Get_Setting } from '@/services/setting';

const LotterySet  = props => {

  const [pageData, setpageData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [select, setSelect] = useState(3);
  const [changed, setChanged] = useState(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    Get_Setting()
      .then(v => {
        setpageData(v.data.data)
        setChanged(v.data.data.uid)
        setIsloading(false)
      })
      .catch(err => {
        message.error('服务器错误')
      })
  }, []);

  function handleSubFrom() {
    Get_Setting({ state: select, uid: changed })
    .then(v => {
      switch (v.data.code) {
        case 200:
          message.success('修改成功');
          break;
      
        default:
          message.error('未知错误');
          break;
      }
    })
    .catch(err => {
      message.error('服务器错误')
    })
  }
  if (!isloading) {
    return (
      <PageHeaderWrapper>
        <Card>
          <Row type='flex' justify='center'>
            <Col md={12} xs={24}>
              <strong>设置开奖方式:</strong>
              <Select defaultValue={pageData.state === 0 ? '随机中奖' : pageData.state === 1 ? '比例中奖' : pageData.state === 2 ? '机器人中奖' : '默认中奖'} style={{ width: '100%' }} onChange={(value) => setSelect(value)} disabled={disabled}>
                <Option value="3">默认中奖</Option>
                <Option value="0">随机中奖</Option>
                <Option value="1">比例中奖</Option>
                <Option value="2">机器人中奖</Option>
              </Select>
              <p>当前为: 机器人开奖</p>
              <Button style={{
                marginBottom: 20
              }} type='primary' onClick={() => setDisabled(!disabled)}>点击{disabled ? '关闭' : '开启'}保护锁</Button>
              <br />
              <strong>设置必中用户UID:</strong>
              <br />
              <InputNumber placeholder='输入用户UID，默认为空' value={changed} onChange={(value) => setChanged(value)} style={{ width: "100%" }} />
              <Button type='primary' style={{ width: '100%', marginTop: 50 }} onClick={handleSubFrom}>确认</Button>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    )
  } else {
    return (
      <PageHeaderWrapper>
        <Card>
          <Skeleton />
          <Skeleton />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default LotterySet;