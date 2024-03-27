import * as yup from 'yup'
// import valid from 'card-validator'; 


export const userSchema = yup.object().shape({
    cardnumber: yup.string()
    .matches(/^\d{16}$/, 'Wrong format')
    .required(),

    name: yup.string().min(1).max(20).required("Please enter your name"),

    expiresm: yup.number().typeError('Must be a number')
    .max(12, "Must be less than 12")
    .min(1, "Must be greater than 0")
    .required("Enter that number bro"),

    expiresy:  yup.number().typeError('Must be a number')
    .max(94, "Dude this could not be true")
    .min(1, "Wtf bro try again")
    .required("Enter that number bro"),
    
    cvc: yup.string().matches(/^\d{3}$/, 'Cmon 3 digits is it so hard').required(),
})