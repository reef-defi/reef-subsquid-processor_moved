import jwt, { JwtPayload } from 'jsonwebtoken';
import {Model} from '@subsquid/openreader/lib/model'
import {GraphQLSchema, OperationDefinitionNode} from 'graphql';

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

console.log('  REQUEST CHECK 22 ', (new Date()).toString())

 switch(req.operationName) {
        case 'forbidme':
            return false
        case 'forbid':
            return false
        case 'complex':
            return "too 1 complex"
        case 'complex1':
            return "this 1 is complex"
        case 'foo':
            return "bar1"
        default:
            return false
  }
      
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
  const secretProp = `APIKEY_${squidName?.toUpperCase().replace(/-/g,'_')}`;
  const secret = process.env[secretProp];
  console.log('QUERY AUTH CHECKER val = ', secret, ' secret prop=',secretProp, ' reqHeaderVal=', httpReq.headers.get("authorization"));
  console.log('secret not present=',!secret)
  // If no secret set, allow all
  if (!secret) return true;
  const authHeader = httpReq.headers.get("authorization");
    console.log('check header =',authHeader === `Bearer ${secret}`);
    return authHeader === `Bearer ${secret}`;
};