import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../environments/environment";
import { Category, Skill } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverURL = environment.serverUrl;
  
  isLoading: boolean = true;
  subjectLoading = new Subject<boolean>();

  categories: Category[] = [];
  skills: Skill[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.initFromServer();
  }

  private async initFromServer() { 
    this.isLoading = true;
    this.subjectLoading.next(true);

    try { 
      this.categories = await this.http.get<Category[]>(this.serverURL + '/api/category').toPromise();
      this.skills = await this.http.get<Skill[]>(this.serverURL + "/api/skill").toPromise();
    } catch (err) { 
      console.log(err);
      this.toastr.error("Server", err.error.message || err.message);
    }

    this.isLoading = false;
    this.subjectLoading.next(false);
  }

}
