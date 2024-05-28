/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./Contact.css"

function Contact(){
    return(
        <div>
            <img src="./src/assets/hospitalbuild.png" alt="building" className="build"/>
            <iframe className="mapstyle" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1327.0056805511142!2d33.551095383859!3d37.71570625727645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2sza!4v1716849172839!5m2!1str!2sza"></iframe>
            <h3 id="yazi1">MedLink'e nasıl gelebilirsiniz?</h3>
            <p id="yazi2">Konya, Karapınar'a konuşlandırılmış olan hastanemize gelebilmek için öncelikle geçmeniz gereken koca bir obruk</p>
            <p id="yazi6">bulunmakta.
            Obruk inşaatına desteklerinden dolayı Talha Saydam'a teşekkür ederiz.</p>
            <p id="yazi3">Adresimiz: Konya, Karapınar. Devamını bilmiyoruz.</p>
            <p id="yazi4">İletişim adresimiz: medlinkiletisim@gmail.com</p>
            <p id="yazi5">İletişim numaramız: 0542 042 42 42</p>
            </div>
    );
}

export default Contact;