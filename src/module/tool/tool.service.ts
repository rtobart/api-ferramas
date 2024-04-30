import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolCollection } from 'src/database/firestore/collection/tool.collection';
import { toTool } from './map/tool.map';
import { CustomResponse } from 'src/common/response/response.map';

@Injectable()
export class ToolService {
  constructor(
    private readonly toolCollection: ToolCollection
  ) {}

  create(createToolDto: CreateToolDto) {
    return 'This action adds a new tool';
  }

  async findAll() {
    try {
      const response = await this.toolCollection.getTools();
      const _res = response.map((element) => {
        return toTool(element);
      });
      return new CustomResponse({ code: '200', message: 'OK' }, _res);
    } catch (e: any) {
      console.error(JSON.stringify(e));
      return new CustomResponse({ code: '500', message: 'BAD GATEWAY' });
    }
  }

  findByFilter(id: number) {
    return `This action returns a #${id} tool`;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
