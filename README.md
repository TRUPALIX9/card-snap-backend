

# 🧠 Card Vault – Backend (Node.js + TypeScript + OCR + MongoDB)

This is the backend service for **Card Vault**, a cross-platform app that scans business cards, performs OCR, and extracts structured contact information using regex and/or AI. Built with **Node.js, Express, TypeScript, MongoDB, Tesseract.js**, and `sharp`.

---

## 🚀 Features

- 📥 Accepts Base64 or file image uploads of business cards
- 🧠 Runs OCR using `tesseract.js` and pre-processing via `sharp`
- 📊 Parses structured contact data (name, phone, email, company, address)
- 🧾 Optionally integrates Hugging Face for NLP-based parsing
- 💽 MongoDB storage for user and contact records
- 🔐 Authentication middleware ready
- 🧩 Modular routing (`/ocr`, `/ocrExtract`, `/contacts`, `/user`, `/playground`)
- 🛠 Written in TypeScript for type safety

---

## 📁 Project Structure

```

src/
├── controllers/          # OCR + contact logic
├── routes/               # Express routers (modular)
├── models/               # Mongoose schemas
├── middleware/           # Auth middleware
├── @types/               # Custom TypeScript declarations
└── server.ts             # Entry point

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/TRUPALIX9/card-snap-backend.git
cd card-snap-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file using `.env.example`:

```env
PORT=5091
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cardvault
HUGGINGFACE_API_KEY=your_huggingface_api_key  # Optional
```

---

## ▶️ Run the Server

```bash
npm run dev
```

> Server runs at: `http://localhost:5091`

---

## 🔗 API Endpoints

### 🧠 OCR: `POST /ocr`

Extract raw text from Base64 image input.

```json
{
  "base64": "<base64_image_string>"
}
```

Response:

```json
{
  "text": "John Doe\nCEO\njohn@example.com\n123-456-7890"
}
```

---

### 🧠 OCR + Structured Extract: `POST /ocrExtract`

Processes OCR + AI/regex parsing to return structured contact info.

```json
{
  "base64": "<base64_image_string>"
}
```

Response:

```json
{
  "text": "...raw OCR text...",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 890",
    "company": "Tech Ltd.",
    "address": "123 Innovation Drive, CA"
  }
}
```

---

### 📇 Contacts API

* `POST /contacts` – Save a contact
* `GET /contacts` – Get all contacts
* `GET /contacts/:id` – Get one contact
* `DELETE /contacts/:id` – Delete contact

---

## 🔐 User Authentication

* Routes for `/user` exist (auth middleware is ready)
* Token-based auth can be implemented as needed

---

## 📦 Build & Start (Production)

```bash
npm run build
node dist/server.js
```

> Compiles TypeScript → JavaScript and starts Express server.

---

## 🧪 TypeScript Types

Custom types located in:

```
src/@types/
├── user.d.ts
├── contact.d.ts
└── pdf-poppler.d.ts
```

---

## 📁 Assets

* `eng.traineddata` – OCR language model file (English)
* `.gitignore`, `.env.example`, `tsconfig.json` – typical config files

---

## 📄 Sample .env

```env
PORT=5091
MONGO_URI=mongodb+srv://<Cluter>
HUGGINGFACE_API_KEY=your_api_key_here
```

---

## 👤 Author

**Trupal Patel**
📧 [trupal.work@gmail.com](mailto:trupal.work@gmail.com)
🔗 GitHub: [@TRUPALIX9](https://github.com/TRUPALIX9)

---

## 📄 License

MIT License © 2025 Trupal Patel

---

## 🙌 Acknowledgements

* [Tesseract.js](https://github.com/naptha/tesseract.js)
* [Sharp](https://github.com/lovell/sharp)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Hugging Face](https://huggingface.co/)
* [TypeScript](https://www.typescriptlang.org/)

```

```
