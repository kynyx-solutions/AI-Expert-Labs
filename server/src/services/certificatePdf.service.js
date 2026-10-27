import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import env from "../config/env.js";
import { CENTRES, NSIC } from "../config/centres.js";
import { CONDUCT } from "../models/Certificate.js";

const asset = (file) => fileURLToPath(new URL(`../../assets/${file}`, import.meta.url));

const FONTS = {
  hi: asset("fonts/Hind-Regular.ttf"),
  hiSemi: asset("fonts/Hind-SemiBold.ttf"),
  hiBold: asset("fonts/Hind-Bold.ttf"),
};

const BLUE = "#1e9be0";
const NAVY = "#1b2a7a";
const INK = "#1f2937";
const MUTED = "#64748b";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";

const imageIfExists = (doc, file, x, y, options) => {
  const path = asset(file);
  if (existsSync(path)) doc.image(path, x, y, options);
};

/**
 * Draws one line of mixed label text and underlined fill-in fields, left to right.
 * `parts` is a list of plain strings (labels) and { value, width } fields.
 */
const fieldLine = (doc, parts, x, y) => {
  let cursor = x;
  for (const part of parts) {
    if (typeof part === "string") {
      doc.font("hi").fontSize(11.5).fillColor(INK).text(part, cursor, y, { lineBreak: false });
      cursor += doc.widthOfString(part) + 8;
    } else {
      const { value, width } = part;
      doc.moveTo(cursor, y + 15).lineTo(cursor + width, y + 15).lineWidth(0.8).stroke(INK);
      doc.font("hiBold").fontSize(12.5).fillColor(INK)
        .text(value, cursor, y - 2, { width, align: "center", lineBreak: false });
      cursor += width + 8;
    }
  }
};

