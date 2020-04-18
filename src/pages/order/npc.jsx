import React from 'react';
import { Table, Divider, Tag, Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import dayjs from 'dayjs';
import { Get_Order_NPC } from '@/services/order';

const columns = [
  {
    title: '商品',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '图片',
    dataIndex: 'upfile',
    key: 'upfile',
    render: text => <img src={text} alt="" width={50} />,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: '购买机器人名称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '购买机器人手机模拟',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '是否中奖',
    dataIndex: 'state',
    key: 'state',
    render: (v) => {
      return <span>{v === 1 ? <Tag color="#108ee9">中奖</Tag> : v === 0 ? <Tag color="green">等待开奖</Tag> : <Tag color="red">未中</Tag>}</span>
    },
    sorter: (a, b) => a.state - b.state,
  },
  {
    title: '中奖时间',
    dataIndex: 'end_time',
    key: 'end_time',
    render: (v) => {
      return <span>{dayjs(v).format('YYYY-MM-DD HH:mm')}</span>
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {/* <a>删除</a>
        <Divider type="vertical" /> */}
        <a>删除</a>
      </span>
    ),
  },
];

class OrderUser extends React.Component {

  state = {
    orderList: []
  }

  componentDidMount() {
    Get_Order_NPC()
      .then(v => {
        switch (v.data.code) {
          case 200:
            this.setState({
              orderList: v.data.data
            })
            break;

          default:
            message.error('获取订单失败', 3)
            break;
        }
      })
      .catch(err => {
        message.error('服务器错误', 2)
      })
  }

  render() {
    const { orderList } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          <Table columns={columns} dataSource={orderList} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default OrderUser;