import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const phone = '92 3256344517';
  const msg   = encodeURIComponent('Hi TechPrix! I\'d like to discuss a project.');

  return (
    <a
      id="whatsapp-btn"
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0,  scale: 1   }}
            exit={{    opacity: 0, x: 10, scale: 0.9  }}
            className="glass px-4 py-2 rounded-full text-sm font-semibold text-text-main shadow-lg border border-white/80 whitespace-nowrap"
          >
            Chat with us 👋
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
      >
        <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7">
          <path d="M16.003 3C9.374 3 3.997 8.373 3.997 15c0 2.262.629 4.378 1.72 6.188L3 29l7.99-2.69A12.947 12.947 0 0016.003 27C22.63 27 28 21.627 28 15S22.63 3 16.003 3zm0 23.5a10.94 10.94 0 01-5.598-1.527l-.4-.238-4.747 1.598 1.613-4.63-.262-.42A10.95 10.95 0 015.003 15C5.003 9.2 9.2 5 16.003 5 22.804 5 27 9.2 27 15S22.804 26.5 16.003 26.5zM21.5 17.9c-.323-.16-1.908-.94-2.203-1.05-.295-.11-.51-.16-.728.16-.217.323-.842 1.052-1.03 1.268-.19.217-.377.244-.7.08-.323-.16-1.36-.5-2.59-1.6-.96-.855-1.608-1.91-1.797-2.232-.19-.323-.02-.498.142-.658.147-.145.323-.377.485-.566.16-.19.213-.323.32-.538.108-.217.055-.406-.027-.566-.08-.16-.728-1.755-.997-2.403-.262-.63-.53-.545-.728-.555l-.62-.01c-.217 0-.566.08-.863.406-.295.323-1.13 1.105-1.13 2.694 0 1.59 1.16 3.127 1.32 3.344.16.217 2.282 3.486 5.53 4.888.773.334 1.375.533 1.845.682.775.247 1.482.212 2.04.128.622-.092 1.908-.78 2.177-1.532.27-.752.27-1.396.19-1.532-.082-.136-.296-.217-.62-.378z" />
        </svg>
      </motion.div>
    </a>
  );
};

export default WhatsAppButton;
