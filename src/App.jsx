import React, { useState } from 'react';
import { Heart, Lock, Unlock, Sparkles, Gift, Calendar, Type, CheckCircle } from 'lucide-react';

// ============ MODIFY THESE SECTIONS ============

// Questions for each sorry (one by one unlock)
const SORRY_QUESTIONS = [
  {
    type: 'mcq',
    question: "What is my favorite food item?(food tho start chesa ani edaku)",
    options: ["Chicken 65", "Apollo fish", "Loose Prawns", "Fish fry"],
    correctAnswer: 2
  },
  {
    type: 'mcq',
    question: "What is my favorite food place?(food tho start chesa ani edaku)",
    options: ["Beach", "Temple", "Shopping mall", "Mountains"],
    correctAnswer: 0
  },
  {
    type: 'text',
    question: "What's my favorite nickname for you? (one word)",
    correctAnswer: "darling" // Will check case-insensitive
  },
  {
    type: 'mcq',
    question: "Neelo naaku baaga nache thing em anukuntunnav?",
    options: ["Genuine ga undadam", "Nannu poortiga nammadam", "Nvu neela undadam", "Patience tho undadam(ee madhya patience ledu le adhi vere vishayam)"],
    correctAnswer: 2
  },
  {
    type: 'text',
    question: "Complete this: Nuvvu _____ naake (one word)",
    correctAnswer: "motham" // Change to your word
  }
];

const SORRYS = [
  {
    title: "Sorry for being annoying sometimes",
    message: "Rey Banda... Konnisarlu chinna chinna vaatike baaga ibbandhi pettesa ninnu... avi pattinchukokunda ksheminche ra... chiraku padakunda undadaniki try chestha..🥺",
    image: "/image-6.jpg"
  },
  {
    title: "Sorry for my bad jokes",
    message: "Cutie, Konnisarlu wrong time lo or wrong situation lo bad jokes vesa(avi manchi jokes ae)... alantivi jaragakunda undadaniki try chestha... 😅",
    image: "/image-7.jpg"
  },
  {
    title: "Sorry for making you wait",
    message: "Darlingss, Ee madhya baaga ekva wait cheyyistunna ninnu... kavalani kaadu le but reason emaina sare ninnu antha wait cheyyinchadam crct kaadu le... Times anni manchiga set cheskunta.. so neeku ekva time ivvadaniki avtadhi... ⏰💕",
    image: "/image-8.jpg"
  },
  {
    title: "Sorry for not expressing my love when u expect",
    message: "Maa, Konnisarlu neeku kavalsina time lo neeku ivvalsina love ivvaledu ra.. eesari avi mundhe gurtinchi manchiga expressive ga unta... 💙",
    image: "/image-9.jpg"
  },
  {
    title: "Sorry for not saying sorry this much",
    message: "Harsss, I'm really sorry for disappointing you this year. Chaalane mistakes chesa ee year... But yevi kuda ninnu hurt cheyalani cheyaledu raa... you're my everything, today and always. 💖",
    image: "/image-4.jpg"
  }
];

// Questions for thanks section
const THANKS_QUESTIONS = [
  {
    type: 'mcq',
    question: "What makes you most special to me?",
    options: ["Your love", "Your understanding", "Your presence", "Your entire being"],
    correctAnswer: 3
  },
  {
    type: 'date',
    question: "Our first special memory date?(Idhi commitment date ae le.. easy ga pettestav) (DD-MM-YYYY)",
    correctAnswer: "15-04-2025" // Change this
  },
  {
    type: 'text',
    question: "Mana iddaram kalisi theatre ki velli chusina last movie enti? (Idhi one attempt lo pettakapothe nv waste raa)",
    correctAnswer: "og" // Change this
  },
  {
    type: 'mcq',
    question: "Mana convo lo daily vache que enti?",
    options: ["Ela ayyindhi nee day", "Ekkadiki vellev", "Em color dress vesav", "Dinner lo food em tinnav"],
    correctAnswer: 0
  },
  {
    type: 'text',
    question: "I ____ you forever (me too in advance)",
    correctAnswer: "love"
  }
];

const THANKS = [
  {
    title: "Thanks for your patience",
    message: "Pandu, Konnisarlu matram naa kopanni chala baaga handle chesav... chala rare le... and manchiga vintav nenu cheppinavanni... alane manchiga undu... 🌸",
    image: "/IMG-20240907-WA0194.jpg"
  },
  {
    title: "Thanks for making me smile",
    message: "Bujjodaa, nv konnisarlu chala active ga untav ra... apdu matram naa face medha smile podhu ra... full ga njoy chestha... 😊✨",
    image: "/IMG-20241007-WA0134.jpg"
  },
  {
    title: "Thanks for being you",
    message: "Sweetheart, Neelo most favorite thing ae adhi ra... evari daggara ela untavo telidu kani... naa daggara matram nv complete ga neelaane untav... Thanks for being perfectly you! 🔥💕",
    image: "/IMG20250717165343.jpg"
  },
  {
    title: "Thanks for believing in me",
    message: "Cutie, Naa medha antha nammakam neeku ela vachindho telidu kani... mana iddari bonding ki adhe main pillar aipoindhi... neeku the best life istha ra... naa medha nammakam alane unchu... 💪❤️",
    image: "/IMG-20250316-WA0033.jpg"
  },
  {
    title: "Thanks for choosing me",
    message: "Darlingss, Nee day lo nenoka imp part aipoya... naa every thought lo nv kachitang untunnav raa...Thank you for your love, your time, and your beautiful heart. Forever grateful! 💝",
    image: "/HDR_3709.JPG"
  }
];

