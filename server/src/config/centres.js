// NSIC centres that co-issue certificates with AIxperts Labs. Add an entry here for each
// new centre (and its seal PNG under server/assets) before issuing certificates for it.
export const NSIC = {
  nameHi: "राष्ट्रीय लघु उद्योग निगम लिमिटेड",
  nameEn: "THE NATIONAL SMALL INDUSTRIES CORPORATION LIMITED",
  enterprise: "(भारत सरकार का उपक्रम / A Government of India Enterprise)",
  ministry: "Ministry of MSME, Government of India",
};

export const CENTRES = {
  bodhgaya: {
    address: "Magadh University Campus, Bodhgaya - 824234 (Bihar)",
    unitHi: "जीविका व्यवसाय इनक्यूबेटर",
    unitEn: "LIVELIHOOD BUSINESS INCUBATOR",
    headLabel: "NTSC, Bodh Gaya",
    seal: "nsic-seal-bodhgaya.png",
  },
};

export const CENTRE_IDS = Object.keys(CENTRES);
