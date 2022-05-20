import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    data: any;
    constructor() {}

    ngOnInit() {
        console.log('Hello ngOnInit');
        SpeechRecognition.hasPermission().then((val) => {
            if (val.permission === false) {
                SpeechRecognition.requestPermission();
            }
        });
    }

    startListening() {
        console.log('Hello startListening');
        SpeechRecognition.start({
            language: 'en-US',
            maxResults: 2,
            prompt: 'Say something',
            partialResults: false,
            popup: false,
        }).then((matches) => {
            this.data = matches;
        });
    }

    stopListening() {
        SpeechRecognition.stop();
    }
}
