import { Component ,OnInit} from '@angular/core';
import { CurdService } from './../services/curd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit  {
 
  students: any;
  studentName: string;
  studentTelaphone: number;
  studentAddress: string;
 
  constructor(private crudService: CurdService) { }
 
  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Telaphone: e.payload.doc.data()['Telaphone'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);
 
    });
  }
 
  CreateRecord() {
    let record = {};
    record['Name'] = this.studentName;
    record['Telaphone'] = this.studentTelaphone;
    record['Address'] = this.studentAddress;
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentName = "";
      this.studentTelaphone = undefined;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditTelaphone = record.Age;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Telaphone'] = recordRow.EditTelaphone;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
 
}
