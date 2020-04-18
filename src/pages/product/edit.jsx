import React from 'react';
import { Upload, Icon, Modal, Card, Row, Col, Input, Select, Switch, Button, Spin, Skeleton, message, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { classifyArr, classifyObj } from './mock';
import style from './edit.less';
import { Get_Product_detaile, Get_Product_update, Get_Product_qiniuToken, Get_Product_create } from '@/services/product';
import { qiniuURL } from '@/services/config';

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EditProduct extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: ''
      }
    ],
    product: {
      status: 1,
      classify: 20000,
      yicanyu: 0
    },
    isloading: true,
    uploadToken: '',
    hash: '',
    imgType: ''
  };

  componentDidMount() {
    const product_id = this.props.match.params.id;
    // 请求token 
    this.fwrchUploadToken()
    if (product_id === 'add') {
      this.setState({
        isloading: false
      })
      return
    };
    Get_Product_detaile(product_id)
      .then(v => {
        const data = v.data.data
        this.setState({
          product: data,
          fileList: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: v.data.data.upfile
            }
          ]
        }, () => {
          this.setState({
            isloading: false
          })
        })
      })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  objectAssign = (objKey, objValue) => {
    // 创建空对象
    const obj = {}
    // 复制state对象
    Object.assign(obj, this.state.product)
    // 修改对应对的 key 值
    obj[objKey] = objValue
    // 改变 state 值
    this.setState({
      product: obj
    })
  }

  handleChange = ({ fileList }) => {
    if (fileList[0] !== undefined) {
      // 获取用户输入的后缀名
      if (fileList[0].response !== undefined && fileList[0].response) {
        const key = fileList[0].response.key;
        this.objectAssign('upfile', `${qiniuURL}${key}`)
        return
      }
    }
    this.setState({ fileList })
  };

  handleChangeSelect = (value) => {
    this.objectAssign('classify', value)
  }

  onChangeSwitch = (checked) => {
    this.objectAssign('status', checked === true ? 0 : 1)
  }

  // 生成上传凭证
  getUploadToken = () => {
    return {
      token: this.state.uploadToken,
      hash: this.state.hash
    }
  }

  // 请求上传凭证
  async fwrchUploadToken() {
    const res = await Get_Product_qiniuToken()
    if (res.data.token) {
      this.setState({
        uploadToken: res.data.token,
        hash: res.data.hash
      })
    }
  }

  handleSubForm = () => {
    const { product } = this.state;
    const id = this.props.match.params.id;
    if (id === 'add') {
      Get_Product_create(product)
      .then(v => {
        switch (v.data.code) {
          case 200:
            message.success(v.data.msg)
            // router.push('/product')
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
    } else {
      // 提交 修改之后对象
      Get_Product_update(product)
        .then(v => {
          switch (v.data.code) {
            case 200:
              message.success(v.data.msg)
              // router.push('/product')
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
  }

  render() {
    const { previewVisible, previewImage, fileList, product, isloading } = this.state;
    const { title, price, status, zongcanyu, yicanyu, classify } = product;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    if (!isloading) {
      return (

        <PageHeaderWrapper>
          <Card>
            <Row type='flex' justify='center'>
              <Col md={12} xs={24} className={style.classify}>
                <p>商品分类: </p>
                <Select
                  defaultValue={classifyObj[classify]}
                  style={{ width: '100%' }}
                  onChange={this.handleChangeSelect}
                >
                  {
                    classifyArr.map(v => {
                      return (
                        <Option value={v.number}>{v.name}</Option>
                      )
                    })
                  }
                </Select>
                <p>商品名称: </p>
                <Input
                  size="large"
                  placeholder="请输入商品名称"
                  value={title}
                  onChange={(e) => this.objectAssign('title', e.target.value)}
                />
                <p>商品价格: </p>
                <InputNumber
                  size="large"
                  placeholder="请输入商品价格"
                  prefix="￥"
                  suffix="RMB"
                  value={price}
                  onChange={(e) => this.objectAssign('price', e)}
                  style={{ width: '100%' }}
                />
                <p>总参与人数: </p>
                <InputNumber
                  size="large"
                  placeholder="请输入商品总参与人数"
                  suffix="人次"
                  value={zongcanyu}
                  onChange={(e) => this.objectAssign('zongcanyu', e)}
                  style={{ width: '100%' }}
                />
                <p>已参与人数: </p>
                <InputNumber
                  size="large"
                  placeholder="请输入商品已参与人数 默认为 0"
                  suffix="人次"
                  value={yicanyu}
                  onChange={(e) => this.objectAssign('yicanyu', e)}
                  style={{ width: '100%' }}
                />
                <p>商品状态: </p>
                <Switch defaultChecked={status === 0 ? true : status === undefined ? true : false} onChange={this.onChangeSwitch} />
                <p style={{ width: '100%' }}>展示图片: </p>
                <div className="clearfix">
                  <Upload
                    name='file'
                    accept='.png, .jpg, .jpeg'
                    action="http://upload.qiniup.com/"
                    data={() => this.getUploadToken()}
                    listType="picture-card"
                    method="POST"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
                <Button type="primary" style={{ width: "100%" }} onClick={this.handleSubForm}>确认</Button>
              </Col>
            </Row>
          </Card>
        </PageHeaderWrapper>
      );
    } else {
      return (
        <Spin tip="Loading..." size='large' spinning={!isloading}>
          <Card>
            <Skeleton />
          </Card>
        </Spin>
      )
    }
  }
}

export default EditProduct;