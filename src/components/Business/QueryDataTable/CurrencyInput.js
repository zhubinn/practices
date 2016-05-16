/**
 * Created by janeluck on 5/16/16.
 */
import {Input, Select, InputNumber} from 'antd'
const InputGroup = Input.Group;
const Option = Select.Option;

export default class CurrencyInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: [
                '',
                ''
            ]
        };
    }


    handleInputChange = (value)=> {
        //debugger
        this.setState({
            value: [value, this.state.value[1]]
        });
        this.props.onChange([value, this.state.value[1]])
    }

    handleSelectChange = (value)=> {
        this.setState({
            value: [this.state.value[0], value]
        });
        this.props.onChange([this.state.value[0], value])
    }

    render() {

        return (

            <InputGroup >

                <InputNumber value={this.state.value[0]} onChange={this.handleInputChange}/>
                <div className="ant-input-group-wrap">
                    <Select style={{ width: 70 }} onChange={this.handleSelectChange}>

                        <Option value="3">{'='}</Option>
                        <Option value="4">{'≠'}</Option>
                        <Option value="5">{'>'}</Option>
                        <Option value="6">{'>='}</Option>
                        <Option value="7">{'<'}</Option>
                        <Option value="8">{'<='}</Option>

                    </Select>
                </div>
            </InputGroup>

        )
    }
}