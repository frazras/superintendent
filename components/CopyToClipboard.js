import React, { useState, useRef } from 'react';
import styles from "../pages/index.module.css";

function CopyToClipboard({ children }) {
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef(null);

  const handleCopyClick = () => {
    const textToCopy = containerRef.current.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className={styles.clip}>
      <button onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
      <div ref={containerRef}>
        {children}
      </div>
      <button onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}

export default CopyToClipboard;
