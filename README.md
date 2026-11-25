# 📰 Doğum Gününün Gazetesi — Vintage Gazete Stüdyosu

Seçtiğiniz herhangi bir tarihte dünyada yaşanan olayları **Wikimedia On This Day REST API** üzerinden çekerek kişiselleştirilebilir, indirilebilir ve yazdırılabilir bir vintage gazete ön sayfasına dönüştüren React web uygulaması.

## ✨ Öne Çıkan Özellikler

- **Kişiselleştirme Stüdyosu:** Doğum günü sahibinin adını, doğum yılını, özel gazete başlığını ve cihazdan seçilen fotoğrafını (*Günün Şeref Konuğu*) gazeteye entegre eder.
- **Akıllı Takvim & Burç Kulakçıkları:** Doğum yılı girildiğinde o tarihin haftanın hangi gününe denk geldiğini, kişinin yaşını ve burcunu otomatik hesaplar; doğum yılında yaşanan olayları özel mühürle işaretler.
- **İnteraktif Manşet Seçimi & Vikipedi Okuyucu:** Herhangi bir alt habere tıklayarak detaylarını okuyabilir, Vikipedi kaynağına gidebilir veya tek tıkla ana manşete taşıyabilirsiniz.
- **Zengin Arşiv Dizgisi:** Öne çıkan olaylar (`selected`), tarihteki gelişmeler (`events`), doğumlar (`births`), anma köşesi (`deaths`), günün özel günleri (`holidays`) ve döneme uygun nostalji ilanları.
- **4 Baskı Stili & Eskitme Efekti:** *1920'ler Sepya*, *Klasik Siyah-Beyaz*, *1960'lar Matbaa* ve *Modern Baskı* temaları ile açılıp kapanabilen gazete katlama izi ve köşe eskitme dokusu.
- **PNG İndirme, A4 Yazdırma (PDF) & Bağlantı Paylaşımı:** `html2canvas` ile yüksek kaliteli PNG çıktısı, `@media print` ile doğrudan A4 yazdırma ve URL parametreleriyle tek tıkla kişiselleştirilmiş baskı paylaşımı.

## 🛠️ Teknoloji Yığını

- **React 18** & **Vite**
- **Tailwind CSS**
- **html2canvas** (PNG dışa aktarma)
- **lucide-react** (İkon seti)
- **Wikimedia REST API** (`https://api.wikimedia.org/feed/v1/wikipedia/{lang}/onthisday/all/{MM}/{DD}`)

## 🚀 Kurulum

```bash
# 1. Projeyi klonlayın
git clone https://github.com/kullanici-adiniz/dogum-gununun-gazetesi.git
cd dogum-gununun-gazetesi

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Sıfırdan bir Vite projesi oluşturuyorsanız gerekli paketler:

```bash
npm install html2canvas lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 📄 Lisans

MIT Lisansı altında sunulmuştur.
