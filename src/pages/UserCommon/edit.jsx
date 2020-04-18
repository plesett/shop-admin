import React from 'react';
import { Card, Row, Col, Input, Select, Switch, Button, message, Skeleton, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Get_User_Info, Get_User_update } from '@/services/user';

const { Option } = Select;

class EditCommon extends React.Component {

  state = {
    userInfo: {},
    isloading: true
  }

  componentDidMount() {
    const uid = this.props.match.params.uid;
    Get_User_Info(uid)
      .then(v => {
        switch (v.data.code) {
          case 200:
            this.setState({
              userInfo: v.data.data,
              isloading: false
            })
            break;

          default:
            message.error('获取失败，请刷新页面重试', 3)
            break;
        }
      })
  }

  objectAssign = (objKey, objValue) => {
    // 创建空对象
    const obj = {}
    // 复制state对象
    Object.assign(obj, this.state.userInfo)
    // 修改对应对的 key 值
    obj[objKey] = objValue
    // 改变 state 值
    this.setState({
      userInfo: obj
    })
  }

  handleChangeSelect = (value) => {
    this.objectAssign('username', value)
  }

  onChangeSwitch = (checked) => {
    this.objectAssign('state', checked ? 0 : 1)
  }

  handleSubFrom = () => {
    const { userInfo } = this.state;
    Get_User_update(userInfo)
      .then(v => {
        switch (v.data.code) {
          case 200:
            message.success('更新成功')
            this.props.history.goBack();
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

  render() {
    const { userInfo, isloading } = this.state;
    if (!isloading) {
      return (
        <PageHeaderWrapper>
          <Card>
            <Row type='flex' justify='center'>
              <Col md={12} xs={24}>
                <p>
                  <strong>用户UID: {userInfo.uid} </strong>
                </p>
                <p>用户名称: </p>
                <Input
                  size="large"
                  placeholder="请输入用户名称"
                  value={userInfo.nickname}
                  onChange={(e) => this.objectAssign('nickname', e.target.value)}
                  style={{ width: '100%' }}
                />
                <p>用户余额: </p>
                <InputNumber
                  size="large"
                  placeholder="请输入用户余额"
                  value={userInfo.balance}
                  onChange={(e) => this.objectAssign('balance', e)}
                  style={{ width: '100%' }}
                />
                <p>用户等级: </p>
                <Select defaultValue={userInfo.username} style={{ width: '100%' }} onChange={this.handleChangeSelect}>
                  <Option value="云购小将">云购小将</Option>
                  <Option value="云购中将">云购中将</Option>
                  <Option value="云购大将">云购大将</Option>
                </Select>
                <p>用户状态: </p>
                <Switch defaultChecked={userInfo.state === 0 ? true : false} onChange={this.onChangeSwitch} />
                <Button type="primary" style={{ width: "100%", marginTop: 30 }} onClick={this.handleSubFrom}>确认</Button>
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
}

export default EditCommon;