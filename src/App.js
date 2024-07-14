import { useState, useCallback, useRef } from "react";
import "./App.css";
import TDC from "./assets/TDC.jpg";
import { toPng } from "html-to-image";

function App() {
  const ref = useRef(null);

  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="main">
      <div className="right">
        <ul>
          <li>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter your name"
            />
          </li>
          <li>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="description"
            />
          </li>
          <button style={{ marginLeft: "14px", padding: "2px" }}>
            Generate
          </button>
          <button
            onClick={onButtonClick}
            style={{ marginLeft: "14px", padding: "2px" }}
          >
            Download
          </button>
        </ul>
      </div>
      <div className="left-side" ref={ref}>
      <img src={TDC} width="892px" alt="certifcate" />
      <h1 className="name">{input}</h1>
      <p className="desc">
        <b>{desc}</b>
      </p>
      </div>
    </div>
  );
}

export default App;
