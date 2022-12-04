import React,{useEffect,useState }from 'react';
import { Space, Table, Tag, Button} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios';
import AddService from './AddService';
interface ServicesListProps {
    created_at: number;
    tls_verify?: any;
    tls_verify_depth?: any;
    path?: any;
    host: string;
    client_certificate?: any;
    retries: number;
    enabled: boolean;
    ca_certificates?: any;
    id: string;
    name: string;
    connect_timeout: number;
    port: number;
    tags?: any;
    read_timeout: number;
    write_timeout: number;
    protocol: string;
    updated_at: number;
}

const columns: ColumnsType<ServicesListProps> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Host',
    dataIndex: 'host',
    key: 'host',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Protocol',
    key: 'protocol',
    dataIndex: 'protocol',
    render: (proto) => <Tag color='GREEN' key={proto}>{proto.toUpperCase()}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


const KongServices: React.FC = () => {
    const [servicesList,setServicesList] = useState<ServicesListProps[]>([]);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };


    useEffect(() => {
        axios.get('/api/services').then(res => {
            setServicesList([...servicesList,...res.data.data]);
            console.log(servicesList)
        }).catch(err => {
            console.log(err);
        })
    },[]);
  
    return (
        <>
          <Button type="primary" style={{marginTop:10}} onClick={showDrawer} icon={<PlusOutlined />}>添加Service</Button>
          <Table columns={columns} dataSource={servicesList} style={{marginTop:10}}/>
          <AddService open={open} onClose={onClose} showDrawer={showDrawer} ></AddService>
        </>
    );
}

export default KongServices;