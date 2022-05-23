import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DictationService } from '../../core/services/dictation.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    isMobile = this.platform.is('mobile');

    constructor(
        public platform: Platform,
        public dictationService: DictationService
    ) {}

    trackItems(index: number, itemObject: any) {
        return itemObject.id;
    }
}
