import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  // @Post()
  // create(@Body() createToolDto: CreateToolDto) {
  //   return this.toolService.create(createToolDto);
  // }
  @Get()
  findAll() {
    return this.toolService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.toolService.findByFilter(+id);
  // }

  @Get('filter/:name/:value')
  findByFilter(@Param('name') name: string, @Param('value') value: string) {
    return this.toolService.findByFilter(name, value);
  }

  @Get('category')
  getCategory() {
    return this.toolService.getCategory();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
  //   return this.toolService.update(+id, updateToolDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.toolService.remove(+id);
  // }
}
