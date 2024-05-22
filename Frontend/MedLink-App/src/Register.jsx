import React from 'react';
import './LoginRegister.css';

function Register() {
    
    
    
    
    return (
        <div className="katman1-register">
            <div className='formbox-register'>
                <form action="">
                <h1>Kayıt Ol</h1>
                <div className='input-box'>
                    <input type='text' placeholder='İsim - Soyisim' required/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='TC Kimlik No' required maxLength={11}/>
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='E-Mail' required/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Şifre' required/>
                    </div>
                    <div className='sifreunut-benihatirla'>
                        <label htmlFor=""><input type="checkbox" />Şartlar ve koşulları kabul ediyorum</label>
                    </div>

                    <button type='submit'>Kayıt Ol</button>

                    <div className='kayit-ol'>
                        <p>Zaten kayıtlı mısınız?
                            <a href="Login"> Giriş Yapın</a>
                        </p>
                    </div>
                    </form>
            </div>
        </div>
    );
}

export default Register;