import React from "react";

function PasswordForgot() {
    return(
        <div className="katman1-forgot">
            <div className='formbox-forgot'>
                <form>
                    <h1>Şifre Sıfırlama</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Yeni Şifreyi Giriniz' required />
                    </div>
                    <button type='submit'>Sıfırla</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordForgot;