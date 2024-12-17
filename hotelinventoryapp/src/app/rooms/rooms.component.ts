import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RoomList} from "./rooms";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";
import {catchError, map, Observable, of, Subject, Subscription} from "rxjs";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  roomList: RoomList[] = [];

  selectedRoom !: RoomList;

  hideRooms = false;

  title = 'Room List'

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  totalBytes = 0;

  // subscription !: Subscription;

  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  constructor(private roomService: RoomsService) {

  }

  rooms$ = this.roomService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  )

  ngOnInit(): void {
    // this.subscription = this.roomService.getRooms$.subscribe(rooms => {
    //   // this.stream.subscribe((data) => console.log(data))
    //   // this.stream.subscribe((data) => console.log(data))
    //   this.stream.subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log("complete"),
    //     error: (err) => console.log(err)
    //   })
    //   this.roomList = rooms;
    // })


    this.roomService.getPhotos().subscribe((event) => {
      console.log(event);
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break
        }
        case HttpEventType.Response: {
          console.log(event.body)
        }

      }
    })
  }

  roomSelected(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '106',
      roomType: 'Single',
      roomPrice: 100,
      amenities: 'TV, AC, WiFi',
      checkInTime: new Date('2021-09-06'),
      rating: 4
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room]
    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
      console.log(this.roomList);
    })
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "List of Room"
  }

  ngAfterViewInit(): void {
    console.log(this.headerComponent);
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Single',
      roomPrice: 100,
      amenities: 'TV, AC, WiFi',
      checkInTime: new Date('2021-09-06'),
      rating: 4
    };


    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
      console.log(this.roomList);
    })
  }

  deleteRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Single',
      roomPrice: 100,
      amenities: 'TV, AC, WiFi',
      checkInTime: new Date('2021-09-06'),
      rating: 4
    };


    this.roomService.deleteRoom(room).subscribe((data) => {
      this.roomList = data;
      console.log(this.roomList);
    })
  }

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

}
