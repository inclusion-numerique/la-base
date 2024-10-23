// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LbBackendConfig extends cdktf.TerraformMetaArguments {
  /**
  * Scaleway S3 bucket website to be served in case all backend servers are down
  * 
  * **NOTE** : Only the host part of the Scaleway S3 bucket website is expected.
  * E.g. 'failover-website.s3-website.fr-par.scw.cloud' if your bucket website URL is 'https://failover-website.s3-website.fr-par.scw.cloud/'.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#failover_host LbBackend#failover_host}
  */
  readonly failoverHost?: string;
  /**
  * User sessions will be forwarded to this port of backend servers
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#forward_port LbBackend#forward_port}
  */
  readonly forwardPort: number;
  /**
  * Load balancing algorithm
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#forward_port_algorithm LbBackend#forward_port_algorithm}
  */
  readonly forwardPortAlgorithm?: string;
  /**
  * Backend protocol
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#forward_protocol LbBackend#forward_protocol}
  */
  readonly forwardProtocol: string;
  /**
  * Interval between two HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_delay LbBackend#health_check_delay}
  */
  readonly healthCheckDelay?: string;
  /**
  * Number of allowed failed HC requests before the backend server is marked down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_max_retries LbBackend#health_check_max_retries}
  */
  readonly healthCheckMaxRetries?: number;
  /**
  * Port the HC requests will be send to. Default to `forward_port`
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_port LbBackend#health_check_port}
  */
  readonly healthCheckPort?: number;
  /**
  * Defines whether proxy protocol should be activated for the health check
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_send_proxy LbBackend#health_check_send_proxy}
  */
  readonly healthCheckSendProxy?: boolean | cdktf.IResolvable;
  /**
  * Timeout before we consider a HC request failed
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_timeout LbBackend#health_check_timeout}
  */
  readonly healthCheckTimeout?: string;
  /**
  * Time to wait between two consecutive health checks when a backend server is in a transient state (going UP or DOWN)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_transient_delay LbBackend#health_check_transient_delay}
  */
  readonly healthCheckTransientDelay?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#id LbBackend#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies whether the Load Balancer should check the backend server’s certificate before initiating a connection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#ignore_ssl_server_verify LbBackend#ignore_ssl_server_verify}
  */
  readonly ignoreSslServerVerify?: boolean | cdktf.IResolvable;
  /**
  * The load-balancer ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#lb_id LbBackend#lb_id}
  */
  readonly lbId: string;
  /**
  * Maximum number of connections allowed per backend server
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#max_connections LbBackend#max_connections}
  */
  readonly maxConnections?: number;
  /**
  * Number of retries when a backend server connection failed
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#max_retries LbBackend#max_retries}
  */
  readonly maxRetries?: number;
  /**
  * The name of the backend
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#name LbBackend#name}
  */
  readonly name?: string;
  /**
  * Modify what occurs when a backend server is marked down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#on_marked_down_action LbBackend#on_marked_down_action}
  */
  readonly onMarkedDownAction?: string;
  /**
  * Type of PROXY protocol to enable
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#proxy_protocol LbBackend#proxy_protocol}
  */
  readonly proxyProtocol?: string;
  /**
  * Whether to use another backend server on each attempt
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#redispatch_attempt_count LbBackend#redispatch_attempt_count}
  */
  readonly redispatchAttemptCount?: number;
  /**
  * Enables PROXY protocol version 2
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#send_proxy_v2 LbBackend#send_proxy_v2}
  */
  readonly sendProxyV2?: boolean | cdktf.IResolvable;
  /**
  * Backend server IP addresses list (IPv4 or IPv6)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#server_ips LbBackend#server_ips}
  */
  readonly serverIps?: string[];
  /**
  * Enables SSL between load balancer and backend servers
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#ssl_bridging LbBackend#ssl_bridging}
  */
  readonly sslBridging?: boolean | cdktf.IResolvable;
  /**
  * The type of sticky sessions
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#sticky_sessions LbBackend#sticky_sessions}
  */
  readonly stickySessions?: string;
  /**
  * Cookie name for sticky sessions
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#sticky_sessions_cookie_name LbBackend#sticky_sessions_cookie_name}
  */
  readonly stickySessionsCookieName?: string;
  /**
  * Maximum initial server connection establishment time
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#timeout_connect LbBackend#timeout_connect}
  */
  readonly timeoutConnect?: string;
  /**
  * Maximum time (in seconds) for a request to be left pending in queue when `max_connections` is reached
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#timeout_queue LbBackend#timeout_queue}
  */
  readonly timeoutQueue?: string;
  /**
  * Maximum server connection inactivity time
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#timeout_server LbBackend#timeout_server}
  */
  readonly timeoutServer?: string;
  /**
  * Maximum tunnel inactivity time
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#timeout_tunnel LbBackend#timeout_tunnel}
  */
  readonly timeoutTunnel?: string;
  /**
  * health_check_http block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_http LbBackend#health_check_http}
  */
  readonly healthCheckHttp?: LbBackendHealthCheckHttp;
  /**
  * health_check_https block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_https LbBackend#health_check_https}
  */
  readonly healthCheckHttps?: LbBackendHealthCheckHttps;
  /**
  * health_check_tcp block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#health_check_tcp LbBackend#health_check_tcp}
  */
  readonly healthCheckTcp?: LbBackendHealthCheckTcp;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#timeouts LbBackend#timeouts}
  */
  readonly timeouts?: LbBackendTimeouts;
}
export interface LbBackendHealthCheckHttp {
  /**
  * The expected HTTP status code
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#code LbBackend#code}
  */
  readonly code?: number;
  /**
  * The HTTP host header to use for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#host_header LbBackend#host_header}
  */
  readonly hostHeader?: string;
  /**
  * The HTTP method to use for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#method LbBackend#method}
  */
  readonly method?: string;
  /**
  * The HTTP endpoint URL to call for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#uri LbBackend#uri}
  */
  readonly uri: string;
}

