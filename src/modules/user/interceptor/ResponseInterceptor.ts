import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { User } from 'domain/user'
import { instanceToInstance } from 'class-transformer'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof User) {
          return { ...instanceToInstance(data) }
        }

        if (Array.isArray(data)) {
          return data.map(item =>
            item instanceof User ? { ...instanceToInstance(item) } : item
          )
        }

        return data
      })
    )
  }
}
