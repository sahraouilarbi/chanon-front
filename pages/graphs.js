import React from 'react';
import Meta from '../component/Meta';
import ChanonCharts from '../component/ChanonCharts';
import { useRouter } from 'next/router';
import { dividerClasses } from '@mui/material';

const graphs = () => {
  const router = useRouter();
  const { id, labelprolexme, lng } = router.query;

  return (
    <div>
      <React.StrictMode>
        <Meta title="Graphs" />
        <h1>Graph : {labelprolexme}&nbsp;({lng})</h1>
        <hr />
        <ChanonCharts id={id} lng={lng} />
      </React.StrictMode>
    </div>
  );
};

export default graphs;
