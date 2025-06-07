
// const governorates = {
//   "Cairo": ["Nasr City", "Heliopolis", "Maadi", "Zamalek", "Shubra", "New Cairo", "Helwan", "Al Marg", "Ain Shams", "El Salam", "El Basatin"],
//   "Alexandria": ["Montaza", "Sharq", "Wasat", "Gharb", "Agamy", "Borg El Arab", "Amreya"],
//   "Giza": ["Dokki", "Mohandessin", "Haram", "6th of October", "Sheikh Zayed", "Imbaba", "Badrashin", "Awsim", "Atfeeh"],
//   "Dakahlia": ["Mansoura", "Talkha", "Mit Ghamr", "Sherbin", "Belqas", "Dikirnis", "Senbellawein", "Aga", "Manzala"],
//   "Red Sea": ["Hurghada", "Safaga", "Marsa Alam", "Quseir", "Ras Ghareb", "Shalateen", "Halayeb"],
//   "Beheira": ["Damanhour", "Kafr El Dawar", "Edku", "Rashid", "Kom Hamada", "Hosh Essa", "Delengat", "Abu Hummus", "Itay El Barud"],
//   "Fayoum": ["Fayoum", "Ibshaway", "Sinnuris", "Tamia", "Itsa", "Yusuf El Sediq"],
//   "Gharbia": ["Tanta", "El Mahalla El Kubra", "Zefta", "Kafr El Zayat", "Basyoun", "Samanoud", "Qutur"],
//   "Ismailia": ["Ismailia", "Fayed", "Qantara East", "Qantara West", "Tell El Kebir", "Abu Suweir"],
//   "Menofia": ["Shebin El Kom", "Menouf", "Tala", "Ashmoun", "Quesna", "Berket El Sabea", "Sadat City"],
//   "Minya": ["Minya", "Mallawi", "Bani Mazar", "Samalut", "Maghagha", "Matay", "Deir Mawas"],
//   "Qaliubiya": ["Benha", "Shibin El-Qanater", "Shubra El Kheima", "Qalyub", "Khanka", "Toukh", "Kafr Shukr"],
//   "New Valley": ["Kharga", "Dakhla", "Farafra", "Paris", "Balat"],
//   "Suez": ["Suez", "Ain Sokhna", "Al-Adabiya", "Ataka", "Port Tawfiq"],
//   "Aswan": ["Aswan", "Kom Ombo", "Edfu", "Drau", "Nasr El Nuba", "Kalabsha"],
//   "Assiut": ["Assiut", "Dairut", "Manfalut", "Abnub", "Sahel Selim", "El Qusiya", "Badari", "Sedfa"],
//   "Beni Suef": ["Beni Suef", "Biba", "Naser", "Al Wasta", "Al Fashn", "Ihnasya", "Sumusta"],
//   "Port Said": ["Port Said", "El Manakh", "El Arab", "El Dawahy", "El Sharq", "Port Fouad"],
//   "Damietta": ["Damietta", "New Damietta", "Ras El Bar", "Ezbet El Borg", "Faraskour", "Kafr Saad", "Zarqa"],
//   "Sharkia": ["Zagazig", "10th of Ramadan", "Belbeis", "Minya El Qamh", "Abu Hammad", "Hehia", "Mashtool El Souk", "Faqous"],
//   "South Sinai": ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine", "El Tor", "Ras Sedr", "Abu Redis"],
//   "Kafr El Sheikh": ["Kafr El Sheikh", "Desouk", "Balteem", "Sidi Salem", "Metobas", "Fuwwah", "Qaleen"],
//   "Matruh": ["Marsa Matruh", "El Alamein", "Siwa", "Sidi Barrani", "Dabaa", "El Hamam"],
//   "Luxor": ["Luxor", "Armant", "Esna", "Qurna", "El-Tod", "Bayadiya"],
//   "Qena": ["Qena", "Nag Hammadi", "Dishna", "Abu Tesht", "Qus", "Farshut", "Naqada"],
//   "North Sinai": ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd", "Nakhl", "Hasana"],
//   "Sohag": ["Sohag", "Akhmim", "Gerga", "Tahta", "El Balyana", "Maragha", "Tama", "Saqalta"]
// };

// export default governorates;


