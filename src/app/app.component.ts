
import { Component, OnInit } from '@angular/core';

import { Todo } from './todo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'TODO List App';
  
  todoValue:string="";
  list: Todo[]=[];
  
  ngOnInit(){
    this.list=JSON.parse(localStorage.getItem('setedList')|| '{}');
    this.todoValue="";
    // this.disableAllDelete();
  }

  addItem(){   
    if(this.todoValue !==""){
      const newItem: Todo={
        id:Date.now(),
        value:this.todoValue,
        isDone:false
      };

      this.list.push(newItem);
      localStorage.setItem('setedList', JSON.stringify(this.list));
    }
    this.todoValue="";
  }

  deleteItem(id:number){
    this.list=this.list.filter(item => item.id !== id);
    localStorage.setItem('setedList', JSON.stringify(this.list));
    // if(this.list.length ==0){
    //   this.disableAllDelete();
    // }
  }
  
  deleteAllItem(){
    if(this.list.length >0 && confirm("All Items get deleted")){
      this.list=[];
    }
    localStorage.setItem('setedList', JSON.stringify(this.list));
  }

  onChange(event:any, id:number){
    if (event.target.checked ) {
      this.list=this.list.map(obj => {
        if (obj.id === id) {
         obj.isDone=true;
        }
        return obj;
      });
    } 
    else {
      this.list=this.list.map(obj => {
        if (obj.id === id) {
         obj.isDone=false;
        }
        return obj;
      });
    }
    localStorage.setItem('setedList', JSON.stringify(this.list));
  }

  // disableAllDelete(){
  //   const box = document.getElementById('delete-all-btn') as HTMLInputElement | null;
  //   if(box != null && this.list.length ==0){
  //     (box).classList.add('disabled');
  //   }
  // }
  // enableAllDelete(){
  //   const box = document.getElementById('delete-all-btn') as HTMLInputElement | null;
  //   if(box != null && this.list.length >0){
  //     (box).classList.remove('disabled');
  //   }
  // }

  // swap(){
  //   [this.list[0], this.list[2]] = [this.list[2], this.list[0]];
  //   console.log(this.list);
  // }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    localStorage.setItem('setedList', JSON.stringify(this.list));
  }

  
}
