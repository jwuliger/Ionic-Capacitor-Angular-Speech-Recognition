import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    data: any;
    items$: Observable<Item[]>;
    isMobile = this.platform.is('mobile');

    constructor(private firestore: Firestore, public platform: Platform) {
        const itemsRef = collection(this.firestore, 'entries');
        this.items$ = collectionData(itemsRef, { idField: 'id' }) as Observable<
            Item[]
        >;
    }

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

export interface Item {
    comment: string;
    // eslint-disable-next-line id-blacklist
    number: string;
}
