import { FC, useState } from 'react';
import { PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';
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
        console.log('Success:', values);

        // 请求接口
        // axios.post('/api/routes',values).then(res=>{
        //   console.log(res);
        //   props.onClose();
        //   form.resetFields();
        //   messageApi.open({
        //     type: 'success',
        //     content: 'add routes success!',
        //   });
        // }).catch(e=>{
        //   console.log(e);
        //   messageApi.open({
        //     type: 'error',
        //     content: 'add failed!',
        //   });
        // })

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
                                label="hosts"
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
                    <Form.List name="headers">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                {...restField}
                                name={[name,key]}
                                rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                <Input placeholder="First Name" />
                                </Form.Item>
                                :
                                <Form.Item
                                {...restField}
                                name={[name, 'last']}
                                rules={[{ required: true, message: 'Missing last name' }]}
                                >
                                <Input placeholder="Last Name" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                            ))}
                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>

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
                                <InputNumber defaultValue={80} style={{ width: '100%' }} />
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
                                <InputNumber defaultValue={6000} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="write_timeout"
                                label="Write Timeout"
                            >
                                <InputNumber defaultValue={6000} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="read_timeout"
                                label="Read Timeout"
                            >
                                <InputNumber defaultValue={6000} style={{ width: '100%' }} />
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
                                <InputNumber defaultValue={6000} style={{ width: '100%' }} />
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
                                <Input style={{ width: '100%' }} />
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