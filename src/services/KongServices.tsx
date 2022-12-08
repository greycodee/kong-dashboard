import React,{useEffect,useRef,useState }from 'react';
import { Space, Table, Tag, Button} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios';
import AddService from './AddService';

const { Column } = Table;
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


const KongServices: React.FC = () => {
    const [servicesList,setServicesList] = useState<ServicesListProps[]>([]);
    const [open, setOpen] = useState(false);
    const [successCount,setSuccessCount] = useState(0);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    const deleteService = (id:string) =>{
      axios.delete(`/api/services/${id}`).then((res)=>{
        console.log("删除成功",res);
        axios.get('/api/services').then(res => {
          setServicesList([...res.data.data]);
          console.log(servicesList)
        }).catch(err => {
            console.log(err);
        })
      }).catch((err)=>{
        console.log(err);
        console.log(err.response.data);
      })
    }


    useEffect(() => {
        axios.get('/api/services').then(res => {
            setServicesList([...res.data.data]);
            console.log(servicesList)
        }).catch(err => {
            console.log(err);
        })
    },[]);

    useEffect(() => {
      axios.get('/api/services').then(res => {
          setServicesList([...res.data.data]);
          console.log("cusssss====",servicesList)
      }).catch(err => {
          console.log(err);
      })
  },[successCount]);
  
    return (
        <>
          <Button type="primary" style={{marginTop:10}} onClick={showDrawer} icon={<PlusOutlined />}>添加Service</Button>
          <Table 
            rowKey="id" 
            dataSource={servicesList} 
            style={{marginTop:10}}>
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Host" dataIndex="host" key="host" />
            <Column 
              title="Protocol" 
              dataIndex="protocol" 
              key="protocol" 
              render={(protocol: string) => (
                <>
                    <Tag color="blue" key={protocol}>
                      {protocol}
                    </Tag>
                </>
              )}
            />
            <Column 
              title="Action" 
              key="action" 
              render={(_: any, record: ServicesListProps) => (
                <Space size="middle">
                  <a onClick={()=>{deleteService(record.id)}}>Delete</a>
                </Space>
              )}
            />   
          </Table>
          <AddService open={open} onClose={onClose} showDrawer={showDrawer} setSuccessCount={setSuccessCount} successCount={successCount}></AddService>
        </>
    );
}

export default KongServices;