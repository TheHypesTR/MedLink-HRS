import React from "react";
import "./LoginRegister.css";


function Forgot() {
    return(
        <div className="katman1-forgot">
        <div className='formbox-forgot'>
            <form action="">
            <h1>Şifre Sıfırlama</h1>
            <div className='input-box'>
                <input type='email' placeholder='E-Mail' required/>
            </div>
                <button type='submit'>Mail Gönder</button>
                <div className='kayit-ol'>
                        <p>Zaten hesabınız var mı?
                            <a href="Login"> Giriş Yapın</a>
                        </p>
                    </div>
                    <div className='kayit-ol'>
                        <p>Hesabınız yok mu?
                            <a href="Register"> Kayıt Olun</a>
                        </p>
                    </div>
                
                </form>
        </div>
    </div>
    );

};

export default Forgot;