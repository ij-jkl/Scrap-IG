// IG restricts downloading non-image content from the network console, especially if it includes music.
// Open the IG Story you want to scrape. Recording starts when pasted in the console, and the download begins automatically after the video ends.


// Record and download videos with audio from IG stories:

(async () => {
    const video = document.querySelector('video');
    if (!video) {
        console.log("No video was found.");
        return;
    }

    const stream = video.captureStream();
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'captured-instagram-story.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("Download completed.");
    };

    recorder.start();
    console.log("Recording started. Play the video...");

    // Stop recording when the video ends
    video.addEventListener('ended', () => {
        if (recorder.state === "recording") {
            recorder.stop();
            console.log("Recording stopped because video ended.");
        }
    });

    // Stop recording when the video is paused
    video.addEventListener('pause', () => {
        if (recorder.state === "recording") {
            recorder.stop();
            console.log("Recording stopped because video was paused.");
        }
    });
})();


// Capture and save frames from IG videos as images

(() => {
    const video = document.querySelector('video');
    if (!video) {
        console.log("No video was found.");
        return;
    }

    // We take the screen of the img with music on the exact time that the script is executed.
    video.pause();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'instagram-story.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        console.log("Image downloaded successful.");
    }, 'image/png');
})();