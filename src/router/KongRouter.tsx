import React,{useEffect,useState }from 'react';
import { Space, Table, Tag,Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios';
import AddRoute from './AddRoute';

const { Column } = Table;


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

const KongRouter: React.FC = () => {
    const [routesList,setroutesList] = useState<RoutesListProps[]>([]);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };



    useEffect(() => {
        axios.get('/api/routes').then(res => {
            setroutesList([...res.data.data]);
        }).catch(err => {
            console.log(err);
        })
    },[]);

    const deleteRoute = (id:string) =>{
      axios.delete(`/api/routes/${id}`).then((res)=>{
        console.log("删除成功",res);
        axios.get('/api/routes').then(res => {
          setroutesList([...res.data.data]);
        }).catch(err => {
            console.log(err);
        })
        
      }).catch((err)=>{
        console.log(err);
        console.log(err.response.data);
      })
    }

    return (
      <>
        <Button type="primary" style={{marginTop:10}} onClick={showDrawer} icon={<PlusOutlined />}>添加Route</Button>
        <Table rowKey="id"  dataSource={routesList} >
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column 
            title="Protocol" 
            dataIndex="protocols" 
            key="protocols" 
            render={(protocols: string[]) => (
              <>
                {protocols.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column 
            title="Paths" 
            dataIndex="paths" 
            key="paths" 
            render={(paths: string[]) => (
              <>
                {paths.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column 
            title="Action" 
            key="action" 
            render={(_: any, record: RoutesListProps) => (
              <Space size="middle">
                <a onClick={()=>{deleteRoute(record.id)}}>Delete</a>
              </Space>
            )}
          />

        </Table>
        <AddRoute open={open} onClose={onClose} showDrawer={showDrawer} ></AddRoute>
      </>
    );
}

export default KongRouter;