'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import BG from '@/assets/bg.webp';
import Link from 'next/link';

export default function Home() {
  const sadTexts = [
    'Hiks... No? 😢',
    'Yakin No? 🥺',
    'Duh... No? 😞',
    'Kasihan... 😥',
    'Sedih banget... 😔',
    'Hati ini terluka 💔',
    'No lagi? 😭',
    'Kok gitu sih? 🥲',
    'Huhu... Kenapa No? 😩',
    'Plis jangan No... 😣',
    'Yaudah deh... 😟',
    'Nyesek banget... 😓',
    'No terus? 🥹',
    'Serius No? 😧',
    'Gak percaya... 😢',
    'Huft... 😞',
    'Hiks hiks... 😭',
    'Ah masa No... 🤧',
    'Gak tega... 😿',
    'Sedih mode... 😿',
  ];

  const happyTexts = [
    'Yeay! 😍',
    'Senangnya! 😁',
    'Asik banget! 🥳',
    'Wah, seneng! 🤩',
    'Hore! 🎉',
    'Wow, makasih! 🥰',
    'Gembira banget! 😆',
    'Bahagia! 😊',
    'Wuuuhuu! 🎊',
    'Cinta banget! 💖',
    'Ah, kamu manis! 😍',
    'Bunga-bunga! 🌸',
    'Seneng banget! 😄',
    'Wah, beneran?! 🤗',
    'Yes! 💕',
    'Love you! 😘',
    'Beneran? 🥰',
    'Awww... 🫶',
    'Uwuwuwu! 💞',
    'Jadi Valentine! 💝',
  ];

  const romanticTexts = [
    'Be my Valentine forever? 💌',
  ];

  const [noText, setNoText] = useState('No');
  const [yesText, setYesText] = useState('Yes');
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [romanticText, setRomanticText] = useState('');

  const getRandomText = (textsArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * textsArray.length);
    return textsArray[randomIndex];
  };

  const handleNoClick = useCallback(() => {
    if (isDisabled) return;

    setIsDisabled(true);
    setNoText(getRandomText(sadTexts));
    setYesText(getRandomText(happyTexts));

    setNoScale((prev) => (prev > 0.01 ? prev - 0.05 : prev));
    setYesScale((prev) => (prev < 3 ? prev + 0.1 : prev));

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isDisabled]);

  const handleYesClick = useCallback(() => {
    if (isDisabled) return;

    setIsDisabled(true);
    setRomanticText(getRandomText(romanticTexts));
    setShowModal(true);
    setConfetti(true);

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isDisabled]);

  useEffect(() => {
    if (confetti) {
      const confettiTimeout = setTimeout(() => {
        setConfetti(false);
      }, 5000);
      return () => clearTimeout(confettiTimeout);
    }
  }, [confetti]);

  return (
    <div
      style={{ backgroundImage: `url(${BG.src})` }}
      className="min-h-screen bg-cover bg-no-repeat flex flex-col justify-center overflow-hidden items-center"
    >
      <h1 className="text-4xl font-bold mb-8 text-pink-400 text-center">
      Do U Want to Be My Valentine, Dudung?
      </h1>
      <div className="flex md:flex-row flex-col space-x-4 gap-5">
        <motion.button
          onClick={handleNoClick}
          className="bg-white text-pink-500 border-pink-500 border font-bold py-2 px-12 rounded transition-transform"
          initial={{ scale: 1 }}
          animate={{ scale: noScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          disabled={isDisabled}
        >
          {noText}
        </motion.button>
        <motion.button
          onClick={handleYesClick}
          className="bg-pink-500 text-white font-bold py-2 px-12 rounded transition-transform"
          initial={{ scale: 1 }}
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          disabled={isDisabled}
        >
          {yesText}
        </motion.button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50"
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 1000, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="bg-white rounded-lg flex flex-col gap-3 p-8 text-center">
              <h2 className="text-2xl font-bold text-pink-500">💖 Yes! 💖</h2>
              <p className="text-xl text-pink-500">{romanticText}</p>
              <Link href={'/love'} className='bg-pink-500 p-6 py-1.5 rounded-md text-white'>
              Lanjut
              </Link>
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {confetti && <Confetti />}
    </div>
  );
}
