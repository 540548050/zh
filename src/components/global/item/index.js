import React,{Component} from 'react';
import style from './index.scss';
class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {title} = this.props;
        return (
            <div className={style.box}>
                <div className={style.head}>{title}</div>
                <div className={style.body+' clearfix'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
Item.defaultProps = {
    title:''
}
export default Item;