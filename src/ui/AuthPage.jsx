import React from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

export default function AuthPage({ children, greetMessage }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-content-bg)]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.15 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern house"
          className="h-full w-screen object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 md:px-12">
        <motion.div
          className=" max-w-md lap:max-w-2/5 ta space-y-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ---- Login Card (glass-morphism) ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20"
          >
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Logo />
            </motion.div>

            <div className="mt-6 space-y-2 text-center">
              <Heading type="h2" className="text-2xl font-bold text-gray-900">
                Welcome back
              </Heading>
              <p className="text-[var(--color-neutral-600)]">
                {greetMessage} to manage your listings and connect with buyers.
              </p>
            </div>

            <div className="mt-8">{children}</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
