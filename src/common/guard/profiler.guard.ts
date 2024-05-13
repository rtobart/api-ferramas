import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ProfilerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredProfiler = this.reflector.get<string[]>(
      'profiler',
      context.getHandler(),
    );

    if (!requiredProfiler) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return user.profiler.some((profile: string) =>
      requiredProfiler.includes(profile),
    );
  }
}
