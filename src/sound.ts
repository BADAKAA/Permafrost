//These variables control audio playback time and are responsible for deactivating user input while non-ambient audio is playing.

export let remainingPlayBack:number = 0;

export function audioLength(duration:number) {

    remainingPlayBack=duration*1000;
    const playback= setInterval(function counter(){
        remainingPlayBack=remainingPlayBack-100;
        if (remainingPlayBack<100) {
            remainingPlayBack=0;
            clearInterval(playback);
        }
    }, 100);
}

//enable audio output
export class sound {
    sound:HTMLAudioElement;
    play: (background?:string) => void;
    stop: () => void;
    fade: () => void;
    constructor(src:any) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function (background?:string) {
            adjustVolume(this.sound,1)
            this.sound.play();

            if (!background) {
                audioLength(this.sound.duration);
            } else if (background=="background"){
                audioLength(5);
            }
        };
        
        this.stop = function () {
            this.sound.pause();
        };

        this.fade = function () {
            adjustVolume(this.sound,0);
            setTimeout(()=>this.sound.pause(),3000) 
        };
    }
}

//Fading function taken from: https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
async function adjustVolume(
    element: HTMLMediaElement,
    newVolume: number,
    {
        duration = 1000,
        easing = swing,
        interval = 13,
    }: {
        duration?: number,
        easing?: typeof swing,
        interval?: number,
    } = {},
): Promise<void> {
    const originalVolume = element.volume;
    const delta = newVolume - originalVolume;

    if (!delta || !duration || !easing || !interval) {
        element.volume = newVolume;
        return Promise.resolve();
    }

    const ticks = Math.floor(duration / interval);
    let tick = 1;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            element.volume = originalVolume + (
                easing(tick / ticks) * delta
            );

            if (++tick === ticks + 1) {
                clearInterval(timer);
                resolve();
            }
        }, interval);
    });
}

export function swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2;
}