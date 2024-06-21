import React, { useState } from 'react';
import CreateClient from './CreateClient';

function ClientControl({ navigateHome  }) {
  const [currentOperation, setCurrentOperation] = useState('control')

  const renderOperationPage = () => {
    if (currentOperation === 'create') {
      return <CreateClient goBack={() => setCurrentOperation('control')} />
    }
    return (
      <div>
        <h2> Client Control Page</h2>
        <button onClick={() => setCurrentOperation('create')}>Create Client</button>
        <button onClick={navigateHome}>Go Back to Home</button>
      </div>
    )
  }

  return (
    <div>
      {renderOperationPage()}
    </div>
  );
}
export default ClientControl;