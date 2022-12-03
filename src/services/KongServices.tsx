import React,{useEffect,useState }from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

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
    const [pageIndex,setPageIndex] = useState(1);
    


    useEffect(() => {
        axios.get('/api/services').then(res => {
            setServicesList([...servicesList,...res.data.data]);
        }).catch(err => {
            console.log(err);
        })
    },[pageIndex]);
    console.log(servicesList)
    return (
        <Table columns={columns} dataSource={servicesList} />
    );
}

export default KongServices;