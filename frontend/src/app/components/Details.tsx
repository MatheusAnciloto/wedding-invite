import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { questionsAnswers } from "../constants/questionsAnswers"

export const Details: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	
	return (
		<div className="w-full max-w-2xl mx-auto px-6 py-12 space-y-4">
			{questionsAnswers.map((item, index) => (
        <div key={index} className="border-b border-white/10">
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
          >
            <span className="text-md font-sans font-bold tracking-wide text-white/80 group-hover:text-white transition-colors">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              className="text-white/40 text-sm"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-gray-400 leading-relaxed font-sans text-sm">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
		</div>
	);
};
