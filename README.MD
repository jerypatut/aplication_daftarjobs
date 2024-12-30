# Jobster API

#### Starter

Starter adalah salinan proyek akhir jobs-api, hanya dengan data tambahan.

#### Pengaturan

- navigasikan ke 06.5-jobster-api/starter
- instal dependensi

```sh
npm install
```

- buat .env dan berikan nilai yang benar
- Anda dapat menyalin dari proyek sebelumnya (cukup ubah nama DB)

.env

```js
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
```

- mulai proyek

```sh
npm start
```

- Anda akan melihat teks "Server sedang mendengarkan ...."

#### Pembersihan Musim Semi

##### Hapus Swagger

- hapus file swagger.yaml
- hapus baris kode ini
- hapus swagger.yaml
app.js

```js
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs'); const swaggerDocument = YAML.load('./swagger.yaml');

app.get('/', (req, res) => {
res.send('<h1>API Pekerjaan</h1><a href="/api-docs">Dokumentasi</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

#### Hapus Pembatas API

- hapus baris kode ini

app.js

```js
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1); app.use(
rateLimiter({
windowMs: 15 * 60 * 1000, // 15 menit
max: 100, // batasi setiap IP hingga 100 permintaan per windowMs
})
);
```

#### Hapus CORS

- kami tidak ingin aplikasi JS eksternal mengakses API kami (hanya front-end kami)
- hapus baris kode ini

```js
const cors = require('cors');
app.use(cors()); ```

#### Package.json

- tambahkan skrip "dev" dengan nodemon
- ubah mesin ke versi terkini (dalam kasus saya 16)

package.json

```js

"scripts": {
"start": "node app.js",
"dev": "nodemon app.js"
},

"engines": {
"node": "16.x"
}
```

- mulai ulang server dengan "npm run dev"

##### Folder Klien

- mari jelajahi folder klien
- buka folder klien
- ini adalah aplikasi react yang dibuat dengan CRA
- sama seperti di Kursus React saya (APLIKASI JOBSTER),
hanya url dasar yang mengarah ke server kita saat ini (bukan aplikasi heroku)

utils/axios.js

```js
const customFetch = axios.create({
baseURL: '/api/v1',
}); ```

- perhatikan folder build (aplikasi siap produksi)
- di CRA kita dapat membuat folder build dengan menjalankan "npm run build"
- itulah yang akan kita gunakan untuk front-end kita

##### Siapkan Front-End

- memerlukan modul "path"
- menyiapkan express static (sebagai middleware pertama)
untuk menyajikan aset statis dari klien/build
- jadi sekarang alih-alih folder publik kita menggunakan klien/build

app.js

```js
const path = require('path');

app.use(express.static(path.resolve(__dirname, './client/build')));

// tempatkan sebagai middleware pertama
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss()); ```

- melayani index.html untuk semua rute (selain API)
- rute front-end mengambilnya dari sana

```js
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// melayani index.html
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); ```

- navigasikan ke localhost:5000
- kosongkan penyimpanan lokal (jika perlu)

#### Ubah Model Pengguna

- tambahkan properti berikut

models/User.js

```js
lastName: {
type: String,
trim: true,
maxlength: 20,
default: 'lastName',
},
location: {
type: String,
trim: true,
maxlength: 20,
default: 'my city',
},

```

#### Ubah Respons di Register dan Login

- ubah struktur respons di
register dan login controllers (tetap pertahankan StatusCodes lama)

controllers/auth.js

```js
res.status(StatusCodes.CREATED).json({
user: {
email: user.email,
lastName: user.lastName,
location: user.location,
name: user.name,
tanda,
},
}); ```

- Login dan Daftar Berfungsi Sekarang :):):)

#### Buat Pengguna Uji

- uji permintaan front-end
- di postman atau front-end
- pastikan email dan kata sandi sama (atau ubah front-end)

```js
{
"name":"pengguna demo",
"email":"testUser@test.com",
"password":"rahasia"
}
```

- navigasikan ke client/src/pages/Register.js
- pastikan email dan kata sandi cocok dengan pengguna uji Anda

```js
<button
type='button'
className='btn btn-block btn-hipster'
disabled={isLoading}
onClick={() =>
dispatch(loginUser({ email: 'testUser@test.com', password: 'rahasia' }))}>

```

#### Perbarui Fungsionalitas Pengguna

- import authenticateUser middleware
- menyiapkan rute updateUser (rute terproteksi)

routes/auth.js

```js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const { register, login, updateUser } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, updateUser);

module.exports = router;
```

- membuat pengontrol updateUser
- menyiapkan ekspor

controllers/auth.js

```js
const updateUser = async (req, res) => {
console.log(req.user);
console.log(req.body);
}; ```

- lengkapi pembaruanPengguna

pengontrol/auth.js

```js
const updatePengguna = async (permintaan, res) => {
const { email, nama, namabelakang, lokasi
```
- - By email: **Jerynana76@gmail.com**
