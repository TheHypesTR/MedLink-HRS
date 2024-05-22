import React from 'react';
import './LoginRegister.css';

function Login() {
    return (
        <div className="katman1">
            <div className='formbox-login'>
                <form action="">
                <h1>Giriş Yap</h1>
                <div className='input-box'>
                    <input type='text' placeholder='TC Kimlik No' required/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Şifre' required/>
                    </div>
                    <div className='sifreunut-benihatirla'>
                        <label htmlFor=""><input type="checkbox" />Beni Hatırla</label>
                        <a href='Forgot'> Şifremi Unuttum</a>
                    </div>

                    <button type='submit'>Giriş Yap</button>

                    <div className='kayit-ol'>
                        <p>Hesabınız yok mu?
                            <a href="Register"> Kayıt Olun</a>
                        </p>
                    </div>
                    </form>
            </div>
        </div>
    );
}

export default Login;