import React ,{useEffect }from 'react'
import logo from '../logo.svg'
import './Payment.css'
import axios from 'axios'
import { connect } from 'react-redux'

function Payment (props) {
  const [planRate, setPlanRate] = React.useState(0)
  function loadScript (src) {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  function getUserPlan(userId) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {};
  
    if (usersData[userId] && usersData[userId].plan) {
 
      return usersData[userId].plan;
    } else {
      return 'Free';
    }
  }
 
  function setUserPlan(userId, plan) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {};

    if (!usersData[userId]) {
      usersData[userId] = { plan };
      usersData[userId].views = 0;
     
    } else {
      usersData[userId].plan = plan;
      usersData[userId].views = 0;
    }
  
    localStorage.setItem('usersData', JSON.stringify(usersData));
  }
  
  async function displayRazorpay (rate) {
    setPlanRate(rate);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const result = await axios.post(`http://localhost:5000/payment/orders/${planRate}`)

    if (!result) {
      alert('Server error. Are you online?')
      return
    }

    const { amount, id: order_id, currency } = result.data

    const options = {
      key: 'rzp_test_UFJanyPy1zHSmZ', 
      amount: amount.toString(),
      currency: currency,
      name: 'Your Blog',
      description: 'Test Transaction',
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        }

        const result = await axios.post(
          'http://localhost:5000/payment/success',
          data
        )
        if(result.data.status === 'success'){
          setUserPlan(props.user.id, planRate);
          setPlanRate(planRate);
        }
         
     
     
      },
      prefill: {
        name: 'Soumya Dey',
        email: 'SoumyaDey@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Soumya Dey Corporate Office'
      },
      theme: {
        color: '#61dafb'
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className='package-div'>
      <div className='payment-plan'>
      <div className={getUserPlan(props.user.id)===1?'plan-user':'plan'}>
          <h2>Free Plan</h2>
          <p className='price'>Rs 0/month</p>
          <ul className='features'>
            <li>1 posts per day @0/month</li>
          </ul>
          <button className='select-button' onClick={()=>{setPlanRate(1);setUserPlan(props.user.id, planRate);}}>
            Select Plan
          </button>
        </div>
        <div className={getUserPlan(props.user.id)===50?'plan-user':'plan'}>
          <h2>Basic Plan</h2>
          <p className='price'>Rs 50/month</p>
          <ul className='features'>
            <li>3 posts per day @50/month</li>
          </ul>
          <button className='select-button' onClick={()=>{displayRazorpay(50)}}>
            Select Plan
          </button>
        </div>
        <div className={getUserPlan(props.user.id)===60?'plan-user':'plan'}>
          <h2>Standard Plan</h2>
          <p className='price'>Rs 60/month</p>
          <ul className='features'>
            <li>5 posts per day @60/month</li>
          </ul>
          <button className='select-button' onClick={()=>{displayRazorpay(60)}}>
            Select Plan
          </button>
        </div>
        <div className={getUserPlan(props.user.id)===70?'plan-user':'plan'}>
          <h2>Premium Plan</h2>
          <p className='price'>Rs 70/month</p>
          <ul className='features'>
            <li>6 posts per day @70/month</li>
          </ul>
          <button className='select-button' onClick={()=>{displayRazorpay(70)}}>
            Select Plan
          </button>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
    return {
        user: state.userDetails
    }
}

export default connect(mapStateToProps,null)(Payment)
