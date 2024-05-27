import { HttpException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolCollection } from 'src/database/firestore/collection/tool.collection';
import { mapTool } from './map/tool.map';
import { CustomResponse } from 'src/common/response/response.map';
import { FILTERS, validateCategoryFilter } from './map/filter.map';
import { CategoryCollection } from 'src/database/firestore/collection/category.collection';
import { CentralBankService } from 'src/common/services/CentralBank.service';
import { StockCollection } from 'src/database/firestore/collection/stock.collection';

@Injectable()
export class ToolService {
  constructor(
    private readonly toolCollection: ToolCollection,
    private readonly categoryCollection: CategoryCollection,
    private readonly centralBankService: CentralBankService,
    private readonly stockCollection: StockCollection,
  ) {}

  create(createToolDto: CreateToolDto) {
    return 'This action adds a new tool';
  }

  async findAll() {
    const stocks = await this.stockCollection.getStocks();
    const response = await this.toolCollection.getTools();
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const _res = response.map((element) => {
      return mapTool(element, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }

  findByFilter(filterName: string, filterValue: string) {
    console.log('🚀 ~ ToolService ~ findByFilter ~ filterName:', filterName)
    const filter = validateCategoryFilter(filterName);
    console.log('🚀 ~ ToolService ~ findByFilter ~ filter:', filter)
    if (!filter) throw new HttpException('Invalid filter', 400);
    if (filter === FILTERS.CATEGORY) return this.findByCategory(filterValue);
    if (filter === FILTERS.NAME) return this.findByName(filterValue);
    if (filter === FILTERS.BRAND) return this.findByBrand(filterValue);
    if (filter === FILTERS.SKU) return this.findBySKU(filterValue);
    throw new HttpException('NOT FOUND', 404);
  }
  async findByBrand(filter: string) {
    const stocks = await this.stockCollection.getStocks();
    const response = await this.toolCollection.getByBrand(filter);
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const _res = response.map((element) => {
      return mapTool(element, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }
  async findBySKU(filter: string) {
    console.log('🚀 ~ ToolService ~ findBySKU ~ filter:', filter)
    const stocks = await this.stockCollection.getStocks();
    const response = await this.toolCollection.getBySKU(filter);
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const _res = response.map((element) => {
      return mapTool(element, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }
  async findByName(filter: string) {
    const stocks = await this.stockCollection.getStocks();
    const response = await this.toolCollection.getByName(filter);
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const _res = response.map((element) => {
      return mapTool(element, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }
  async findByCategory(filter: string) {
    const stocks = await this.stockCollection.getStocks();
    const response = await this.toolCollection.getByCategory(filter);
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const _res = response.map((element) => {
      return mapTool(element, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }
  async getCategory() {
    const response = await this.categoryCollection.getCategories();
    const _res = response.map((element) => {
      return {
        id: element._id,
        name: element.c_name,
      }
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
