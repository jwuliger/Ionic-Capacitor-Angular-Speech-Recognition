import { Component, OnInit } from '@angular/core';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';

@Component({
    selector: 'app-firebase',
    templateUrl: './firebase.page.html',
    styleUrls: ['./firebase.page.scss'],
})
export class FirebasePage implements OnInit {
    studentDetails = {
        name: '',
        age: '',
    };
    studentCollectiondata: { id: string; name: string; age: string }[] | any =
        [];

    constructor(private firebaseService: FirebaseService) {}

    ngOnInit() {
        this.get();
        this.firebaseService.updatedSnapshot$.subscribe((snapshot) => {
            this.updateStudentCollection(snapshot);
        });
    }

    trackItems(index: number, itemObject: any) {
        return itemObject.id;
    }

    // Firebase
    async add() {
        const { name, age } = this.studentDetails;
        await this.firebaseService.addStudent(name, age);
        this.studentDetails.name = '';
        this.studentDetails.age = '';
    }

    async get() {
        const snapshot = await this.firebaseService.getStudents();
        this.updateStudentCollection(snapshot);
    }

    updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
        this.studentCollectiondata = [];
        snapshot.docs.forEach((student) => {
            this.studentCollectiondata.push({
                ...student.data(),
                id: student.id,
            });
        });
    }

    async delete(docId: string) {
        await this.firebaseService.deleteStudent(docId);
    }

    async update(docId: string, name: HTMLInputElement, age: HTMLInputElement) {
        await this.firebaseService.updateStudent(docId, name.value, age.value);
    }
}
