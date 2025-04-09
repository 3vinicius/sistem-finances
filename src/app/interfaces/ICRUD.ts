import { Observable } from 'rxjs';

export interface ICRUD<T, ID = number> {
    get():Observable<T[]>;
    put(id: ID, object: T):Observable<T>;
    post(object: T):Observable<T>;
    delete(id: ID):Observable<void>;
    getId(id: ID):Observable<T>;
}
