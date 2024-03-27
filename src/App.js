import './App.css';
import React, { useState } from 'react';
import { useFormik } from "formik";
import { userSchema } from './validation/userSchema';
import  cardFront from './assets/images/bg-card-front.png';
import  cardBack from './assets/images/bg-card-back.png';
import  cardLogo from './assets/images/card-logo.svg';



const state = {
    cardnumber: "",
    name: "",
    expiresm: "",
    expiresy: "",
    cvc: ""
};

const onSubmit = (values, actions) => {
  console.log(values)
  // email = values.email;
  actions.resetForm();
}



function App() {

  const formik = useFormik({
    initialValues: {
      cardnumber: "",
      name: "Jane Appleseed",
      expiresm: "0",
      expiresy: "0",
      cvc: "000"
    },

    validationSchema: userSchema,
    onSubmit,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    formik.handleChange(e)
  };

  const formatCardNumber = (value) => {
    const sanitizedValue = value.replace(/\D/g, '');

    let formattedValue = '';
    for (let i = 0; i < sanitizedValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += sanitizedValue[i];
    }
    
    console.log(formik.values.cardnumber)
    return formattedValue;
  };

  const formatCardNumber2 = (value) => {

    if (value.length > 19) {
      value = value.slice(0, 19);
    }
    return value;
  };


  return (
    <div className="app">
      <div className="cards">

        <div className='card-upper'>
          <div className='card-1'>
            <img src={cardLogo} alt='card-logo'/>
            <div className='card-upper-content'>
              <p className='card-number'>{formatCardNumber2(formatCardNumber(formik.values.cardnumber)) || "0000 0000 0000 0000"}</p>
              <div className='card-upper-info'>
                <p>{formik.values.name.toUpperCase()}</p>
                <p>{(formik.values.expiresm.length < 2 && ("0" + formik.values.expiresm)) || formik.values.expiresm}  /{formik.values.expiresy}</p>
              </div>
            </div>
          </div>
        </div>


        <div className='card-lower'>
          <div className='card-2'></div>
        </div>

      </div>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='name'><p>Cardholder Name</p></label>
        <input type='text'
        placeholder='e.g. Jane Appleseed'
        id='name'
        name='name'
        onChange={handleInputChange} 
        onBlur={formik.handleBlur}/>
      {(formik.touched.name) && <p className='error'>{formik.errors.name}</p>}

        <label htmlFor='cardnumber'><p>Card Number</p></label>
        <input type='text'
        placeholder='e.g. 1234 5678 9123 000'
        id='cardnumber'
        name='cardnumber'
        onChange={handleInputChange} 
        onBlur={formik.handleBlur}
        value={formatCardNumber(formik.values.cardnumber)}/>
        {(formik.touched.cardnumber) && <p className='error'>{formik.errors.cardnumber}</p>}


      <div className='form-exp-cvv'>
      <div className='form-exp-cvv-field-1'>
      <label htmlFor='expiresm'><p>Exp. Date (MM/YY)</p></label>
        <div className='form-exp-cvv-field-1-inputs'>
        <div className='form-exp-cvv-inputs-1'>
            <input type='text'
            placeholder='MM'
            id='expiresm'
            name='expiresm'
            onChange={handleInputChange} 
            onBlur={formik.handleBlur}/>
          {(formik.touched.expiresm) && <p className='error'>{formik.errors.expiresm}</p>}
        </div>

        <div className='form-exp-cvv-inputs-2'>
            <input type='text'
              placeholder='YY'
              id='expiresy'
              name='expiresy'
              onChange={handleInputChange} 
              onBlur={formik.handleBlur}/>
            {(formik.touched.expiresy) && <p className='error'>{formik.errors.expiresy}</p>}
        </div>

        </div>        
        
      </div>

      <div className='form-exp-cvv-field-2'>
      <label htmlFor='cvc'><p>CVC</p></label>
        <input type='text'
        placeholder='e.g. 123'
        id='cvc'
        name='cvc'
        onChange={handleInputChange} 
        onBlur={formik.handleBlur}/>
        {(formik.touched.cvc) && <p className='error'>{formik.errors.cvc}</p>}
      </div>
      
      </div>
      

        <button type='submit' disabled={formik.isSubmitting}>Confirm</button>

      </form>
    </div>
  );
}

export default App;
