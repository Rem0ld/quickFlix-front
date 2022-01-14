import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function App(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setVisible(true);
    // }, 2000);
    // () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grid place-items-center bg-gray-900 h-screen w-screen">
      <AnimatePresence>
        {/* {!visible ? (
          <motion.div
            initial={{
              filter: "blur(6px)",
              y: -500,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
            }}
          >
            <h1 className="text-7xl text-white before:content-['QuickFlix'] before:absolute before:skew-x-51 before:translate-x-10 before:opacity-50 before:blur-2 ">
              QuickFlix
            </h1>
          </motion.div>
        ) : (
        )} */}
        <div
          onClick={() => {
            navigate("/browse");
          }}
          className="w-40 h-40 grid place-items-center bg-blue-300 rounded-lg cursor-pointer shadow-md shadow-white hover:border-4 hover:border-white"
        >
          Pierrot
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;
