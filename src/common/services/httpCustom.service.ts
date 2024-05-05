import { HttpException, Injectable } from '@nestjs/common';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiPost } from '../interfaces/apiPost.interface';
import { ApiGet } from '../interfaces/apiGet.interface';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}
  get(route: string, request: ApiGet, headers?: any): Observable<any> {
    const result = this.httpService.get(`${route}${request.path}`, { headers });
    return result
    .pipe(
      map((data) => {
        return data;
      }),
      catchError((e) => {
        return of(this.errorFormat(e.response));
      }),
    );
  }
  async post(route: string, request: ApiPost, headers?: any): Promise<any> {
    const result = this.httpService.post(
      `${route}${request.path}`,
      request.body,
      { headers },
    );
    return result.pipe(
      map(async (data) => {
        return data;
      }),
      catchError((e) => {
        return of(this.errorFormat(e.response));
      }),
    );
  }

  async patch(route: string, request: ApiPost, headers?: any): Promise<any> {
    const result = this.httpService.patch(
      `${route}${request.path}`,
      request.body,
      {
        headers,
      },
    );
    return result.pipe(
      map(async (data) => {
        return data;
      }),
      catchError((e) => {
        return of(this.errorFormat(e.response));
      }),
    );
  }
  async put(route: string, request: ApiPost, headers?: any): Promise<any> {
    const result = this.httpService.put(
      `${route}${request.path}`,
      request.body,
      {
        headers,
      },
    );
    return result.pipe(
      map(async (data) => {
        return data;
      }),
      catchError((e) => {
        return of(this.errorFormat(e.response));
      }),
    );
  }
  async delete(route: string, request: ApiGet, headers?: any): Promise<any> {
    const result = this.httpService.delete(`${route}${request.path}`, {
      headers,
    });
    return result.pipe(
      map(async (data) => {
        return data;
      }),
      catchError((e) => {
        return of(this.errorFormat(e.response));
      }),
    );
  }
  private errorFormat(response: any) {
    const status = response.status;
    const error = response.data;
    return {error, status};
  }
}
