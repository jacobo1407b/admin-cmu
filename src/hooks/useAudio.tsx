const useAudio = () => {
    async function toggle() {
        const audio = new Audio('SD_ALERT_27.mp3');
        audio.play()
    }
    return { toggle };
};

export default useAudio