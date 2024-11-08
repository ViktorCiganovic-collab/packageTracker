// TypingEffect.js
import React, { useEffect, useState } from 'react';

const TypingEffect = () => {
    const texts = [
        "Welcome to the Package Tracker - ",
        "Package tracking made easy, you just need a tracking number!"
    ];
    
    const [displayedText, setDisplayedText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false); // Track if typing is complete

    useEffect(() => {
        if (currentTextIndex < texts.length) {
            if (index < texts[currentTextIndex].length) {
                const timeoutId = setTimeout(() => {
                    setDisplayedText((prev) => prev + texts[currentTextIndex].charAt(index));
                    setIndex((prev) => prev + 1);
                }, 100); // Typing speed in milliseconds
                return () => clearTimeout(timeoutId); // Cleanup on unmount
            } else {
                // Mark as complete when the last text finishes typing
                if (currentTextIndex === texts.length - 1) {
                    setIsComplete(true);
                }

                // Move to the next text after a pause
                const timeoutId = setTimeout(() => {
                    setCurrentTextIndex((prev) => prev + 1);
                    setIndex(0); // Reset index for the next text
                }, 1000); // Pause before starting the next text
                return () => clearTimeout(timeoutId);
            }
        }
    }, [index, currentTextIndex, texts]);

    return (
        <div id="typing" style={{ borderRight: '2px solid white', whiteSpace: 'wrap', overflow: 'hidden' }}>
            {displayedText}
            {isComplete && <span> </span>} {/* Add space after completion */}
        </div>
    );
};

export default TypingEffect;
