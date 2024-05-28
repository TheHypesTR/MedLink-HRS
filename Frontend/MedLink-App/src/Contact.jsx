/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./Contact.css"

function Contact(){
    return(
        <div>
            <img src="./src/assets/hospitalbuild.png" alt="building" className="build"/>
            <iframe className="mapstyle" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1876.6770742191902!2d33.55360474497753!3d37.715404496658664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d76ccb5539e10b%3A0x2d4b3fb609af6eff!2zS2FyYXDEsW5hciwgS29ueWEsIFTDvHJraXll!5e0!3m2!1str!2sza!4v1716864312751!5m2!1str!2sza"></iframe>
            <h3 id="yazi1">MedLink'e nasıl gelebilirsiniz?</h3>
            <p id="yazi2">Konya, Karapınar'a konuşlandırılmış olan hastanemize gelebilmek için öncelikle geçmeniz gereken koca bir</p>
            <p id="yazi6">obruk bulunmakta.
            Obruk inşaatına desteklerinden dolayı Talha Saydam'a teşekkür ederiz.</p>
            <p id="yazi3">Adresimiz: Konya, Karapınar. Devamını bilmiyoruz.</p>
            <p id="yazi4">İletişim adresimiz: medlinkiletisim@gmail.com</p>
            <p id="yazi5">İletişim numaramız: 0542 042 42 42</p>
            </div>
    );
}

export default Contact;