import type { University } from "@/data/types";

const MEDICAL_UNI =
  "This is a medical university. Government MBBS and BDS seats are filled through the central DGHS test, which is a separate record in this archive. No 2026–27 circular for this university is stored here.";

function U(
  id: string,
  name: string,
  shortName: string,
  track: University["track"],
  city: string,
  website: string | null,
  extra?: Partial<University>,
): University {
  return {
    id,
    kind: "university",
    name,
    shortName,
    nameBn: "",
    track,
    tags: [],
    city,
    website,
    admissionUrl: null,
    directoryNote: "",
    ...extra,
  };
}

export const seedUniversities: University[] = [
  U("du", "University of Dhaka", "DU", "general", "Dhaka", "https://www.du.ac.bd", {
    nameBn: "ঢাকা বিশ্ববিদ্যালয়",
    directoryNote: "Runs its own undergraduate admission. Not part of the GST cluster in the 2026–27 reports stored here.",
    admissionUrl: "https://admission.eis.du.ac.bd/",
  }),
  U("ru", "University of Rajshahi", "RU", "general", "Rajshahi", "https://www.ru.ac.bd", {
    nameBn: "রাজশাহী বিশ্ববিদ্যালয়",
    directoryNote:
      "Runs its own undergraduate admission. Apps 12–27 Nov 2026; unit tests B 8 Jan / C 9 Jan / A 16 Jan 2027. Centres include Rajshahi plus Dhaka, Chattogram, Khulna, Sylhet, Mymensingh, Rangpur. Schedule still labelled preliminary in some coverage.",
    admissionUrl: "https://admission.ru.ac.bd/",
  }),
  U("cu", "University of Chittagong", "CU", "general", "Chattogram", "https://www.cu.ac.bd", {
    nameBn: "চট্টগ্রাম বিশ্ববিদ্যালয়",
    directoryNote: "Runs its own undergraduate admission. Stored 2026–27 test dates were described as probable.",
    admissionUrl: "https://admission.cu.ac.bd/",
  }),
  U("ju", "Jahangirnagar University", "JU", "general", "Savar, Dhaka", "https://www.juniv.edu", {
    nameBn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    directoryNote: "Runs its own admission (not GST). About 1,848 own seats in 2026–27 compilations. Full unit circular not yet stored — desk will fill when the notice lands.",
  }),
  U("iu", "Islamic University, Bangladesh", "IU", "general", "Kushtia", "https://www.iu.ac.bd", {
    nameBn: "ইসলামী বিশ্ববিদ্যালয়",
    directoryNote: "Named in GST cluster member lists for 2026–27 (Observer / Business Times, Sep 2026). Individual circular not stored — sit the GST test.",
  }),
  U("ku", "Khulna University", "KU", "general", "Khulna", "https://www.ku.ac.bd", {
    nameBn: "খুলনা বিশ্ববিদ্যালয়",
    directoryNote: "Runs its own undergraduate admission for 2026–27, according to a notice cited by The Daily Star.",
    admissionUrl: "https://www.ku.ac.bd/",
  }),
  U("jnu", "Jagannath University", "JnU", "general", "Dhaka", "https://www.jnu.ac.bd", {
    nameBn: "জগন্নাথ বিশ্ববিদ্যালয়",
    directoryNote:
      "Runs its own undergraduate admission (not GST). Apps 15 Nov – 10 Dec 2026; five unit tests from 1 Jan 2027 in Dhaka. Flat fee ~৳400 reported. Compilation seats ~2,900. Not the same institution as Jahangirnagar University (JU).",
    admissionUrl: "https://www.jnu.ac.bd/",
  }),
  U("cou", "Comilla University", "CoU", "general", "Cumilla", "https://www.cou.ac.bd", {
    nameBn: "কুমিল্লা বিশ্ববিদ্যালয়",
    directoryNote: "A 4 Nov 2026 Daily Star timeline gives an application deadline only. Opening date and test dates are not in that report.",
  }),
  U("jkkniu", "Jatiya Kabi Kazi Nazrul Islam University", "JKKNIU", "general", "Trishal, Mymensingh", "https://www.jkkniu.edu.bd", {
    directoryNote: "GST cluster member for 2026–27. Seats and subjects flow through the GST circular, not a separate JnU-style notice here.",
  }),
  U("brur", "Begum Rokeya University, Rangpur", "BRUR", "general", "Rangpur", "https://www.brur.ac.bd", {
    directoryNote: "GST cluster member for 2026–27 (~1,395 seats in secondary compilations). Also used as a DU outside centre — that is not a BRUR circular.",
  }),
  U("bu", "University of Barishal", "BU", "general", "Barishal", "https://www.bu.ac.bd", {
    directoryNote: "GST cluster member for 2026–27 (~1,570 seats in secondary compilations).",
  }),
  U("rub", "Rabindra University, Bangladesh", "RUB", "general", "Shahjadpur, Sirajganj", "https://www.rub.ac.bd", {
    directoryNote: "GST cluster member for 2026–27.",
  }),
  U("neu", "Netrokona University", "NeU", "general", "Netrokona", "https://neu.ac.bd", {
    directoryNote: "GST cluster member for 2026–27.",
  }),
  U("kiu", "Kishoreganj University", "KiU", "general", "Kishoreganj", "https://bsmru.ac.bd", {
    directoryNote: "GST cluster member for 2026–27. UGC list may still show the pre-rename host.",
  }),
  U("nau", "Naogaon University", "NaU", "general", "Naogaon", null, {
    directoryNote: "GST cluster member for 2026–27. Website not on the UGC public list stored here.",
  }),
  U("meu", "Meherpur University", "MeU", "general", "Meherpur", null, {
    directoryNote: "UGC's public list does not publish a website. No 2026–27 notice is stored here.",
  }),
  U("thu", "Thakurgaon University", "ThU", "general", "Thakurgaon", null, {
    directoryNote: "UGC's public list does not publish a website. No 2026–27 notice is stored here.",
  }),
  U("ub", "University of Bogura", "UB", "general", "Bogura", "https://www.ub.ac.bd", {
    directoryNote: "No 2026–27 notice is stored in this archive.",
  }),
  U("dcu", "Dhaka Central University", "DCU", "general", "Dhaka", "https://dcu.ac.bd", {
    directoryNote: "No 2026–27 notice is stored in this archive.",
  }),

  U("buet", "Bangladesh University of Engineering & Technology", "BUET", "engineering", "Dhaka", "https://www.buet.ac.bd", {
    nameBn: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়",
    directoryNote: "1,309 seats · Group A engineering & URP · Group B architecture · applications expected 21 Nov · written test 16 Jan 2027 · no preliminary MCQ.",
    admissionUrl: "https://ugadmission.buet.ac.bd/",
  }),
  U("cuet", "Chittagong University of Engineering & Technology", "CUET", "engineering", "Chattogram", "https://www.cuet.ac.bd", {
    nameBn: "চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    directoryNote: "The only stored 2026–27 date is a proposed test day. Not a confirmed circular.",
    admissionUrl: "https://admission.cuet.ac.bd/",
  }),
  U("kuet", "Khulna University of Engineering & Technology", "KUET", "engineering", "Khulna", "https://www.kuet.ac.bd", {
    nameBn: "খুলনা প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    directoryNote: "About 1,105 seats. Test 8 Jan 2027 in Khulna, Dhaka and Rajshahi.",
    admissionUrl: "https://admission.kuet.ac.bd/",
  }),
  U("ruet", "Rajshahi University of Engineering & Technology", "RUET", "engineering", "Rajshahi", "https://www.ruet.ac.bd", {
    nameBn: "রাজশাহী প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়",
    directoryNote: "Test date was provisionally fixed. Not a confirmed circular.",
    admissionUrl: "https://admission.ruet.ac.bd/",
  }),
  U("duet", "Dhaka University of Engineering & Technology", "DUET", "engineering", "Gazipur", "https://www.duet.ac.bd", {
    directoryNote: "DUET's undergraduate entry has historically been a diploma-to-degree route, not the BUET-style HSC test. The 2026–27 circular is not stored here.",
  }),

  U("sust", "Shahjalal University of Science & Technology", "SUST", "science-technology", "Sylhet", "https://www.sust.edu", {
    directoryNote: "No 2026–27 notice is stored here. SUST is also named as a Dhaka University outside centre, which is not a SUST circular.",
    admissionUrl: "https://admission.sust.edu.bd/",
  }),
];
