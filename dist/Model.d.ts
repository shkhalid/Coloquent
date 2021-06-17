import { Builder } from "./Builder";
import { Resource } from "./Resource";
import { PluralResponse } from "./response/PluralResponse";
import { SingularResponse } from "./response/SingularResponse";
import { PaginationStrategy } from "./PaginationStrategy";
import { SaveResponse } from "./response/SaveResponse";
import { ToManyRelation } from "./relation/ToManyRelation";
import { ToOneRelation } from "./relation/ToOneRelation";
import { HttpClient } from "./httpclient/HttpClient";
export interface Model {
    constructor: typeof Model;
}
export declare abstract class Model {
    private type;
    /**
     * @type {string} The JSON-API type, choose plural, lowercase alphabetic only, e.g. 'artists'
     */
    protected abstract jsonApiType: string;
    /**
     * @type {number} the page size
     */
    protected static pageSize: number;
    /**
     * @type {PaginationStrategy} the pagination strategy
     */
    protected static paginationStrategy: PaginationStrategy;
    /**
     * @type {string} The number query parameter name. By default: 'page[number]'
     */
    protected static paginationPageNumberParamName: string;
    /**
     * @type {string} The size query parameter name. By default: 'page[size]'
     */
    protected static paginationPageSizeParamName: string;
    /**
     * @type {string} The offset query parameter name. By default: 'page[offset]'
     */
    protected static paginationOffsetParamName: string;
    /**
     * @type {string} The limit query parameter name. By default: 'page[limit]'
     */
    protected static paginationLimitParName: string;
    private id;
    private relations;
    private attributes;
    private static httpClient;
    protected readOnlyAttributes: string[];
    protected dates: {
        [key: string]: string;
    };
    private static dateFormatter;
    constructor();
    private initHttpClient;
    /**
     * Get a {@link Builder} instance from a {@link Model} instance
     * so you can query without having a static reference to your specific {@link Model}
     * class.
     */
    query(): Builder<this, PluralResponse<this>>;
    /**
     * Get a {@link Builder} instance from a static {@link Model}
     * so you can start querying
     */
    static query<M extends Model>(): Builder<M, PluralResponse<M>>;
    static get<M extends typeof Model & {
        new (): Model;
    }>(this: M, page?: number): Promise<PluralResponse<InstanceType<M>>>;
    static first<M extends typeof Model & {
        new (): Model;
    }>(this: M): Promise<SingularResponse<InstanceType<M>>>;
    static find<M extends typeof Model & {
        new (): Model;
    }>(this: M, id: string | number): Promise<SingularResponse<InstanceType<M>>>;
    static with<M extends typeof Model & {
        new (): Model;
    }>(this: M, attribute: any): Builder<InstanceType<M>, PluralResponse<InstanceType<M>>>;
    static limit<M extends typeof Model & {
        new (): Model;
    }>(this: M, limit: number): Builder<InstanceType<M>, PluralResponse<InstanceType<M>>>;
    static where<M extends typeof Model & {
        new (): Model;
    }>(this: M, attribute: string, value: string): Builder<InstanceType<M>, PluralResponse<InstanceType<M>>>;
    static orderBy<M extends typeof Model & {
        new (): Model;
    }>(this: M, attribute: string, direction?: string): Builder<InstanceType<M>, PluralResponse<InstanceType<M>>>;
    static option<M extends typeof Model & {
        new (): Model;
    }>(this: M, queryParameter: string, value: string): Builder<InstanceType<M>, PluralResponse<InstanceType<M>>>;
    private serialize;
    private serializeRelatedModel;
    private serializeToOneRelation;
    private serializeToManyRelation;
    save(): Promise<SaveResponse<this>>;
    create(): Promise<SaveResponse<this>>;
    delete(): Promise<void>;
    /**
     * @return A {@link Promise} resolving to:
     *
     * * the representation of this {@link Model} instance in the API if this {@link Model} has an ID and this ID can
     * be found in the API too
     * * `undefined` if this {@link Model} instance has no ID
     * * `null` if there _is_ an ID, but a {@link Model} with this ID cannot be found in the backend
     */
    fresh(): Promise<this | null | undefined>;
    getRelations(): {
        [key: string]: any;
    };
    getRelationsKeys(parentRelationName?: string): Array<string>;
    /**
     * @returns {string} e.g. 'http://www.foo.com/bar/'
     */
    abstract getJsonApiBaseUrl(): string;
    /**
     * Allows you to get the current HTTP client (AxiosHttpClient by default), e.g. to alter its configuration.
     * @returns {HttpClient}
     */
    static getHttpClient(): HttpClient;
    /**
     * Allows you to use any HTTP client library, as long as you write a wrapper for it that implements the interfaces
     * HttpClient, HttpClientPromise and HttpClientResponse.
     * @param httpClient
     */
    static setHttpClient(httpClient: HttpClient): void;
    getJsonApiType(): string;
    populateFromResource(resource: Resource): void;
    static getPageSize(): number;
    static getPaginationStrategy(): PaginationStrategy;
    static getPaginationPageNumberParamName(): string;
    static getPaginationPageSizeParamName(): string;
    static getPaginationOffsetParamName(): string;
    static getPaginationLimitParamName(): string;
    protected getRelation(relationName: string): any;
    setRelation(relationName: string, value: any): void;
    getAttributes(): {
        [key: string]: any;
    };
    protected getAttribute(attributeName: string): any;
    protected getAttributeAsDate(attributeName: string): any;
    private isDateAttribute;
    protected setAttribute(attributeName: string, value: any): void;
    /**
     * We use a single instance of DateFormatter, which is stored as a static property on Model, to minimize the number
     * of times we need to instantiate the DateFormatter class. By using this getter a DateFormatter is instantiated
     * only when it is used at least once.
     *
     * @returns DateFormatter
     */
    private static getDateFormatter;
    getApiId(): string | undefined;
    setApiId(id: string | undefined): void;
    protected hasMany<R extends Model>(relatedType: typeof Model): ToManyRelation<R, this>;
    protected hasMany<R extends Model>(relatedType: typeof Model, relationName: string): ToManyRelation<R, this>;
    protected hasOne<R extends Model>(relatedType: typeof Model): ToOneRelation<R, this>;
    protected hasOne<R extends Model>(relatedType: typeof Model, relationName: string): ToOneRelation<R, this>;
    private readonly hasId;
}
