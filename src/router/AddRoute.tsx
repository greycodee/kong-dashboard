import { FC, useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Space, Drawer, Form, Input, Row, Select, InputNumber, Tag, Switch, message } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import axios from 'axios';

const { Option } = Select;

interface AddRouteProps {
    open: boolean;
    onClose: any;
    showDrawer: any;
}

export interface Service {
    id: string;
}

export interface RootObject {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    protocols: string[];
    methods: string[];
    hosts: string[];
    paths: string[];
    headers: any;
    https_redirect_status_code: number;
    regex_priority: number;
    strip_path: boolean;
    path_handling: string;
    preserve_host: boolean;
    request_buffering: boolean;
    response_buffering: boolean;
    tags: string[];
    service: Service;
}



const protocols = [{ value: 'grpc' }, { value: 'grpcs' }, { value: 'http' }, { value: 'https' }];
const methods = [{ value: 'GET' }, { value: 'POST' }, { value: 'PUT' }, { value: 'DELETE' }];

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


const AddRoute: FC<AddRouteProps> = (props) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();


    const onFinish = (values: any) => {
        console.log('Before:', values);
        if (values.headers && values.headers.length > 0) {
            let headersMap = new Map<string, string>();
            values.headers = values.headers.map((item: any) => {
                headersMap.set(item.key, item.value);
                // console.log('name:', item.key,"value:", item.value);
            })
            values.headers = Object.fromEntries(headersMap);
        }

        if (values.service) {
            let serviceMap = new Map<string, string>();
            serviceMap.set(values.service.type, values.service.value);
            values.service = Object.fromEntries(serviceMap);
        }

        console.log('Success:', values);

        //请求接口
        axios.post('/api/routes',values).then(res=>{
          console.log(res);
          props.onClose();
          form.resetFields();
          messageApi.open({
            type: 'success',
            content: 'add routes success!',
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
                title="Add Route"
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
                                label="Route Name"
                            >
                                <Input placeholder="Please enter route name" />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="hosts"
                                label="Hosts"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Tags Mode"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="paths"
                                label="Paths"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Tags Mode"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="protocols"
                                label="Protocols"

                            >
                                <Select
                                    mode="multiple"
                                    tagRender={tagRender}
                                    placeholder="Please choose the type"
                                    options={protocols}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="methods"
                                label="Methods"
                            >
                                <Select
                                    mode="multiple"
                                    tagRender={tagRender}
                                    placeholder="Please choose the type"
                                    options={methods}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col className='ant-form-item-label'>
                            <Space>Headers</Space>
                        </Col>

                    </Row>
                    <Form.List name="headers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "key"]}
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                            >
                                                <Input placeholder="Key" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={10}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'value']}
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >

                                                <Input placeholder="Value" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Col>
                                    </Row>
                                ))}
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form.List>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="https_redirect_status_code"
                                label="https_redirect_status_code"
                                initialValue={426}
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <InputNumber placeholder="Please enter user name" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="regex_priority"
                                label="Regex Priority"
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="strip_path"
                                label="Strip Path"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="path_handling"
                                label="Path Handling"
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>


                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="preserve_host"
                                label="Preserve Host"
                                valuePropName="checked"
                                initialValue={false}
                            >
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="request_buffering"
                                label="Request Buffering"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="response_buffering"
                                label="Response Buffering"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
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
                            <Form.Item label="Service">
                                <Input.Group compact>
                               
                                    <Form.Item
                                        name={['service', 'type']}
                                        noStyle
                                        rules={[{ required: true, message: 'Province is required' }]}
                                        initialValue="id"
                                    >
                                        <Select style={{ width: '25%' }} placeholder="Select province">
                                            <Option value="id">ID</Option>
                                            <Option value="name">NAME</Option>
                                        </Select>
                                    </Form.Item>
                                    
                                    <Form.Item
                                        name={['service', 'value']}
                                        noStyle
                                        rules={[{ required: true, message: 'Street is required' }]}
                                    >
                                        <Input style={{ width: '75%' }}  placeholder="Input street" />
                                    </Form.Item>
                                  
                                </Input.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
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

export default AddRoute;