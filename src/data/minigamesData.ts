import { MinigameData, EraId, EducationTier } from '../types';

export const MINIGAMES_DATA: MinigameData[] = [
  // HINDU-BUDDHA
  {
    eraId: 'hindu-buddha',
    tier: 'SD',
    chronologyEvents: [
      { id: 'hb-1', title: 'Berdirinya Kerajaan Kutai di Kalimantan Timur', year: 'Abad IV M', description: 'Raja Mulawarman menghadiahkan 20.000 ekor sapi.', order: 1 },
      { id: 'hb-2', title: 'Pembangunan Candi Borobudur oleh Wangsa Syailendra', year: 'Abad VIII M', description: 'Monumen Buddha terbesar di dunia di Jawa Tengah.', order: 2 },
      { id: 'hb-3', title: 'Puncak Kejayaan Majapahit & Sumpah Palapa', year: 'Abad XIV M', description: 'Mahapatih Gajah Mada menyatukan kepulauan nusantara.', order: 3 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Gajah Mada', roleOrFact: 'Mahapatih pencetus Sumpah Palapa', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'Mulawarman', roleOrFact: 'Raja dermawan Kerajaan Kutai', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Prasasti Yupa', roleOrFact: 'Batu tertulis pertama di Indonesia', category: 'Artefak' },
      { id: 'p4', figureOrTerm: 'Candi Prambanan', roleOrFact: 'Candi Hindu terindah untuk Trimurti', category: 'Bangunan' }
    ]
  },
  {
    eraId: 'hindu-buddha',
    tier: 'SMP',
    chronologyEvents: [
      { id: 'hb-smp-1', title: 'Prasasti Ciaruteun Tarumanegara dibuat', year: 'Abad V M', description: 'Tapak kaki Raja Purnawarman.', order: 1 },
      { id: 'hb-smp-2', title: 'Kerajaan Sriwijaya menjadi pusat studi agama Buddha di Asia', year: 'Abad VII M', description: 'Biksu I-Tsing belajar tata bahasa Sanskerta.', order: 2 },
      { id: 'hb-smp-3', title: 'Pernikahan Rakai Pikatan dan Pramodhawardhani', year: 'Tahun 850 M', description: 'Harmoni dinasti Sanjaya & Syailendra.', order: 3 },
      { id: 'hb-smp-4', title: 'Perang Bubat antara Majapahit dan Kerajaan Sunda', year: 'Tahun 1357 M', description: 'Insiden tragis yang merenggangkan Majapahit dan Pajajaran.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Hayam Wuruk', roleOrFact: 'Raja agung pemegang takhta emas Majapahit', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'Balaputradewa', roleOrFact: 'Raja pembawa puncak kejayaan Sriwijaya', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Mpu Prapanca', roleOrFact: 'Pujangga penulis Kitab Negarakretagama', category: 'Karya' },
      { id: 'p4', figureOrTerm: 'Mpu Tantular', roleOrFact: 'Pencetus semboyan Bhinneka Tunggal Ika', category: 'Karya' }
    ]
  },
  {
    eraId: 'hindu-buddha',
    tier: 'SMA',
    chronologyEvents: [
      { id: 'hb-sma-1', title: 'Keluarnya Prasasti Nalanda di India mengenai Sriwijaya', year: 'Tahun 860 M', description: 'Biara untuk pelajar nusantara di Nalanda.', order: 1 },
      { id: 'hb-sma-2', title: 'Ekspedisi Pamalayu Raja Kertanegara Singasari', year: 'Tahun 1275 M', description: 'Membendung ekspansi Dinasti Yuan Mongol.', order: 2 },
      { id: 'hb-sma-3', title: 'Pengusiran tentara Tartar oleh Raden Wijaya', year: 'Tahun 1293 M', description: 'Fondasi awal berdirinya Kerajaan Majapahit.', order: 3 },
      { id: 'hb-sma-4', title: 'Perang Paregreg (Perang Saudara Majapahit)', year: 'Tahun 1404 M', description: 'Awal keruntuhan wibawa sentral Majapahit.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'J.C. van Leur', roleOrFact: 'Pelopor Teori Masuknya Hindu melalui Kasta Brahmana', category: 'Historiografi' },
      { id: 'p2', figureOrTerm: 'Kertanegara', roleOrFact: 'Raja visioner konsep cakrawala mandala dwipantara', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Gayatri Rajapatni', roleOrFact: 'Matriark mentor politik Mahapatih Gajah Mada', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Tribhuwana Tunggadewi', roleOrFact: 'Ratu yang mengangkat Gajah Mada dan menyetujui Sumpah Palapa', category: 'Tokoh' }
    ]
  },

  // KESULTANAN ISLAM
  {
    eraId: 'kesultanan-islam',
    tier: 'SD',
    chronologyEvents: [
      { id: 'ki-1', title: 'Sultan Malik al-Saleh memimpin Samudera Pasai', year: 'Abad XIII M', description: 'Titik awal pusat pelayaran Islam nusantara.', order: 1 },
      { id: 'ki-2', title: 'Raden Patah mendirikan Kesultanan Demak', year: 'Akhir Abad XV M', description: 'Kerajaan Islam pertama di tanah Jawa.', order: 2 },
      { id: 'ki-3', title: 'Sultan Hasanuddin memimpin pertahanan Gowa-Tallo', year: 'Abad XVII M', description: 'Dijuluki Ayam Jantan dari Timur menolak VOC.', order: 3 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Sunan Kalijaga', roleOrFact: 'Dakwah damai dengan kesenian wayang kulit', category: 'Wali' },
      { id: 'p2', figureOrTerm: 'Raden Patah', roleOrFact: 'Pendiri Kesultanan Demak Bintoro', category: 'Sultan' },
      { id: 'p3', figureOrTerm: 'Sultan Hasanuddin', roleOrFact: 'Pahlawan maritim Somba Opu Makassar', category: 'Sultan' },
      { id: 'p4', figureOrTerm: 'Fatahillah', roleOrFact: 'Pembebas Sunda Kelapa menjadi Jayakarta 1527', category: 'Panglima' }
    ]
  },
  {
    eraId: 'kesultanan-islam',
    tier: 'SMP',
    chronologyEvents: [
      { id: 'ki-smp-1', title: 'Jatuhnya Malaka ke tangan Portugis', year: 'Tahun 1511 M', description: 'Memicu pergeseran pelabuhan dagang ke Aceh & Banten.', order: 1 },
      { id: 'ki-smp-2', title: 'Fatahillah merebut Sunda Kelapa dari Portugis', year: '22 Juni 1527 M', description: 'Kini diperingati sebagai Hari Jadi Kota Jakarta.', order: 2 },
      { id: 'ki-smp-3', title: 'Sultan Iskandar Muda memimpin ekspansi Kesultanan Aceh', year: 'Tahun 1607 M', description: 'Puncak hegemoni militer dan hukum syariat di Selat Malaka.', order: 3 },
      { id: 'ki-smp-4', title: 'Perjanjian Giyanti membelah Kerajaan Mataram', year: 'Tahun 1755 M', description: 'Membagi Surakarta dan Yogyakarta.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Sultan Baabullah', roleOrFact: 'Penguasa 72 Pulau dari Kesultanan Ternate pengusir Portugis', category: 'Sultan' },
      { id: 'p2', figureOrTerm: 'Sultan Agung', roleOrFact: 'Raja Mataram Islam yang memimpin 2 kali gempuran ke Batavia', category: 'Sultan' },
      { id: 'p3', figureOrTerm: 'Perjanjian Bongaya', roleOrFact: 'Pakta monopoli VOC yang dipaksakan pada Sultan Hasanuddin 1667', category: 'Dokumen' },
      { id: 'p4', figureOrTerm: 'Sultan Ageng Tirtayasa', roleOrFact: 'Penguasa Kesultanan Banten yang dikhianati putranya Sultan Haji', category: 'Sultan' }
    ]
  },
  {
    eraId: 'kesultanan-islam',
    tier: 'SMA',
    chronologyEvents: [
      { id: 'ki-sma-1', title: 'Kedatangan Ibnu Battuta di Samudera Pasai', year: 'Tahun 1345 M', description: 'Catatan musafir dunia tentang peradaban Islam di Sumatera.', order: 1 },
      { id: 'ki-sma-2', title: 'Perang Ternate mengusir Gubernur Lopez de Mesquita', year: 'Tahun 1575 M', description: 'Balas dendam Sultan Baabullah atas pembunuhan ayahnya.', order: 2 },
      { id: 'ki-sma-3', title: 'Pemberlakuan Kalender Jawa Aboge oleh Sultan Agung', year: 'Tahun 1633 M', description: 'Perpaduan penanggalan Saka Hindu dan Hijriyah Islam.', order: 3 },
      { id: 'ki-sma-4', title: 'Perjanjian Salatiga membagi Surakarta', year: 'Tahun 1757 M', description: 'Lahirnya Kadipaten Mangkunegaran di bawah Raden Mas Said.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Hamzah Fansuri', roleOrFact: 'Sastrawan sufi pelopor syair perahu bahasa Melayu dari Barus', category: 'Pujangga' },
      { id: 'p2', figureOrTerm: 'Nuruddin ar-Raniri', roleOrFact: 'Mufti Aceh pengarang kitab Bustan al-Salatin', category: 'Ulama' },
      { id: 'p3', figureOrTerm: 'Raden Mas Said', roleOrFact: 'Pangeran Sambernyawa dengan semboyan Tri Dharma', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Sultan Trenggana', roleOrFact: 'Penguasa Demak yang membawa ekspansi Islam hingga Jawa Timur', category: 'Sultan' }
    ]
  },

  // KOLONIALISME
  {
    eraId: 'kolonialisme',
    tier: 'SD',
    chronologyEvents: [
      { id: 'kol-1', title: 'Perlawanan Kapitan Pattimura di Saparua Maluku', year: 'Tahun 1817 M', description: 'Merebut Benteng Duurstede dari Belanda.', order: 1 },
      { id: 'kol-2', title: 'Pangeran Diponegoro Mengobarkan Perang Jawa', year: 'Tahun 1825 M', description: 'Perang besar 5 tahun mempertahankan martabat rakyat.', order: 2 },
      { id: 'kol-3', title: 'R.A. Kartini Memperjuangkan Hak Sekolah Kaum Perempuan', year: 'Tahun 1901 M', description: 'Mendirikan sekolah dan menulis surat-surat emansipasi.', order: 3 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Kapitan Pattimura', roleOrFact: 'Pahlawan pemberani pembebas rakyat Saparua Maluku', category: 'Pahlawan' },
      { id: 'p2', figureOrTerm: 'Pangeran Diponegoro', roleOrFact: 'Pemimpin Perang Jawa berkuda putih yang gigih', category: 'Pahlawan' },
      { id: 'p3', figureOrTerm: 'Cut Nyak Dien', roleOrFact: 'Srikandi perang gerilya rimba Tanah Rencong Aceh', category: 'Pahlawan' },
      { id: 'p4', figureOrTerm: 'Tuanku Imam Bonjol', roleOrFact: 'Pemimpin Perang Padri dengan sorban putih di Sumbar', category: 'Pahlawan' }
    ]
  },
  {
    eraId: 'kolonialisme',
    tier: 'SMP',
    chronologyEvents: [
      { id: 'kol-smp-1', title: 'Pendirian Kongsi Dagang VOC di Batavia', year: 'Tahun 1602 M', description: 'Mendapat hak oktroi istimewa mencetak uang dan tentara.', order: 1 },
      { id: 'kol-smp-2', title: 'Pembangunan Jalan Raya Pos (Anyer-Panarukan) oleh Daendels', year: 'Tahun 1808 M', description: 'Kerja rodi pertahanan militer sepanjang 1.000 km.', order: 2 },
      { id: 'kol-smp-3', title: 'Pelaksanaan Sistem Tanam Paksa (Cultuurstelsel)', year: 'Tahun 1830 M', description: 'Gubernur Jenderal van den Bosch mengeksploitasi petani.', order: 3 },
      { id: 'kol-smp-4', title: 'Penangkapan Pangeran Diponegoro di Magelang', year: '28 Maret 1830 M', description: 'Belanda menjebak sang pangeran dalam perundingan damai palsu.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Jenderal De Kock', roleOrFact: 'Arsitek taktik Benteng Stelsel penakluk Perang Diponegoro', category: 'Kolonial' },
      { id: 'p2', figureOrTerm: 'Multatuli (Douwes Dekker)', roleOrFact: 'Penulis novel Max Havelaar pembongkar kekejaman Lebak', category: 'Kritikus' },
      { id: 'p3', figureOrTerm: 'Benteng Duurstede', roleOrFact: 'Pusat pertahanan militer Belanda di Saparua yang direbut Pattimura', category: 'Lokasi' },
      { id: 'p4', figureOrTerm: 'Sentot Alibasya Prawirodirdjo', roleOrFact: 'Panglima kavaleri muda andalan Pangeran Diponegoro', category: 'Tokoh' }
    ]
  },
  {
    eraId: 'kolonialisme',
    tier: 'SMA',
    chronologyEvents: [
      { id: 'kol-sma-1', title: 'Pemberlakuan Undang-Undang Agraria (Agrarische Wet)', year: 'Tahun 1870 M', description: 'Pintu masuk modal swasta asing (Politik Pintu Terbuka).', order: 1 },
      { id: 'kol-sma-2', title: 'Penerbitan artikel "Een Eereschuld" oleh C.Th. van Deventer', year: 'Tahun 1899 M', description: 'Gugatan moral utang budi Belanda pada bumiputera.', order: 2 },
      { id: 'kol-sma-3', title: 'Tragedi Perang Puputan Badung di Pulau Dewata Bali', year: 'Tahun 1906 M', description: 'Perang kehormatan habis-habisan hingga tetes darah terakhir.', order: 3 },
      { id: 'kol-sma-4', title: 'Penangkapan Cut Nyak Dien oleh Pang Laot', year: 'Tahun 1905 M', description: 'Panglima tua yang buta diasingkan ke Sumedang Jawa Barat.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Snouck Hurgronje', roleOrFact: 'Penasihat kolonial Belanda pembongkar psikologis perlawanan rakyat Aceh', category: 'Kolonial' },
      { id: 'p2', figureOrTerm: 'Teuku Umar', roleOrFact: 'Pahlawan Aceh ahli siasat sandiwara menipu senjata tentara Belanda', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Koeli Ordonnantie', roleOrFact: 'Regulasi penindasan buruh perkebunan tembakau Deli Sumatera Timur', category: 'Hukum' },
      { id: 'p4', figureOrTerm: 'Kyai Mojo', roleOrFact: 'Ulama penasihat spiritual perjuangan Pangeran Diponegoro', category: 'Tokoh' }
    ]
  },

  // SUMPAH PEMUDA & KEMERDEKAAN
  {
    eraId: 'sumpah-pemuda',
    tier: 'SD',
    chronologyEvents: [
      { id: 'sp-1', title: 'Kongres Pemuda II Mengikrarkan Sumpah Pemuda', year: '28 Oktober 1928', description: 'Satu nusa, satu bangsa, satu bahasa Indonesia.', order: 1 },
      { id: 'sp-2', title: 'Peristiwa Rengasdengklok Menuntut Kemerdekaan', year: '16 Agustus 1945', description: 'Pemuda mendesak proklamasi segera diumumkan.', order: 2 },
      { id: 'sp-3', title: 'Pembacaan Teks Proklamasi di Pegangsaan Timur 56', year: '17 Agustus 1945', description: 'Indonesia resmi merdeka dari segala penjajahan!', order: 3 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Ir. Soekarno', roleOrFact: 'Bapak Proklamator pembaca teks kemerdekaan', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'W.R. Supratman', roleOrFact: 'Pencipta lagu kebangsaan Indonesia Raya', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Sayuti Melik', roleOrFact: 'Tokoh pemuda juru ketik naskah proklamasi', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Ibu Fatmawati', roleOrFact: 'Penjahit Sang Saka Merah Putih pertama', category: 'Tokoh' }
    ]
  },
  {
    eraId: 'sumpah-pemuda',
    tier: 'SMP',
    chronologyEvents: [
      { id: 'sp-smp-1', title: 'Berdirinya Organisasi Budi Utomo oleh Dokter Soetomo', year: '20 Mei 1908', description: 'Lahirnya era Kebangkitan Nasional modern.', order: 1 },
      { id: 'sp-smp-2', title: 'Kongres Pemuda I di Batavia', year: 'Tahun 1926', description: 'Rintisan persatuan organisasi kedaerahan pemuda.', order: 2 },
      { id: 'sp-smp-3', title: 'Sidang Pertama BPUPKI merumuskan dasar negara', year: '29 Mei - 1 Juni 1945', description: 'Lahirnya istilah Pancasila dalam pidato Soekarno.', order: 3 },
      { id: 'sp-smp-4', title: 'Sidang PPKI mengesahkan UUD 1945 dan memilih Presiden', year: '18 Agustus 1945', description: 'Menetapkan Soekarno-Hatta sebagai pemimpin republik.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'dr. Radjiman Wedyodiningrat', roleOrFact: 'Ketua Badan Penyelidik Usaha Persiapan Kemerdekaan (BPUPKI)', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'Laksamana Tadashi Maeda', roleOrFact: 'Perwira AL Jepang yang merelakan rumahnya untuk perumusan proklamasi', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Soegondo Djojopoespito', roleOrFact: 'Ketua Kongres Pemuda II yang membacakan naskah ikrar Sumpah Pemuda', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Chaerul Saleh & Wikana', roleOrFact: 'Pemimpin barisan pemuda pencetus aksi penculikan Rengasdengklok', category: 'Tokoh' }
    ]
  },
  {
    eraId: 'sumpah-pemuda',
    tier: 'SMA',
    chronologyEvents: [
      { id: 'sp-sma-1', title: 'Didirikannya Indische Partij oleh Tiga Serangkai', year: 'Tahun 1912', description: 'Partai politik pertama berani menuntut kemerdekaan penuh.', order: 1 },
      { id: 'sp-sma-2', title: 'Pemberontakan PKI 1926 melawan pemerintah kolonial', year: 'Tahun 1926', description: 'Ditekan keras dan berakibat pembuangan massal ke Boven Digoel.', order: 2 },
      { id: 'sp-sma-3', title: 'Pidato Pembelaan "Indonesia Menggugat" oleh Soekarno di Bandung', year: 'Tahun 1930', description: 'Gugatan tajam terhadap sistem imperialisme kapitalistis Barat.', order: 3 },
      { id: 'sp-sma-4', title: 'Penandatanganan Dokumen Piagam Jakarta (Jakarta Charter)', year: '22 Juni 1945', description: 'Kompromi Panitia Sembilan sebelum diubah 18 Agustus 1945.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Ki Hajar Dewantara', roleOrFact: 'Pelopor Taman Siswa dengan asas Ing Ngarso Sung Tulodo', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'H.O.S. Tjokroaminoto', roleOrFact: 'Raja Jawa Tanpa Mahkota mentor politik Soekarno & Semaoen', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Sutan Sjahrir', roleOrFact: 'Pemimpin gerakan bawah tanah pemuda anti-fasisme Jepang', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Mr. Mohammad Yamin', roleOrFact: 'Konseptor awal teks ikrar Sumpah Pemuda dan usulan dasar negara', category: 'Tokoh' }
    ]
  },

  // MEMPERTAHANKAN KEMERDEKAAN
  {
    eraId: 'kemerdekaan',
    tier: 'SD',
    chronologyEvents: [
      { id: 'pk-1', title: 'Pertempuran Surabaya 10 November Melawan Sekutu', year: '10 November 1945', description: 'Bung Tomo mengobarkan semangat para pejuang.', order: 1 },
      { id: 'pk-2', title: 'Peristiwa Heroik Bandung Lautan Api', year: '24 Maret 1946', description: 'Rakyat membakar kota selatan agar tidak dikuasai musuh.', order: 2 },
      { id: 'pk-3', title: 'Belanda Mengakui Kedaulatan RI dalam KMB', year: '27 Desember 1949', description: 'Kemenangan kedaulatan mutlak Republik Indonesia.', order: 3 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Bung Tomo', roleOrFact: 'Orator ulung pembakar semangat arek-arek Suroboyo', category: 'Pahlawan' },
      { id: 'p2', figureOrTerm: 'Jenderal Soedirman', roleOrFact: 'Panglima Besar yang memimpin perang gerilya di atas tandu', category: 'Pahlawan' },
      { id: 'p3', figureOrTerm: 'Mohammad Toha', roleOrFact: 'Pahlawan peledak gudang amunisi di Dayeuhkolot Bandung', category: 'Pahlawan' },
      { id: 'p4', figureOrTerm: 'Brigjen A.W.S. Mallaby', roleOrFact: 'Jenderal tentara Sekutu/Inggris yang tewas di Jembatan Merah', category: 'Pihak Lawan' }
    ]
  },
  {
    eraId: 'kemerdekaan',
    tier: 'SMP',
    chronologyEvents: [
      { id: 'pk-smp-1', title: 'Insiden Perobekan Bendera Belanda di Hotel Yamato Surabaya', year: '19 September 1945', description: 'Warna biru dirobek sehingga tersisa merah dan putih.', order: 1 },
      { id: 'pk-smp-2', title: 'Kemenangan Palagan Ambarawa dipimpin Kolonel Soedirman', year: '15 Desember 1945', description: 'Taktik Supit Urang memukul mundur tentara Sekutu ke Semarang.', order: 2 },
      { id: 'pk-smp-3', title: 'Agresi Militer Belanda I menyerang sentra ekonomi', year: '21 Juli 1947', description: 'Memicu pembentukan Komisi Tiga Negara (KTN) oleh PBB.', order: 3 },
      { id: 'pk-smp-4', title: 'Serangan Umum 1 Maret 1949 merebut kembali Yogyakarta', year: '1 Maret 1949', description: 'TNI membuktikan eksistensinya kepada sidang PBB selama 6 jam.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Perjanjian Linggarjati', roleOrFact: 'Pengakuan de facto Belanda hanya atas Jawa, Madura, Sumatera (1947)', category: 'Perjanjian' },
      { id: 'p2', figureOrTerm: 'Perjanjian Renville', roleOrFact: 'Diteken di atas kapal perang AS dengan batas Garis van Mook (1948)', category: 'Perjanjian' },
      { id: 'p3', figureOrTerm: 'Perjanjian Roem-Royen', roleOrFact: 'Kesepakatan pemulangan pemerintah RI ke Yogyakarta (1949)', category: 'Perjanjian' },
      { id: 'p4', figureOrTerm: 'Konferensi Meja Bundar (KMB)', roleOrFact: 'Perundingan di Den Haag yang menyerahkan kedaulatan kepada RIS', category: 'Perjanjian' }
    ]
  },
  {
    eraId: 'kemerdekaan',
    tier: 'SMA',
    chronologyEvents: [
      { id: 'pk-sma-1', title: 'Pembentukan Pemerintahan Darurat Republik Indonesia (PDRI) di Bukittinggi', year: '19 Desember 1948', description: 'Mr. Sjafruddin Prawiranegara menyelamatkan kelangsungan negara.', order: 1 },
      { id: 'pk-sma-2', title: 'Agresi Militer Belanda II menawan Soekarno dan Hatta', year: '19 Desember 1948', description: 'Penerjunan pasukan baret merah Belanda di Pangkalan Udara Maguwo.', order: 2 },
      { id: 'pk-sma-3', title: 'Konferensi Inter-Indonesia menyatukan BFO dan RI', year: 'Juli - Agustus 1949', description: 'Sultan Hamid II dan para pemimpin negara bagian bersatu membendung siasat Belanda.', order: 3 },
      { id: 'pk-sma-4', title: 'Dekrit Pembubaran RIS kembali ke Negara Kesatuan Republik Indonesia (NKRI)', year: '17 Agustus 1950', description: 'Mosi Integral Mohammad Natsir mengakhiri sistem federal warisan KMB.', order: 4 }
    ],
    matchPairs: [
      { id: 'p1', figureOrTerm: 'Sjafruddin Prawiranegara', roleOrFact: 'Ketua PDRI penyelamat eksistensi kedaulatan negara saat Yogyakarta jatuh', category: 'Tokoh' },
      { id: 'p2', figureOrTerm: 'Mohammad Natsir', roleOrFact: 'Arsitek "Mosi Integral" pemulihan Negara Kesatuan RI dari negara federal', category: 'Tokoh' },
      { id: 'p3', figureOrTerm: 'Sultan Hamengkubuwono IX', roleOrFact: 'Menteri Pertahanan yang berkoordinasi langsung dalam Serangan Umum 1 Maret', category: 'Tokoh' },
      { id: 'p4', figureOrTerm: 'Raymond Westerling', roleOrFact: 'Komandan baret hijau DST Belanda pelaku pembantaian sadis rakyat Sulawesi Selatan', category: 'Pihak Lawan' }
    ]
  }
];
