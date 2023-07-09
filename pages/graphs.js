import React from 'react'
import Meta from '../component/Meta'
import ChanonCharts from '../component/ChanonCharts';
import { useRouter } from 'next/router';
import { dividerClasses } from "@mui/material";

const graphs =()=>{
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <React.StrictMode>
                <Meta title='Graphs' />
                <h1>Graphs</h1>
                <hr/>
                <ChanonCharts id={id} />
            </React.StrictMode>
        </div>
    )
}

export default graphs