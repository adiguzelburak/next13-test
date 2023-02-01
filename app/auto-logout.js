"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function AutoLogout() {
  let time = 15;
  const [timeLeft, setTimeLeft] = useState(time);
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);

    function resetTimer() {
      setTimeLeft(time);
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timerId);
          setStatus("Offline log in again please. !");
          return 0;
        }
        setStatus("Online");
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <span
        style={
          status === "Online"
            ? { color: "green", fontWeight: "bold" }
            : { color: "red", fontWeight: "bold" }
        }
      >
        Status: {status}
      </span>
      <br /> <div>Remaining Time: {timeLeft} sec</div>
      <br />
      {/* <button onClick={setTimer}>asd</button> */}
      <h1>
        NOTE: Timer is resets any{" "}
        <span style={{ color: "orange" }}>
          mouse moving, clicking or keyboard keyDown
        </span>
      </h1>
    </div>
  );
}
