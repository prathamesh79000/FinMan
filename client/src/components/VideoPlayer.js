import React from 'react';
import './VideoPlayer.css'; // Import a CSS file for styling
import videobg from '../png/videoplayback.mp4';

function VideoPlayer() {
    return (
        <div className="video-container">
            <video
                src={videobg}
                autoPlay
                loop
                muted
                className="video-element"
                style={{
                    // height: '50px',
                    width: '100%',
                }}>

            </video>
        </div>
    );
}

export default VideoPlayer;
