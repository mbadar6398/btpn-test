## BTPN FRONT END TEST

Proyek ini merupakan bagian dari test yang diberikan oleh team BTPN. untuk melihat soal no 1 dan no 2, dapat melihat jawaban di bawah ini atau dapat melihat pada file tasks.js di dalam root project ini.

### Soal No #1 :

Tulislah satu program yang mencetak bilangan ganjil antara 0 dan 100 yang bukan kelipatan 3 dan juga bukan kelipatan 5

Jawaban :

```
const counter = () => {
  for (let index = 0; index < 101; index++) {
    if (index % 2 && index % 3 !== 0 && index % 5) {
      console.log(index);
    }
  }
};

counter();
```

### Soal No #2 :

Seekor siput berada di dasar sumur sedalam 20 meter.
Setiap siang siput ini naik 5 meter, tetapi saat malam akan merosot 4 meter.
Berapa hari yang diperlukan siput ini untuk keluar dari sumur?

Jawaban :

```
let jarak = 0;
let hari = 0;

const siang = () => {
  jarak = jarak + 5;
};

const malam = () => {
  jarak = jarak - 4;
};

const mulai = () => {
  do {
    hari++;
    siang();
    if (jarak === 20) {
      jarak = 20;
    } else {
      malam();
    }
  } while (jarak < 20);
  console.log(hari);
};

mulai();
```

### Soal No #3 :

Proyek ini adalah sebuah aplikasi untuk melakukan mekanisme autentifikasi pada sisi frontend dengan menggunakan VueJs. Di dalam proyek hanya menggunakan state dan local storage dengan vuex dan tidak memanggil service manapun.

### Kebutuhan Sistem

```
Node JS 14 (Yang digunkan saat development)
```

### Instalasi dependency

```
npm install
```

### Memulai aplikasi dengan menggunakan hot reloads (untuk development)

```
npm run serve
```

### Melakukan compile dan minify javascript (untuk production)

```
npm run build
```

### Memulai aplikasi dari hasil build production (untuk production)

```
npm run build
```