export function lbBackendHealthCheckHttpToTerraform(struct?: LbBackendHealthCheckHttpOutputReference | LbBackendHealthCheckHttp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.numberToTerraform(struct!.code),
    host_header: cdktf.stringToTerraform(struct!.hostHeader),
    method: cdktf.stringToTerraform(struct!.method),
    uri: cdktf.stringToTerraform(struct!.uri),
  }
}


export function lbBackendHealthCheckHttpToHclTerraform(struct?: LbBackendHealthCheckHttpOutputReference | LbBackendHealthCheckHttp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code: {
      value: cdktf.numberToHclTerraform(struct!.code),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    host_header: {
      value: cdktf.stringToHclTerraform(struct!.hostHeader),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    method: {
      value: cdktf.stringToHclTerraform(struct!.method),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    uri: {
      value: cdktf.stringToHclTerraform(struct!.uri),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbBackendHealthCheckHttpOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbBackendHealthCheckHttp | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._hostHeader !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostHeader = this._hostHeader;
    }
    if (this._method !== undefined) {
      hasAnyValues = true;
      internalValueResult.method = this._method;
    }
    if (this._uri !== undefined) {
      hasAnyValues = true;
      internalValueResult.uri = this._uri;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbBackendHealthCheckHttp | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._code = undefined;
      this._hostHeader = undefined;
      this._method = undefined;
      this._uri = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._code = value.code;
      this._hostHeader = value.hostHeader;
      this._method = value.method;
      this._uri = value.uri;
    }
  }

  // code - computed: false, optional: true, required: false
  private _code?: number; 
  public get code() {
    return this.getNumberAttribute('code');
  }
  public set code(value: number) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // host_header - computed: false, optional: true, required: false
  private _hostHeader?: string; 
  public get hostHeader() {
    return this.getStringAttribute('host_header');
  }
  public set hostHeader(value: string) {
    this._hostHeader = value;
  }
  public resetHostHeader() {
    this._hostHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostHeaderInput() {
    return this._hostHeader;
  }

  // method - computed: false, optional: true, required: false
  private _method?: string; 
  public get method() {
    return this.getStringAttribute('method');
  }
  public set method(value: string) {
    this._method = value;
  }
  public resetMethod() {
    this._method = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get methodInput() {
    return this._method;
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
}
export interface LbBackendHealthCheckHttps {
  /**
  * The expected HTTP status code
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#code LbBackend#code}
  */
  readonly code?: number;
  /**
  * The HTTP host header to use for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#host_header LbBackend#host_header}
  */
  readonly hostHeader?: string;
  /**
  * The HTTP method to use for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#method LbBackend#method}
  */
  readonly method?: string;
  /**
  * The SNI to use for HC requests over SSL
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#sni LbBackend#sni}
  */
  readonly sni?: string;
  /**
  * The HTTPS endpoint URL to call for HC requests
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#uri LbBackend#uri}
  */
  readonly uri: string;
}

export function lbBackendHealthCheckHttpsToTerraform(struct?: LbBackendHealthCheckHttpsOutputReference | LbBackendHealthCheckHttps): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.numberToTerraform(struct!.code),
    host_header: cdktf.stringToTerraform(struct!.hostHeader),
    method: cdktf.stringToTerraform(struct!.method),
    sni: cdktf.stringToTerraform(struct!.sni),
    uri: cdktf.stringToTerraform(struct!.uri),
  }
}


export function lbBackendHealthCheckHttpsToHclTerraform(struct?: LbBackendHealthCheckHttpsOutputReference | LbBackendHealthCheckHttps): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code: {
      value: cdktf.numberToHclTerraform(struct!.code),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    host_header: {
      value: cdktf.stringToHclTerraform(struct!.hostHeader),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    method: {
      value: cdktf.stringToHclTerraform(struct!.method),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sni: {
      value: cdktf.stringToHclTerraform(struct!.sni),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    uri: {
      value: cdktf.stringToHclTerraform(struct!.uri),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbBackendHealthCheckHttpsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbBackendHealthCheckHttps | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._hostHeader !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostHeader = this._hostHeader;
    }
    if (this._method !== undefined) {
      hasAnyValues = true;
      internalValueResult.method = this._method;
    }
    if (this._sni !== undefined) {
      hasAnyValues = true;
      internalValueResult.sni = this._sni;
    }
    if (this._uri !== undefined) {
      hasAnyValues = true;
      internalValueResult.uri = this._uri;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbBackendHealthCheckHttps | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._code = undefined;
      this._hostHeader = undefined;
      this._method = undefined;
      this._sni = undefined;
      this._uri = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._code = value.code;
      this._hostHeader = value.hostHeader;
      this._method = value.method;
      this._sni = value.sni;
      this._uri = value.uri;
    }
  }

  // code - computed: false, optional: true, required: false
  private _code?: number; 
  public get code() {
    return this.getNumberAttribute('code');
  }
  public set code(value: number) {
    this._code = value;
  }
  public resetCode() {
    this._code = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeInput() {
    return this._code;
  }

  // host_header - computed: false, optional: true, required: false
  private _hostHeader?: string; 
  public get hostHeader() {
    return this.getStringAttribute('host_header');
  }
  public set hostHeader(value: string) {
    this._hostHeader = value;
  }
  public resetHostHeader() {
    this._hostHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostHeaderInput() {
    return this._hostHeader;
  }

  // method - computed: false, optional: true, required: false
  private _method?: string; 
  public get method() {
    return this.getStringAttribute('method');
  }
  public set method(value: string) {
    this._method = value;
  }
  public resetMethod() {
    this._method = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get methodInput() {
    return this._method;
  }

  // sni - computed: false, optional: true, required: false
  private _sni?: string; 
  public get sni() {
    return this.getStringAttribute('sni');
  }
  public set sni(value: string) {
    this._sni = value;
  }
  public resetSni() {
    this._sni = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sniInput() {
    return this._sni;
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
}
export interface LbBackendHealthCheckTcp {
}

export function lbBackendHealthCheckTcpToTerraform(struct?: LbBackendHealthCheckTcpOutputReference | LbBackendHealthCheckTcp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function lbBackendHealthCheckTcpToHclTerraform(struct?: LbBackendHealthCheckTcpOutputReference | LbBackendHealthCheckTcp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class LbBackendHealthCheckTcpOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbBackendHealthCheckTcp | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbBackendHealthCheckTcp | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }
}
export interface LbBackendTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#create LbBackend#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#default LbBackend#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#delete LbBackend#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#read LbBackend#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#update LbBackend#update}
  */
  readonly update?: string;
}

export function lbBackendTimeoutsToTerraform(struct?: LbBackendTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function lbBackendTimeoutsToHclTerraform(struct?: LbBackendTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read: {
      value: cdktf.stringToHclTerraform(struct!.read),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbBackendTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LbBackendTimeouts | cdktf.IResolvable | undefined {
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
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbBackendTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._read = undefined;
      this._update = undefined;
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
      this._delete = value.delete;
      this._read = value.read;
      this._update = value.update;
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

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend scaleway_lb_backend}
*/
export class LbBackend extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_backend";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LbBackend resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LbBackend to import
  * @param importFromId The id of the existing LbBackend that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LbBackend to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_lb_backend", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb_backend scaleway_lb_backend} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LbBackendConfig
  */
  public constructor(scope: Construct, id: string, config: LbBackendConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_backend',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.42.1',
        providerVersionConstraint: '>= 2.42.1'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._failoverHost = config.failoverHost;
    this._forwardPort = config.forwardPort;
    this._forwardPortAlgorithm = config.forwardPortAlgorithm;
    this._forwardProtocol = config.forwardProtocol;
    this._healthCheckDelay = config.healthCheckDelay;
    this._healthCheckMaxRetries = config.healthCheckMaxRetries;
    this._healthCheckPort = config.healthCheckPort;
    this._healthCheckSendProxy = config.healthCheckSendProxy;
    this._healthCheckTimeout = config.healthCheckTimeout;
    this._healthCheckTransientDelay = config.healthCheckTransientDelay;
    this._id = config.id;
    this._ignoreSslServerVerify = config.ignoreSslServerVerify;
    this._lbId = config.lbId;
    this._maxConnections = config.maxConnections;
    this._maxRetries = config.maxRetries;
    this._name = config.name;
    this._onMarkedDownAction = config.onMarkedDownAction;
    this._proxyProtocol = config.proxyProtocol;
    this._redispatchAttemptCount = config.redispatchAttemptCount;
    this._sendProxyV2 = config.sendProxyV2;
    this._serverIps = config.serverIps;
    this._sslBridging = config.sslBridging;
    this._stickySessions = config.stickySessions;
    this._stickySessionsCookieName = config.stickySessionsCookieName;
    this._timeoutConnect = config.timeoutConnect;
    this._timeoutQueue = config.timeoutQueue;
    this._timeoutServer = config.timeoutServer;
    this._timeoutTunnel = config.timeoutTunnel;
    this._healthCheckHttp.internalValue = config.healthCheckHttp;
    this._healthCheckHttps.internalValue = config.healthCheckHttps;
    this._healthCheckTcp.internalValue = config.healthCheckTcp;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // failover_host - computed: false, optional: true, required: false
  private _failoverHost?: string; 
  public get failoverHost() {
    return this.getStringAttribute('failover_host');
  }
  public set failoverHost(value: string) {
    this._failoverHost = value;
  }
  public resetFailoverHost() {
    this._failoverHost = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get failoverHostInput() {
    return this._failoverHost;
  }

  // forward_port - computed: false, optional: false, required: true
  private _forwardPort?: number; 
  public get forwardPort() {
    return this.getNumberAttribute('forward_port');
  }
  public set forwardPort(value: number) {
    this._forwardPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardPortInput() {
    return this._forwardPort;
  }

  // forward_port_algorithm - computed: false, optional: true, required: false
  private _forwardPortAlgorithm?: string; 
  public get forwardPortAlgorithm() {
    return this.getStringAttribute('forward_port_algorithm');
  }
  public set forwardPortAlgorithm(value: string) {
    this._forwardPortAlgorithm = value;
  }
  public resetForwardPortAlgorithm() {
    this._forwardPortAlgorithm = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardPortAlgorithmInput() {
    return this._forwardPortAlgorithm;
  }

  // forward_protocol - computed: false, optional: false, required: true
  private _forwardProtocol?: string; 
  public get forwardProtocol() {
    return this.getStringAttribute('forward_protocol');
  }
  public set forwardProtocol(value: string) {
    this._forwardProtocol = value;
  }
  // Temporarily expose input value. Use with caution.
  public get forwardProtocolInput() {
    return this._forwardProtocol;
  }

  // health_check_delay - computed: false, optional: true, required: false
  private _healthCheckDelay?: string; 
  public get healthCheckDelay() {
    return this.getStringAttribute('health_check_delay');
  }
  public set healthCheckDelay(value: string) {
    this._healthCheckDelay = value;
  }
  public resetHealthCheckDelay() {
    this._healthCheckDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckDelayInput() {
    return this._healthCheckDelay;
  }

  // health_check_max_retries - computed: false, optional: true, required: false
  private _healthCheckMaxRetries?: number; 
  public get healthCheckMaxRetries() {
    return this.getNumberAttribute('health_check_max_retries');
  }
  public set healthCheckMaxRetries(value: number) {
    this._healthCheckMaxRetries = value;
  }
  public resetHealthCheckMaxRetries() {
    this._healthCheckMaxRetries = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckMaxRetriesInput() {
    return this._healthCheckMaxRetries;
  }

  // health_check_port - computed: true, optional: true, required: false
  private _healthCheckPort?: number; 
  public get healthCheckPort() {
    return this.getNumberAttribute('health_check_port');
  }
  public set healthCheckPort(value: number) {
    this._healthCheckPort = value;
  }
  public resetHealthCheckPort() {
    this._healthCheckPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckPortInput() {
    return this._healthCheckPort;
  }

  // health_check_send_proxy - computed: false, optional: true, required: false
  private _healthCheckSendProxy?: boolean | cdktf.IResolvable; 
  public get healthCheckSendProxy() {
    return this.getBooleanAttribute('health_check_send_proxy');
  }
  public set healthCheckSendProxy(value: boolean | cdktf.IResolvable) {
    this._healthCheckSendProxy = value;
  }
  public resetHealthCheckSendProxy() {
    this._healthCheckSendProxy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckSendProxyInput() {
    return this._healthCheckSendProxy;
  }

  // health_check_timeout - computed: false, optional: true, required: false
  private _healthCheckTimeout?: string; 
  public get healthCheckTimeout() {
    return this.getStringAttribute('health_check_timeout');
  }
  public set healthCheckTimeout(value: string) {
    this._healthCheckTimeout = value;
  }
  public resetHealthCheckTimeout() {
    this._healthCheckTimeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckTimeoutInput() {
    return this._healthCheckTimeout;
  }

  // health_check_transient_delay - computed: false, optional: true, required: false
  private _healthCheckTransientDelay?: string; 
  public get healthCheckTransientDelay() {
    return this.getStringAttribute('health_check_transient_delay');
  }
  public set healthCheckTransientDelay(value: string) {
    this._healthCheckTransientDelay = value;
  }
  public resetHealthCheckTransientDelay() {
    this._healthCheckTransientDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckTransientDelayInput() {
    return this._healthCheckTransientDelay;
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

  // ignore_ssl_server_verify - computed: false, optional: true, required: false
  private _ignoreSslServerVerify?: boolean | cdktf.IResolvable; 
  public get ignoreSslServerVerify() {
    return this.getBooleanAttribute('ignore_ssl_server_verify');
  }
  public set ignoreSslServerVerify(value: boolean | cdktf.IResolvable) {
    this._ignoreSslServerVerify = value;
  }
  public resetIgnoreSslServerVerify() {
    this._ignoreSslServerVerify = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreSslServerVerifyInput() {
    return this._ignoreSslServerVerify;
  }

  // lb_id - computed: false, optional: false, required: true
  private _lbId?: string; 
  public get lbId() {
    return this.getStringAttribute('lb_id');
  }
  public set lbId(value: string) {
    this._lbId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get lbIdInput() {
    return this._lbId;
  }

  // max_connections - computed: false, optional: true, required: false
  private _maxConnections?: number; 
  public get maxConnections() {
    return this.getNumberAttribute('max_connections');
  }
  public set maxConnections(value: number) {
    this._maxConnections = value;
  }
  public resetMaxConnections() {
    this._maxConnections = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConnectionsInput() {
    return this._maxConnections;
  }

  // max_retries - computed: false, optional: true, required: false
  private _maxRetries?: number; 
  public get maxRetries() {
    return this.getNumberAttribute('max_retries');
  }
  public set maxRetries(value: number) {
    this._maxRetries = value;
  }
  public resetMaxRetries() {
    this._maxRetries = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxRetriesInput() {
    return this._maxRetries;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // on_marked_down_action - computed: false, optional: true, required: false
  private _onMarkedDownAction?: string; 
  public get onMarkedDownAction() {
    return this.getStringAttribute('on_marked_down_action');
  }
  public set onMarkedDownAction(value: string) {
    this._onMarkedDownAction = value;
  }
  public resetOnMarkedDownAction() {
    this._onMarkedDownAction = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get onMarkedDownActionInput() {
    return this._onMarkedDownAction;
  }

  // proxy_protocol - computed: false, optional: true, required: false
  private _proxyProtocol?: string; 
  public get proxyProtocol() {
    return this.getStringAttribute('proxy_protocol');
  }
  public set proxyProtocol(value: string) {
    this._proxyProtocol = value;
  }
  public resetProxyProtocol() {
    this._proxyProtocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get proxyProtocolInput() {
    return this._proxyProtocol;
  }

  // redispatch_attempt_count - computed: false, optional: true, required: false
  private _redispatchAttemptCount?: number; 
  public get redispatchAttemptCount() {
    return this.getNumberAttribute('redispatch_attempt_count');
  }
  public set redispatchAttemptCount(value: number) {
    this._redispatchAttemptCount = value;
  }
  public resetRedispatchAttemptCount() {
    this._redispatchAttemptCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redispatchAttemptCountInput() {
    return this._redispatchAttemptCount;
  }

  // send_proxy_v2 - computed: true, optional: true, required: false
  private _sendProxyV2?: boolean | cdktf.IResolvable; 
  public get sendProxyV2() {
    return this.getBooleanAttribute('send_proxy_v2');
  }
  public set sendProxyV2(value: boolean | cdktf.IResolvable) {
    this._sendProxyV2 = value;
  }
  public resetSendProxyV2() {
    this._sendProxyV2 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sendProxyV2Input() {
    return this._sendProxyV2;
  }

  // server_ips - computed: false, optional: true, required: false
  private _serverIps?: string[]; 
  public get serverIps() {
    return this.getListAttribute('server_ips');
  }
  public set serverIps(value: string[]) {
    this._serverIps = value;
  }
  public resetServerIps() {
    this._serverIps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serverIpsInput() {
    return this._serverIps;
  }

  // ssl_bridging - computed: false, optional: true, required: false
  private _sslBridging?: boolean | cdktf.IResolvable; 
  public get sslBridging() {
    return this.getBooleanAttribute('ssl_bridging');
  }
  public set sslBridging(value: boolean | cdktf.IResolvable) {
    this._sslBridging = value;
  }
  public resetSslBridging() {
    this._sslBridging = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslBridgingInput() {
    return this._sslBridging;
  }

  // sticky_sessions - computed: false, optional: true, required: false
  private _stickySessions?: string; 
  public get stickySessions() {
    return this.getStringAttribute('sticky_sessions');
  }
  public set stickySessions(value: string) {
    this._stickySessions = value;
  }
  public resetStickySessions() {
    this._stickySessions = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stickySessionsInput() {
    return this._stickySessions;
  }

  // sticky_sessions_cookie_name - computed: false, optional: true, required: false
  private _stickySessionsCookieName?: string; 
  public get stickySessionsCookieName() {
    return this.getStringAttribute('sticky_sessions_cookie_name');
  }
  public set stickySessionsCookieName(value: string) {
    this._stickySessionsCookieName = value;
  }
  public resetStickySessionsCookieName() {
    this._stickySessionsCookieName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stickySessionsCookieNameInput() {
    return this._stickySessionsCookieName;
  }

  // timeout_connect - computed: false, optional: true, required: false
  private _timeoutConnect?: string; 
  public get timeoutConnect() {
    return this.getStringAttribute('timeout_connect');
  }
  public set timeoutConnect(value: string) {
    this._timeoutConnect = value;
  }
  public resetTimeoutConnect() {
    this._timeoutConnect = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutConnectInput() {
    return this._timeoutConnect;
  }

  // timeout_queue - computed: false, optional: true, required: false
  private _timeoutQueue?: string; 
  public get timeoutQueue() {
    return this.getStringAttribute('timeout_queue');
  }
  public set timeoutQueue(value: string) {
    this._timeoutQueue = value;
  }
  public resetTimeoutQueue() {
    this._timeoutQueue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutQueueInput() {
    return this._timeoutQueue;
  }

  // timeout_server - computed: false, optional: true, required: false
  private _timeoutServer?: string; 
  public get timeoutServer() {
    return this.getStringAttribute('timeout_server');
  }
  public set timeoutServer(value: string) {
    this._timeoutServer = value;
  }
  public resetTimeoutServer() {
    this._timeoutServer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutServerInput() {
    return this._timeoutServer;
  }

  // timeout_tunnel - computed: false, optional: true, required: false
  private _timeoutTunnel?: string; 
  public get timeoutTunnel() {
    return this.getStringAttribute('timeout_tunnel');
  }
  public set timeoutTunnel(value: string) {
    this._timeoutTunnel = value;
  }
  public resetTimeoutTunnel() {
    this._timeoutTunnel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutTunnelInput() {
    return this._timeoutTunnel;
  }

  // health_check_http - computed: false, optional: true, required: false
  private _healthCheckHttp = new LbBackendHealthCheckHttpOutputReference(this, "health_check_http");
  public get healthCheckHttp() {
    return this._healthCheckHttp;
  }
  public putHealthCheckHttp(value: LbBackendHealthCheckHttp) {
    this._healthCheckHttp.internalValue = value;
  }
  public resetHealthCheckHttp() {
    this._healthCheckHttp.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckHttpInput() {
    return this._healthCheckHttp.internalValue;
  }

  // health_check_https - computed: false, optional: true, required: false
  private _healthCheckHttps = new LbBackendHealthCheckHttpsOutputReference(this, "health_check_https");
  public get healthCheckHttps() {
    return this._healthCheckHttps;
  }
  public putHealthCheckHttps(value: LbBackendHealthCheckHttps) {
    this._healthCheckHttps.internalValue = value;
  }
  public resetHealthCheckHttps() {
    this._healthCheckHttps.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckHttpsInput() {
    return this._healthCheckHttps.internalValue;
  }

  // health_check_tcp - computed: false, optional: true, required: false
  private _healthCheckTcp = new LbBackendHealthCheckTcpOutputReference(this, "health_check_tcp");
  public get healthCheckTcp() {
    return this._healthCheckTcp;
  }
  public putHealthCheckTcp(value: LbBackendHealthCheckTcp) {
    this._healthCheckTcp.internalValue = value;
  }
  public resetHealthCheckTcp() {
    this._healthCheckTcp.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get healthCheckTcpInput() {
    return this._healthCheckTcp.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LbBackendTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LbBackendTimeouts) {
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
      failover_host: cdktf.stringToTerraform(this._failoverHost),
      forward_port: cdktf.numberToTerraform(this._forwardPort),
      forward_port_algorithm: cdktf.stringToTerraform(this._forwardPortAlgorithm),
      forward_protocol: cdktf.stringToTerraform(this._forwardProtocol),
      health_check_delay: cdktf.stringToTerraform(this._healthCheckDelay),
      health_check_max_retries: cdktf.numberToTerraform(this._healthCheckMaxRetries),
      health_check_port: cdktf.numberToTerraform(this._healthCheckPort),
      health_check_send_proxy: cdktf.booleanToTerraform(this._healthCheckSendProxy),
      health_check_timeout: cdktf.stringToTerraform(this._healthCheckTimeout),
      health_check_transient_delay: cdktf.stringToTerraform(this._healthCheckTransientDelay),
      id: cdktf.stringToTerraform(this._id),
      ignore_ssl_server_verify: cdktf.booleanToTerraform(this._ignoreSslServerVerify),
      lb_id: cdktf.stringToTerraform(this._lbId),
      max_connections: cdktf.numberToTerraform(this._maxConnections),
      max_retries: cdktf.numberToTerraform(this._maxRetries),
      name: cdktf.stringToTerraform(this._name),
      on_marked_down_action: cdktf.stringToTerraform(this._onMarkedDownAction),
      proxy_protocol: cdktf.stringToTerraform(this._proxyProtocol),
      redispatch_attempt_count: cdktf.numberToTerraform(this._redispatchAttemptCount),
      send_proxy_v2: cdktf.booleanToTerraform(this._sendProxyV2),
      server_ips: cdktf.listMapper(cdktf.stringToTerraform, false)(this._serverIps),
      ssl_bridging: cdktf.booleanToTerraform(this._sslBridging),
      sticky_sessions: cdktf.stringToTerraform(this._stickySessions),
      sticky_sessions_cookie_name: cdktf.stringToTerraform(this._stickySessionsCookieName),
      timeout_connect: cdktf.stringToTerraform(this._timeoutConnect),
      timeout_queue: cdktf.stringToTerraform(this._timeoutQueue),
      timeout_server: cdktf.stringToTerraform(this._timeoutServer),
      timeout_tunnel: cdktf.stringToTerraform(this._timeoutTunnel),
      health_check_http: lbBackendHealthCheckHttpToTerraform(this._healthCheckHttp.internalValue),
      health_check_https: lbBackendHealthCheckHttpsToTerraform(this._healthCheckHttps.internalValue),
      health_check_tcp: lbBackendHealthCheckTcpToTerraform(this._healthCheckTcp.internalValue),
      timeouts: lbBackendTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      failover_host: {
        value: cdktf.stringToHclTerraform(this._failoverHost),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      forward_port: {
        value: cdktf.numberToHclTerraform(this._forwardPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      forward_port_algorithm: {
        value: cdktf.stringToHclTerraform(this._forwardPortAlgorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      forward_protocol: {
        value: cdktf.stringToHclTerraform(this._forwardProtocol),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_check_delay: {
        value: cdktf.stringToHclTerraform(this._healthCheckDelay),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_check_max_retries: {
        value: cdktf.numberToHclTerraform(this._healthCheckMaxRetries),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      health_check_port: {
        value: cdktf.numberToHclTerraform(this._healthCheckPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      health_check_send_proxy: {
        value: cdktf.booleanToHclTerraform(this._healthCheckSendProxy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      health_check_timeout: {
        value: cdktf.stringToHclTerraform(this._healthCheckTimeout),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_check_transient_delay: {
        value: cdktf.stringToHclTerraform(this._healthCheckTransientDelay),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ignore_ssl_server_verify: {
        value: cdktf.booleanToHclTerraform(this._ignoreSslServerVerify),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      lb_id: {
        value: cdktf.stringToHclTerraform(this._lbId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      max_connections: {
        value: cdktf.numberToHclTerraform(this._maxConnections),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      max_retries: {
        value: cdktf.numberToHclTerraform(this._maxRetries),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      on_marked_down_action: {
        value: cdktf.stringToHclTerraform(this._onMarkedDownAction),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      proxy_protocol: {
        value: cdktf.stringToHclTerraform(this._proxyProtocol),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      redispatch_attempt_count: {
        value: cdktf.numberToHclTerraform(this._redispatchAttemptCount),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      send_proxy_v2: {
        value: cdktf.booleanToHclTerraform(this._sendProxyV2),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      server_ips: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._serverIps),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      ssl_bridging: {
        value: cdktf.booleanToHclTerraform(this._sslBridging),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      sticky_sessions: {
        value: cdktf.stringToHclTerraform(this._stickySessions),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sticky_sessions_cookie_name: {
        value: cdktf.stringToHclTerraform(this._stickySessionsCookieName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeout_connect: {
        value: cdktf.stringToHclTerraform(this._timeoutConnect),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeout_queue: {
        value: cdktf.stringToHclTerraform(this._timeoutQueue),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeout_server: {
        value: cdktf.stringToHclTerraform(this._timeoutServer),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeout_tunnel: {
        value: cdktf.stringToHclTerraform(this._timeoutTunnel),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      health_check_http: {
        value: lbBackendHealthCheckHttpToHclTerraform(this._healthCheckHttp.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LbBackendHealthCheckHttpList",
      },
      health_check_https: {
        value: lbBackendHealthCheckHttpsToHclTerraform(this._healthCheckHttps.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LbBackendHealthCheckHttpsList",
      },
      health_check_tcp: {
        value: lbBackendHealthCheckTcpToHclTerraform(this._healthCheckTcp.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LbBackendHealthCheckTcpList",
      },
      timeouts: {
        value: lbBackendTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "LbBackendTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
