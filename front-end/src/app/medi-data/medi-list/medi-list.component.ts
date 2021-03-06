import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MediData } from '../medi-data';
import { MediDataService } from '../medi-data.service';

@Component({
  selector: 'app-medi-list',
  templateUrl: './medi-list.component.html',
  styleUrls: ['./medi-list.component.scss']
})
export class MediListComponent implements OnInit {
  public sessionStorage = sessionStorage;
  mediData: MediData[];
  id: any;
  form: FormGroup;
  mediDataId:any;
  

  carbs: number[] = [];
  glucose:number[] = [];
  dates: string[] = [];

  labelsTable = ['#','Blood Glucose Level', 'Carb Intake', 'Date & Time'];

  constructor(private mediService: MediDataService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("kalispera");
    this.id = this.route.snapshot.queryParamMap.get("id")

    if(sessionStorage.getItem("credentials") == null){
      this.router.navigate(['login'])
    }else if(sessionStorage.getItem("role")== "doctor"){
      console.log("exw id");
      this.mediService.getMediOfPatient(this.id).subscribe(medi => {this.mediData = medi, this.fillData(this.mediData)});
    }else if(sessionStorage.getItem("role")== "patient"){
      this.mediService.getMedi().subscribe(medi => {this.mediData = medi, this.fillData(this.mediData)});
    }else if(sessionStorage.getItem("role")== "chiefDoctor"){
        this.form = new FormGroup({
        fromDate: new FormControl(null, [Validators.required]),
        untilDate: new FormControl(null, [Validators.required])
    });
   }
 }

 
  fillData(medi){
    if(medi === undefined || medi.length == 0){
        this.carbs = [];
        this.glucose = [];
        this.dates = [];  
    }else{

      const datePipe = new DatePipe('en-US');
      medi.forEach((value) => {
      this.carbs.push(value.carb),
      this.glucose.push(value.glucose),
      this.dates.push(datePipe.transform(value.measuredDate, 'EEEE, MMMM d'));
      }
      )
    }  
  
    this.carbs = [...this.carbs]
    this.glucose = [...this.glucose]
    this.dates = [...this.dates]
  
  }

  deleteMedidata(medi_uri){
    var id = medi_uri.split(['/']).pop();
    
    this.mediService.removeMedi(id).subscribe(
      ()=> {alert("You are going to delete your Medical Data");location.reload()}
    );  
  }

  formSumbit(){
    const data ={
        "fromDate": this.form.get('fromDate').value,
        "untilDate":this.form.get('untilDate').value
        }
    
   this.mediService.getMediOfPatientSub(this.id, data.fromDate, data.untilDate).subscribe(
     medi => {this.mediData = medi, this.fillData(medi)}
     );
  }

  onClickUpdate(url, uri){
    this.mediDataId = uri.split(['/']).pop()
    this.router.navigate([url], {queryParams:{id : this.mediDataId}}).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
  
}
