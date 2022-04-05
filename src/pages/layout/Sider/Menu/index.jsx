import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};


const Demo = () => {
	state = {
		formData: {
			title: '',
			type: '',
			listData: []
		}
	}

	const addTitleChange = (e) => {
		let value = e.target.value
		this.setState((state) => ({
			formData: {
				...state.formData,
				title: value
			}
		}))
	}
	const addTypeChange = (e) => {
		let value = e.target.value
		this.setState((state) => ({
			formData: {
				...state.formData,
				type: value
			}
		}))
	}
	const addListInputOne = (e, index) => {
		console(index, e);
	}
	const addListInputTwo = (e, index) => {
		console.log(e, index);
	}
	const addButtonClick = () => {
		console.log('add...')
	}
	const removeButtonClick = (item, index) => {
		console.log('remove...')
	}
	return (
		<div className='c-form-demo'>
			<Form {...layout} name="form-demo">
				<Form.item label="标题：">
					<Input type="text" onChange={this.addTitleChange} />
				</Form.item>
				<Form.item label="类型:" onChange={this.addTypeChange}>
					<Input type="text" />	
				</Form.item>	
			</Form>
			<div className='list-content'>
				{this.state.listData.map((item,index) => {
					return (
						<div>
							<Input onChange={(e) => this.addListInputOne(e, index)} />
							<Input onChange={(e) => this.addListInputTwo(e, index) }/>
							<Button type='primary' block onClick={this.addButtonClick}>添加</Button>
							<Button
							  type='primary'
							  danger
								onClick={() => this.removeButtonClick(item, index)}
							>删除</Button>
						</div>
					)
				})}
			</div>
		</div>
	)
}