// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotRouteConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the route's hub
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#hub_id IotRoute#hub_id}
  */
  readonly hubId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#id IotRoute#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the route
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#name IotRoute#name}
  */
  readonly name: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#region IotRoute#region}
  */
  readonly region?: string;
  /**
  * The Topic the route subscribes to (wildcards allowed)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#topic IotRoute#topic}
  */
  readonly topic: string;
  /**
  * database block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#database IotRoute#database}
  */
  readonly database?: IotRouteDatabase;
  /**
  * rest block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#rest IotRoute#rest}
  */
  readonly rest?: IotRouteRest;
  /**
  * s3 block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#s3 IotRoute#s3}
  */
  readonly s3?: IotRouteS3;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#timeouts IotRoute#timeouts}
  */
  readonly timeouts?: IotRouteTimeouts;
}
export interface IotRouteDatabase {
  /**
  * The database name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#dbname IotRoute#dbname}
  */
  readonly dbname: string;
  /**
  * The database hostname
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#host IotRoute#host}
  */
  readonly host: string;
  /**
  * The database password
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#password IotRoute#password}
  */
  readonly password: string;
  /**
  * The database port
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#port IotRoute#port}
  */
  readonly port: number;
  /**
  * SQL query to be executed ($TOPIC and $PAYLOAD variables are available, see documentation)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#query IotRoute#query}
  */
  readonly query: string;
  /**
  * The database username
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#username IotRoute#username}
  */
  readonly username: string;
}

export function iotRouteDatabaseToTerraform(struct?: IotRouteDatabaseOutputReference | IotRouteDatabase): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dbname: cdktf.stringToTerraform(struct!.dbname),
    host: cdktf.stringToTerraform(struct!.host),
    password: cdktf.stringToTerraform(struct!.password),
    port: cdktf.numberToTerraform(struct!.port),
    query: cdktf.stringToTerraform(struct!.query),
    username: cdktf.stringToTerraform(struct!.username),
  }
}

export class IotRouteDatabaseOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotRouteDatabase | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dbname !== undefined) {
      hasAnyValues = true;
      internalValueResult.dbname = this._dbname;
    }
    if (this._host !== undefined) {
      hasAnyValues = true;
      internalValueResult.host = this._host;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._query !== undefined) {
      hasAnyValues = true;
      internalValueResult.query = this._query;
    }
    if (this._username !== undefined) {
      hasAnyValues = true;
      internalValueResult.username = this._username;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotRouteDatabase | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dbname = undefined;
      this._host = undefined;
      this._password = undefined;
      this._port = undefined;
      this._query = undefined;
      this._username = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dbname = value.dbname;
      this._host = value.host;
      this._password = value.password;
      this._port = value.port;
      this._query = value.query;
      this._username = value.username;
    }
  }

  // dbname - computed: false, optional: false, required: true
  private _dbname?: string; 
  public get dbname() {
    return this.getStringAttribute('dbname');
  }
  public set dbname(value: string) {
    this._dbname = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dbnameInput() {
    return this._dbname;
  }

  // host - computed: false, optional: false, required: true
  private _host?: string; 
  public get host() {
    return this.getStringAttribute('host');
  }
  public set host(value: string) {
    this._host = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hostInput() {
    return this._host;
  }

  // password - computed: false, optional: false, required: true
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // port - computed: false, optional: false, required: true
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // query - computed: false, optional: false, required: true
  private _query?: string; 
  public get query() {
    return this.getStringAttribute('query');
  }
  public set query(value: string) {
    this._query = value;
  }
  // Temporarily expose input value. Use with caution.
  public get queryInput() {
    return this._query;
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }
}
export interface IotRouteRest {
  /**
  * The HTTP call extra headers
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#headers IotRoute#headers}
  */
  readonly headers: { [key: string]: string };
  /**
  * The URI of the REST endpoint
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#uri IotRoute#uri}
  */
  readonly uri: string;
  /**
  * The HTTP Verb used to call REST URI
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#verb IotRoute#verb}
  */
  readonly verb: string;
}

export function iotRouteRestToTerraform(struct?: IotRouteRestOutputReference | IotRouteRest): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    headers: cdktf.hashMapper(cdktf.stringToTerraform)(struct!.headers),
    uri: cdktf.stringToTerraform(struct!.uri),
    verb: cdktf.stringToTerraform(struct!.verb),
  }
}

export class IotRouteRestOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotRouteRest | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._headers !== undefined) {
      hasAnyValues = true;
      internalValueResult.headers = this._headers;
    }
    if (this._uri !== undefined) {
      hasAnyValues = true;
      internalValueResult.uri = this._uri;
    }
    if (this._verb !== undefined) {
      hasAnyValues = true;
      internalValueResult.verb = this._verb;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotRouteRest | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._headers = undefined;
      this._uri = undefined;
      this._verb = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._headers = value.headers;
      this._uri = value.uri;
      this._verb = value.verb;
    }
  }

  // headers - computed: false, optional: false, required: true
  private _headers?: { [key: string]: string }; 
  public get headers() {
    return this.getStringMapAttribute('headers');
  }
  public set headers(value: { [key: string]: string }) {
    this._headers = value;
  }
  // Temporarily expose input value. Use with caution.
  public get headersInput() {
    return this._headers;
  }

  // uri - computed: false, optional: false, required: true
  private _uri?: string; 
  public get uri() {
    return this.getStringAttribute('uri');
  }
  public set uri(value: string) {
    this._uri = value;
  }
  // Temporarily expose input value. Use with caution.
  public get uriInput() {
    return this._uri;
  }

  // verb - computed: false, optional: false, required: true
  private _verb?: string; 
  public get verb() {
    return this.getStringAttribute('verb');
  }
  public set verb(value: string) {
    this._verb = value;
  }
  // Temporarily expose input value. Use with caution.
  public get verbInput() {
    return this._verb;
  }
}
export interface IotRouteS3 {
  /**
  * The name of the S3 route's destination bucket
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#bucket_name IotRoute#bucket_name}
  */
  readonly bucketName: string;
  /**
  * The region of the S3 route's destination bucket
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#bucket_region IotRoute#bucket_region}
  */
  readonly bucketRegion: string;
  /**
  * The string to prefix object names with
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#object_prefix IotRoute#object_prefix}
  */
  readonly objectPrefix?: string;
  /**
  * How the S3 route's objects will be created: one per topic or one per message
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#strategy IotRoute#strategy}
  */
  readonly strategy: string;
}

