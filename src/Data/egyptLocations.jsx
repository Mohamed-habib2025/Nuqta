

const governorates = {
  "Cairo": ["Nasr City", "Heliopolis", "Maadi", "Zamalek", "Shubra", "New Cairo", "Helwan", "Al Marg", "Ain Shams", "El Salam", "El Basatin"],
  "Alexandria": ["Montaza", "Sharq", "Wasat", "Gharb", "Agamy", "Borg El Arab", "Amreya"],
  "Giza": ["Dokki", "Mohandessin", "Haram", "6th of October", "Sheikh Zayed", "Imbaba", "Badrashin", "Awsim", "Atfeeh"],
  "Dakahlia": ["Mansoura", "Talkha", "Mit Ghamr", "Sherbin", "Belqas", "Dikirnis", "Senbellawein", "Aga", "Manzala"],
  "Red Sea": ["Hurghada", "Safaga", "Marsa Alam", "Quseir", "Ras Ghareb", "Shalateen", "Halayeb"],
  "Beheira": ["Damanhour", "Kafr El Dawar", "Edku", "Rashid", "Kom Hamada", "Hosh Essa", "Delengat", "Abu Hummus", "Itay El Barud"],
  "Fayoum": ["Fayoum", "Ibshaway", "Sinnuris", "Tamia", "Itsa", "Yusuf El Sediq"],
  "Gharbia": ["Tanta", "El Mahalla El Kubra", "Zefta", "Kafr El Zayat", "Basyoun", "Samanoud", "Qutur"],
  "Ismailia": ["Ismailia", "Fayed", "Qantara East", "Qantara West", "Tell El Kebir", "Abu Suweir"],
  "Menofia": ["Shebin El Kom", "Menouf", "Tala", "Ashmoun", "Quesna", "Berket El Sabea", "Sadat City"],
  "Minya": ["Minya", "Mallawi", "Bani Mazar", "Samalut", "Maghagha", "Matay", "Deir Mawas"],
  "Qaliubiya": ["Benha", "Shibin El-Qanater", "Shubra El Kheima", "Qalyub", "Khanka", "Toukh", "Kafr Shukr"],
  "New Valley": ["Kharga", "Dakhla", "Farafra", "Paris", "Balat"],
  "Suez": ["Suez", "Ain Sokhna", "Al-Adabiya", "Ataka", "Port Tawfiq"],
  "Aswan": ["Aswan", "Kom Ombo", "Edfu", "Drau", "Nasr El Nuba", "Kalabsha"],
  "Assiut": ["Assiut", "Dairut", "Manfalut", "Abnub", "Sahel Selim", "El Qusiya", "Badari", "Sedfa"],
  "Beni Suef": ["Beni Suef", "Biba", "Naser", "Al Wasta", "Al Fashn", "Ihnasya", "Sumusta"],
  "Port Said": ["Port Said", "El Manakh", "El Arab", "El Dawahy", "El Sharq", "Port Fouad"],
  "Damietta": ["Damietta", "New Damietta", "Ras El Bar", "Ezbet El Borg", "Faraskour", "Kafr Saad", "Zarqa"],
  "Sharkia": ["Zagazig", "10th of Ramadan", "Belbeis", "Minya El Qamh", "Abu Hammad", "Hehia", "Mashtool El Souk", "Faqous"],
  "South Sinai": ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine", "El Tor", "Ras Sedr", "Abu Redis"],
  "Kafr El Sheikh": ["Kafr El Sheikh", "Desouk", "Balteem", "Sidi Salem", "Metobas", "Fuwwah", "Qaleen"],
  "Matruh": ["Marsa Matruh", "El Alamein", "Siwa", "Sidi Barrani", "Dabaa", "El Hamam"],
  "Luxor": ["Luxor", "Armant", "Esna", "Qurna", "El-Tod", "Bayadiya"],
  "Qena": ["Qena", "Nag Hammadi", "Dishna", "Abu Tesht", "Qus", "Farshut", "Naqada"],
  "North Sinai": ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd", "Nakhl", "Hasana"],
  "Sohag": ["Sohag", "Akhmim", "Gerga", "Tahta", "El Balyana", "Maragha", "Tama", "Saqalta"]
};

export default governorates;