import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class Tokenizer implements HttpInterceptor{

    constructor(private authService: AuthService)
    {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        req.headers.append('Authorization','Bearer ' + this.authService.getToken());
        return next.handle(req);
    }
}
