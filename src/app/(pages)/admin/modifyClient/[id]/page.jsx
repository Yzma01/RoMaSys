'use client'
import { useParams } from 'react-router-dom';

import ModifySelectedClient from '../../../../components/modify-client/ModifyClient'

function ModifyClient() {
  const { id } = useParams();
  return (
    <div className='min-h-screen w-full max-w-screen-lg mx-auto'>
      <ModifySelectedClient selectedClient={id}/>
    </div>
  );
}

export default ModifyClient;
