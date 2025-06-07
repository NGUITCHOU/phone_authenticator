import  {useState} from 'react';
// import ReactDOM from "react-dom";
import OtpInput from "react-otp-input";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from 'react-icons/cg';
import './App.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { auth } from './firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster} from 'react-hot-toast';

const App = () => {
   const [otp, setOtp] = useState('');
   const [ph, setPh] = useState('');
   const [loading, setLoading] = useState(false);
   const [showOTP, setShowOTP] = useState(false);
   const [user, setUser] = useState(null);
   const [ errorMessage, setErrorMessage] = useState('');

   const onCaptchVerify = () => {
    if (!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier(auth,
            'recaptcha-container',
            {
                'size': 'invisible',
                'callback': (response) => {
                   onSignup();
                },
                'expired-callback': () => {
                    toast.error('Recaptcha expired, please try again.');
                },
            },
             auth
        );
           window.recaptchaVerifier.render().catch(err => {
      console.error('Recaptcha render error:', err);
    });
     }
     // else {
    //     onSignup();
    // }
   };

   const onSignup = () => {
    if(ph === ''){
        setErrorMessage('phone number required')
    }else{
        setLoading(true);
    }
    onCaptchVerify();
     if (!window.recaptchaVerifier) {
        toast.error('Recaptcha not initialized.');
        return;
    }
    setLoading(true);
    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+' + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {     // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult; // SMS sent. Prompt user to type the code from the message, then sign the
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sent successfully!'); 
    }).catch((error) => {     // Error; SMS not sent  
        console.log(error)
         setLoading(false);
      
    });

   }

   const onOTPVerify = () => {
    setLoading(true)
    window.confirmationResult.confirm(otp).then((res)=>{
        console.log(res);
        setUser(res.user);
        setLoading(false);
    })
    .catch(err => {
        console.log(err);
        setLoading(false);
        toast.error('Invalid OTP. Please try again.');
    });
   }


    return (
        <div className='phone'>
            <div id='recaptcha-container'></div>

            <Toaster toastOptions= {{ duration: 4000}}/>
            {
                user ?  <h2>Login Success</h2>: null
       
            }
           <h1> Welcome to phone Authenticator</h1>
           {
            showOTP ? 
         <>
        <div className="key_icon"><BsFillShieldLockFill size={30}/>
        <label htmlFor="ph">
            Enter your OTP
        </label>
        <OtpInput className="otp" 
        value={otp} onChange={setOtp} 
        numInputs={5} otpType='number' 
        disabled={false} autoFocus
        renderInput={(props) => <input {...props} />}  />
        {/* {loading &&<CgSpinner size={20} className='mt-1animate-spin' size={20}></CgSpinner>} */}
       <button onClick={onOTPVerify} className="button">
        <span>Verify OTP</span>
        </button>
        </div>
        </>:
            <>
          <div className="key_icon"><BsTelephoneFill size={30}/>
        <label htmlFor="otp">
            Verify your phone number
        </label>
        <PhoneInput country={"cm"} value={ph} onChange={setPh} />
        {errorMessage}
        {loading &&<CgSpinner className='spinner'  size={50}></CgSpinner>}
       <button onClick={onSignup} className="button">
        <span>Send code via SMS</span>
        </button>
         </div>
        </>
}
        </div>
    );
};

export default App;

// import React, {useState} from 'react';
// // import ReactDOM from "react-dom";
// import OtpInput from "react-otp-input";
// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from 'react-icons/cg';
// import './App.css';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css';
// import { auth } from './firebase';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { toast, Toaster} from 'react-hot-toast';

// const App = () => {
//    const [otp, setOtp] = useState('');
//    const [ph, setPh] = useState('');
//    const [loading, setLoading] = useState(false);
//    const [showOTP, setShowOTP] = useState(false);
//    const [user, setUser] = useState(null);

//    const onCaptchVerify = () => {
//     if (!window.recaptchaVerifier){
//         window.recaptchaVerifier = new RecaptchaVerifier(
//             'recaptcha-container',
//             {
//                 size: 'invisible',
//                 callback: (response) => {
//                    onSignup();
//                 },
//                 'expired-callback': () => {
//                     toast.error('Recaptcha expired, please try again.');
//                 },
//             },
//              auth

//         );
//      }
//    };

//    const onSignup = () => {
//     onCaptchVerify();
//      if (!window.recaptchaVerifier) {
//         toast.error('Recaptcha not initialized.');
//         return;
//     }
//     setLoading(true);
//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = '+' + ph;
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//     .then((confirmationResult) => {     // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult; // SMS sent. Prompt user to type the code from the message, then sign the
//         setLoading(false);
//         setShowOTP(true);
//         toast.success('OTP sent successfully!'); 
//     }).catch((error) => {     // Error; SMS not sent  
//         console.log(error)
//          setLoading(false);
      
//     });

//    }

//    const onOTPVerify = () => {
//     setLoading(true)
//     window.confirmationResult.confirm(otp).then((res)=>{
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//     })
//     .catch(err => {
//         console.log(err);
//         setLoading(false);
//         toast.error('Invalid OTP. Please try again.');
//     });
//    }


//     return (
//         <div className='phone'>
//             <div id='recaptcha-container'></div>

//             <Toaster toastOptions= {{ duration: 4000}}/>
//             {
//                 user ?  <h2>Login Success</h2>: null
       
//             }
//            <h1> Welcome to phone Authenticator</h1>
//            {
//             showOTP ? 
//          <>
//         <div className="key_icon"><BsFillShieldLockFill size={30}/>
//         <label htmlFor="ph">
//             Enter your OTP
//         </label>
//         <OtpInput className="otp" 
//         value={otp} onChange={setOtp} 
//         numInputs={5} otpType='number' 
//         disabled={false} autoFocus
//         renderInput={(props) => <input {...props} />}  />
//         {/* {loading &&<CgSpinner size={20} className='mt-1animate-spin' size={20}></CgSpinner>} */}
//        <button onClick={onOTPVerify} className="button">
//         <span>Verify OTP</span>
//         </button>
//         </div>
//         </>:
//             <>
//           <div className="key_icon"><BsTelephoneFill size={30}/>
//         <label htmlFor="otp">
//             Verify your phone number
//         </label>
//         <PhoneInput country={"cm"} value={ph} onChange={setPh} />
//         {loading &&<CgSpinner className='spinner'  size={50}></CgSpinner>}
//        <button onClick={onSignup} className="button">
//         <span>Send code via SMS</span>
//         </button>
//          </div>
//         </>
// }
//         </div>
//     );
// };

// export default App;