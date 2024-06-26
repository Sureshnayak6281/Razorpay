import React, { useEffect, useState } from 'react';


const RazorpayButton = () => {
  const[name,setname] = useState(['']);
  const[amount,setamount] = useState(['']);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = async () => {
    
    const response = await fetch('http://localhost:3000/payment/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        amount: amount, 
      }),
    });
    const data = await response.json();
    const options = {
      key: 'rzp_test_qjtZWtqrWfPQrH',
      amount: data.amount,
      currency: 'INR',
      name: 'Ipac',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.id,
      callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.contact,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setname('');
    setamount('');
  };

  return (
    <>
      <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
      <input type="text" value={amount} onChange={(e) => setamount(e.target.value)} />
      <button id="rzp-button1" onClick={handleClick}>
      Pay
    </button>
    </>
  );
};

export default RazorpayButton;