// Final question for New Year wishes
const NEWYEAR_QUESTION = {
  type: 'text',
  question: "Ye age lo manam pellichesukundam",
  correctAnswer: "26" // Change this
};

const RESOLUTIONS = [
  "I'll be more patient and understanding with you, Banda 💕",
  "I'll express my love more instead of keeping it in my heart, Cutie 💌",
  "I'll make more time for us and create beautiful memories, Pandu ⏰",
  "I'll support your dreams as much as you support mine, Maa 🌟",
  "I'll be the best version of myself for you, Harsss 💪"
];

const NEW_YEAR_MESSAGE = "Darlings, Happy new year raa... last year is very very special year raa... mana iddaram life long kalisi untam ani decide aina year... commit aina tarvatha nannu better chesukunna year... mukhyam ga mana iddaram chala risks chesina year... 2025 lo fun undhi, love undhi, kopam undhi, patience undhi, chiraku kuda undhi... mana iddarilo nak best ga anipinchindhi entante... entha godava padina or tittukunna ventane kalisipodham ani chustam iddaram... Ee year exciting ga undhi... mana iddari life inka manchiga ela better avtadho ani... lets hope for best and fuck the rest...!!  💖✨🎆";

// ============ END OF EDITABLE SECTION ============

function App() {
  const [currentStep, setCurrentStep] = useState('intro'); // intro, sorry, thanks, newyear
  const [unlockedSorrys, setUnlockedSorrys] = useState(0);
  const [unlockedThanks, setUnlockedThanks] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showError, setShowError] = useState(false);
  const [newYearUnlocked, setNewYearUnlocked] = useState(false);

  const checkAnswer = () => {
    const quiz = currentQuiz;
    let isCorrect = false;

    if (quiz.type === 'mcq') {
      isCorrect = selectedOption === quiz.correctAnswer;
    } else if (quiz.type === 'date' || quiz.type === 'text') {
      isCorrect = userAnswer.toLowerCase().trim() === quiz.correctAnswer.toLowerCase().trim();
    }

    if (isCorrect) {
      if (currentStep === 'sorry') {
        setUnlockedSorrys(prev => prev + 1);
      } else if (currentStep === 'thanks') {
        setUnlockedThanks(prev => prev + 1);
      } else if (currentStep === 'newyear') {
        setNewYearUnlocked(true);
      }
      setShowQuiz(false);
      setUserAnswer('');
      setSelectedOption(null);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const openNextQuiz = (type) => {
    if (type === 'sorry' && unlockedSorrys < SORRYS.length) {
      setCurrentQuiz(SORRY_QUESTIONS[unlockedSorrys]);
      setShowQuiz(true);
    } else if (type === 'thanks' && unlockedThanks < THANKS.length) {
      setCurrentQuiz(THANKS_QUESTIONS[unlockedThanks]);
      setShowQuiz(true);
    } else if (type === 'newyear' && !newYearUnlocked) {
      setCurrentQuiz(NEWYEAR_QUESTION);
      setShowQuiz(true);
    }
  };

  const startJourney = () => {
    setCurrentStep('sorry');
  };

  const moveToThanks = () => {
    setCurrentStep('thanks');
  };

  const moveToNewYear = () => {
    setCurrentStep('newyear');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white py-8 px-4 text-center shadow-lg sticky top-0 z-10">
        <Heart className="w-10 h-10 mx-auto mb-2 animate-pulse" />
        <h1 className="text-2xl font-bold">For My Harshini Darlingss 💕</h1>
        <p className="text-rose-50 text-xs mt-1">A Journey to 2026</p>
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Intro Page */}
        {currentStep === 'intro' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-purple-200">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Hey Banda! 💝</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Before we welcome 2026 together, I have something special for you. 
                A journey through my heart - my sorrys, my thanks, and my wishes for us.
              </p>
              <p className="text-purple-600 font-medium mb-8">
                Answer questions to unlock each special message! 🔓
              </p>
              <button
                onClick={startJourney}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition"
              >
                Start Our Journey ✨
              </button>
            </div>
          </div>
        )}

        {/* Sorry Section */}
        {currentStep === 'sorry' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-rose-600">My Sorrys 💐</h2>
              <p className="text-gray-600 text-sm mt-2">Unlocked: {unlockedSorrys} / {SORRYS.length}</p>
            </div>

            {SORRYS.slice(0, unlockedSorrys).map((sorry, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-rose-200 animate-fade-in">
                <img src={sorry.image} alt="" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-rose-700 text-lg mb-2">{sorry.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{sorry.message}</p>
                </div>
              </div>
            ))}

            {unlockedSorrys < SORRYS.length && (
              <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-rose-300 border-dashed">
                <Lock className="w-12 h-12 mx-auto mb-3 text-rose-400" />
                <p className="text-center text-gray-600 mb-4">Answer the question to unlock sorry #{unlockedSorrys + 1}</p>
                <button
                  onClick={() => openNextQuiz('sorry')}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition"
                >
                  Unlock Next Sorry
                </button>
              </div>
            )}

            {unlockedSorrys === SORRYS.length && (
              <div className="bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl shadow-xl p-6 text-white text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">All Sorrys Revealed! 💕</h3>
                <p className="mb-6 text-rose-50">Now let me tell you what I'm grateful for...</p>
                <button
                  onClick={moveToThanks}
                  className="w-full bg-white text-rose-600 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition"
                >
                  Continue to Thanks 🙏
                </button>
              </div>
            )}
          </div>
        )}

        {/* Thanks Section */}
        {currentStep === 'thanks' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600">My Thanks 🙏</h2>
              <p className="text-gray-600 text-sm mt-2">Unlocked: {unlockedThanks} / {THANKS.length}</p>
            </div>

            {THANKS.slice(0, unlockedThanks).map((thank, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-purple-200 animate-fade-in">
                <img src={thank.image} alt="" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-purple-700 text-lg mb-2">{thank.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{thank.message}</p>
                </div>
              </div>
            ))}

            {unlockedThanks < THANKS.length && (
              <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-purple-300 border-dashed">
                <Lock className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                <p className="text-center text-gray-600 mb-4">Answer the question to unlock thank you #{unlockedThanks + 1}</p>
                <button
                  onClick={() => openNextQuiz('thanks')}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition"
                >
                  Unlock Next Thanks
                </button>
              </div>
            )}

            {unlockedThanks === THANKS.length && (
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl shadow-xl p-6 text-white text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Gratitude Expressed! 💜</h3>
                <p className="mb-6 text-purple-50">Now for the most special part...</p>
                <button
                  onClick={moveToNewYear}
                  className="w-full bg-white text-purple-600 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition"
                >
                  New Year Wishes 🎆
                </button>
              </div>
            )}
          </div>
        )}

        {/* New Year Section */}
        {currentStep === 'newyear' && (
          <div className="max-w-md mx-auto space-y-4">
            {!newYearUnlocked ? (
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-amber-300 border-dashed text-center">
                <Gift className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <h2 className="text-2xl font-bold text-amber-600 mb-3">Final Question! 🎁</h2>
                <p className="text-gray-600 mb-6">Answer this to unlock your New Year surprise!</p>
                <button
                  onClick={() => openNextQuiz('newyear')}
                  className="w-full bg-gradient-to-r from-amber-400 to-rose-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition"
                >
                  Unlock New Year Wishes 🎊
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 rounded-3xl shadow-2xl p-8 border-4 border-amber-300">
                  <div className="text-center mb-6">
                    <Sparkles className="w-20 h-20 mx-auto mb-4 text-amber-500 animate-pulse" />
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 mb-4">
                      Happy New Year 2026! 🎊
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {NEW_YEAR_MESSAGE}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-600 mb-4 text-center">
                    My 2026 Resolutions for Us 💪
                  </h3>
                  <div className="space-y-3">
                    {RESOLUTIONS.map((resolution, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200">
                        <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 text-sm leading-relaxed">{resolution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-3xl shadow-xl p-6 text-white text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 animate-pulse" />
                  <p className="text-lg font-bold mb-2">I Love You, Harshini! 💕</p>
                  <p className="text-rose-50 text-sm">Forever and always, Bujjodaa! ✨</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      {showQuiz && currentQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-center mb-4">
              {currentQuiz.type === 'mcq' && <CheckCircle className="w-8 h-8 text-purple-500" />}
              {currentQuiz.type === 'date' && <Calendar className="w-8 h-8 text-purple-500" />}
              {currentQuiz.type === 'text' && <Type className="w-8 h-8 text-purple-500" />}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              {currentQuiz.question}
            </h3>

            {currentQuiz.type === 'mcq' && (
              <div className="space-y-3 mb-6">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-4 rounded-2xl text-left transition border-2 ${
                      selectedOption === idx
                        ? 'bg-purple-100 border-purple-400 text-purple-700 font-medium'
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {(currentQuiz.type === 'date' || currentQuiz.type === 'text') && (
              <div className="mb-6">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={currentQuiz.type === 'date' ? 'DD-MM-YYYY' : 'Type your answer...'}
                  className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-purple-400 focus:outline-none text-gray-700 text-center font-medium"
                />
              </div>
            )}

            {showError && (
              <div className="mb-4 p-3 bg-red-100 border-2 border-red-300 rounded-2xl">
                <p className="text-red-600 text-center font-medium text-sm">
                  Not quite! Try again, Banda! 💕
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setUserAnswer('');
                  setSelectedOption(null);
                  setShowError(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={checkAnswer}
                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl font-bold active:scale-95 transition"
              >
                Submit ✨
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;