export function iotRouteS3ToTerraform(struct?: IotRouteS3OutputReference | IotRouteS3): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket_name: cdktf.stringToTerraform(struct!.bucketName),
    bucket_region: cdktf.stringToTerraform(struct!.bucketRegion),
    object_prefix: cdktf.stringToTerraform(struct!.objectPrefix),
    strategy: cdktf.stringToTerraform(struct!.strategy),
  }
}

export class IotRouteS3OutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotRouteS3 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketName = this._bucketName;
    }
    if (this._bucketRegion !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketRegion = this._bucketRegion;
    }
    if (this._objectPrefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.objectPrefix = this._objectPrefix;
    }
    if (this._strategy !== undefined) {
      hasAnyValues = true;
      internalValueResult.strategy = this._strategy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotRouteS3 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucketName = undefined;
      this._bucketRegion = undefined;
      this._objectPrefix = undefined;
      this._strategy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucketName = value.bucketName;
      this._bucketRegion = value.bucketRegion;
      this._objectPrefix = value.objectPrefix;
      this._strategy = value.strategy;
    }
  }

  // bucket_name - computed: false, optional: false, required: true
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
  }

  // bucket_region - computed: false, optional: false, required: true
  private _bucketRegion?: string; 
  public get bucketRegion() {
    return this.getStringAttribute('bucket_region');
  }
  public set bucketRegion(value: string) {
    this._bucketRegion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketRegionInput() {
    return this._bucketRegion;
  }

  // object_prefix - computed: false, optional: true, required: false
  private _objectPrefix?: string; 
  public get objectPrefix() {
    return this.getStringAttribute('object_prefix');
  }
  public set objectPrefix(value: string) {
    this._objectPrefix = value;
  }
  public resetObjectPrefix() {
    this._objectPrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get objectPrefixInput() {
    return this._objectPrefix;
  }

  // strategy - computed: false, optional: false, required: true
  private _strategy?: string; 
  public get strategy() {
    return this.getStringAttribute('strategy');
  }
  public set strategy(value: string) {
    this._strategy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get strategyInput() {
    return this._strategy;
  }
}
export interface IotRouteTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#create IotRoute#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route#default IotRoute#default}
  */
  readonly default?: string;
}

export function iotRouteTimeoutsToTerraform(struct?: IotRouteTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
  }
}

export class IotRouteTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): IotRouteTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotRouteTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._default = value.default;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // default - computed: false, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route scaleway_iot_route}
*/
export class IotRoute extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iot_route";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_route scaleway_iot_route} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotRouteConfig
  */
  public constructor(scope: Construct, id: string, config: IotRouteConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iot_route',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.17.0',
        providerVersionConstraint: '>= 2.16.3'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._hubId = config.hubId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._topic = config.topic;
    this._database.internalValue = config.database;
    this._rest.internalValue = config.rest;
    this._s3.internalValue = config.s3;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // hub_id - computed: false, optional: false, required: true
  private _hubId?: string; 
  public get hubId() {
    return this.getStringAttribute('hub_id');
  }
  public set hubId(value: string) {
    this._hubId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hubIdInput() {
    return this._hubId;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // region - computed: true, optional: true, required: false
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  public resetRegion() {
    this._region = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // topic - computed: false, optional: false, required: true
  private _topic?: string; 
  public get topic() {
    return this.getStringAttribute('topic');
  }
  public set topic(value: string) {
    this._topic = value;
  }
  // Temporarily expose input value. Use with caution.
  public get topicInput() {
    return this._topic;
  }

  // database - computed: false, optional: true, required: false
  private _database = new IotRouteDatabaseOutputReference(this, "database");
  public get database() {
    return this._database;
  }
  public putDatabase(value: IotRouteDatabase) {
    this._database.internalValue = value;
  }
  public resetDatabase() {
    this._database.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseInput() {
    return this._database.internalValue;
  }

  // rest - computed: false, optional: true, required: false
  private _rest = new IotRouteRestOutputReference(this, "rest");
  public get rest() {
    return this._rest;
  }
  public putRest(value: IotRouteRest) {
    this._rest.internalValue = value;
  }
  public resetRest() {
    this._rest.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get restInput() {
    return this._rest.internalValue;
  }

  // s3 - computed: false, optional: true, required: false
  private _s3 = new IotRouteS3OutputReference(this, "s3");
  public get s3() {
    return this._s3;
  }
  public putS3(value: IotRouteS3) {
    this._s3.internalValue = value;
  }
  public resetS3() {
    this._s3.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get s3Input() {
    return this._s3.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new IotRouteTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: IotRouteTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      hub_id: cdktf.stringToTerraform(this._hubId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      topic: cdktf.stringToTerraform(this._topic),
      database: iotRouteDatabaseToTerraform(this._database.internalValue),
      rest: iotRouteRestToTerraform(this._rest.internalValue),
      s3: iotRouteS3ToTerraform(this._s3.internalValue),
      timeouts: iotRouteTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
