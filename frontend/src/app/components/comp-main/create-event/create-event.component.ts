import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  eventData: FormGroup;
  picturePath: string | ArrayBuffer;
  responseText: string;

  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventData = new FormGroup({
      'title': new FormControl(''),
      'picture': new FormControl(''),
      'address': new FormControl(''),
      'start': new FormControl(null),
      'finish': new FormControl(null),
      'description': new FormControl('')
    });
  }

  onFileAdded(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.picturePath = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onCancel() {
    this.router.navigate(['/comp/main']);
  }

  onSubmit() {
    this.eventService.createEvent(this.eventData.value)
      .subscribe(result => {
        this.responseText = 'Your event is successfully created!';
        setTimeout(() => {
          this.onCancel();
        }, 1500);
      });
  }

}
