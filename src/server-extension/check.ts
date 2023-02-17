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
  if (req.operation.operation === 'mutation') {
    // Mutation requests are protected by JWT
    return mutationAuthChecker(req.http);
  }

  // Rest of requests may be protected by API key
  return queryAuthChecker(req.http);
}

const mutationAuthChecker = (httpReq: HttpRequest): boolean => {
  const authHeader = httpReq.headers.get("authorization");
  if (!authHeader) return false;

  const secret = process.env.JWT_SECRET || '';
  try {
    const decoded = jwt.verify(authHeader.split('Bearer ')[1], secret) as JwtPayload;
    return decoded.value === "MUTATE";
  } catch (error) {
    return false;
  }
};

const queryAuthChecker = (httpReq: HttpRequest): boolean => {
  const squidName = process.env.SQUID_NAME;
  if(!squidName){
    return true;
  }
  const envVarSuffix = squidName.toUpperCase().replace(/-/g,'_')
  const envVarName = `APIKEY_${envVarSuffix}`
  const secret = process.env[envVarName];
  // If no secret set, allow all
  if (!secret) return true;

  const authHeader = httpReq.headers.get("authorization");

  return authHeader === `Bearer ${secret}`;
};