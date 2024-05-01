import { HttpException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolCollection } from 'src/database/firestore/collection/tool.collection';
import { toTool } from './map/tool.map';
import { CustomResponse } from 'src/common/response/response.map';
import { FILTERS, validateCategoryFilter } from './map/filter.map';

@Injectable()
export class ToolService {
  constructor(
    private readonly toolCollection: ToolCollection
  ) {}

  create(createToolDto: CreateToolDto) {
    return 'This action adds a new tool';
  }

  async findAll() {
    const response = await this.toolCollection.getTools();
    const _res = response.map((element) => {
      return toTool(element);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, _res);
  }

  findByFilter(filterName: string, filterValue: string) {
    const filter = validateCategoryFilter(filterName);
    if (!filter) throw new HttpException('Invalid filter', 400);
    if (filter === FILTERS.CATEGORY) {
      return this.findByCategory(filterValue);
    }
    throw new HttpException('NOT FOUND', 404);
  }
  async findByCategory(filter: string) {
    const response = await this.toolCollection.getByCategory(filter);
    const _res = response.map((element) => {
      return toTool(element);
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
