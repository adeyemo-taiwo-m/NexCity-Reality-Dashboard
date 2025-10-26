import MainSIdeNav from "./MainSIdeNav";
import { HiX } from "react-icons/hi";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import CancelX from "./CancelX";

function SideNav({ isOpen = false, onClose = () => {} }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Animated sidebar */}
          <motion.aside
            className="relative w-64 bg-white h-full shadow-xl border-r border-gray-200"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="p-4 flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <CancelX onClose={onClose} />
            </div>
            <MainSIdeNav />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SideNav;
