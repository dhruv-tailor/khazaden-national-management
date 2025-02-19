import React from 'react';
import { Card } from 'primereact/card';
import { SettlementInterface } from './SettlementInterface';

function Settlement({settlement}: {settlement: SettlementInterface}) {
    
  return (
    <>
        <Card title={settlement.name}>

        </Card>
    </>
  );
}

export default Settlement;