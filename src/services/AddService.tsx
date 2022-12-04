import { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, InputNumber, Tag, Switch,message } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import axios from 'axios';

const { Option } = Select;

interface AddServiceProps {
  open: boolean;
  onClose: any;
  showDrawer: any;
}




interface ClientCertificate {
  id: string;
}

interface Service {
  id: string;
  created_at: number;
  updated_at: number;
  name: string;
  retries: number;
  protocol: string;
  host: string;
  port: number;
  path: string;
  connect_timeout: number;
  write_timeout: number;
  read_timeout: number;
  tags: string[];
  client_certificate: ClientCertificate;
  tls_verify: boolean;
  tls_verify_depth?: any;
  ca_certificates: string[];
  enabled: boolean;
}



const options = [{ value: 'grpc' }, { value: 'grpcs' }, { value: 'http' }, { value: 'https' }];
const tags = [{ value: 'user-level' }, { value: 'low-priority' }];
const cas = [{ value: 'asdq11' }, { value: 'asd11ddd' }];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color='red'
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);


const AddService: FC<AddServiceProps> = (props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  

  const onFinish = (values: any) => {
    console.log('Success:', values);

    // 请求接口
    axios.post('/api/services',values).then(res=>{
      console.log(res);
      props.onClose();
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'add service success!',
      });
    }).catch(e=>{
      console.log(e);
      messageApi.open({
        type: 'error',
        content: 'add failed!',
      });
    })
    
  };

  


  return (
    <>
      {contextHolder}
      <Drawer
        title="Add Service"
        width={720}
        onClose={props.onClose}
        open={props.open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form 
          layout="vertical" 
          hideRequiredMark
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="ServiceName"
                
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
              >
                <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="retries"
                label="Retries"
                
              >
                <InputNumber defaultValue={5}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="protocol"
                label="Protocol"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select 
                  placeholder="Please choose the type"
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="host"
                label="Host"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="port"
                label="Port"
                
              >
                <InputNumber defaultValue={80}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="path"
                label="Path"
                
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="connect_timeout"
                label="Connect Timeout"
                
              >
                <InputNumber defaultValue={6000}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="write_timeout"
                label="Write Timeout"
              >
                <InputNumber defaultValue={6000}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="read_timeout"
                label="Read Timeout"
              >
                <InputNumber defaultValue={6000}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tags"
                label="Tags"
                
              >
                <Select 
                  mode="multiple"
                  tagRender={tagRender}
                  placeholder="Please choose the type"
                  options={tags}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="client_certificate"
                label="Client Certificate"
              >
                <InputNumber defaultValue={6000}  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tls_verify"
                label="TLS Verify"
                
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tls_verify_depth"
                label="TLS Verify Depth"
              >
                <Input style={{ width: '100%' }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ca_certificates"
                label="Ca Certificates"
                
              >
                <Select 
                  mode="multiple"
                  tagRender={tagRender}
                  placeholder="Please choose the type"
                  options={cas}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="enabled"
                label="Enabled"
                
              >
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button  type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddService;