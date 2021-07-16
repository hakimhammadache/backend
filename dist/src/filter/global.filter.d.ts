import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request } from 'express';
export declare class GlobalFilterException implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
export declare const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError;
export interface IResponseError {
    statusCode: number;
    message: string;
    code: string;
    timestamp: string;
    method: string;
}
