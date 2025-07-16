import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [generatedWords, setGeneratedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch random words from API
  const fetchRandomWords = async (count) => {
    try {
      const words = [];
      
      for (let i = 0; i < count; i++) {
        try {
          const response = await axios.get('https://api.api-ninjas.com/v1/randomword', {
            headers: {
              'X-Api-Key': 'YOUR_API_KEY'
            }
          });
          words.push(response.data.word);
        } catch (apiError) {
          const fallbackWords = [
            'serendipity', 'ephemeral', 'wanderlust', 'mellifluous', 'petrichor',
            'luminescence', 'ethereal', 'cascade', 'whisper', 'solitude',
            'tranquil', 'harmony', 'mystique', 'radiance', 'velvet',
            'crystalline', 'symphony', 'twilight', 'aurora', 'zenith',
            'pristine', 'eloquent', 'serene', 'vibrant', 'majestic',
            'graceful', 'enchanting', 'blissful', 'magnificent', 'splendid',
            'nebula', 'cosmos', 'infinity', 'quantum', 'matrix',
            'digital', 'cipher', 'algorithm', 'binary', 'protocol'
          ];
          const randomWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
          words.push(randomWord);
        }
      }
      
      return words;
    } catch (error) {
      throw new Error('Failed to fetch words');
    }
  };

  const generateWords = async () => {
    const numWords = parseInt(amount);
    
    if (!numWords || numWords < 1) {
      setError('Please enter a valid number of words to generate');
      return;
    }

    if (numWords > 1000) {
      setError('Please enter a reasonable number (recommended: under 1000)');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const words = await fetchRandomWords(numWords);
      setGeneratedWords(words);
    } catch (err) {
      setError('Failed to generate words. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearWords = () => {
    setGeneratedWords([]);
    setAmount('');
    setError('');
  };

  const removeWord = (indexToRemove) => {
    setGeneratedWords(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
      setAmount(value);
      setError('');
    }
  };

  const copyToClipboard = async () => {
    try {
      const text = generatedWords.join(', ');
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  // Refined animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const wordCardVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    visible: (index) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08, // Slower stagger for words
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    exit: {
      scale: 0.8,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };

  const wordHoverVariants = {
    hover: {
      scale: 1.03,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.97
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black py-4 sm:py-8 px-2 sm:px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl mx-auto"> 
        {/* Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 px-2"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-400 mb-2 sm:mb-4"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Random Word Generator
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base text-green-300 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Generate random words from the internet for your creative projects, writing, and brainstorming
          </motion.p>
        </motion.div>
        
      
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm border border-green-800/30 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-6 mx-2 sm:mx-0"
          variants={itemVariants}
          whileHover={{ 
            y: -1, 
            boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end justify-center">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <label htmlFor="amount" className="block text-sm font-medium text-green-300 mb-2">
                Number of words:
              </label>
              <motion.input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full sm:w-32 md:w-40 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border-2 border-green-700/50 text-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-center font-medium text-sm sm:text-base placeholder-green-500/50"
                placeholder="Enter amount"
                whileFocus={{ 
                  scale: 1.01,
                  boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)"
                }}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.button
                onClick={generateWords}
                disabled={isLoading || !amount}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-black rounded-lg hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.svg 
                      className="h-4 w-4" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </motion.svg>
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">Loading...</span>
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Generate Words</span>
                    <span className="sm:hidden">Generate</span>
                  </>
                )}
              </motion.button>
              
              <AnimatePresence>
                {generatedWords.length > 0 && (
                  <motion.button
                    onClick={clearWords}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-100 to-red-100 text-black rounded-lg hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 font-medium shadow-lg text-sm sm:text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="hidden sm:inline">Clear All</span>
                    <span className="sm:hidden">Clear</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          
          <AnimatePresence>
            {error && (
              <motion.div
                className="mt-3 sm:mt-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-sm sm:text-base"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {generatedWords.length > 0 && (
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-green-800/30 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 mx-2 sm:mx-0"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <motion.h2 
                  className="text-xl sm:text-2xl font-semibold text-green-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Generated Words
                </motion.h2>
                <motion.span 
                  className="bg-green-900/50 border border-green-700/50 text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  {generatedWords.length} word{generatedWords.length !== 1 ? 's' : ''}
                </motion.span>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {generatedWords.map((word, index) => (
                    <motion.div
                      key={`${word}-${index}`}
                      className="group relative bg-gray-800/60 border border-green-700/30 rounded-lg p-3 sm:p-4 text-center hover:bg-gray-800/80 hover:border-green-600/50 transition-all duration-300 cursor-pointer"
                      custom={index}
                      variants={wordCardVariants}
                      layout
                      layoutId={`word-${index}`}
                      whileHover="hover"
                      whileTap="tap"
                      variants={wordHoverVariants}
                    >
                      <motion.span 
                        className="text-green-300 font-medium text-sm sm:text-base md:text-lg break-words"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.08 + 0.2, duration: 0.5 }}
                      >
                        {word}
                      </motion.span>
                      <motion.div 
                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0, rotate: -90 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.button
                          onClick={() => removeWord(index)}
                          className="w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-gray-800 flex items-center justify-center transition-colors duration-200"
                          title="Remove this word"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ×
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Additional Actions */}
              <motion.div 
                className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-black rounded-lg hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 font-medium shadow-lg text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="flex items-center justify-center gap-2">
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </motion.svg>
                    <span className="hidden sm:inline">Copy All Words</span>
                    <span className="sm:hidden">Copy All</span>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {generatedWords.length === 0 && !isLoading && (
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-green-800/30 rounded-xl sm:rounded-2xl shadow-2xl p-8 sm:p-12 text-center mx-2 sm:mx-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="text-green-500/60 mb-4"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.6, 0.8, 0.6],
                  transition: { 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }
                }}
              >
                <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-base sm:text-lg font-medium text-green-400 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                No words generated yet
              </motion.h3>
              <motion.p 
                className="text-sm sm:text-base text-green-300/80 max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Enter any number of words you want and click "Generate Words" to get started!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle floating particles animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
              }}
              animate={{
                y: -10,
                x: Math.random() * window.innerWidth,
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>

        {/* Matrix-style background effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-500 font-mono text-xs"
              style={{
                left: `${(i * 12.5)}%`,
                top: '-10px',
              }}
              animate={{
                y: window.innerHeight + 20,
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {Array.from({ length: 20 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('')}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default App;