/** Renders the NSIC joint certificate (A4 landscape) and pipes it into `stream`. */
export const renderCertificatePdf = async (certificate, stream) => {
  const centre = CENTRES[certificate.centre] ?? Object.values(CENTRES)[0];

  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0,
    info: { Title: `Certificate ${certificate.certificateId}`, Author: "Aixperts Labs & NSIC" },
  });
  doc.pipe(stream);
  doc.registerFont("hi", FONTS.hi);
  doc.registerFont("hiSemi", FONTS.hiSemi);
  doc.registerFont("hiBold", FONTS.hiBold);

  const { width: W, height: H } = doc.page;
  const LEFT = 52;
  const RIGHT = W - 52;

  // Frame
  doc.rect(12, 12, W - 24, H - 24).lineWidth(9).stroke(BLUE);
  doc.rect(26, 26, W - 52, H - 52).lineWidth(1.2).stroke(BLUE);

  // ── Header: NSIC logo | NSIC & centre details | Aixperts Labs logo ──
  imageIfExists(doc, "nsic-logo.png", LEFT, 40, { width: 78 });
  imageIfExists(doc, "logo.png", W - 180, 46, { width: 118 });
  doc.moveTo(W - 198, 42).lineTo(W - 198, 142).lineWidth(1).stroke(INK);

  const headX = 140;
  const headW = W - 198 - headX - 10;
  const head = { width: headW, align: "center", lineBreak: false };
  doc.font("hiBold").fontSize(22).fillColor(NAVY).text(NSIC.nameHi, headX, 36, head);
  doc.font("Helvetica-Bold").fontSize(13.5).fillColor(NAVY).text(NSIC.nameEn, headX, 68, head);
  doc.font("hi").fontSize(9).fillColor(INK).text(NSIC.enterprise, headX, 85, head);
  doc.text(NSIC.ministry, headX, 97, head);
  doc.text(centre.address, headX, 109, head);
  doc.font("hiBold").fontSize(15).fillColor(NAVY).text(centre.unitHi, headX, 121, head);
  doc.font("Helvetica-Bold").fontSize(11.5).fillColor(NAVY).text(centre.unitEn, headX, 143, head);

  // ── S. No. / Date, title, photo ──
  fieldLine(doc, ["क्रमांक / S. No.", { value: certificate.serialNo, width: 95 }], LEFT, 186);
  fieldLine(doc, ["दिनांक / Date :", { value: formatDate(certificate.issuedAt), width: 95 }], LEFT, 210);

  const titleW = 230;
  const titleX = W / 2 - titleW / 2 - 30;
  doc.roundedRect(titleX, 186, titleW, 30, 4).lineWidth(1.5).stroke(BLUE);
  doc.font("hiBold").fontSize(16).fillColor(NAVY)
    .text("प्रमाण पत्र / CERTIFICATE", titleX, 190, { width: titleW, align: "center", lineBreak: false });

  const photoR = 50;
  const photoCx = W - 118;
  const photoCy = 205;
  if (certificate.photo?.data?.length) {
    doc.save();
    doc.circle(photoCx, photoCy, photoR).clip();
    doc.image(certificate.photo.data, photoCx - photoR, photoCy - photoR, {
      cover: [photoR * 2, photoR * 2],
      align: "center",
      valign: "center",
    });
    doc.restore();
  } else {
    doc.circle(photoCx, photoCy, photoR).lineWidth(1).dash(3, { space: 3 }).stroke(MUTED).undash();
    doc.font("hi").fontSize(9).fillColor(MUTED)
      .text("Photo", photoCx - photoR, photoCy - 6, { width: photoR * 2, align: "center" });
  }

  // ── Body ──
  const fill = (label) => RIGHT - LEFT - doc.font("hi").fontSize(11.5).widthOfString(label) - 8;

  const certifyLabel = "प्रमाणित किया जाता है कि / This is to certify that श्री / सुश्री / Mr. / Ms.";
  fieldLine(doc, [certifyLabel, { value: certificate.name.toUpperCase(), width: fill(certifyLabel) }], LEFT, 262);

  const guardianLabel = "सुपुत्र / सुपुत्री / son / daughter of श्री / Mr.";
  fieldLine(doc, [guardianLabel, { value: certificate.guardianName, width: fill(guardianLabel) }], LEFT, 286);

  fieldLine(doc, ["ने सफलतापूर्वक / has successfully completed training in the course of"], LEFT, 310);

  // Course line: shrink long program names so they stay on one line.
  const course = certificate.hours ? `${certificate.program}, ${certificate.hours} Hrs.` : certificate.program;
  let size = 13.5;
  doc.font("hiBold");
  while (size > 9 && doc.fontSize(size).widthOfString(course) > RIGHT - LEFT) size -= 0.5;
  doc.fillColor(INK).text(course, LEFT, 330, { width: RIGHT - LEFT, align: "center", lineBreak: false });
  doc.moveTo(LEFT, 349).lineTo(RIGHT, 349).lineWidth(0.8).stroke(INK);

  fieldLine(
    doc,
    [
      "पाठ्यक्रम में दिनांक / from",
      { value: formatDate(certificate.fromDate), width: 125 },
      "से / to",
      { value: formatDate(certificate.toDate), width: 125 },
      "तक प्रशिक्षण पूरा किया तथा",
    ],
    LEFT,
    360
  );
  fieldLine(
    doc,
    [
      "नियोजन के दौरान / and secured",
      { value: certificate.grade, width: 70 },
      "ग्रेड प्राप्त किया । / grade during performance evaluation.",
    ],
    LEFT,
    384
  );
  fieldLine(
    doc,
    [
      "उपरोक्त समयावधि के दौरान प्रशिक्षार्थी का व्यवहार",
      { value: CONDUCT[certificate.conduct] ?? "", width: 80 },
      "पाया गया ।",
    ],
    LEFT,
    408
  );
  fieldLine(
    doc,
    ["During the above period, the trainee's conduct was found", { value: certificate.conduct, width: 110 }, "."],
    LEFT,
    430
  );

  // ── Footer: Aixperts Labs signatory | NSIC seal | Head of Centre ──
  const sigY = H - 108;
  const column = (x, lines) => {
    doc.moveTo(x, sigY).lineTo(x + 200, sigY).lineWidth(0.8).stroke(INK);
    lines.forEach(([text, font], i) => {
      doc.font(font).fontSize(10.5).fillColor(INK).text(text, x - 20, sigY + 6 + i * 14, { width: 240, align: "center", lineBreak: false });
    });
  };
  column(LEFT + 40, [["प्राधिकृत हस्ताक्षर", "hi"], ["Authorized Signatory", "hi"], ["Aixperts Labs", "hiBold"]]);
  column(RIGHT - 240, [
    ["केन्द्र प्रमुख", "hi"],
    ["Head of Centre", "hi"],
    [centre.headLabel, "hiBold"],
    ["(NSIC, Ministry of MSME, Govt. of India)", "hi"],
  ]);
  imageIfExists(doc, centre.seal, W / 2 - 44, sigY - 12, { width: 88 });

  // Our verification number, so anyone can check this certificate online.
  const site = env.siteUrl.replace(/^https?:\/\//, "");
  doc.font("Helvetica").fontSize(7.5).fillColor(MUTED)
    .text(`Certificate ID: ${certificate.certificateId}   ·   Verify at ${site}/institute`, 0, H - 40, {
      width: W,
      align: "center",
      lineBreak: false,
    });

  doc.end();
};

export default renderCertificatePdf;
