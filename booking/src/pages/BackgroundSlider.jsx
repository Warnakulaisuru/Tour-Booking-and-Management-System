import './BackgroundSlider.css';
import imageSlide from './data.jsx';
import { useState, useEffect } from 'react';

const BackgroundSlider = () => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentState === 2) {
                setCurrentState(0);
            } else {
                setCurrentState(currentState + 1);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentState]);

    const bgImageStyle = {
        backgroundImage: `url(${imageSlide[currentState].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%'
    };

    const goToNext = (index) => {
        setCurrentState(index);
    };

    return (
        <div className='container-style'>
            <div style={bgImageStyle}></div>
            <div className='description'>
                <div>
                    <h1>{imageSlide[currentState].title}</h1>
                    <h2>{imageSlide[currentState].body}</h2>
                    {/* <p>{imageSlide[currentState].body1}</p> */}
                </div>
                <div className='carousel-bullets'>
                    {imageSlide.map((slide, index) => (
                        <span key={index} onClick={() => goToNext(index)}></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackgroundSlider;
