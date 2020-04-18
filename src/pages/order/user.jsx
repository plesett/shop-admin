import React from 'react';
import { Table, Divider, Tag, Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Get_Order_List } from '@/services/order';
import dayjs from 'dayjs';

const columns = [
  {
    title: '订单号',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: '商品ID',
    dataIndex: 'product_id',
    key: 'product_id',
  },
  {
    title: '商品',
    dataIndex: 'product',
    key: 'product',
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
    title: '购买次数',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: '是否中奖',
    dataIndex: 'state',
    key: 'state',
    render: (v) => {
      return <span>{v === 3 ? <Tag color="#108ee9">中奖</Tag> : v === 0 ? <Tag color="green">等待开奖</Tag> : <Tag color="red">未中</Tag>}</span>
    },
    sorter: (a, b) => a.state - b.state,
  },
  {
    title: '购买人UID',
    dataIndex: 'uid',
    key: 'uid',
  },
  {
    title: '购买人名称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '购买人手机',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '支付状态',
    dataIndex: 'pay_state',
    key: 'pay_state',
    render: (v) => {
      return <span>{v === 0 ? <Tag color="#108ee9">已支付</Tag> : <Tag color="red">未支付</Tag>}</span>
    }
  },
  {
    title: '订单创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
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

  state={
    orderList: []
  }

  componentDidMount(){
    Get_Order_List()
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

  render(){
    const { orderList } = this.state;
    return(
      <PageHeaderWrapper>
        <Card>
          <Table columns={columns} dataSource={orderList} />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default OrderUser;