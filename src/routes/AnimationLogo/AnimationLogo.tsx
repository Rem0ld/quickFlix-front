import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import logoLetter from "../../../assets/logo-letter-no-bg.svg";
import u from "../../../assets/individual-letters/Frame 19.svg";
import i from "../../../assets/individual-letters/Frame 20.svg";
import c from "../../../assets/individual-letters/Frame 21.svg";
import k from "../../../assets/individual-letters/Frame 22.svg";
import f from "../../../assets/individual-letters/Frame 23.svg";
import l from "../../../assets/individual-letters/Frame 24.svg";
import i2 from "../../../assets/individual-letters/Frame 25.svg";
import x from "../../../assets/individual-letters/Frame 26.svg";
import avatar from "../../../assets/avatar-original.png";
import { AuthConsumer } from "../../contexts/auth/AuthContext";

export default function AnimationLogo(): JSX.Element {
  const navigate = useNavigate();
  const { user } = AuthConsumer();
  const t1 = gsap.timeline();
  const t2 = gsap.timeline();
  const qRef = useRef(null);
  const ref = useRef<any>([]);

  const checkUser = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/browse");
    }
  };

  useEffect(() => {
    t1.fromTo(
      qRef.current,
      {
        position: "absolute",
        right: 0,
        y: -500,
      },
      {
        y: 0,
        duration: 1,
      },
    );
    t1.to(qRef.current, {
      delay: 0.5,
      left: "0%",
      translateX: "-10%",
      opacity: 0,
      duration: 0.243 * 9,
    });

    t2.from(ref.current, {
      opacity: 0,
      delay: 1.5,
      stagger: 0.2,
    });
    t2.to(ref.current, {
      opacity: 0,
      stagger: 0.1,
      reversed: true,
    });
    t2.to(".card", {
      duration: 0.5,
      opacity: 1,
    });
  }, []);

  return (
    <>
      <div className="grid place-items-center h-[calc(100vh-3.5rem)]">
        <div
          className="relative"
          style={{
            maxHeight: 200,
            maxWidth: "100vw",
          }}
        >
          <img src={logoLetter} ref={qRef} className="h-40 absolute" />
          <img
            src={logoLetter}
            ref={(element) => {
              ref.current[8] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={u}
            ref={(element) => {
              ref.current[7] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={i}
            ref={(element) => {
              ref.current[6] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={c}
            ref={(element) => {
              ref.current[5] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={k}
            ref={(element) => {
              ref.current[4] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={f}
            ref={(element) => {
              ref.current[3] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={l}
            ref={(element) => {
              ref.current[2] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={i2}
            ref={(element) => {
              ref.current[1] = element;
            }}
            className="h-40 inline"
          />
          <img
            src={x}
            ref={(element) => {
              ref.current[0] = element;
            }}
            className="h-40 inline"
          />
        </div>

        <div
          onClick={() => {
            checkUser();
          }}
          className="card absolute w-40 h-40 opacity-0 "
        >
          <div className="w-40 h-40 absolute hover:border-4 hover:border-white rounded-lg" />
          <div className="w-40 h-40 grid place-items-center bg-blue-300 rounded-lg cursor-pointer shadow-md shadow-white ">
            <img src={avatar} className="rounded-lg" />
          </div>
          <div className="text-white text-center text-lg">{user?.pseudo}</div>
        </div>
      </div>
    </>
  );
}
