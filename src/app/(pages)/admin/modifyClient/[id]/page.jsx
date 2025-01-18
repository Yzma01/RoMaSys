'use client'
import { useParams } from 'react-router-dom';

import ModifySelectedClient from '../../../../components/modify-client/ModifyClient'

function ModifyClient() {
  const { id } = useParams();
  return (
    <div className='h-[100vh]'>
      <ModifySelectedClient selectedClient={id}/>
    </div>
  );
}

export default ModifyClient;
