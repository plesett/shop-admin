import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Tag, message } from 'antd';
import { Get_Order_Pay } from '@/services/order';

const PayList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    Get_Order_Pay()
      .then((v) => {
        setList(v.data.data)
      })
      .catch(err => {
        message.error('服务器错误', 2)
      })
  }, []);
  const columns = [
    {
      title: '充值时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
    },
    {
      title: '充值项目',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: '支付宝订单',
      dataIndex: 'trade_no',
      key: 'trade_no',
    },
    {
      title: '商家订单',
      dataIndex: 'out_trade_no',
      key: 'out_trade_no',
    },
    {
      title: '充值金额',
      dataIndex: 'invoice_amount',
      key: 'invoice_amount',
    },
    {
      title: '状态',
      dataIndex: 'trade_status',
      key: 'trade_status',
      render: text => <div>{text === 'TRADE_SUCCESS' ? <Tag color="#108ee9">充值成功</Tag> : <Tag color="red">充值失败</Tag>}</div>,
    },
    {
      title: '用户',
      dataIndex: 'uid',
      key: 'uid',
      render: text => <a>{text}</a>,
    },
  ]

  return (
    <PageHeaderWrapper>
      <Card>
        <Table columns={columns} dataSource={list} />
      </Card>
    </PageHeaderWrapper>
  )
}

export default PayList;