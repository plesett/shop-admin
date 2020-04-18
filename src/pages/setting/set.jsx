import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Input, Divider, Upload, Button, message } from 'antd';
import { Get_Seting_Sys, PUT_Seting_Sys } from '@/services/setting';

const SystemclSet = props => {

  const [setList, setSet] = useState([]);
  useEffect(() => {
    Get_Seting_Sys()
      .then((v) => {
        setSet(v.data.data)
      })
      .catch(err => {
        message.error('服务器错误', 2)
      })
  }, []);
  
  function updataSeting(id, value){
    let d = [];
    let arr = Object.assign(setList, [])
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (i + 1 === id) {
        element.notice = value
        d.push(element)
        continue;
      }
      d.push(element)
    }
  }
  function handleSubForm() {
    PUT_Seting_Sys(setList)
    .then(res => {
      switch (res.data.code) {
        case 200:
          message.success('提交成功')
          break;

        case -1:
          message.error('更新错误')
          break;

        default:
          message.error('服务器错误')
          break;
      }
    })
  }
  return (
    <PageHeaderWrapper>
      <Card>
        <Row type='flex' justify='center'>
          <Col md={12} xs={24} >
            <Divider orientation="center">通知设置</Divider>
            {
              setList.map(v => {
                return (
                  <>
                    <p>{v.ps}</p>
                    <Input
                      size="large"
                      placeholder={v.notice}
                      onChange={(e) => updataSeting(v.id, e.target.value)}
                    />
                  </>
                )
              })
            }
            <Divider orientation="center">联系图片</Divider>
            <Row type='flex' justify='space-between'>
              <Col>
              <p>微信</p>
              <Button
                style={{
                  margin: '20px 0'
                }}
              >上传图片</Button>
              </Col>
              <Col>
                <p>QQ</p>
                <Button
                  style={{
                    margin: '20px 0'
                  }}
                >上传图片</Button>
              </Col>
              <Col>
                <p>物流</p>
                <Button
                  style={{
                    margin: '20px 0'
                  }}
                >上传图片</Button>
              </Col>
            </Row>
            <Button type="primary" style={{ width: "100%" }} onClick={handleSubForm}>确认</Button>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
}

export default SystemclSet;