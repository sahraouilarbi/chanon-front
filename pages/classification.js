import { useEffect, useState} from 'react';
import classificationStyle from '../styles/Classification.module.css';
import axios from 'axios';
import Meta from '../component/Meta';
import { dividerClasses } from "@mui/material";

const classification = ()=>{
    const [data, setData] = useState([]);
    var count = 0;
    async function onLoadPage() {
        await axios.get('http://localhost:5000/api/classification').then((response)=>{
            console.log(response);

            const sortedData = response.data.data.sort((a,b) => b.frenq - a.frenq);
            setData(sortedData);
        }).catch((error)=>{
            console.log('### Error : ', error)
        })
    };

    useEffect(
        () => {
            onLoadPage();
        }, []
    );

    return (
        <div>
            <Meta title='Classification' />
            <h1>Classification</h1>
            <hr />

            { 
             
            data.length > 0 ?
               
                        <div>
                            <table className={classificationStyle.table}>
                                <thead>
                                    <tr>
                                        <th className={classificationStyle.th}>N°</th>
                                        <th className={classificationStyle.th}>Name</th>
                                        <th className={classificationStyle.th}>Notoriety</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item)=>(
                                        <tr key={item['_id']}>
                                            <td className={classificationStyle.td}>{count +=1}</td>
                                            <td className={classificationStyle.td}>{item['labelprolexme']}</td>
                                            <td className={classificationStyle.td}>{item['frenq']}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
              
                : <p>Aucune donnée a affiché!</p>
            }
        </div>
    )
}

export default classification