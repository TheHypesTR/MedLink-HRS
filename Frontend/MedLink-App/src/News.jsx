import React from "react";
import "./News.css"

function News(){
    return(
        <div id="navbaruzaklas">
<div className="news-item">
        <div className="news-content">
            <h2>Robot beyin nakilleri planlanıyor</h2>
            <p>Almanya Berlin merkezli bir girişim olan BrainBridge, önümüzdeki on yıl içinde kafa nakli ameliyatlarını gerçekleştirmek için robotları kullanmayı planladığını duyurdu.</p>
            <a href="https://www.trthaber.com/haber/saglik/robotlar-10-yil-icinde-kafa-nakli-yapmak-icin-egitiliyor-860085.html" target="_blank" className="news-button">Devamını Oku</a>
        </div>
        <div className="news-image">
            <img src="./src/assets/robot.png" alt="Haber Resmi" />
        </div>
    </div>
    <div className="news-item">
    <div className="news-content">
        <h2>Gençlerde kilo verme ilaçları kullanımı yüzde 600 artış gösterdi</h2>
        <p>ABD’de yapılan çalışmalar, kilo kaybı ve diyabet için gençlere reçete edilen ilaçlarının sayısının sadece üç yılda %594,4 arttığını ortaya koydu.</p>
        <a href="https://www.sozcu.com.tr/genclerde-kilo-verme-ilaclari-kullanimi-yuzde-600-artis-gosterdi-p50337" target="_blank" className="news-button">Devamını Oku</a>
    </div>
    <div className="news-image">
        <img src="./src/assets/fat.png" alt="Haber Resmi" />
    </div>
</div>
<div className="news-item">
        <div className="news-content">
            <h2>Koronavirüs, dünya genelinde beklenen yaşam süresini yaklaşık 2 yıl kısalttı</h2>
            <p>Açıklamada, 2019-2021 yıllarında COVID-19 salgını nedeniyle beklenen yaşam süresinin 1,8 yıl azalarak ortalama 71,4 yıla düştüğü kaydedildi.</p>
            <a href="https://www.trthaber.com/haber/saglik/koronavirus-dunya-genelinde-beklenen-yasam-suresini-yaklasik-2-yil-kisaltti-859748.html" target="_blank" className="news-button">Devamını Oku</a>
        </div>
        <div className="news-image">
            <img src="./src/assets/corona.png" alt="Haber Resmi" />
        </div>
    </div>
    <div className="news-item">
        <div className="news-content">
            <h2>Zaman kısıtlamalı beslenme kalp hastalığından ölme riskini arttırıyor</h2>
            <p>Yeni sunulan bir çalışma, beslenme süresini günde 8 saatle kısıtlayanların kalp-damar hastalıklarından ölüm riskini günde 12-16 saat arası beslenenlerle kıyasladı.</p>
            <a href="https://tr.euronews.com/2024/03/20/aralikli-oruc-zaman-kisitlamali-beslenme-kalp-hastaligindan-olme-riskini-arttiriyor-arasti" target="_blank" className="news-button">Devamını Oku</a>
        </div>
        <div className="news-image">
            <img src="./src/assets/food.png" alt="Haber Resmi" />
        </div>
    </div>
    </div>
    );
}

export default News;