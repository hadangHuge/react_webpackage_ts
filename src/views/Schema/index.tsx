import React, { Component } from "react";
import { Button, Table } from 'antd'
import { ColumnProps } from 'antd/es/table';

// 定义列表里面的数据类型, 列表里面需要展示什么数据就是定义什么数据，这里我只暂时展示一个
interface ISchema {
    id?: number,
    graph_name: string,
}

/**
 * @abstract tableData: 表格数据
 * @abstract pageSize： 一页多少条数据
 * @abstract page：第几页
 * @abstract total： 表里总共多少条数据
 * @abstract laoding: 是否在请求数据, 请求时loading 请求完成修改位false
 */
interface IState {
    tableData: ISchema[],
    pageSize: number,
    page: number,
    total: number,
    laoding: boolean
}

class Schema extends Component<any, IState> {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [
                {
                    id: 1,
                    graph_name: '1111'
                }
            ],
            pageSize: 20,
            page: 1,
            total: 0,
            laoding: false
        }
    }
    // 切换分页
    onChange(pagination: any) {
        console.log(pagination.current)
    }

    //页面初始化时统一在这里请求数据
    componentDidMount() {

    }

    
    // 渲染页面
    render(): React.ReactNode {
        return (
            <div>111</div>
            // <Table
            //     loading={this.state.laoding}
            //     dataSource={ this.state.tableData }
            //     rowKey={'id'}
            //     pagination={{
            //         position: 'bottom',
            //         total: this.state.total,
            //         pageSize: this.state.pageSize,
            //         showSizeChanger: false
            //     }}
            //     onChange={ this.onChange }
            // >
            //     <Table.Column
            //         title={'ID'}
            //         dataIndex={'id'}
            //     />
            //     <Table.Column
            //         title={'图名'}
            //         dataIndex={"graph_name"}
            //     />
            //     <Table.Column
            //         title={ '操作' }
            //         render={ (text: any, row: ISchema, index: number ) => {
            //             return (
            //                 <div>
            //                     <Button type="primary">编辑</Button>
            //                     <Button type="danger">删除</Button>
            //                 </div>
            //             ) 
            //         }}
            //     />  
            // </Table>
        )
    }
} 

export default Schema