import { Question, EraId, EducationTier } from '../types';

export const QUIZ_DATABASE: Question[] = [
  // ==========================================
  // ERA 1: KERAJAAN HINDU-BUDDHA
  // ==========================================
  // --- SD ---
  {
    id: 'hb-sd-1',
    eraId: 'hindu-buddha',
    tier: 'SD',
    topic: 'Kerajaan Tertua',
    visualHint: '🗿',
    question: 'Apa nama kerajaan Hindu tertua di Indonesia yang terletak di tepi Sungai Mahakam, Kalimantan Timur?',
    options: ['Kerajaan Kutai', 'Kerajaan Majapahit', 'Kerajaan Mataram'],
    correctAnswer: 0,
    explanation: 'Kerajaan Kutai Martapura di Kalimantan Timur berdiri sekitar abad ke-4 Masehi dan dibuktikan dengan penemuan prasasti Yupa.'
  },
  {
    id: 'hb-sd-2',
    eraId: 'hindu-buddha',
    tier: 'SD',
    topic: 'Candi Megah',
    visualHint: '🛕',
    question: 'Candi Borobudur yang megah di Magelang, Jawa Tengah dibangun pada masa dinasti/wangsa apa?',
    options: ['Wangsa Sanjaya', 'Wangsa Syailendra', 'Wangsa Isyana'],
    correctAnswer: 1,
    explanation: 'Candi Borobudur yang bercorak Buddha Mahayana dibangun oleh dinasti/wangsa Syailendra pada abad ke-8 hingga ke-9 Masehi.'
  },
  {
    id: 'hb-sd-3',
    eraId: 'hindu-buddha',
    tier: 'SD',
    topic: 'Tokoh Pemersatu',
    visualHint: '🗡️',
    question: 'Mahapatih Majapahit yang mengucapkan "Sumpah Palapa" untuk menyatukan Nusantara bernama...',
    options: ['Hayam Wuruk', 'Gajah Mada', 'Raden Wijaya'],
    correctAnswer: 1,
    explanation: 'Mahapatih Gajah Mada bersumpah tidak akan menikmati kenikmatan duniawi (amukti palapa) sebelum menyatukan wilayah Nusantara di bawah naungan Majapahit.'
  },
  {
    id: 'hb-sd-4',
    eraId: 'hindu-buddha',
    tier: 'SD',
    topic: 'Prasasti Tarumanegara',
    visualHint: '👣',
    question: 'Prasasti peninggalan Kerajaan Tarumanegara yang memiliki lukisan sepasang telapak kaki Raja Purnawarman adalah prasasti...',
    options: ['Prasasti Ciaruteun', 'Prasasti Kedukan Bukit', 'Prasasti Tugu'],
    correctAnswer: 0,
    explanation: 'Prasasti Ciaruteun di Bogor menggambarkan telapak kaki Raja Purnawarman yang disamakan dengan telapak kaki Dewa Wisnu.'
  },

  // --- SMP ---
  {
    id: 'hb-smp-1',
    eraId: 'hindu-buddha',
    tier: 'SMP',
    topic: 'Kerajaan Sriwijaya',
    visualHint: '🚢',
    question: 'Faktor geografis utama yang mendorong Kerajaan Sriwijaya berkembang pesat menjadi pusat kemaritiman dan perdagangan internasional adalah...',
    options: [
      'Memiliki tambang emas terbesar di Asia Tenggara',
      'Menguasai Selat Malaka dan Selat Sunda yang strategis',
      'Memiliki lahan pertanian sawah bertingkat terluas',
      'Tidak pernah diserang oleh armada militer kerajaan asing'
    ],
    correctAnswer: 1,
    explanation: 'Sriwijaya mengendalikan simpul pelayaran jalur sutra laut antara India dan Tiongkok melalui Selat Malaka dan Selat Sunda.'
  },
  {
    id: 'hb-smp-2',
    eraId: 'hindu-buddha',
    tier: 'SMP',
    topic: 'Kitab Sutasoma',
    visualHint: '📖',
    question: 'Semboyan negara kita "Bhinneka Tunggal Ika" berasal dari karya sastra zaman Majapahit, yaitu...',
    options: [
      'Kitab Negarakretagama karangan Mpu Prapanca',
      'Kitab Arjunawiwaha karangan Mpu Kanwa',
      'Kitab Sutasoma karangan Mpu Tantular',
      'Kitab Bharatayuddha karangan Mpu Sedah dan Panuluh'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat lengkap "Bhinneka Tunggal Ika tan hana dharma mangrwa" tertulis dalam Kitab Sutasoma karya Mpu Tantular pada masa Raja Hayam Wuruk.'
  },
  {
    id: 'hb-smp-3',
    eraId: 'hindu-buddha',
    tier: 'SMP',
    topic: 'Toleransi Mataram Kuno',
    visualHint: '⛩️',
    question: 'Bukti kuat adanya toleransi beragama dan akulturasi antara pemeluk Hindu dan Buddha di Kerajaan Mataram Kuno adalah perkawinan antara...',
    options: [
      'Rakai Pikatan (Hindu Sanjaya) dengan Pramodhawardhani (Buddha Syailendra)',
      'Airlangga dengan putri Raja Dharmawangsa Teguh',
      'Raden Wijaya dengan Gayatri Rajapatni',
      'Kertanegara dengan putri Sriwijaya'
    ],
    correctAnswer: 0,
    explanation: 'Pernikahan Rakai Pikatan dari Dinasti Sanjaya dan Pramodhawardhani dari Dinasti Syailendra memadukan dua keluarga dengan keyakinan berbeda dan mempercepat pembangunan Candi Prambanan dan Candi Plaosan.'
  },

  // --- SMA ---
  {
    id: 'hb-sma-1',
    eraId: 'hindu-buddha',
    tier: 'SMA',
    topic: 'Teori Masuknya Hindu-Buddha',
    sourceQuote: '"Penulisan prasasti berbahasa Sanskerta dengan aksara Pallawa yang rumit hanya dikuasai oleh kasta tertinggi pendeta keagamaan."',
    question: 'Berdasarkan analisis bukti prasasti yupa berbahasa Sanskerta dan tata ritual Vratyastoma, teori masuknya pengaruh Hindu-Buddha yang paling diperkuat oleh fakta tersebut adalah...',
    options: [
      'Teori Waisya (keterlibatan aktif pedagang antar samudra)',
      'Teori Brahmana (diundang langsung oleh para kepala suku lokal)',
      'Teori Ksatria (pelarian prajurit perang dari benua India)',
      'Teori Sudra (migrasi kaum buruh kasar mencari kehidupan baru)',
      'Teori Kolonial (penaklukan wilayah militer imperium India)'
    ],
    correctAnswer: 1,
    explanation: 'Teori Brahmana yang dipelopori J.C. van Leur berargumen bahwa hanya kaum Brahmana yang memahami kitab Veda, tata ritual keagamaan rumit, dan bahasa Sanskerta tinggi.'
  },
  {
    id: 'hb-sma-2',
    eraId: 'hindu-buddha',
    tier: 'SMA',
    topic: 'Ekspedisi Pamalayu & Geopolitik',
    sourceQuote: '"Menjalin persekutuan membendung ekspansi imperium Mongol Dinasti Yuan pimpinan Kubilai Khan."',
    question: 'Tujuan geopolitik utama Raja Kertanegara dari Singasari mengirim Ekspedisi Pamalayu ke Kerajaan Melayu (Dharmasraya) pada tahun 1275 M adalah...',
    options: [
      'Menaklukkan bajak laut di sekitar Selat Malaka',
      'Membendung ekspansi Dinasti Yuan (Mongol) ke Asia Tenggara',
      'Mencari sumber rempah cengkeh di kepulauan timur',
      'Memindahkan ibu kota Singasari ke Pulau Sumatera',
      'Memperluas sistem kasta ke wilayah Melayu kuno'
    ],
    correctAnswer: 1,
    explanation: 'Ekspedisi Pamalayu dilakukan Kertanegara untuk merangkul kerajaan di Sumatera sebagai benteng pertahanan bersama menghadapi ancaman ekspansionisme militer Kubilai Khan dari Tiongkok.'
  },

  // ==========================================
  // ERA 2: KESULTANAN ISLAM
  // ==========================================
  // --- SD ---
  {
    id: 'ki-sd-1',
    eraId: 'kesultanan-islam',
    tier: 'SD',
    topic: 'Kerajaan Islam Pertama',
    visualHint: '👑',
    question: 'Kerajaan Islam pertama di kepulauan Indonesia yang terletak di ujung utara Pulau Sumatera adalah...',
    options: ['Kesultanan Samudera Pasai', 'Kesultanan Demak', 'Kesultanan Banten'],
    correctAnswer: 0,
    explanation: 'Samudera Pasai didirikan oleh Sultan Malik al-Saleh (Meurah Silu) pada abad ke-13 di Lhokseumawe, Aceh.'
  },
  {
    id: 'ki-sd-2',
    eraId: 'kesultanan-islam',
    tier: 'SD',
    topic: 'Wali Songo',
    visualHint: '🎭',
    question: 'Wali Songo yang terkenal menyebarkan ajaran Islam di Pulau Jawa melalui media kesenian wayang kulit dan tembang adalah...',
    options: ['Sunan Bonang', 'Sunan Kalijaga', 'Sunan Ampel'],
    correctAnswer: 1,
    explanation: 'Sunan Kalijaga berdakwah dengan pendekatan budaya lokal yang luhur, seperti pertunjukan wayang kulit bernuansa Islami dan tembang Ilir-Ilir.'
  },
  {
    id: 'ki-sd-3',
    eraId: 'kesultanan-islam',
    tier: 'SD',
    topic: 'Pahlawan Maritim Islam',
    visualHint: '🐓',
    question: 'Raja Kesultanan Gowa-Tallo di Sulawesi Selatan yang dijuluki Belanda sebagai "Ayam Jantan dari Timur" adalah...',
    options: ['Sultan Ageng Tirtayasa', 'Sultan Hasanuddin', 'Sultan Baabullah'],
    correctAnswer: 1,
    explanation: 'Sultan Hasanuddin mendapat julukan De Haantjes van Het Oosten karena keberaniannya menentang monopoli perdagangan VOC di perairan Indonesia timur.'
  },

  // --- SMP ---
  {
    id: 'ki-smp-1',
    eraId: 'kesultanan-islam',
    tier: 'SMP',
    topic: 'Perang Saudara & Perjanjian Bongaya',
    visualHint: '📜',
    question: 'Kekalahan Kesultanan Gowa dalam menghadapi VOC akibat pengkhianatan Aru Palaka dari Bone berujung pada penandatanganan perjanjian yang sangat merugikan, yaitu...',
    options: [
      'Perjanjian Giyanti 1755',
      'Perjanjian Bongaya 1667',
      'Perjanjian Salatiga 1757',
      'Perjanjian Saragosa 1529'
    ],
    correctAnswer: 1,
    explanation: 'Perjanjian Bongaya 1667 memaksa Sultan Hasanuddin mengakui monopoli dagang VOC di Makassar dan merobohkan benteng-benteng pertahanan kecuali Somba Opu.'
  },
  {
    id: 'ki-smp-2',
    eraId: 'kesultanan-islam',
    tier: 'SMP',
    topic: 'Serangan Sultan Agung ke Batavia',
    visualHint: '🏰',
    question: 'Faktor utama yang menyebabkan kegagalan serangan tentara Kesultanan Mataram di bawah Sultan Agung ke markas VOC di Batavia pada tahun 1628 dan 1629 adalah...',
    options: [
      'Senjata pasukan Mataram ditolak oleh rakyat Sunda Kelapa',
      'Lumbung persediaan beras tentara Mataram dibakar oleh mata-mata VOC',
      'Pasukan Mataram tidak memiliki strategi tempur darat',
      'VOC dibantu oleh armada Portugis dari Malaka'
    ],
    correctAnswer: 1,
    explanation: 'VOC berhasil membakar lumbung-lumbung perbekalan beras Mataram di Karawang dan Tegal sehingga pasukan kehabisan logistik pangan serta terjangkit wabah penyakit.'
  },
  {
    id: 'ki-smp-3',
    eraId: 'kesultanan-islam',
    tier: 'SMP',
    topic: 'Perjanjian Giyanti 1755',
    visualHint: '⚖️',
    question: 'Perjanjian Giyanti tahun 1755 memecah Kerajaan Mataram Islam menjadi dua wilayah kekuasaan, yaitu...',
    options: [
      'Kasunanan Surakarta dan Kasultanan Yogyakarta',
      'Kesultanan Cirebon dan Kesultanan Banten',
      'Praja Mangkunegaran dan Kadipaten Pakualaman',
      'Kesultanan Demak dan Kesultanan Pajang'
    ],
    correctAnswer: 0,
    explanation: 'Perjanjian Giyanti membagi wilayah Mataram menjadi Kasunanan Surakarta (Pakubuwana III) dan Kasultanan Yogyakarta (Pangeran Mangkubumi/Sultan Hamengkubuwono I).'
  },

  // --- SMA ---
  {
    id: 'ki-sma-1',
    eraId: 'kesultanan-islam',
    tier: 'SMA',
    topic: 'Islamisasi & Saluran Akulturasi',
    sourceQuote: '"Tradisi Sekaten, Grebeg Maulud, serta atap tumpang pada Masjid Agung Demak."',
    question: 'Keberhasilan penyebaran Islam secara damai dan cepat di pedalaman Nusantara ditinjau dari perspektif antropologi budaya terutama didukung oleh strategi...',
    options: [
      'Memaksakan syariat secara kaku dan meruntuhkan tradisi leluhur',
      'Sinkretisme destruktif yang menghapus ajaran tauhid murni',
      'Akulturasi kultural adaptif tanpa menghilangkan esensi ajaran tauhid',
      'Penaklukan militer secara ekspansif ke seluruh desa agraris',
      'Monopoli jalur pelabuhan dan memutus hubungan dengan luar negeri'
    ],
    correctAnswer: 2,
    explanation: 'Para ulama dan wali menggunakan pendekatan akulturasi budaya, mengintegrasikan kearifan arsitektur lokal (atap tumpang candi) dan seni gamelan/wayang sehingga ajaran diterima sukarela.'
  },

  // ==========================================
  // ERA 3: KOLONIALISME & PERLAWANAN DAERAH
  // ==========================================
  // --- SD ---
  {
    id: 'kol-sd-1',
    eraId: 'kolonialisme',
    tier: 'SD',
    topic: 'Pahlawan Maluku',
    visualHint: '💵',
    question: 'Pahlawan nasional asal Maluku yang memimpin perlawanan merebut Benteng Duurstede dan fotonya pernah menghiasi uang kertas Rp1.000 adalah...',
    options: ['Pangeran Diponegoro', 'Kapitan Pattimura', 'Tuanku Imam Bonjol'],
    correctAnswer: 1,
    explanation: 'Kapitan Pattimura (Thomas Matulessy) memimpin perjuangan heroik rakyat Saparua dan Maluku melawan penindasan penjajah Belanda pada tahun 1817.'
  },
  {
    id: 'kol-sd-2',
    eraId: 'kolonialisme',
    tier: 'SD',
    topic: 'Emansipasi Wanita',
    visualHint: '💌',
    question: 'Pahlawan wanita pelopor emansipasi wanita Indonesia asal Jepara yang mengumpulkan surat-suratnya dalam buku "Habis Gelap Terbitlah Terang" adalah...',
    options: ['R.A. Kartini', 'Cut Nyak Dien', 'Dewi Sartika'],
    correctAnswer: 0,
    explanation: 'Raden Ajeng Kartini memperjuangkan hak pendidikan bagi perempuan dan surat-surat korespondensinya dibukukan oleh Mr. J.H. Abendanon.'
  },
  {
    id: 'kol-sd-3',
    eraId: 'kolonialisme',
    tier: 'SD',
    topic: 'Perang Diponegoro',
    visualHint: '🐎',
    question: 'Pangeran Diponegoro memimpin perlawanan besar melawan Belanda di tanah Jawa yang berlangsung selama kurun waktu...',
    options: ['Tahun 1945 - 1950', 'Tahun 1825 - 1830', 'Tahun 1908 - 1928'],
    correctAnswer: 1,
    explanation: 'Perang Diponegoro (Perang Jawa) berkecamuk antara tahun 1825 hingga 1830, menguras hampir seluruh kas keuangan pemerintah kolonial Hindia Belanda.'
  },

  // --- SMP ---
  {
    id: 'kol-smp-1',
    eraId: 'kolonialisme',
    tier: 'SMP',
    topic: 'Taktik Benteng Stelsel',
    visualHint: '🧱',
    question: 'Taktik militer yang diterapkan Jenderal De Kock untuk mempersempit ruang gerak perang gerilya Pangeran Diponegoro adalah...',
    options: [
      'Taktik Perang Kilat (Blitzkrieg)',
      'Taktik Benteng Stelsel (Benteng Terpadu)',
      'Taktik Bumi Hangus Kota',
      'Taktik Devide et Impera maritim'
    ],
    correctAnswer: 1,
    explanation: 'Benteng Stelsel didirikan di setiap daerah yang dikuasai dan dihubungkan dengan jalan raya serta kavaleri patroli untuk mengepung dan memutus komunikasi pasukan Diponegoro.'
  },
  {
    id: 'kol-smp-2',
    eraId: 'kolonialisme',
    tier: 'SMP',
    topic: 'Tanam Paksa (Cultuurstelsel)',
    visualHint: '☕',
    question: 'Sistem Tanam Paksa (Cultuurstelsel) yang mencengkeram rakyat petani di Jawa dicetuskan oleh Gubernur Jenderal...',
    options: [
      'Herman Willem Daendels',
      'Johannes van den Bosch',
      'Thomas Stamford Raffles',
      'Jan Pieterszoon Coen'
    ],
    correctAnswer: 1,
    explanation: 'Gubernur Jenderal Johannes van den Bosch memberlakukan Cultuurstelsel pada tahun 1830 guna mengisi kas negeri Belanda yang defisit besar akibat Perang Diponegoro dan Perang Belgia.'
  },
  {
    id: 'kol-smp-3',
    eraId: 'kolonialisme',
    tier: 'SMP',
    topic: 'Perang Padri',
    visualHint: '⛰️',
    question: 'Perang Padri di Sumatera Barat (1821-1837) yang dipimpin Tuanku Imam Bonjol awalnya merupakan perselisihan internal antara...',
    options: [
      'Kaum Padri (Ulama pemurni ajaran) dengan Kaum Adat',
      'Kaum Bangsawan dengan Kaum Pedagang Pesisir',
      'Kaum Nelayan dengan Tentara VOC Portugis',
      'Kerajaan Pagaruyung dengan Kesultanan Aceh'
    ],
    correctAnswer: 0,
    explanation: 'Konflik internal antara Kaum Padri dan Kaum Adat dimanfaatkan Belanda lewat campur tangan militer, hingga akhirnya kedua kaum bersatu saat menyadari musuh sebenarnya adalah penjajah kolonial.'
  },

  // --- SMA ---
  {
    id: 'kol-sma-1',
    eraId: 'kolonialisme',
    tier: 'SMA',
    topic: 'Politik Etis & Trilogi van Deventer',
    sourceQuote: '"Een Eereschuld: Belanda memiliki utang kehormatan moral atas kekayaan yang telah disedot dari bumi bumiputera."',
    question: 'Tulisan C.Th. van Deventer di majalah De Gids (1899) mendorong ratu Belanda melahirkan Politik Etis (Ethische Politiek) dengan tiga pilar (Trilogi van Deventer), yaitu...',
    options: [
      'Asimilasi, Emansipasi, dan Kolonisasi',
      'Eksploitasi, Agraria, dan Monopoli',
      'Irigasi (pengairan), Edukasi (pendidikan), dan Emigrasi (transmigrasi)',
      'Liberalisasi, Industrialisasi, dan Sentralisasi kekuasaan',
      'Devide et impera, Cultuurstelsel, dan Preangerstelsel'
    ],
    correctAnswer: 2,
    explanation: 'Trilogi Van Deventer memuat Irigasi untuk pertanian, Edukasi untuk mencetak tenaga terdidik, dan Emigrasi (perpindahan penduduk) yang kelak secara tak sengaja melahirkan kaum intelektual pergerakan nasional.'
  },

  // ==========================================
  // ERA 4: SUMPAH PEMUDA & KEMERDEKAAN
  // ==========================================
  // --- SD ---
  {
    id: 'sp-sd-1',
    eraId: 'sumpah-pemuda',
    tier: 'SD',
    topic: 'Kongres Pemuda II',
    visualHint: '📜',
    question: 'Kongres Pemuda II yang melahirkan ikrar bersejarah Sumpah Pemuda diselenggarakan pada tanggal...',
    options: ['20 Mei 1908', '28 Oktober 1928', '17 Agustus 1945'],
    correctAnswer: 1,
    explanation: 'Tanggal 28 Oktober 1928, para pemuda mengikrarkan satu nusa, satu bangsa, dan menjunjung bahasa persatuan bahasa Indonesia.'
  },
  {
    id: 'sp-sd-2',
    eraId: 'sumpah-pemuda',
    tier: 'SD',
    topic: 'Proklamator Indonesia',
    visualHint: '🇮🇩',
    question: 'Siapakah dua tokoh pahlawan yang menandatangani naskah Proklamasi Kemerdekaan atas nama bangsa Indonesia?',
    options: [
      'Ir. Soekarno dan Drs. Moh. Hatta',
      'Bung Tomo dan Jenderal Soedirman',
      'Ki Hajar Dewantara dan KH Agus Salim'
    ],
    correctAnswer: 0,
    explanation: 'Atas usulan Sukarni, naskah Proklamasi ditandatangani oleh Ir. Soekarno dan Drs. Mohammad Hatta atas nama bangsa Indonesia.'
  },
  {
    id: 'sp-sd-3',
    eraId: 'sumpah-pemuda',
    tier: 'SD',
    topic: 'Bendera Pusaka',
    visualHint: '🚩',
    question: 'Siapakah yang menjahit Bendera Pusaka Sang Saka Merah Putih yang dikibarkan saat proklamasi kemerdekaan 17 Agustus 1945?',
    options: ['Ibu Fatmawati', 'Ibu Kartini', 'Cut Meutia'],
    correctAnswer: 0,
    explanation: 'Ibu Fatmawati, istri Bung Karno, menjahit bendera Sang Saka Merah Putih dari bahan katun Jepang.'
  },

  // --- SMP ---
  {
    id: 'sp-smp-1',
    eraId: 'sumpah-pemuda',
    tier: 'SMP',
    topic: 'Peristiwa Rengasdengklok',
    visualHint: '🛖',
    question: 'Tujuan utama golongan muda (Wikana, Chaerul Saleh, Sukarni) mengasingkan Soekarno dan Hatta ke Rengasdengklok pada 16 Agustus 1945 adalah...',
    options: [
      'Menyandera tokoh senior untuk menuntut kenaikan jabatan kabinet',
      'Menjauhkan Soekarno-Hatta dari pengaruh dan intervensi tentara Jepang',
      'Menghindari serangan tentara Sekutu yang sudah tiba di Jakarta',
      'Meminta perlindungan dari bupati dan kepolisian lokal'
    ],
    correctAnswer: 1,
    explanation: 'Golongan muda mendesak proklamasi segera diproklamasikan tanpa menunggu sidang janji kemerdekaan dari badan PPKI buatan Jepang.'
  },
  {
    id: 'sp-smp-2',
    eraId: 'sumpah-pemuda',
    tier: 'SMP',
    topic: 'Rumusan Dasar Negara (BPUPKI)',
    visualHint: '🏛️',
    question: 'Pidato bersejarah Ir. Soekarno pada tanggal 1 Juni 1945 di hadapan sidang BPUPKI memperingati hari lahir...',
    options: [
      'Undang-Undang Dasar 1945',
      'Pancasila',
      'Piagam Jakarta',
      'Konstitusi RIS'
    ],
    correctAnswer: 1,
    explanation: 'Pada 1 Juni 1945, Soekarno menyampaikan gagasan dasar negara yang dinamainya "Pancasila", dengan prinsip kebangsaan, kemanusiaan, mufakat/demokrasi, kesejahteraan sosial, dan ketuhanan.'
  },
  {
    id: 'sp-smp-3',
    eraId: 'sumpah-pemuda',
    tier: 'SMP',
    topic: 'Organisasi Modern Pertama',
    visualHint: '🩺',
    question: 'Budi Utomo yang didirikan pada 20 Mei 1908 oleh dr. Soetomo dan para pelajar STOVIA diperingati setiap tahun sebagai...',
    options: [
      'Hari Pahlawan',
      'Hari Kebangkitan Nasional',
      'Hari Pendidikan Nasional',
      'Hari Kesaktian Pancasila'
    ],
    correctAnswer: 1,
    explanation: 'Kelahiran Budi Utomo 20 Mei 1908 menandai peralihan bentuk perjuangan dari kedaerahan bersenjata fisik ke perjuangan modern berbasis organisasi dan diplomasi intelektual.'
  },

  // --- SMA ---
  {
    id: 'sp-sma-1',
    eraId: 'sumpah-pemuda',
    tier: 'SMA',
    topic: 'Perubahan Piagam Jakarta',
    sourceQuote: '"Tujuh kata: dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya diganti demi keutuhan persatuan nasional."',
    question: 'Keputusan para pendiri bangsa mencoret klausul tujuh kata Piagam Jakarta pada tanggal 18 Agustus 1945 mencerminkan nilai historiografi...',
    options: [
      'Keinginan mendirikan negara yang memusuhi agama',
      'Kedewasaan politik mengutamakan integrasi nasional kepulauan timur',
      'Desakan sepihak dari otoritas militer pendudukan Jepang',
      'Taktik mengulur waktu menunggu tentara Sekutu mendarat',
      'Ketiadaan pemikir hukum ketatanegaraan yang berkompeten'
    ],
    correctAnswer: 1,
    explanation: 'Mohammad Hatta menerima aspirasi dari tokoh-tokoh Indonesia timur melalui opsir AL Kaigun, dan bersama tokoh Islam (Ki Bagus Hadikusumo, Wahid Hasyim, Kasman Singodimedjo) berbesar hati menyepakati Ketuhanan Yang Maha Esa.'
  },

  // ==========================================
  // ERA 5: MEMPERTAHANKAN KEMERDEKAAN
  // ==========================================
  // --- SD ---
  {
    id: 'pk-sd-1',
    eraId: 'kemerdekaan',
    tier: 'SD',
    topic: 'Hari Pahlawan Surabaya',
    visualHint: '📻',
    question: 'Tokoh pemuda yang membakar semangat arek-arek Suroboyo melalui siaran radio dalam Pertempuran 10 November 1945 adalah...',
    options: ['Bung Tomo (Sutomo)', 'Mohammad Toha', 'Sutan Sjahrir'],
    correctAnswer: 0,
    explanation: 'Pidato berapi-api Bung Tomo dengan pekikan takbir dan merdeka membakar tekad rakyat Jawa Timur mempertahankan Surabaya dari gempuran tentara Sekutu/Inggris.'
  },
  {
    id: 'pk-sd-2',
    eraId: 'kemerdekaan',
    tier: 'SD',
    topic: 'Bandung Lautan Api',
    visualHint: '🔥',
    question: 'Peristiwa pembumihangusan bagian selatan Kota Bandung oleh pejuang dan rakyat agar tidak dijadikan markas tentara Sekutu dikenal sebagai...',
    options: ['Palagan Ambarawa', 'Bandung Lautan Api', 'Medan Area'],
    correctAnswer: 1,
    explanation: 'Pada 23-24 Maret 1946, rakyat dan TRI membumihanguskan Bandung selatan dalam peristiwa heroik yang menginspirasi lagu Halo-Halo Bandung.'
  },
  {
    id: 'pk-sd-3',
    eraId: 'kemerdekaan',
    tier: 'SD',
    topic: 'Panglima Gerilya',
    visualHint: '🪖',
    question: 'Panglima TNI yang tetap memimpin perang gerilya menembus hutan rimba meski sedang menderita sakit paru-paru parah adalah...',
    options: ['Jenderal Soedirman', 'Jenderal Ahmad Yani', 'Kolonel Sugiono'],
    correctAnswer: 0,
    explanation: 'Jenderal Besar Soedirman memimpin perang gerilya selama 7 bulan di atas tandu bambu setelah Yogyakarta diduduki Belanda saat Agresi Militer II.'
  },

  // --- SMP ---
  {
    id: 'pk-smp-1',
    eraId: 'kemerdekaan',
    tier: 'SMP',
    topic: 'Perundingan Linggarjati',
    visualHint: '🤝',
    question: 'Hasil Perundingan Linggarjati (1947) membuat wilayah kedaulatan de facto Republik Indonesia diakui Belanda hanya meliputi...',
    options: [
      'Seluruh kepulauan bekas jajahan Hindia Belanda',
      'Pulau Jawa, Madura, dan Sumatera',
      'Hanya Daerah Istimewa Yogyakarta',
      'Pulau Jawa dan Pulau Bali'
    ],
    correctAnswer: 1,
    explanation: 'Dalam Perundingan Linggarjati yang dipimpin delegasi Indonesia Sutan Sjahrir, Belanda hanya mengakui wilayah de facto Jawa, Madura, dan Sumatera.'
  },
  {
    id: 'pk-smp-2',
    eraId: 'kemerdekaan',
    tier: 'SMP',
    topic: 'Serangan Umum 1 Maret 1949',
    visualHint: '⏳',
    question: 'Tujuan strategis Serangan Umum 1 Maret 1949 terhadap kedudukan Belanda di ibu kota Yogyakarta yang berhasil dikuasai selama 6 jam adalah...',
    options: [
      'Mengusir seluruh tentara Belanda keluar dari tanah Jawa secara instan',
      'Membuktikan pada dunia internasional melalui PBB bahwa TNI dan Republik Indonesia masih berdaya',
      'Membebaskan tawanan politik di penjara Sukamiskin Bandung',
      'Menangkap pimpinan pasukan Sekutu di Jakarta'
    ],
    correctAnswer: 1,
    explanation: 'Serangan 6 jam ini mematahkan propaganda Belanda yang mengklaim TNI sudah hancur lebur, dan mendorong PBB mendesak Belanda menghentikan agresinya.'
  },
  {
    id: 'pk-smp-3',
    eraId: 'kemerdekaan',
    tier: 'SMP',
    topic: 'KMB (Konferensi Meja Bundar)',
    visualHint: '🌐',
    question: 'Konferensi Meja Bundar (KMB) yang menghasilkan pengakuan kedaulatan Indonesia oleh Belanda diselenggarakan di kota...',
    options: ['Den Haag, Belanda', 'Jenewa, Swiss', 'London, Inggris', 'New York, AS'],
    correctAnswer: 0,
    explanation: 'KMB digelar di Den Haag dari Agustus hingga November 1949, dipimpin Drs. Mohammad Hatta, dan menghasilkan penyerahan kedaulatan kepada RIS pada 27 Desember 1949.'
  },

  // --- SMA ---
  {
    id: 'pk-sma-1',
    eraId: 'kemerdekaan',
    tier: 'SMA',
    topic: 'Analisis Diplomasi & Garis van Mook',
    sourceQuote: '"Perjanjian Renville (1948) yang ditandatangani di atas kapal perang AS USS Renville membatasi gerak TNI di belakang garis van Mook."',
    question: 'Dampak geopolitik dan militer yang paling merugikan bagi Indonesia akibat diterimanya garis demarkasi van Mook dalam Perjanjian Renville adalah...',
    options: [
      'TNI harus hijrah mengosongkan kantong-kantong gerilya di Jawa Barat dan Jawa Timur menuju Yogyakarta',
      'Indonesia kehilangan hak menggunakan mata uang ORI (Oeang Republik Indonesia)',
      'Belanda bebas mengambil alih kepulauan Maluku tanpa perlawanan',
      'PBB mencabut kembali status keanggotaan Indonesia',
      'Hilangnya seluruh armada laut militer ALRI di Selat Sunda'
    ],
    correctAnswer: 0,
    explanation: 'Garis van Mook memotong wilayah RI menjadi sangat sempit (Yogyakarta dan sekitarnya), dan memaksa sekitar 35.000 pasukan Siliwangi melakukan "Long March" hijrah ke wilayah Republik.'
  }
];
