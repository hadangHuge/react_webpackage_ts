import React, { Component } from "react";
import {
  Card ,
  Form,
  Button,
  Input,
  message
} from "antd";

class Schema extends Component {
  // _isMounted = false; // 这个变量是用来标志当前组件是否挂载
    state = {
        formData: {
            graph_name: '',    
            edge_schema: [
                {
                    schema_name: '',
                    src: '',
                    dst: '',
                    middles: String[''],
                    attrs: [
                        {
                            name: '',
                            type: '',
                        },
                    ],
                },
            ],
            vertex_schema: [
                {
                    schema_name: '',
                    vertex_name: '',
                    attrs: [
                        {
                            name: '',
                            type: '',
                        },
                    ],
                },
            ],
        },
    };

    onGraphNameChange = (e) => {
        let value = e.target.value
        this.setState((state) => ({
            formData: {
                ...state.formData,
                graph_name: value
            }
        }))
    }

    onEdgeBaseValueChange = (e, index, type) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        console.log(type)
        if(type === 'schema_name') {            
            edge_schema[index].schema_name = value
        } else if(type === 'src') {
            edge_schema[index].src = value
        }
        else if(type === 'dst') {
            edge_schema[index].dst = value
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }

    onOneEdgeMiddleValueChange = (e, perIndex, index) => {
        let value = e.target.value
        const { edge_schema } = this.state.formData
        const { middles } = edge_schema[perIndex]
        middles[index] = value
        edge_schema[perIndex].middles = middles
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema]
            }
        }))
    }

    onOneAttrValueChange = (e, schemaType, perIndex, index, type) => {
        let value = e.target.value
        const { edge_schema, vertex_schema } = this.state.formData
        const { attrs } = (schemaType == 'edge') ? edge_schema[perIndex] : vertex_schema[perIndex]
        if(type = 'name') {
            attrs[index].name = value
        } else {
            attrs[index].type = value
        }
        if(schemaType == 'edge') {    
            edge_schema[perIndex].attrs = attrs
        } else {    
            vertex_schema[perIndex].attrs = attrs
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: [...edge_schema],
                vertex_schema: [...vertex_schema]
            }
        }))

        this.setState((state) => ({
            formData: {
                ...state.formData,
                edge_schema: state.formData.edge_schema.map((item, mapIdnex) => {
                    if(mapIdnex === perIndex) {
                        middles: item.middles.map((row, mIndex) => {
                            mIndex === index ? (row = value) : row
                        })
                    } else {
                        
                    }
                })
            }
        }))
    }

    onVertexBaseValueChange = (e, index, type) => {
        let value = e.target.value
        const { vertex_schema } = this.state.formData
        console.log(type)
        if(type === 'schema_name') {            
            vertex_schema[index].schema_name = value
        } else if(type === 'vertex_name') {
            vertex_schema[index].vertex_name = value
        }
        this.setState((state) => ({
            formData: {
                ...state.formData,
                vertex_schema: [...vertex_schema]
            }
        }))
    }

    addButtonClick = (index, type) => {
        if(type === 'edge') {
            this.setState((state) => ({
                formData: {
                    ...state.formData,
                    edge_schema: [
                        ...state.formData.edge_schema, 
                        {
                            schema_name: '',
                            src: '',
                            dst: '',
                            middles: String[''],
                            attrs: [
                                {
                                    name: '',
                                    type: '',
                                },
                            ],
                        }
                    ]
                }
            }))
        } else {
            this.setState((state) => ({
                formData: {
                    ...state.formData,
                    vertex_schema: [
                        ...state.formData.vertex_schema, 
                        {
                            schema_name: '',
                            vertex_name: '',
                            attrs: [
                                {
                                    name: '',
                                    type: '',
                                },
                            ],
                        }
                    ]
                }
            }))
        }   
    }

    removeButtonClick = (item, index, type) => {
        if(!item.id) {
            this.updateList(index, type)
        } else {
            // 正常情况需要向后端发送请求删除的时候打开，不需要的时候只用if里面的就行了
            // http(xxxxx, item.id).then(res => {
            message.success('This is a success message');
            this.updateList(index, type)
            // })
        }
    }

    updateList(index, type) {
        if(type === 'edge') {
            const { edge_schema } = this.state.formData
            edge_schema.splice(index, 1)
            this.setState((state) => ({
                formData: {
                    ...state.formData,
                    edge_schema: [...edge_schema]
                }
            }))
        } else {
            const { vertex_schema } = this.state.formData
            vertex_schema.splice(index, 1)
                this.setState((state) => ({
                formData: {
                    ...state.formData,
                    vertex_schema: [...vertex_schema]
                }
            }))
        }
    }

    submitButtonClick = () => {
        console.log('submit...')
        const { graph_name } = this.state.formData;
        // 下面需要校验的
        if(!graph_name) {
            return message.warning('请填写标题')
        }
        // 提交数据
    }

    render() {
        return (
            <div className='c-form-demo' style={{
                width: '1000px', minHeight: 200,borderWidth: '1px', borderStyle: 'solid',
                borderColor: '#ececec'
            }}>
                <div style={{ width: '100%', borderColor: '#fff' }}>
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        name="form-demo"
                        autoComplete="off"
                        style={{ width: 300, background: '#fff', padding: 10, margin: 10 }}
                    >
                        <Form.Item
                            label="图名:"
                            name="图名"
                            rules={[{ required: true, message: '请填写图名!' }]}
                        >
                            <Input onChange={ this.onGraphNameChange } />
                        </Form.Item>	
                    </Form>
                </div>
                <div style={{ 
                    height: 200, overflowY: 'auto', width: 1000, boxSizing: 'border-box',display: 'flex', flexWrap: 'wrap',
                    marginLeft: 10
                }}>
                    <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto', marginRight: 10 }}>
                        {
                            this.state.formData.edge_schema.map((item, index) => {
                                return (
                                    <div style={{ 'marginBottom': 10, display: 'flex'}} key={index + 'first'}>
                                        <label style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}>名称：</label> 
                                        <Input
                                            style={{ width: 200, marginRight: 10 }}
                                            onChange={(e) => this.onEdgeBaseValueChange(e, index, 'schema_name')}
                                        />
                                        {/* 一般情况都是最后一个添加，最后一个删除，前一个才能删除 */}
                                        <Button
                                            type="primary" style={{ marginRight: 10 }}
                                            onClick={() => this.addButtonClick(index, 'edge')}
                                            disabled={ index !== this.state.formData.edge_schema.length - 1 }
                                        >添加</Button>
                                        {
                                            (index > 0 && (index === this.state.formData.vertex_schema.length - 1))
                                            && <Button
                                                type="primary"
                                                danger="true"
                                                onClick={() => this.removeButtonClick(item, index, 'edge')}
                                            >删除</Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </Card>
                    <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto'}}>
                        {
                            this.state.formData.vertex_schema.map((item, index) => {
                                return(
                                    <div style={{ 'marginBottom': 10, display: 'flex'}}  key={index + 'last'}>
                                        <label
                                            style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}
                                        >名称：</label> 
                                        <Input
                                            style={{ width: 200, marginRight: 10 }}
                                            onChange={(e) => this.onVertexBaseValueChange(e, index, 'schema_name')}
                                        />
                                        <Button
                                            type="primary"  style={{ marginRight: 10 }}
                                            onClick={ () => this.addButtonClick(index, 'vertex')}
                                            disabled={ index !== this.state.formData.vertex_schema.length - 1 }
                                        >添加</Button>
                                        {
                                            (index > 0 && index === this.state.formData.vertex_schema.length - 1)
                                            && <Button
                                                type="primary"
                                                danger="true"
                                                onClick={() => this.removeButtonClick(item, index, 'vertex')}
                                            >删除</Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </Card>   
                </div>
                {/* center: 居中，left：居左， reght: 居右 */}
                <div style={{ wdith: '100%', textAlign: 'center', marginTop: 10 }}>
                    <Button
                        type="primary"
                        onClick={ this.submitButtonClick }
                    >提交</Button>
                </div>
            </div>
        )
    }
}

export default Schema;