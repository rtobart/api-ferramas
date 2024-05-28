import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebPayService } from 'src/common/services/webpay.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly WebPayService: WebPayService) {}

  @Post()
  createTransaction(
    @Body() filter: {uyOrder: string, sessionId: string, amount: number, returnUrl: string, cartId: string}
  ) {
    console.log('🚀 ~ TransactionController ~ filter:', filter)
    const { uyOrder, sessionId, amount, returnUrl, cartId } = filter;
    return this.WebPayService.createTransaction(uyOrder, sessionId, amount, returnUrl, cartId);
  }

  @Get(':token')
  commitTransaction(@Param('token') token: string) {
    return this.WebPayService.commitTransaction(token);
  }
  @Get(':order/:cart')
  validateOrder(
    @Param('order') order: string,
    @Param('cart') cart: string
  ) {
    return this.WebPayService.validateTransaction(order, cart);
  }
}
