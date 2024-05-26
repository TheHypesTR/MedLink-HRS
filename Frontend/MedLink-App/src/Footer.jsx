import React from "react";
import './Footer.css';

function Footer() {
    return(
        <footer className="footer">
            <img src="./src/assets/logo.png" className="footerlogo" />
                <h3>MedLink</h3>
                <p>Sağlıklı Bir Sen İçin İlk Adım! MedLink Randevu!</p>
                <hr className="hr1" />
                <p className="yazi3">© 2024 MedLink. All Rights Reserved.</p>
                <p className="yazi4">İletişim Mailimiz: medlinkiletisim@gmail.com</p>
                <p className="yazi4">İletişim Numaramız: 0555 555 55 55</p>
        </footer>




    );
};

export default Footer;