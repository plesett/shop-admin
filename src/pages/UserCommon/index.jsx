import React from 'react';
import { Card, Table, Button, Divider, Popconfirm, message, Tag } from 'antd';
import style from './style.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { Get_User_List, Get_User_delete } from '@/services/user';
import { host } from '@/services/config';
import dayjs from 'dayjs';

class UserCommon extends React.Component {

  state = {
    userList: []
  }

  componentDidMount() {
    this.Get_User()
  }

  Get_User = () => {
    Get_User_List()
      .then(v => {
        if (v.data.code === 200) {
          this.setState({
            userList: v.data.data
          })
          return
        }
        message.error('查询错误')
      })
      .catch(err => {
        message.error('服务器错误', 2)
      })
  }

  DeleteUser = (uid) => {
    Get_User_delete(uid)
      .then(v => {
        switch (v.data.code) {
          case 200:
            message.success('删除成功')
            this.Get_User()
            break;

          default:
            message.error('错误')
            break;
        }
      })
  }

  render() {
    const columns = [
      {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '头像',
        dataIndex: 'upfile',
        key: 'upfile',
        render: (v) => {
          return <img src={host + v} alt="" />
        }
      },
      {
        title: '名称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '余额',
        key: 'balance',
        dataIndex: 'balance',
        render: (v) => {
          return <span>{v}.00 元</span>
        },
        sorter: (a, b) => a.balance - b.balance,
      },
      {
        title: '等级',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (v) => {
          return <span>{v === 0 ? <Tag color="#108ee9">正常</Tag> : <Tag color="red">关闭</Tag>}</span>
        },
        sorter: (a, b) => a.state - b.state,
      },
      {
        title: '最后登录时间',
        dataIndex: 'login_time',
        key: 'login_time',
        render: (v) => {
          return <span>{dayjs(v).format('YYYY-MM-DD HH:mm')}</span>
        }
      },
      {
        title: '操作',
        key: '操作',
        render: (text, record) => (
          <div>
            <Link to={`/UserCommon/edit/${text.uid}`}>
              <Button type="primary">编辑</Button>
            </Link>
            <Divider type="vertical" />
            <Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={() => this.DeleteUser(text.uid)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        ),
      },
    ];

    const { userList } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Table columns={columns} dataSource={userList} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default UserCommon;