import React from 'react';
import { 
  X, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Clock, 
  Star, 
  HelpCircle,
  Zap,
  ShieldAlert,
  Puzzle
} from 'lucide-react';
import { sound } from '../services/sound';

interface GameGuideModalProps {
  onClose: () => void;
}

export const GameGuideModal: React.FC<GameGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-stone-900 border-2 border-amber-600 rounded-2xl shadow-2xl p-5 sm:p-7 text-amber-50 my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600 text-xs font-pixel uppercase tracking-widest mb-1">
            Buku Pedoman Penjaga Waktu
          </span>
          <h2 className="font-cinzel text-xl sm:text-3xl font-black text-amber-100">
            Panduan & Aturan Bermain
          </h2>
          <p className="text-xs text-stone-300 max-w-md mx-auto mt-1">
            Nusantara Quest: Jejak Sejarah — Selamatkan peradaban bangsa dari kepunahan memori!
          </p>
        </div>

        <div className="space-y-5 text-xs sm:text-sm text-stone-200 leading-relaxed">
          {/* Section 1: Kisah & Misi */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/60">
            <h3 className="font-cinzel font-bold text-amber-300 text-base mb-1 flex items-center gap-2">
              <BookOpen size={16} />
              <span>Cerita & Misi Utama</span>
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Penyihir Waktu Jahat telah mencuri dan mengacak artefak sejarah nusantara. Kamu berperan sebagai <strong>Penjaga Waktu Muda</strong> yang menjelajahi 5 era peradaban Indonesia: <em>Kerajaan Hindu-Buddha, Kesultanan Islam, Era Kolonialisme & Perlawanan, Sumpah Pemuda & Kemerdekaan,</em> serta <em>Era Mempertahankan Kemerdekaan</em>.
            </p>
          </div>

          {/* Section 2: Sistem Skor & Bintang */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h3 className="font-cinzel font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              <span>Sistem Skor & Bintang Level</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-black/40 rounded-lg border border-stone-700 space-y-1.5">
                <div className="font-bold text-amber-200">Base Point (Poin Dasar):</div>
                <div className="flex justify-between"><span>• Jenjang SD:</span> <strong className="text-emerald-400">+100 pt</strong></div>
                <div className="flex justify-between"><span>• Jenjang SMP:</span> <strong className="text-amber-400">+150 pt</strong></div>
                <div className="flex justify-between"><span>• Jenjang SMA/SMK:</span> <strong className="text-purple-400">+200 pt</strong></div>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-stone-700 space-y-1.5">
                <div className="font-bold text-amber-200">Combo Multiplier:</div>
                <div className="flex justify-between"><span>• Jawab benar 2x:</span> <strong className="text-yellow-400">1.2x Poin</strong></div>
                <div className="flex justify-between"><span>• Jawab benar 3x:</span> <strong className="text-yellow-400">1.5x Poin</strong></div>
                <div className="flex justify-between"><span>• Jawab benar 4x+:</span> <strong className="text-amber-400">2.0x Poin</strong></div>
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-black/30 rounded-lg border border-stone-800 text-xs">
              <strong className="text-yellow-400">Kriteria Bintang:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                <div>★ 1 Bintang: Lulus minimal (&gt;50%)</div>
                <div>★★ 2 Bintang: Akurasi &ge; 80%</div>
                <div>★★★ 3 Bintang: Akurasi 100% Sempurna</div>
              </div>
            </div>
          </div>

          {/* Section 3: Aturan Nyawa & Power-Up */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h3 className="font-cinzel font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
              <Heart size={16} className="text-rose-500 fill-rose-500" />
              <span>Nyawa & Bantuan Khusus (Power-Up)</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-300 mb-3">
              <li>• Setiap sesi pertarungan, pemain memiliki <strong>3 Nyawa (Hearts)</strong>. Jawaban salah akan mengurangi 1 nyawa.</li>
              <li>• Jika 3 nyawa habis, kamu dapat mengulang pertarungan kembali.</li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-black/40 border border-stone-700">
                <strong className="text-amber-300 block mb-0.5">Bantuan Candi</strong>
                <span>Menghapus 2 pilihan salah (50:50).</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-stone-700">
                <strong className="text-amber-300 block mb-0.5">Lentera Waktu</strong>
                <span>Menambahkan bonus +15 detik waktu menjawab.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-stone-700">
                <strong className="text-amber-300 block mb-0.5">Sutra Kerajaan</strong>
                <span>Melewati 1 soal dengan aman dan tetap meraih poin dasar.</span>
              </div>
            </div>
          </div>

          {/* Section 4: 2D Side-Scroller & Minigames */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h3 className="font-cinzel font-bold text-amber-300 text-base mb-1 flex items-center gap-2">
              <Puzzle size={16} className="text-yellow-400" />
              <span>Penjelajahan 2D & Minigame Kronologi</span>
            </h3>
            <p className="text-xs text-stone-300">
              Gunakan tombol panah atau tombol virtual di layar untuk menggerakkan karakter Penjaga Waktu. Jumpai tokoh sejarah (Gajah Mada, Sultan Hasanuddin, Pattimura, Soekarno, Soedirman), selesaikan susunan urutan kronologi waktu, dan kalahkan bos di altar waktu untuk memulihkan artefak ke Museum Pusaka!
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="py-2 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition"
          >
            Tutup & Lanjutkan Petualangan
          </button>
        </div>
      </div>
    </div>
  );
};