const governorates = {
  "Cairo": {
    name: { en: "Cairo", ar: "القاهرة" },
    cities: [
      { en: "Nasr City", ar: "مدينة نصر" },
      { en: "Heliopolis", ar: "مصر الجديدة" },
      { en: "Maadi", ar: "المعادي" },
      { en: "Zamalek", ar: "الزمالك" },
      { en: "Shubra", ar: "شبرا" },
      { en: "New Cairo", ar: "القاهرة الجديدة" },
      { en: "Helwan", ar: "حلوان" },
      { en: "Al Marg", ar: "المرج" },
      { en: "Ain Shams", ar: "عين شمس" },
      { en: "El Salam", ar: "السلام" },
      { en: "El Basatin", ar: "البساتين" }
    ]
  },
  "Alexandria": {
    name: { en: "Alexandria", ar: "الإسكندرية" },
    cities: [
      { en: "Montaza", ar: "المنتزه" },
      { en: "Sharq", ar: "شرق" },
      { en: "Wasat", ar: "وسط" },
      { en: "Gharb", ar: "غرب" },
      { en: "Agamy", ar: "العجمي" },
      { en: "Borg El Arab", ar: "برج العرب" },
      { en: "Amreya", ar: "العامرية" }
    ]
  },
  "Giza": {
    name: { en: "Giza", ar: "الجيزة" },
    cities: [
      { en: "Dokki", ar: "الدقي" },
      { en: "Mohandessin", ar: "المهندسين" },
      { en: "Haram", ar: "الهرم" },
      { en: "6th of October", ar: "السادس من أكتوبر" },
      { en: "Sheikh Zayed", ar: "الشيخ زايد" },
      { en: "Imbaba", ar: "إمبابة" },
      { en: "Badrashin", ar: "البدرشين" },
      { en: "Awsim", ar: "أوسيم" },
      { en: "Atfeeh", ar: "أطفيح" }
    ]
  },
  "Dakahlia": {
    name: { en: "Dakahlia", ar: "الدقهلية" },
    cities: [
      { en: "Mansoura", ar: "المنصورة" },
      { en: "Talkha", ar: "طلخا" },
      { en: "Mit Ghamr", ar: "ميت غمر" },
      { en: "Sherbin", ar: "شربين" },
      { en: "Belqas", ar: "بلقاس" },
      { en: "Dikirnis", ar: "دكرنس" },
      { en: "Senbellawein", ar: "سنبلاوين" },
      { en: "Aga", ar: "أجا" },
      { en: "Manzala", ar: "المنزلة" }
    ]
  },
  "Red Sea": {
    name: { en: "Red Sea", ar: "البحر الأحمر" },
    cities: [
      { en: "Hurghada", ar: "الغردقة" },
      { en: "Safaga", ar: "سفاجا" },
      { en: "Marsa Alam", ar: "مرسى علم" },
      { en: "Quseir", ar: "القصير" },
      { en: "Ras Ghareb", ar: "رأس غارب" },
      { en: "Shalateen", ar: "شلاتين" },
      { en: "Halayeb", ar: "حلايب" }
    ]
  },
  "Beheira": {
    name: { en: "Beheira", ar: "البحيرة" },
    cities: [
      { en: "Damanhour", ar: "دمنهور" },
      { en: "Kafr El Dawar", ar: "كفر الدوار" },
      { en: "Edku", ar: "إدكو" },
      { en: "Rashid", ar: "رشيد" },
      { en: "Kom Hamada", ar: "كوم حمادة" },
      { en: "Hosh Essa", ar: "حوش عيسى" },
      { en: "Delengat", ar: "الدلنجات" },
      { en: "Abu Hummus", ar: "أبو حمص" },
      { en: "Itay El Barud", ar: "إيتاي البارود" }
    ]
  },
  "Fayoum": {
    name: { en: "Fayoum", ar: "الفيوم" },
    cities: [
      { en: "Fayoum", ar: "الفيوم" },
      { en: "Ibshaway", ar: "إبشواي" },
      { en: "Sinnuris", ar: "سنورس" },
      { en: "Tamia", ar: "طامية" },
      { en: "Itsa", ar: "إطسا" },
      { en: "Yusuf El Sediq", ar: "يوسف الصديق" }
    ]
  },
  "Gharbia": {
    name: { en: "Gharbia", ar: "الغربية" },
    cities: [
      { en: "Tanta", ar: "طنطا" },
      { en: "El Mahalla El Kubra", ar: "المحلة الكبرى" },
      { en: "Zefta", ar: "زفتى" },
      { en: "Kafr El Zayat", ar: "كفر الزيات" },
      { en: "Basyoun", ar: "بسيون" },
      { en: "Samanoud", ar: "سمنود" },
      { en: "Qutur", ar: "قطور" }
    ]
  },
  "Ismailia": {
    name: { en: "Ismailia", ar: "الإسماعيلية" },
    cities: [
      { en: "Ismailia", ar: "الإسماعيلية" },
      { en: "Fayed", ar: "فايد" },
      { en: "Qantara East", ar: "القنطرة شرق" },
      { en: "Qantara West", ar: "القنطرة غرب" },
      { en: "Tell El Kebir", ar: "التل الكبير" },
      { en: "Abu Suweir", ar: "أبو صوير" }
    ]
  },
  "Menofia": {
    name: { en: "Menofia", ar: "المنوفية" },
    cities: [
      { en: "Shebin El Kom", ar: "شبين الكوم" },
      { en: "Menouf", ar: "منوف" },
      { en: "Tala", ar: "تلا" },
      { en: "Ashmoun", ar: "أشمون" },
      { en: "Quesna", ar: "قويسنا" },
      { en: "Berket El Sabea", ar: "بركة السبع" },
      { en: "Sadat City", ar: "مدينة السادات" }
    ]
  },
  "Minya": {
    name: { en: "Minya", ar: "المنيا" },
    cities: [
      { en: "Minya", ar: "المنيا" },
      { en: "Mallawi", ar: "ملوي" },
      { en: "Bani Mazar", ar: "بني مزار" },
      { en: "Samalut", ar: "سمالوط" },
      { en: "Maghagha", ar: "مغاغة" },
      { en: "Matay", ar: "مطاي" },
      { en: "Deir Mawas", ar: "دير مواس" }
    ]
  },
  "Qaliubiya": {
    name: { en: "Qaliubiya", ar: "القليوبية" },
    cities: [
      { en: "Benha", ar: "بنها" },
      { en: "Shibin El-Qanater", ar: "شبين القناطر" },
      { en: "Shubra El Kheima", ar: "شبرا الخيمة" },
      { en: "Qalyub", ar: "قليوب" },
      { en: "Khanka", ar: "الخانكة" },
      { en: "Toukh", ar: "طوخ" },
      { en: "Kafr Shukr", ar: "كفر شكر" }
    ]
  },
  "New Valley": {
    name: { en: "New Valley", ar: "الوادي الجديد" },
    cities: [
      { en: "Kharga", ar: "الخارجة" },
      { en: "Dakhla", ar: "الداخلة" },
      { en: "Farafra", ar: "الفرافرة" },
      { en: "Paris", ar: "باريس" },
      { en: "Balat", ar: "بلاط" }
    ]
  },
  "Suez": {
    name: { en: "Suez", ar: "السويس" },
    cities: [
      { en: "Suez", ar: "السويس" },
      { en: "Ain Sokhna", ar: "العين السخنة" },
      { en: "Al-Adabiya", ar: "الأدبية" },
      { en: "Ataka", ar: "عتاقة" },
      { en: "Port Tawfiq", ar: "بورتوفيق" }
    ]
  },
  "Aswan": {
    name: { en: "Aswan", ar: "أسوان" },
    cities: [
      { en: "Aswan", ar: "أسوان" },
      { en: "Kom Ombo", ar: "كوم أمبو" },
      { en: "Edfu", ar: "إدفو" },
      { en: "Drau", ar: "دراو" },
      { en: "Nasr El Nuba", ar: "نصر النوبة" },
      { en: "Kalabsha", ar: "كلابشة" }
    ]
  },
  "Assiut": {
    name: { en: "Assiut", ar: "أسيوط" },
    cities: [
      { en: "Assiut", ar: "أسيوط" },
      { en: "Dairut", ar: "ديروط" },
      { en: "Manfalut", ar: "منفلوط" },
      { en: "Abnub", ar: "أبنوب" },
      { en: "Sahel Selim", ar: "ساحل سليم" },
      { en: "El Qusiya", ar: "القوصية" },
      { en: "Badari", ar: "البداري" },
      { en: "Sedfa", ar: "صدفا" }
    ]
  },
  "Beni Suef": {
    name: { en: "Beni Suef", ar: "بني سويف" },
    cities: [
      { en: "Beni Suef", ar: "بني سويف" },
      { en: "Biba", ar: "بيبا" },
      { en: "Naser", ar: "ناصر" },
      { en: "Al Wasta", ar: "الواسطي" },
      { en: "Al Fashn", ar: "الفشن" },
      { en: "Ihnasya", ar: "إهناسيا" },
      { en: "Sumusta", ar: "سمسطا" }
    ]
  },
  "Port Said": {
    name: { en: "Port Said", ar: "بورسعيد" },
    cities: [
      { en: "Port Said", ar: "بورسعيد" },
      { en: "El Manakh", ar: "المناخ" },
      { en: "El Arab", ar: "العرب" },
      { en: "El Dawahy", ar: "الضواحي" },
      { en: "El Sharq", ar: "الشرق" },
      { en: "Port Fouad", ar: "بورفؤاد" }
    ]
  },
  "Damietta": {
    name: { en: "Damietta", ar: "دمياط" },
    cities: [
      { en: "Damietta", ar: "دمياط" },
      { en: "New Damietta", ar: "دمياط الجديدة" },
      { en: "Ras El Bar", ar: "رأس البر" },
      { en: "Ezbet El Borg", ar: "عزبة البرج" },
      { en: "Faraskour", ar: "فارسكور" },
      { en: "Kafr Saad", ar: "كفر سعد" },
      { en: "Zarqa", ar: "الزرقا" }
    ]
  },
  "Sharkia": {
    name: { en: "Sharkia", ar: "الشرقية" },
    cities: [
      { en: "Zagazig", ar: "الزقازيق" },
      { en: "10th of Ramadan", ar: "العاشر من رمضان" },
      { en: "Belbeis", ar: "بلبيس" },
      { en: "Minya El Qamh", ar: "منيا القمح" },
      { en: "Abu Hammad", ar: "أبو حماد" },
      { en: "Hehia", ar: "ههيا" },
      { en: "Mashtool El Souk", ar: "مشتول السوق" },
      { en: "Faqous", ar: "فاقوس" }
    ]
  },
  "South Sinai": {
    name: { en: "South Sinai", ar: "جنوب سيناء" },
    cities: [
      { en: "Sharm El Sheikh", ar: "شرم الشيخ" },
      { en: "Dahab", ar: "دهب" },
      { en: "Nuweiba", ar: "نويبع" },
      { en: "Taba", ar: "طابا" },
      { en: "Saint Catherine", ar: "سانت كاترين" },
      { en: "El Tor", ar: "الطور" },
      { en: "Ras Sedr", ar: "رأس سدر" },
      { en: "Abu Redis", ar: "أبو رديس" }
    ]
  },
  "Kafr El Sheikh": {
    name: { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
    cities: [
      { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
      { en: "Desouk", ar: "دسوق" },
      { en: "Balteem", ar: "بلطيم" },
      { en: "Sidi Salem", ar: "سيدي سالم" },
      { en: "Metobas", ar: "مطوبس" },
      { en: "Fuwwah", ar: "فوه" },
      { en: "Qaleen", ar: "قلين" }
    ]
  },
  "Matruh": {
    name: { en: "Matruh", ar: "مطروح" },
    cities: [
      { en: "Marsa Matruh", ar: "مرسى مطروح" },
      { en: "El Alamein", ar: "العلمين" },
      { en: "Siwa", ar: "سيوة" },
      { en: "Sidi Barrani", ar: "سيدي براني" },
      { en: "Dabaa", ar: "الضبعة" },
      { en: "El Hamam", ar: "الحمام" }
    ]
  },
  "Luxor": {
    name: { en: "Luxor", ar: "الأقصر" },
    cities: [
      { en: "Luxor", ar: "الأقصر" },
      { en: "Armant", ar: "أرمنت" },
      { en: "Esna", ar: "إسنا" },
      { en: "Qurna", ar: "قرنة" },
      { en: "El-Tod", ar: "الطود" },
      { en: "Bayadiya", ar: "البياضية" }
    ]
  },
  "Qena": {
    name: { en: "Qena", ar: "قنا" },
    cities: [
      { en: "Qena", ar: "قنا" },
      { en: "Nag Hammadi", ar: "نجع حمادي" },
      { en: "Dishna", ar: "دشنا" },
      { en: "Abu Tesht", ar: "أبو تشت" },
      { en: "Qus", ar: "قوص" },
      { en: "Farshut", ar: "فرشوط" },
      { en: "Naqada", ar: "نقادة" }
    ]
  },
  "North Sinai": {
    name: { en: "North Sinai", ar: "شمال سيناء" },
    cities: [
      { en: "Arish", ar: "العريش" },
      { en: "Sheikh Zuweid", ar: "الشيخ زويد" },
      { en: "Rafah", ar: "رفح" },
      { en: "Bir El Abd", ar: "بئر العبد" },
      { en: "Nakhl", ar: "نخل" },
      { en: "Hasana", ar: "الحسنة" }
    ]
  },
  "Sohag": {
    name: { en: "Sohag", ar: "سوهاج" },
    cities: [
      { en: "Sohag", ar: "سوهاج" },
      { en: "Akhmim", ar: "أخميم" },
      { en: "Gerga", ar: "جرجا" },
      { en: "Tahta", ar: "طهطا" },
      { en: "El Balyana", ar: "البلينا" },
      { en: "Maragha", ar: "المراغة" },
      { en: "Tama", ar: "تما" },
      { en: "Saqalta", ar: "ساقلتة" }
    ]
  }
};

export default governorates;