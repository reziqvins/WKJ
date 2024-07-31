export default function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    return formattedDate;
}
export const penyakit = {
    "flu": "Flu adalah infeksi virus yang umum dan bisa mematikan terutama pada kelompok berisiko tinggi. Gejalanya termasuk demam, batuk, sakit tenggorokan, hidung meler atau tersumbat, nyeri otot atau tubuh, sakit kepala, dan kelelahan. Tanaman herbal yang cocok: Jahe, Kunyit. [chatWithAdminButton]",
    "headache": "Sakit kepala dapat disebabkan oleh berbagai faktor termasuk stres, dehidrasi, atau kondisi medis. Jenis umum termasuk sakit kepala tegang, migrain, dan sakit kepala cluster. Tanaman herbal yang cocok: Daun Peppermint, Jahe. [chatWithAdminButton]",
    "demam": "Demam adalah kondisi di mana suhu tubuh meningkat, sering kali sebagai respons terhadap infeksi. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "diare": "Diare adalah kondisi di mana buang air besar menjadi lebih sering dan encer. Penyebab: Infeksi usus. Solusi herbal: Daun Jambu Biji, Kunyit. [chatWithAdminButton]",
    "batuk": "Batuk adalah reaksi tubuh untuk membersihkan saluran pernapasan dari iritasi. Penyebab: Infeksi saluran pernapasan. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "asma": "Asma adalah kondisi di mana saluran pernapasan menyempit dan menghasilkan lendir berlebih. Penyebab: Alergi, iritan. Solusi herbal: Daun Sirih, Kunyit. [chatWithAdminButton]",
    "sakit gigi": "Sakit gigi adalah rasa nyeri di dalam atau sekitar gigi dan rahang. Penyebab: Kerusakan gigi, infeksi. Solusi herbal: Cengkeh, Daun Sirih. [chatWithAdminButton]",
    "nyeri sendi": "Nyeri sendi adalah rasa sakit atau ketidaknyamanan pada sendi tubuh. Penyebab: Arthritis, cedera. Solusi herbal: Jahe, Kunyit. [chatWithAdminButton]",
    "radang tenggorokan": "Radang tenggorokan adalah peradangan di tenggorokan yang menyebabkan rasa sakit saat menelan. Penyebab: Infeksi bakteri atau virus. Solusi herbal: Madu, Jahe. [chatWithAdminButton]",
    "kolesterol tinggi": "Kolesterol tinggi adalah kondisi di mana terdapat terlalu banyak kolesterol dalam darah. Penyebab: Pola makan buruk, genetik. Solusi herbal: Temulawak, Daun Salam. [chatWithAdminButton]",
    "hipertensi": "Hipertensi adalah kondisi di mana tekanan darah lebih tinggi dari normal. Penyebab: Pola makan buruk, kurang olahraga. Solusi herbal: Daun Salam, Seledri. [chatWithAdminButton]",
    "diabetes": "Diabetes adalah penyakit kronis di mana tubuh tidak dapat mengatur kadar gula darah. Penyebab: Genetik, pola makan buruk. Solusi herbal: Pare, Daun Salam. [chatWithAdminButton]",
    "anemia": "Anemia adalah kondisi di mana tubuh kekurangan sel darah merah atau hemoglobin. Penyebab: Kekurangan zat besi. Solusi herbal: Bayam, Daun Katuk. [chatWithAdminButton]",
    "jerawat": "Jerawat adalah kondisi kulit yang ditandai dengan munculnya bintik-bintik di wajah. Penyebab: Hormon, kebersihan kulit buruk. Solusi herbal: Lidah Buaya, Teh Hijau. [chatWithAdminButton]",
    "maag": "Maag adalah kondisi di mana asam lambung mengiritasi lapisan lambung. Penyebab: Pola makan buruk, stres. Solusi herbal: Kunyit, Temulawak. [chatWithAdminButton]",
    "insomnia": "Insomnia adalah gangguan tidur yang ditandai dengan kesulitan tidur atau tetap tertidur. Penyebab: Stres, pola tidur buruk. Solusi herbal: Teh Chamomile, Lavender. [chatWithAdminButton]",
    "asma bronkial": "Asma bronkial adalah kondisi kronis di mana saluran napas menyempit dan terjadi peradangan. Penyebab: Alergi, iritasi. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "infeksi saluran kemih": "Infeksi saluran kemih adalah infeksi di bagian manapun dari sistem kemih. Penyebab: Bakteri. Solusi herbal: Cranberry, Daun Sirih. [chatWithAdminButton]",
    "eksim": "Eksim adalah kondisi kulit kronis yang menyebabkan kulit merah, gatal, dan bersisik. Penyebab: Alergi, iritasi kulit. Solusi herbal: Lidah Buaya, Minyak Kelapa. [chatWithAdminButton]",
    "hepatitis": "Hepatitis adalah peradangan hati yang dapat disebabkan oleh infeksi virus. Penyebab: Infeksi virus. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "hipotiroidisme": "Hipotiroidisme adalah kondisi di mana kelenjar tiroid tidak memproduksi cukup hormon tiroid. Penyebab: Gangguan autoimun. Solusi herbal: Kelp, Ginseng. [chatWithAdminButton]",
    "hipertiroidisme": "Hipertiroidisme adalah kondisi di mana kelenjar tiroid memproduksi terlalu banyak hormon tiroid. Penyebab: Gangguan autoimun. Solusi herbal: Bugleweed, Lemon Balm. [chatWithAdminButton]",
    "tifus": "Tifus adalah infeksi bakteri yang menyebar melalui makanan atau minuman yang terkontaminasi. Penyebab: Bakteri Salmonella. Solusi herbal: Daun Sambiloto, Kunyit. [chatWithAdminButton]",
    "bronkitis": "Bronkitis adalah peradangan pada bronkus di paru-paru. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "osteoartritis": "Osteoartritis adalah kondisi kronis di mana tulang rawan di sendi rusak. Penyebab: Usia, cedera sendi. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "epilepsi": "Epilepsi adalah gangguan sistem saraf yang menyebabkan kejang. Penyebab: Genetik, cedera otak. Solusi herbal: Minyak CBD, Kamomil. [chatWithAdminButton]",
    "radang usus": "Radang usus adalah peradangan kronis pada saluran pencernaan. Penyebab: Penyakit autoimun. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "varises": "Varises adalah pembuluh darah yang membesar dan terpelintir, biasanya di kaki. Penyebab: Usia, kelebihan berat badan. Solusi herbal: Ekstrak Biji Anggur, Gotu Kola. [chatWithAdminButton]",
    "wasir": "Wasir adalah pembengkakan pembuluh darah di sekitar anus atau rektum. Penyebab: Sembelit, tekanan pada area rektum. Solusi herbal: Witch Hazel, Lidah Buaya. [chatWithAdminButton]",
    "prostatitis": "Prostatitis adalah peradangan pada kelenjar prostat. Penyebab: Infeksi bakteri. Solusi herbal: Saw Palmetto, Ekstrak Biji Labu. [chatWithAdminButton]",
    "endometriosis": "Endometriosis adalah kondisi di mana jaringan yang mirip dengan lapisan rahim tumbuh di luar rahim. Penyebab: Ketidakseimbangan hormon. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "sindrom iritasi usus": "Sindrom iritasi usus adalah gangguan pencernaan yang menyebabkan sakit perut, kembung, dan perubahan kebiasaan buang air besar. Penyebab: Stres, makanan tertentu. Solusi herbal: Peppermint, Jahe. [chatWithAdminButton]",
    "hipoglikemia": "Hipoglikemia adalah kondisi di mana kadar gula darah rendah. Penyebab: Obat diabetes, kurang makan. Solusi herbal: Ginseng, Kayu Manis. [chatWithAdminButton]",
    "sakit punggung": "Sakit punggung adalah rasa sakit di bagian belakang tubuh. Penyebab: Cedera, postur tubuh buruk. Solusi herbal: Jahe, Kunyit. [chatWithAdminButton]",
    "vertigo": "Vertigo adalah kondisi di mana Anda merasa seperti berputar atau lingkungan Anda berputar. Penyebab: Masalah telinga dalam. Solusi herbal: Jahe, Ginkgo Biloba. [chatWithAdminButton]",
    "migrain": "Migrain adalah sakit kepala parah yang sering disertai mual dan kepekaan terhadap cahaya. Penyebab: Stres, makanan tertentu. Solusi herbal: Peppermint, Jahe. [chatWithAdminButton]",
    "obesitas": "Obesitas adalah kondisi di mana seseorang memiliki lemak tubuh berlebih. Penyebab: Pola makan buruk, kurang aktivitas fisik. Solusi herbal: Teh Hijau, Kunyit. [chatWithAdminButton]",
    "kanker": "Kanker adalah penyakit di mana sel-sel tubuh tumbuh tidak terkendali. Penyebab: Genetik, gaya hidup. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "stroke": "Stroke adalah kondisi medis serius di mana suplai darah ke bagian otak terputus. Penyebab: Hipertensi, kolesterol tinggi. Solusi herbal: Daun Salam, Kunyit. [chatWithAdminButton]",
    "pilek": "Pilek adalah infeksi virus yang menyerang saluran pernapasan atas. Penyebab: Virus. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "penyakit jantung": "Penyakit jantung adalah kondisi yang mempengaruhi jantung. Penyebab: Hipertensi, kolesterol tinggi. Solusi herbal: Daun Salam, Bawang Putih. [chatWithAdminButton]",
    "sariawan": "Sariawan adalah luka kecil yang menyakitkan di dalam mulut. Penyebab: Infeksi, kekurangan nutrisi. Solusi herbal: Lidah Buaya, Madu. [chatWithAdminButton]",
    "kanker payudara": "Kanker payudara adalah jenis kanker yang berkembang di sel-sel payudara. Penyebab: Genetik, gaya hidup. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "osteoporosis": "Osteoporosis adalah kondisi di mana tulang menjadi lemah dan rapuh. Penyebab: Kekurangan kalsium, usia. Solusi herbal: Kalsium, Vitamin D. [chatWithAdminButton]",
    "psoriasis": "Psoriasis adalah kondisi kulit yang menyebabkan kulit merah, bersisik, dan gatal. Penyebab: Penyakit autoimun. Solusi herbal: Lidah Buaya, Kunyit. [chatWithAdminButton]",
    "penyakit ginjal": "Penyakit ginjal adalah kondisi di mana ginjal tidak berfungsi dengan baik. Penyebab: Diabetes, hipertensi. Solusi herbal: Daun Salam, Kunyit. [chatWithAdminButton]",
    "gangguan kecemasan": "Gangguan kecemasan adalah kondisi di mana seseorang merasa cemas atau khawatir berlebihan. Penyebab: Stres, genetik. Solusi herbal: Teh Chamomile, Lavender. [chatWithAdminButton]",
    "depresi": "Depresi adalah kondisi mental di mana seseorang merasa sedih, putus asa, atau tidak berharga. Penyebab: Stres, genetik. Solusi herbal: St. John's Wort, Ginseng. [chatWithAdminButton]",
    "penyakit parkinson": "Penyakit Parkinson adalah gangguan sistem saraf yang mempengaruhi gerakan. Penyebab: Genetik, lingkungan. Solusi herbal: Teh Hijau, Ginkgo Biloba. [chatWithAdminButton]",
    "multiple sclerosis": "Multiple sclerosis adalah penyakit di mana sistem kekebalan tubuh menyerang lapisan pelindung saraf. Penyebab: Penyakit autoimun. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "demam berdarah": "Demam berdarah adalah infeksi virus yang ditularkan oleh nyamuk. Penyebab: Virus Dengue. Solusi herbal: Daun Pepaya, Jambu Biji. [chatWithAdminButton]",
    "chikungunya": "Chikungunya adalah penyakit virus yang ditularkan oleh nyamuk. Penyebab: Virus Chikungunya. Solusi herbal: Daun Pepaya, Jambu Biji. [chatWithAdminButton]",
    "tuberkulosis": "Tuberkulosis adalah infeksi bakteri yang menyerang paru-paru. Penyebab: Bakteri Mycobacterium tuberculosis. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "kusta": "Kusta adalah infeksi bakteri kronis yang menyerang kulit dan saraf. Penyebab: Bakteri Mycobacterium leprae. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "herpes": "Herpes adalah infeksi virus yang menyebabkan luka di mulut atau alat kelamin. Penyebab: Virus Herpes Simplex. Solusi herbal: Lidah Buaya, Minyak Kelapa. [chatWithAdminButton]",
    "cacar air": "Cacar air adalah infeksi virus yang menyebabkan ruam gatal dan lepuhan. Penyebab: Virus Varicella-zoster. Solusi herbal: Lidah Buaya, Minyak Kelapa. [chatWithAdminButton]",
    "hepatitis B": "Hepatitis B adalah infeksi virus yang menyerang hati. Penyebab: Virus Hepatitis B. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "hepatitis C": "Hepatitis C adalah infeksi virus yang menyerang hati. Penyebab: Virus Hepatitis C. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "sifilis": "Sifilis adalah infeksi bakteri yang menyebar melalui kontak seksual. Penyebab: Bakteri Treponema pallidum. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "gonore": "Gonore adalah infeksi bakteri yang menyebar melalui kontak seksual. Penyebab: Bakteri Neisseria gonorrhoeae. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "klamidia": "Klamidia adalah infeksi bakteri yang menyebar melalui kontak seksual. Penyebab: Bakteri Chlamydia trachomatis. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "infeksi jamur": "Infeksi jamur adalah infeksi yang disebabkan oleh jamur. Penyebab: Jamur. Solusi herbal: Minyak Kelapa, Bawang Putih. [chatWithAdminButton]",
    "infeksi bakteri": "Infeksi bakteri adalah infeksi yang disebabkan oleh bakteri. Penyebab: Bakteri. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "infeksi virus": "Infeksi virus adalah infeksi yang disebabkan oleh virus. Penyebab: Virus. Solusi herbal: Jahe, Kunyit. [chatWithAdminButton]",
    "infeksi parasit": "Infeksi parasit adalah infeksi yang disebabkan oleh parasit. Penyebab: Parasit. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "radang sendi": "Radang sendi adalah peradangan pada sendi. Penyebab: Penyakit autoimun, cedera. Solusi herbal: Jahe, Kunyit. [chatWithAdminButton]",
    "katarak": "Katarak adalah kondisi di mana lensa mata menjadi keruh. Penyebab: Usia, genetik. Solusi herbal: Bilberry, Ginkgo Biloba. [chatWithAdminButton]",
    "glaukoma": "Glaukoma adalah kondisi di mana tekanan di dalam mata meningkat, merusak saraf optik. Penyebab: Tekanan mata tinggi. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "rabun jauh": "Rabun jauh adalah kondisi di mana objek jauh terlihat kabur. Penyebab: Genetik, bentuk bola mata. Solusi herbal: Wortel, Bilberry. [chatWithAdminButton]",
    "rabun dekat": "Rabun dekat adalah kondisi di mana objek dekat terlihat kabur. Penyebab: Usia, genetik. Solusi herbal: Wortel, Bilberry. [chatWithAdminButton]",
    "kebutaan": "Kebutaan adalah kondisi di mana seseorang kehilangan penglihatan. Penyebab: Penyakit mata, cedera. Solusi herbal: Wortel, Bilberry. [chatWithAdminButton]",
    "tinnitus": "Tinnitus adalah kondisi di mana seseorang mendengar bunyi dengung di telinga. Penyebab: Kerusakan telinga, gangguan saraf. Solusi herbal: Ginkgo Biloba, Jahe. [chatWithAdminButton]",
    "gangguan pendengaran": "Gangguan pendengaran adalah kondisi di mana seseorang kehilangan pendengaran. Penyebab: Usia, paparan suara keras. Solusi herbal: Ginkgo Biloba, Jahe. [chatWithAdminButton]",
    "sinusitis": "Sinusitis adalah peradangan pada sinus. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "faringitis": "Faringitis adalah peradangan pada faring. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Madu, Jahe. [chatWithAdminButton]",
    "laringitis": "Laringitis adalah peradangan pada laring. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Madu, Jahe. [chatWithAdminButton]",
    "tonsilitis": "Tonsilitis adalah peradangan pada tonsil. Penyebab: Infeksi virus atau bakteri. Solusi herbal: Madu, Jahe. [chatWithAdminButton]",
    "ulcer": "Ulkus adalah luka terbuka di dalam perut atau usus. Penyebab: Infeksi bakteri, penggunaan NSAID. Solusi herbal: Kunyit, Temulawak. [chatWithAdminButton]",
    "konstipasi": "Konstipasi adalah kondisi di mana seseorang mengalami kesulitan buang air besar. Penyebab: Kurang serat, dehidrasi. Solusi herbal: Daun Jambu Biji, Kunyit. [chatWithAdminButton]",
    "gagal ginjal": "Gagal ginjal adalah kondisi di mana ginjal tidak berfungsi dengan baik. Penyebab: Diabetes, hipertensi. Solusi herbal: Daun Salam, Kunyit. [chatWithAdminButton]",
    "pneumonia": "Pneumonia adalah infeksi yang menyebabkan peradangan pada kantung udara di satu atau kedua paru-paru. Penyebab: Bakteri, virus. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "bronkopneumonia": "Bronkopneumonia adalah jenis pneumonia yang mempengaruhi bronkus dan alveoli di paru-paru. Penyebab: Bakteri, virus. Solusi herbal: Jahe, Madu. [chatWithAdminButton]",
    "fibrosis kistik": "Fibrosis kistik adalah penyakit genetik yang mempengaruhi paru-paru dan pencernaan. Penyebab: Genetik. Solusi herbal: Daun Salam, Jahe. [chatWithAdminButton]",
    "hepatomegali": "Hepatomegali adalah pembesaran hati. Penyebab: Penyakit hati, infeksi. Solusi herbal: Daun Sambiloto, Temulawak. [chatWithAdminButton]",
    "limfoma": "Limfoma adalah kanker yang dimulai di sel-sel sistem limfatik. Penyebab: Genetik, infeksi. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "leukemia": "Leukemia adalah kanker yang mempengaruhi darah dan sumsum tulang. Penyebab: Genetik, radiasi. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "mioma": "Mioma adalah tumor jinak yang berkembang di dalam atau sekitar rahim. Penyebab: Hormon, genetik. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "fibroid": "Fibroid adalah pertumbuhan non-kanker di rahim. Penyebab: Hormon, genetik. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "prolaps uterus": "Prolaps uterus adalah kondisi di mana rahim turun ke dalam atau keluar dari vagina. Penyebab: Kelemahan otot dasar panggul. Solusi herbal: Kegel exercise, Kunyit. [chatWithAdminButton]",
    "kanker serviks": "Kanker serviks adalah kanker yang berkembang di leher rahim. Penyebab: Infeksi HPV. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "polip": "Polip adalah pertumbuhan jaringan yang tidak normal. Penyebab: Hormon, inflamasi. Solusi herbal: Kunyit, Jahe. [chatWithAdminButton]",
    "kanker ovarium": "Kanker ovarium adalah kanker yang berkembang di ovarium. Penyebab: Genetik, hormon. Solusi herbal: Kunyit, Sirsak. [chatWithAdminButton]",
    "kanker prostat": "Kanker prostat adalah kanker yang berkembang di prostat. Penyebab: Genetik, usia. Solusi herbal: Saw Palmetto, Ekstrak Biji Labu. [chatWithAdminButton]",
    "penyakit alzheimer": "Penyakit Alzheimer adalah penyakit progresif yang merusak ingatan dan fungsi mental lainnya. Penyebab: Genetik, usia. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "skizofrenia": "Skizofrenia adalah gangguan mental yang mempengaruhi cara seseorang berpikir, merasakan, dan berperilaku. Penyebab: Genetik, lingkungan. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "bipolar": "Bipolar adalah gangguan mental yang menyebabkan perubahan mood ekstrem. Penyebab: Genetik, stres. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "autisme": "Autisme adalah gangguan perkembangan yang mempengaruhi komunikasi dan perilaku. Penyebab: Genetik, lingkungan. Solusi herbal: Omega-3, Ginkgo Biloba. [chatWithAdminButton]",
    "asperger": "Asperger adalah bentuk autisme yang mempengaruhi kemampuan sosial. Penyebab: Genetik, lingkungan. Solusi herbal: Omega-3, Ginkgo Biloba. [chatWithAdminButton]",
    "adhd": "ADHD adalah gangguan yang mempengaruhi perhatian, kontrol impuls, dan aktivitas. Penyebab: Genetik, lingkungan. Solusi herbal: Omega-3, Ginkgo Biloba. [chatWithAdminButton]",
    "down syndrome": "Down syndrome adalah kondisi genetik yang disebabkan oleh kelebihan kromosom 21. Penyebab: Genetik. Solusi herbal: Omega-3, Ginkgo Biloba. [chatWithAdminButton]",
    "penyakit huntington": "Penyakit Huntington adalah gangguan genetik yang menyebabkan kerusakan progresif pada sel-sel saraf di otak. Penyebab: Genetik. Solusi herbal: Ginkgo Biloba, Teh Hijau. [chatWithAdminButton]",
    "distrofi otot": "Distrofi otot adalah kelompok penyakit genetik yang menyebabkan otot melemah dan kehilangan massa. Penyebab: Genetik. Solusi herbal: Omega-3, Ginkgo Biloba. [chatWithAdminButton]",
    "anoreksia": "Anoreksia adalah gangguan makan yang ditandai dengan penolakan untuk makan dan ketakutan akan kenaikan berat badan. Penyebab: Psikologis, genetik. Solusi herbal: Ginseng, Teh Hijau. [chatWithAdminButton]",
    "bulimia": "Bulimia adalah gangguan makan yang ditandai dengan makan berlebihan dan kemudian melakukan tindakan untuk mencegah kenaikan berat badan. Penyebab: Psikologis, genetik. Solusi herbal: Ginseng, Teh Hijau. [chatWithAdminButton]",
    "kecanduan alkohol": "Kecanduan alkohol adalah ketergantungan pada alkohol. Penyebab: Genetik, lingkungan. Solusi herbal: Milk Thistle, Ginseng. [chatWithAdminButton]",
    "kecanduan narkoba": "Kecanduan narkoba adalah ketergantungan pada obat-obatan terlarang. Penyebab: Genetik, lingkungan. Solusi herbal: Milk Thistle, Ginseng. [chatWithAdminButton]",
    "kecanduan nikotin": "Kecanduan nikotin adalah ketergantungan pada produk tembakau. Penyebab: Genetik, lingkungan. Solusi herbal: Ginseng, Teh Hijau. [chatWithAdminButton]",
  };
  
  export const getChatbotResponseHelper = async (text) => {
    // Simulating a delay for response
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Convert text to lowercase for case insensitive matching
    const lowerText = text.toLowerCase();
  
    // Find keyword in the text
    const foundKeyword = Object.keys(responses).find(keyword => lowerText.includes(keyword));
  
    // Return response if keyword is found, otherwise return default message
    return foundKeyword ? responses[foundKeyword] : "I'm sorry, I don't understand. [chatWithAdminButton]";
  };
  export const truncateText = (text, maxWords) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    const words = text.split(" ");
    if (words.length <= maxWords) return text; // Return the original text if it's shorter than maxWords
    
    // Return truncated text with ellipsis
    return words.slice(0, maxWords).join(" ") + "...";
  };
  