
import logo from '../assets/logo.png';
import { motion } from "framer-motion";

function CardWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
        <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
          >
            <img  className="block w-[50px] sm:w-[50px] md:w-[100px]"  src={logo} alt="CNU-Free"/> 
        </motion.div>

      <motion.div
          className="w-full max-w-lg border border-gray-200 rounded-2xl shadow-sm p-8"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default CardWrapper