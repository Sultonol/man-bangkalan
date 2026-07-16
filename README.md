# MAN Bangkalan - Website Profil Sekolah

Website profil resmi Madrasah Aliyah Negeri (MAN) Bangkalan dengan desain modern, profesional, dan bernuansa Islami.

![MAN Bangkalan](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-Education-orange)

## 🌐 Demo

**Live URL:** https://manbangkalan.bisnisgrowth.my.id

## ✨ Fitur

- **Navbar Responsif** - Navigasi yang menyesuaikan ukuran layar
- **Hero Section** - Slogan "Madrasah Hebat, Bermartabat, dan Berprestasi"
- **Sambutan Kepala Madrasah** - Bagian profile kepemimpinan
- **Profil, Visi & Misi** - Informasi lengkap tentang madrasah
- **Program Unggulan** - Program IPA, IPS, Keagamaan, dan Teknologi
- **Fasilitas** - Daftar fasilitas sekolah
- **Prestasi** - Pencapaian akademik dannon-akademik
- **Berita** - Berita terbaru dengan filter kategori
- **Galeri** - Galeri kegiatan dengan lightbox
- **PPDB** - Formulir pendaftaran online dengan validasi
- **Testimoni** - Ucapan dari siswa dan orang tua
- **Kontak** - Formulir hubungi kami

## 🎨 Desain

- **Warna:** Hijau (#1e7d32), Putih (#ffffff), Emas (#c9a227)
- **Desain:** Modern, clean, dan Islami
- **Responsif:** Mobile, tablet, dan desktop
- **Animasi:** Smooth scrolling dan fade-in transitions

## 🛠️ Teknologi

- HTML5
- CSS3 (vanilla, no framework)
- JavaScript (vanilla)
- Nginx Alpine
- Docker

## 📁 Struktur Project

```
man-bangkalan/
├── index.html              # Halaman utama
├── pages/
│   └── 404.html           # Halaman 404
├── assets/
│   ├── css/
│   │   └── style.css      # Stylesheet utama
│   ├── js/
│   │   └── script.js      # JavaScript interaktif
│   └── images/            # Folder gambar
├── nginx/
│   └── default.conf       # Konfigurasi Nginx
├── Dockerfile             # Konfigurasi Docker
├── compose.yaml           # Docker Compose
└── README.md              # Dokumentasi ini
```

## 🚀 Cara Install & Run

### Menggunakan Docker Compose (Disarankan)

```bash
# Clone atau masuk ke folder project
cd /opt/data/projects/man-bangkalan

# Build dan jalankan container
docker-compose up -d

# Cek status container
docker-compose ps

# Lihat logs
docker-compose logs -f
```

### Menggunakan Docker Langsung

```bash
# Build image
docker build -t man-bangkalan:latest .

# Jalankan container
docker run -d -p 80:80 --name man-bangkalan man-bangkalan:latest
```

### Tanpa Docker (Manual)

```bash
# Install nginx
# Ubuntu/Debian:
sudo apt update
sudo apt install nginx

# Copy file ke folder nginx
sudo cp -r . /var/www/html/man-bangkalan

# Konfigurasi nginx
sudo cp nginx/default.conf /etc/nginx/sites-available/man-bangkalan
sudo ln -s /etc/nginx/sites-available/man-bangkalan /etc/nginx/sites-enabled/

# Restart nginx
sudo systemctl restart nginx
```

## 🔧 Konfigurasi

### Port Default
- **HTTP:** 80

### Endpoint
- `/` - Halaman utama
- `/health` - Health check endpoint
- `/404.html` - Halaman tidak ditemukan

### Environment Variables
Tidak ada environment variable yang diperlukan untuk project ini.

## 📋 Requirements

- Docker >= 20.10
- Docker Compose >= 1.29
-atau-
- Nginx >= 1.18

## 🧪 Testing

### Health Check

```bash
# Via curl
curl http://localhost/health

# Via docker
docker exec man-bangkalan-web wget --spider http://localhost/health
```

### Validasi HTML/CSS/JS

```bash
# Check container running
docker ps | grep man-bangkalan

# Check nginx logs
docker logs man-bangkalan-web
```

## 📝 Catatan

- Data pada website ini menggunakan placeholder. Silakan ganti dengan data resmi MAN Bangkalan.
- Gambar menggunakan placeholder emoji. Ganti dengan foto asli untuk hasil maksimal.
- Untuk forms (PPDB & Kontak), saat ini hanya simulasi. Hubungkan ke backend untuk fungsionalitas penuh.

## 📄 Lisensi

Dikembangkan untuk kepentingan pendidikan. Semua hak cipta milik MAN Bangkalan.

## 📞 Kontak

Untuk pertanyaan atau saran, hubungi kami melalui:
- Email: manbangkalan@edu.id
- Website: manbangkalan.bisnisgrowth.my.id

---

Dibuat dengan ❤️ untuk pendidikan Indonesia