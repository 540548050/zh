import React,{Component} from 'react';
import style from './index.scss';
import Item from 'components/global/item';
import { Input , Button ,message,Row, Col,Checkbox,Icon,Radio } from 'antd';
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
class Reply extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {title,okText,noText,status} = this.props;
        return (
            <Item title='回复'>
                <div className={style.box}>
                    <div className='form-item'>
                        <Row>
                            <Col span={4}>状态*</Col>
                            <Col offset={1} span={5}>
                                <RadioGroup onChange={(e)=>this.props.getStatus(e.target.value)} value={this.props.status}>
                                    <Radio value={1}>{okText}</Radio>
                                    <Radio value={0}>{noText}</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                        
                    </div>
                    <div className='form-item'>
                        <Row>
                            <Col span={4}>备注</Col>
                            <Col offset={1} span={12}>
                                <TextArea disabled={status == 1 ? true : false} rows={5} value={this.props.detail} onChange={(e)=>this.props.getDetail(e.target.value)} /> 
                            </Col>
                        </Row>
                    </div>
                </div>
            </Item>
            
        )
    }
}
Reply.defaultProps = {
    status:-1,
    detail:'',
    okText:'通过',
    noText:'不通过'
}
export default Reply;