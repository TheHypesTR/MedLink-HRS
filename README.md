<h2 align="center">MedLink - Hastane Randevu Sistemi</h2>
<p align="center">

Sevgili Arkadaşlarım,

Üç kişilik ekibimizle geliştirdiğimiz "MedLink Hastane Randevu Sistemi" projemizi sizlerle paylaşmaktan büyük heyecan duyuyoruz! MERN Stack teknolojisi ile inşa ettiğimiz bu projenin detaylarını ve özelliklerini sizlere tanıtmak isterim.

Ekibimiz:
- Backend: Esat Dündar
- Frontend: Ömer Faruk Yaşar
- UI/UX Design: Ayşe İrem Erkan

MedLink'in Öne Çıkan Özellikleri:
- 🔒 Güvenli Hesap Oluşturma: Gerçek T.C. kimlik numaraları ile random hesap oluşturmanın önüne geçtik.
- 📧 Mail Sistemi Entegrasyonu: Bilgilendirme ve şifre sıfırlama gibi özellikler.
- 🌐 Çok Dilli Hata Denetimleri: Hata mesajlarını hem Türkçe hem İngilizce olarak sunuyoruz.

Kullanıcılar İçin:
- 👥 Kullanıcı Dostu Arayüz: Anlaşılır ve kolay kullanımlı.
- 📰 Güncel Haberler: Sağlık alanındaki en son haberlere erişim.
- 🏥 Detaylı Tıbbi Bilgiler: Tüm doktorları tıbbi birim ve unvanlarına göre görüntüleyebilme.
- 📅 Kolay Randevu Yönetimi: Hızlı ve güvenli randevu alma, yönetme ve takip etme.
- 🌟 Doktor Değerlendirme: Randevulardan sonra, muayeniz için doktor değerlendirme.
- 📍 Hastane Bilgileri: Konum ve ulaşım bilgilerine kolay erişim.

Adminler İçin:
- 🗄 Veritabanı Yönetimi: Tam denetim ve kullanıcı yetkilerini düzenleme.
- 🏢 Poliklinik ve Doktor Yönetimi: Ekleme, düzenleme ve silme işlemleri.
- 📊 Raporlama: Doktor raporlarını görüntüleme ve yönetme.
- 🔍 Randevu Yönetimi: Kullanıcı randevularını görüntüleme ve iptal etme.

Projemizi geliştirirken Waterfall modelini kullandık ve tüm adımları titizlikle takip ettik.

----------------------------------------

<h2 align="center">MedLink - Hospital Appointment System</h2>
<p align="center">

Dear Friends,

We are thrilled to share our latest project with you: the "MedLink Hospital Appointment System," developed by our three-member team! Built with the MERN Stack, we are excited to introduce you to the features and details of our project.

Our Team:
- Backend: Esat Dündar
- Frontend: Ömer Faruk Yaşar
- UI/UX Design: Ayşe İrem Erkan

Key Features of MedLink:
- 🔒 Secure Account Creation: We prevent random account creation by verifying real Turkish ID numbers.
- 📧 Email System Integration: Features like notifications and password reset.
- 🌐 Multi-Language Error Handling: Error messages are provided in both Turkish and English.

For Users:
- 👥 User-Friendly Interface: Clear and easy to use.
- 📰 Latest News: Access to the most recent updates in the healthcare sector.
- 🏥 Detailed Medical Information: View all doctors by medical department and title.
- 📅 Easy Appointment Management: Quick and secure appointment scheduling, management, and tracking.
- 🌟 Doctor Rating: After each appointment, rate doctors for real time inspection.
- 📍 Hospital Information: Easy access to location and transportation details.

For Admins:
- 🗄 Database Management: Full control and user privilege adjustments.
- 🏢 Clinic and Doctor Management: Add, edit, and delete operations.
- 📊 Reporting: View and manage doctor reports.
- 🔍 Appointment Management: View and cancel user appointments.

We used the Waterfall model during development, carefully following each step.

----------------------------------------

<h2 align="center">Setup</h2>
<p align="center">

1. Clone This Repository
    ```sh
    git clone https://github.com/TheHypesTR/MedLink-HRS.git
    ```
    
2. Install Backend NPM Modules
    - Open New Console And Type This Code
      ```sh
      cd Backend
      ```
    - Now You Are Currently In `Medlink-HRS/Backend` Subfolder
    - After Type This Code
      ```sh
      npm i
      ```
    
3. Install Frontend NPM Modules
    - Open New Console And Type This Code
      ```sh
      cd Frontend
      ```
    - After Type This Code
      ```sh
      cd MedLink-App
      ```
    - Now You Are Currently In `Medlink-HRS/Frontend/MedLink-App` Subfolder
    - After Type This Code
      ```sh
      npm i
      ```

4. Create Your `config.mjs` File With `config - Example.mjs` In The `Medlink-HRS/Frontend/MedLink-App` And `Medlink-HRS/Backend` Subfolders

5. Start Backend (Server) In `Medlink-HRS/Backend` Subfolder
    ```sh
    npm run dev
    ```

6. Stop Backend Server And Import `MongoDB` Collections To Your "MongoDB Colletions"
   ```sh
   Ctrl + C
   ```
   
7. After Start Backend (Server) In `Medlink-HRS/Backend` Subfolder
   ```sh
   npm run dev
   ```

9. Start Frotend (Client) In `Medlink-HRS/Frontend/MedLink-App` Subfolder
   ```sh
   npm run dev
   ```
