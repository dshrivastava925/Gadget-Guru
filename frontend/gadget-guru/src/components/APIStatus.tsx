import React, { useEffect, useState } from 'react';

const StatusPage = () => {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`);
        if (res.ok) {
          const data = await res.json();
          setMessage(data.message);
          setStatus('ok');
        } else {
          throw new Error('Server returned an error');
        }
      } catch (error) {
        console.error('API status check failed:', error);
        setMessage('Unable to reach API');
        setStatus('error');
      }
    };

    checkStatus();
  }, []);

  const getStatusStyle = () => {
    switch (status) {
      case 'ok':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-center mt-10">
      <h1 className="text-2xl font-bold">API Status</h1>
      <p className={`text-xl font-medium ${getStatusStyle()}`}>
        {status === 'loading' ? 'Checking...' : message}
      </p>
    </div>
  );
};

export default StatusPage;
