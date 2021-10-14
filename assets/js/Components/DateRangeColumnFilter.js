import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import DatetimeRangePicker from 'react-datetime-range-picker';
import React, {Component} from "react";

export default class DateRangeColumnFilter extends Component {
    handleSelect(ranges){
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }
    render(){
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
        return (
            <DatetimeRangePicker
                onChange={this.handleSelect}
            />
        )
    }
}