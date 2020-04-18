import React, { useEffect, useState } from 'react';
import { Get_Product_List } from '@/services/product'
import {
  Card, Table, Divider, Tag, Button, Modal, Popconfirm, Input, Row, Col, Upload, message, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { classifyObj } from './mock.js';
import Link from 'umi/link';
import { Get_Product_delete } from '@/services/product';

const Product = props => {

  const [list, setList] = useState([]);

  useEffect(() => {
    Get_Product_List(0, 99999)
      .then((v) => {
        setList(v.data.data)
      })
      .catch(err => {
        message.error('服务器错误', 2)
      })
  }, []);

  function EditProduct(value) {
    Get_Product_delete(value)
      .then(v => {
        switch (v.data.code) {
          case 200:
            message.success('删除成功')
            Get_Product_List(0, 99999)
              .then((v) => {
                setList(v.data.data)
              })
            break;

          case -1:
            message.error('删除失败')
            break;

          default:
            break;
        }
      })
  }

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '图片',
      dataIndex: 'upfile',
      key: 'upfile',
      render: (v) => {
        return <img src={v} alt="" width={50} />
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (v) => {
        return <span>{v} 元</span>
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (v) => {
        return <span>{v === 0 ? <Tag color="#108ee9">上架中</Tag> : <Tag color="red">下架中</Tag>}</span>
      },
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: '总参需',
      dataIndex: 'zongcanyu',
      key: 'zongcanyu',
      render: (v) => {
        return <span>{v} 人次</span>
      },
      sorter: (a, b) => a.zongcanyu - b.zongcanyu,
    },
    {
      title: '已参与',
      dataIndex: 'yicanyu',
      key: 'yicanyu',
      render: (v) => {
        return <span>{v} 人次</span>
      },
      sorter: (a, b) => a.yicanyu - b.yicanyu,
    },
    {
      title: '分类',
      dataIndex: 'classify',
      key: 'classify',
      render: (v) => {
        return <span>{classifyObj[v]}</span>
      },
      sorter: (a, b) => a.classify - b.classify,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/product/edit/${text.product_id}`}>
            <Button type="primary">编辑</Button>
          </Link>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={() => EditProduct(text.product_id)}>
            <Button type="danger">删除</Button>
          </Popconfirm>,
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Row type='flex' justify='end'>
          <Col md={12} xs={24}>
            <Link to={`/product/edit/add`}>
              <Button
                type="primary"
                size='middle'
                style={{ width: '30%', float: 'right' }}
              >添加商品</Button>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          tableLayout='aotu'
          columns={columns}
          dataSource={list}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

export default Product;