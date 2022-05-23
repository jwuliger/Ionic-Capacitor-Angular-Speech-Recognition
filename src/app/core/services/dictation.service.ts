import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class DictationService {
    public utterances: any;
    isMobile = this.platform.is('mobile');

    constructor(public platform: Platform) {
        if (this.isMobile) {
            SpeechRecognition.hasPermission().then((val) => {
                if (val.permission === false) {
                    SpeechRecognition.requestPermission();
                }
            });
        }
    }

    startListening() {
        SpeechRecognition.start({
            language: 'en-US',
            maxResults: 1,
            prompt: 'Yes?',
            partialResults: false,
            popup: false,
        }).then((matches) => (this.utterances = matches));
    }
}
