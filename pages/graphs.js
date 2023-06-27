import Meta from '../component/Meta'
import ChanonCharts from '../component/ChanonCharts';
import { dividerClasses } from "@mui/material"

const graphs =()=>{
    return (
        <div>
            <Meta title='Graphs' />
            <h1>Graphs</h1>
            <hr/>
            <ChanonCharts />
        </div>
    )
}

export default graphs