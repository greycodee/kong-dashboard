import React,{useEffect,useState }from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';


interface Service {
    id: string;
}

interface RoutesListProps {
    created_at: number;
    destinations?: any;
    service: Service;
    updated_at: number;
    headers?: any;
    regex_priority: number;
    path_handling: string;
    paths: string[];
    hosts?: any;
    sources?: any;
    strip_path: boolean;
    snis?: any;
    id: string;
    request_buffering: boolean;
    response_buffering: boolean;
    methods?: any;
    tags?: any;
    name: string;
    https_redirect_status_code: number;
    preserve_host: boolean;
    protocols: string[];
}


const columns: ColumnsType<RoutesListProps> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
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
      render: (_, { protocols }) => (
        <>
          {protocols.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Paths',
      key: 'paths',
      dataIndex: 'paths',
      render: (_, { paths }) => (
        <>
          {paths.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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



const KongRouter: React.FC = () => {
    const [routesList,setroutesList] = useState<RoutesListProps[]>([]);
    const [pageIndex,setPageIndex] = useState(1);

    useEffect(() => {
        axios.get('/api/routes').then(res => {
            setroutesList([...routesList,...res.data.data]);
        }).catch(err => {
            console.log(err);
        })
    },[pageIndex]);
    console.log(routesList)
    return (
        <Table columns={columns} dataSource={routesList} />
    );
}

export default KongRouter;