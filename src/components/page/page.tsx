'use client';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

export const Page: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      // className="flex flex-col items-center flex-1"
    >
      <div className="flex items-center justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)] w-full">
        {children}
      </div>
    </motion.div>
  );
};
