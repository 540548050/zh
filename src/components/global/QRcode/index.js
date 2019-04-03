import React,{Component} from 'react';
import style from './index.scss';
import Item from 'components/global/item';
import img from 'images/qrcode.jpg';
class QRcode extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {desc} = this.props;
        return (
            <Item title='二维码'>
                <div className={style.imgContainer}>
                    <img src={img} />
                </div>
                <div className={style.desc}>
                    <span style={{color:'#FF0000'}} >*</span>
                    <span>{desc}</span>
                </div>
            </Item>
            
        )
    }
}
QRcode.defaultProps = {
    desc:"扫描二维码下载测试APP,请体验测试版本,无问题后再通过审核"
}
export default QRcode;