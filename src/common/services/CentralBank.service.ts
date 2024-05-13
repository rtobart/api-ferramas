import { Injectable } from '@nestjs/common';
import { HttpCustomService } from './httpCustom.service';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { ObjetoMoneda } from '../interfaces/money.interface';

@Injectable()
export class CentralBankService {
  URL: string = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/';
  CMF_API_KEY: string = this.configService.get<string>('CMF_API_KEY');
  constructor(
    private httpService: HttpCustomService,
    private readonly configService: ConfigService,
  ) {}
  async getTodayDollarData(): Promise<ObjetoMoneda> {
    const resource = 'dolar';
    const dates = this.getRelevantDates();
    const query = `?apikey=${this.CMF_API_KEY}&formato=json`;
    let request = `${resource}${query}`;
    let _response = this.httpService.get(this.URL, {
      path: request,
    });
    let response = await lastValueFrom(_response);
    if (!response.error) return response.data;
    request = `${resource}/${dates.lastFriday.year}/${dates.lastFriday.month}/dias/${dates.lastFriday.day}${query}`;
    response = await lastValueFrom(this.httpService.get(this.URL, { path: request }));
    return response.data;
  }
  formatQueryDates(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }
  getRelevantDates(): { today: any; lastFriday?: any; nextMonday?: any } {
    const today = new Date();
    const offset = today.getTimezoneOffset() / 60 + 4;
    const todayUTC4 = new Date(today.setHours(today.getHours() - offset));
    const dayOfWeek = todayUTC4.getDay();
    const response = {
      today: this.formatQueryDates(todayUTC4),
    }
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      const lastFriday = new Date(todayUTC4);
      lastFriday.setDate(todayUTC4.getDate() - (dayOfWeek === 6 ? 1 : 2));
      const nextMonday = new Date(todayUTC4);
      nextMonday.setDate(todayUTC4.getDate() + (dayOfWeek === 6 ? 2 : 1));
      response['lastFriday'] = this.formatQueryDates(lastFriday)
      response['nextMonday'] = this.formatQueryDates(lastFriday)
    }
    return response;
  }
}
