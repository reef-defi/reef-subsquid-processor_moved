import jwt, { JwtPayload } from 'jsonwebtoken';
import {Model} from '@subsquid/openreader/lib/model'
import {GraphQLSchema, OperationDefinitionNode} from 'graphql'

interface HttpHeaders extends Iterable<[string, string]> {
    get(name: string): string | null
    has(name: string): boolean
    entries(): Iterator<[string, string]>
    keys(): Iterator<string>
}

interface HttpRequest {
    readonly url: string
    readonly method: string
    readonly headers: HttpHeaders
}

interface RequestCheckContext {
  http: HttpRequest
  operation: OperationDefinitionNode
  operationName: string | null
  schema: GraphQLSchema
  context: Record<string, any>
  model: Model
}

// Interceptor for GraphQL HTTP requests
export async function requestCheck(req: RequestCheckContext): Promise<boolean | string> {
  // Mutation requests are protected by JWT
  if (req.operation.operation === 'mutation') {
    if (!mutationAuthChecker(req.http)) {
      console.log('Unauthorized mutation request');
      return false;
    }
  }
  return true;
}

const mutationAuthChecker = (httpReq: HttpRequest): boolean => {
  const token = httpReq.headers.get("authorization");
  if (!token) return false;

  const staticSecret = process.env.JWT_SECRET || '';
  try {
    const decoded = jwt.verify(token.split('Bearer ')[1], staticSecret) as JwtPayload;
    return decoded.value === "MUTATE";
  } catch (error) {
    return false;
  }
};