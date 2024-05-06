import { Injectable } from '@nestjs/common';
import { HttpCustomService } from './httpCustom.service';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

type Moneda = {
  Valor: string;
  Fecha: string;
};

type ObjetoMoneda = {
  Dolares: Moneda[];
};

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
    console.log('🚀 ~ CentralBankService ~ getTodayDollarData ~ dates:', dates)
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
    const dayOfWeek = today.getDay();
    const response = {
      today: this.formatQueryDates(today),
    }
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      const lastFriday = new Date(today);
      lastFriday.setDate(today.getDate() - (dayOfWeek === 6 ? 1 : 2));
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + (dayOfWeek === 6 ? 2 : 1));
      response['lastFriday'] = this.formatQueryDates(lastFriday)
      response['nextMonday'] = this.formatQueryDates(lastFriday)
    }
    return response;
  }
}
