import React from 'react';

function ErrorPage({ error }) {
  const styleErr = {
    color: '#f00',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  };
  return (
    <React.Fragment>
      <div style={styleErr}>
        <h1>{error.message}</h1>
        <p style={{ color: '#fff' }}>попробуйте зайти позже</p>
      </div>
    </React.Fragment>
  );
}

export default ErrorPage;
