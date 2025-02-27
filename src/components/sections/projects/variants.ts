export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 減少間隔時間
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98, // 減少縮放範圍
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3, // 減少動畫時間
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02, // 增加縮放比例
    transition: {
      duration: 0.3, // 減少動畫時間
      ease: 'easeOut',
    },
  },
};
