# AIxperts Labs — Backend API

Express + MongoDB (Mongoose) + Resend backend for all website forms
(Contact, Consultation, Free Consultation popup, Institute Enrollment, Newsletter).

Every form submits to a single endpoint, which:
1. Saves the submission to MongoDB
2. Emails you (the business) a notification via Resend
3. Sends the visitor an auto-reply confirmation (optional, on by default)

> **Why Resend instead of raw SMTP/Nodemailer?** Some hosts (Render's free
> tier included) can't reliably reach SMTP ports (587/465) to providers like
> Gmail — connections just time out regardless of correct credentials.
> Resend sends email over standard HTTPS, which is never blocked.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:

- `MONGODB_URI` — your MongoDB connection string (Atlas or self-hosted)
- `RESEND_API_KEY` — sign up free at [resend.com](https://resend.com), then Dashboard → API Keys → Create API Key
- `MAIL_FROM` — leave as `onboarding@resend.dev` until you verify your own domain in Resend (Dashboard → Domains); a custom From address will fail to send until then
- `MAIL_TO` — the inbox that should receive new leads
- `FRONTEND_URL` — your frontend's URL, for CORS (e.g. `http://localhost:3000` in dev)
- `ADMIN_API_KEY` — any random string; required to use `GET /api/submissions`

Run it:

```bash
npm run dev    # auto-restarts on file changes
# or
npm start
```

The server starts on `http://localhost:5000` by default and logs whether
MongoDB connected and the Resend API key verified successfully.

## API

### `POST /api/submissions`
Used by every form on the site.

```json
{
  "formType": "contact",       // "contact" | "consultation" | "free-consultation" | "enrollment"
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",       // optional
  "company": "Acme Inc",       // optional
  "subject": "General Inquiry",// optional
  "message": "Hello!",         // optional
  "source": "contact-page"     // optional, free text
}
```

Response:
```json
{ "success": true, "message": "Thanks! Your message has been sent.", "data": { "id": "...", "emailSent": true } }
```

### `GET /api/submissions`
Admin-only. Requires header `x-admin-key: <ADMIN_API_KEY>`.
Query params: `formType`, `page`, `limit`.

### `POST /api/enrollments`
Used by the `/enroll` page. Multipart form fields: `program`, `programSlug`,
`batchType` (`Regular` | `Weekend`), `name`, `guardianName`, `phone`, `email`,
`profile` (`Student` | `Working professional` | `MSME owner` | `Teacher / educator` | `Job seeker`),
`organization` (optional), `gstin` (optional, 15 characters), `consent=true`, and a required
`photo` (JPG/PNG, under 2 MB). Saves the enrollment, emails the team (photo attached) and
sends the learner a confirmation. Returns `{ enrollmentId: "AXL-ENR-12345", ... }`.

**Custom course requests.** When a learner picks "Something else" (or opens
`/enroll?course=custom`), send `requestType=custom`, `customTopic` (3–120 characters, what
they want to learn) and optional `customDetails` (up to 1000 characters) instead of
`program`/`programSlug`. The photo is optional for these. The ID starts with `AXL-REQ-`,
the team email is titled "New Custom Course Request", and the learner is told the team will
plan a course with them.

### `GET /api/enrollments`
Admin-only (`x-admin-key`). Query params: `status`, `page`, `limit`. Filter custom requests
client-side by `requestType: "custom"`.
`GET /api/enrollments/:enrollmentId/photo` returns the learner's photo.

### `GET /api/certificates/verify?id=AXL/2026/0001`
Public. Used by the "Verify a Certificate" section on `/academy`.
Returns `404` if no certificate has that number, otherwise:
```json
{ "success": true, "data": { "certificateId": "AXL/2026/0001", "serialNo": "5806", "name": "Jane Doe", "program": "Prompt Engineering Masterclass", "hours": 10, "grade": "A1", "conduct": "Good", "fromDate": "...", "toDate": "...", "issuedAt": "...", "revoked": false } }
```
Links like `https://aixpertslabs.com/academy?cert=AXL/2026/0001` open the page and
verify that certificate automatically.

### `POST /api/certificates`
Admin-only (`x-admin-key` header). Issues a certificate in the NSIC joint format.
Send JSON, or multipart form data to attach the learner's photo as `photo` (JPG/PNG, under 2 MB):
```bash
curl -X POST https://<api-host>/api/certificates -H "x-admin-key: <ADMIN_API_KEY>" \
  -F certificateId=AXL/2026/0001 -F serialNo=5806 -F "name=Jane Doe" -F "guardianName=John Doe" \
  -F email=jane@example.com -F "program=Prompt Engineering Masterclass" -F hours=10 -F grade=A1 \
  -F conduct=Good -F fromDate=2026-10-05 -F toDate=2026-10-09 -F photo=@jane.jpg
```

| Field | Printed as |
|---|---|
| `certificateId` (required) | Certificate ID at the foot, used to verify online |
| `serialNo` (required) | क्रमांक / S. No. (the NSIC serial number) |
| `name`, `guardianName` (required) | Mr. / Ms. … son / daughter of … |
| `program` (required), `hours` | the course line, e.g. "…, 180 Hrs." |
| `fromDate`, `toDate`, `issuedAt` | from / to, and दिनांक / Date (defaults to today) |
| `grade`, `conduct` | grade, and conduct in Hindi and English (`Excellent`, `Very Good`, `Good`, `Satisfactory`) |
| `centre` | NSIC centre details and seal (default `bodhgaya`, see `src/config/centres.js`) |
| `photo` or `enrollmentId` | the photo; with `enrollmentId` and no upload, the enrollment's photo is used |

`email` (required) is never shown publicly; it's where the download code is sent.
To revoke a certificate, set `revoked: true` on the document in MongoDB.

The NSIC logo and Bodhgaya seal in `assets/` were cropped from a sample certificate.
Replace them with NSIC's original files for sharper print quality.

### Certificate download (email OTP)
Used by the "Download Your Certificate" section on `/academy`. Requires
`CERT_SESSION_SECRET` and a working Resend setup.

1. `POST /api/certificates/otp/send` `{ "email": "jane@example.com" }` emails a 6-digit
   code (10-minute expiry, one request per minute per email). The response is the same
   whether or not the email has certificates.
2. `POST /api/certificates/otp/verify` `{ "email": "...", "otp": "123456" }` returns
   `{ certificates, token }`. Five wrong attempts lock the code.
3. `GET /api/certificates/download?id=AXL/2026/0001` with
   `Authorization: Bearer <token>` returns the PDF. The token lasts 30 minutes and
   only covers that learner's certificates.

For local testing without Resend, set `OTP_DEV_MODE=true` and the code is returned
in the step 1 response (and shown on the page). Never set it in production.

### `GET /api/certificates`
Admin-only. Lists issued certificates. Query params: `page`, `limit`.

### `GET /api/health`
Basic health check.

## Folder structure

```
server/
  server.js                  # entry point
  src/
    app.js                   # express app + middleware
    config/
      env.js                 # loads & validates .env
      db.js                  # mongoose connection
      mailer.js               # resend client
    models/
      Submission.js          # mongoose schema
    services/
      submission.service.js  # save + orchestrate email
      mail.service.js        # builds & sends emails
    controllers/
      submission.controller.js
    routes/
      index.js
      submission.routes.js
    middleware/
      validateSubmission.js
      adminAuth.js
      errorHandler.js
```
