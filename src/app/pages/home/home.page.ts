import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    data: any;
    isMobile = this.platform.is('mobile');

    constructor(public platform: Platform) {}

    ngOnInit() {
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
            prompt: 'Say something',
            partialResults: false,
            popup: false,
        }).then((matches) => {
            this.data = matches;
        });
    }

    // stopListening() {
    //     SpeechRecognition.stop();
    // }

    trackItems(index: number, itemObject: any) {
        return itemObject.id;
    }
}
