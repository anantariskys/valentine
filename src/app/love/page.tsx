'use client'
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import BG from '@/assets/bg.webp';
import Foto1 from '@/assets/1.jpg';
import Foto2 from '@/assets/2.jpg';
import Foto3 from '@/assets/3.jpg';
import Foto4 from '@/assets/4.jpg';
import Foto5 from '@/assets/5.jpg';
import Foto6 from '@/assets/6.jpg';
import Foto7 from '@/assets/7.jpg';
import Foto8 from '@/assets/8.jpg';
import Foto9 from '@/assets/9.jpg';
import Foto10 from '@/assets/10.jpg';
import Foto11 from '@/assets/11.jpg';

const texts = [
  'Geser untuk membuka ❤️',
  'Cinta itu seperti angin, tak terlihat tapi terasa. 🌬️',
  'Kamu adalah alasan senyumku setiap hari. 😊',
  'Setiap detik bersamamu adalah keabadian dalam hatiku. ⏳',
  'Kamu adalah jawaban dari setiap doa. 🙏',
  'Tidak ada yang lebih indah dari mencintaimu. 🌹',
  'Dan di akhir cerita, hanya kamu yang kupilih. 💖',
  'Setiap pagi lebih indah saat memikirkanmu. 🌞',
  'Bersamamu adalah definisi kebahagiaan. 🥰',
  'Tidak ada kata yang cukup untuk menggambarkan cintaku padamu. 📜',
  'Tidak peduli hari hujan atau cerah, kamu selalu jadi pelangiku. 🌈',
  'Setiap detik tanpamu adalah keabadian. ⏰',
  'Aku mencintaimu lebih dari kata-kata bisa mengungkapkan. ❤️',
  'Bersamamu, aku menemukan rumah di hatimu. 🏡',
  'Kamu adalah mimpi yang jadi kenyataan. 💫',
  'Hidupku lebih berwarna sejak kehadiranmu. 🎨',
  'Jika mencintaimu adalah kesalahan, aku tak ingin benar. ❌',
  'Aku ingin menua bersamamu, selamanya. 👵👴',
  'Tidak ada jarak yang bisa memisahkan cinta kita. 🌍',
];

const images = [Foto11, Foto1, Foto2, Foto3, Foto4, Foto5, Foto6, Foto7, Foto8, Foto9, Foto10];

export default function Love() {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const isPlayed = useRef(false); // Untuk mencegah audio diputar berulang

  useEffect(() => {
    const newAudio = new Audio('/sad.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.5;
    setAudio(newAudio);
  
    const handleUserInteraction = () => {
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Memutar musik latar jika belum pernah diputar sebelumnya.
 *
 * @return {void}
 */
/******  a8bb8969-4b9a-4e4a-a51d-09d3076e5830  *******/      if (!isPlayed.current) {
        newAudio.play().then(() => {
          isPlayed.current = true;
          console.log('Musik diputar!');
        }).catch((error) => {
          console.error('Gagal memutar audio:', error);
        });
      }
    };
  
    // Tambahkan event listener untuk mendeteksi interaksi pengguna
    window.addEventListener('click', handleUserInteraction);
  
    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);
  


  const playMusic = () => {
    if (!isPlayed.current && audio) {
      audio.play().then(() => {
        isPlayed.current = true;
        console.log('Musik diputar!');
      }).catch((error) => {
        console.error('Gagal memutar audio:', error);
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${BG.src})` }} className="min-h-screen bg-cover bg-no-repeat bg-pink-100 flex justify-center items-center overflow-hidden">
      <div className="relative w-80 h-[400px] flex flex-col-reverse items-center justify-center">
        <motion.div
          className="relative text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >❤️</motion.div>

        <p className='font-semibold text-pink-500'>Love U Dudungg</p>

        {texts.map((text, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full bg-white shadow-xl rounded-lg p-4 text-center flex items-center justify-center text-pink-600 font-semibold cursor-grab"
            initial={{ y: index * 3, opacity: 1 }}
            drag
            dragConstraints={false}
            style={{ zIndex: texts.length - index }}
            whileTap={{ cursor: "grabbing" }}
            onDragStart={index === 0 ? playMusic : undefined} // Putar musik saat card paling atas di-drag
          >
            {text}
          </motion.div>
        ))}

        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full bg-white shadow-xl rounded-lg p-4 flex items-center justify-center cursor-grab"
            initial={{ y: index * 3, opacity: 1 }}
            transition={{ delay: (texts.length + index) * 0.1, duration: 0.5 }}
            drag
            dragConstraints={false}
            style={{ zIndex: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Image draggable={false} src={img} alt={`Foto ${index + 1}`} className="w-40 aspect-auto object-contain rounded-lg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
