import React from 'react'
import Meta from '../component/Meta'
import ChanonCharts from '../component/ChanonCharts';
import { dividerClasses } from "@mui/material"

const graphs =()=>{
    return (
        <div>
            <React.StrictMode>
                <Meta title='Graphs' />
                <h1>Graphs</h1>
                <hr/>
                <ChanonCharts />
            </React.StrictMode>
        </div>
    )
}

export default graphs