import "./AboutUs.css"
import React from "react"

function AboutUs(){
    return(
    <div>
                <h1 id="baslik">Hakkımızda</h1>
        <img src="./src/assets/hospitalcorridor.png" alt="hpcorridor" id="corridor" />
    <div className="kutucukcuk">

        <h2>MedLink Hastanesi</h2>
        <p>MedLink Hastanesi, en yüksek kalitede sağlık hizmeti sunmayı amaçlayan modern bir sağlık kuruluşudur. Kurulduğumuz günden bu yana, hasta memnuniyetini ve güvenliğini en ön planda tutarak, bölgedeki sağlık ihtiyaçlarına en iyi şekilde yanıt vermek için çalışıyoruz.</p>
        <br />
        <h2>Vizyonumuz</h2>
        <p>MedLink Hastanesi olarak vizyonumuz, sağlık alanında mükemmeliyetin simgesi olmak ve yenilikçi yaklaşımlarımızla hastalarımızın sağlıklarına kavuşmasına yardımcı olmaktır. Tıbbi uzmanlığımızı sürekli geliştirerek ve en son teknolojileri kullanarak, sağlık hizmetlerinde lider bir kurum olmayı hedefliyoruz.</p>
        <br />
        <h2>Misyonumuz</h2>
        <p>Misyonumuz, hastalarımıza en güvenilir, etkili ve şefkatli sağlık hizmetini sunmaktır. İnsan odaklı yaklaşımımız ve profesyonel ekibimizle, her bir hastamızın ihtiyaçlarına özel çözümler sunarak, sağlık ve yaşam kalitesini artırmayı amaçlıyoruz.</p>
        <br />
        <h2>Değerlerimiz</h2>
        <ul>
        <li><strong>Kalite: </strong>Sağlık hizmetlerinde yüksek kalite standartlarını koruruz ve sürekli olarak iyileştirme çabası içindeyiz</li>
        <li><strong>Güven: </strong>Hastalarımızın bize olan güvenini pekiştirmek için şeffaf ve dürüst bir hizmet sunarız.</li>
        <li><strong>Empati: </strong>Hastalarımızın duygusal ve fiziksel ihtiyaçlarını anlayarak, onlara destek oluruz.</li>
        <li><strong>Yenilikçilik: </strong>Tıbbi teknolojilerdeki yenilikleri yakından takip eder ve uygularız.</li>
        <li><strong>Ekip Çalışması: </strong>Başarıya giden yolun ekip çalışmasından geçtiğine inanır ve bu doğrultuda hareket ederiz.</li>
        </ul>
        <br />
        <h2>Hizmetlerimiz</h2>
        <p>MedLink Hastanesi, geniş yelpazede sağlık hizmetleri sunmaktadır. Başlıca hizmetlerimiz şunlardır:</p>
        <ul>
        <li><strong>Acil Servis: </strong>7/24 acil tıbbi müdahale hizmeti.</li>
        <li><strong>Poliklinikler: </strong>Çeşitli uzmanlık dallarında poliklinik hizmetleri.</li>
        <li><strong>Ameliyathaneler: </strong>Modern ve donanımlı ameliyathanelerimizde cerrahi müdahaleler.</li>
        <li><strong>Radyoloji ve Görüntüleme: </strong>Yüksek teknoloji radyoloji ve görüntüleme hizmetleri.</li>
        <li><strong>Laboratuvar Hizmetleri: </strong>Hızlı ve güvenilir laboratuvar testleri.</li>
        <li><strong>Fizik Tedavi ve Rehabilitasyon: </strong>Fiziksel sağlığı geri kazandırmaya yönelik tedaviler.</li>
        <li><strong>Doğum ve Yeni Doğan: </strong>Güvenli ve konforlu doğum hizmetleri, yeni doğan bakımı.</li>
        </ul>
        <br />
        <h2>Uzman Kadromuz</h2>
        <p>MedLink Hastanesi, alanında uzman ve deneyimli doktorlar, hemşireler ve sağlık profesyonellerinden oluşan güçlü bir ekibe sahiptir. Ekibimiz, sürekli eğitim ve gelişim programlarıyla bilgi ve becerilerini güncel tutmaktadır. Hasta odaklı yaklaşımımızla, her zaman en iyi sağlık hizmetini sunmayı taahhüt ediyoruz.</p>
        <br />
        <h4 id="merkez">MedLink Hastanesi olarak, sağlığınız için buradayız. Sizleri sağlıklı ve mutlu bir yaşam sürdürmeniz için desteklemeye devam edeceğiz.</h4>
    </div>
    </div>
    );
}

export default AboutUs;