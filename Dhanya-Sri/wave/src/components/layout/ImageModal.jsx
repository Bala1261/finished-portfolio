import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const ImageModal = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-slate-900 border border-white/20 p-2 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <img
            src={imageSrc}
            alt={imageAlt || "Enlarged view"}
            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
          />
          {imageAlt && (
            <div className="p-3 text-center text-gray-300 text-sm font-medium">
              {imageAlt}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;