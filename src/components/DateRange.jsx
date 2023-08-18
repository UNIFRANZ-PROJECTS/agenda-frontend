import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './Sample.css';

export const ComponentDateRange = React.memo(({ value, onChange }) => {
    return (
        <DateRangePicker
            locale='es'
            rangeDivider='hasta '
            onChange={onChange}
            value={value}
            clearIcon={null}
        />
    )
})
