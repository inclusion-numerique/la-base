// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LbRouteConfig extends cdktf.TerraformMetaArguments {
  /**
  * The backend ID destination of redirection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#backend_id LbRoute#backend_id}
  */
  readonly backendId: string;
  /**
  * The frontend ID origin of redirection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#frontend_id LbRoute#frontend_id}
  */
  readonly frontendId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#id LbRoute#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Specifies the host of the server to which the request is being sent
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#match_host_header LbRoute#match_host_header}
  */
  readonly matchHostHeader?: string;
  /**
  * Value to match in the URL beginning path from an incoming request
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#match_path_begin LbRoute#match_path_begin}
  */
  readonly matchPathBegin?: string;
  /**
  * Server Name Indication TLS extension field from an incoming connection made via an SSL/TLS transport layer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#match_sni LbRoute#match_sni}
  */
  readonly matchSni?: string;
  /**
  * If true, all subdomains will match
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#match_subdomains LbRoute#match_subdomains}
  */
  readonly matchSubdomains?: boolean | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#timeouts LbRoute#timeouts}
  */
  readonly timeouts?: LbRouteTimeouts;
}
export interface LbRouteTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#default LbRoute#default}
  */
  readonly default?: string;
}

export function lbRouteTimeoutsToTerraform(struct?: LbRouteTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}


export function lbRouteTimeoutsToHclTerraform(struct?: LbRouteTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbRouteTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LbRouteTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbRouteTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._default = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._default = value.default;
    }
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route scaleway_lb_route}
*/
export class LbRoute extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_route";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LbRoute resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LbRoute to import
  * @param importFromId The id of the existing LbRoute that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LbRoute to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_lb_route", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/lb_route scaleway_lb_route} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LbRouteConfig
  */
  public constructor(scope: Construct, id: string, config: LbRouteConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_route',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.57.0',
        providerVersionConstraint: '>= 2.57.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._backendId = config.backendId;
    this._frontendId = config.frontendId;
    this._id = config.id;
    this._matchHostHeader = config.matchHostHeader;
    this._matchPathBegin = config.matchPathBegin;
    this._matchSni = config.matchSni;
    this._matchSubdomains = config.matchSubdomains;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_id - computed: false, optional: false, required: true
  private _backendId?: string; 
  public get backendId() {
    return this.getStringAttribute('backend_id');
  }
  public set backendId(value: string) {
    this._backendId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backendIdInput() {
    return this._backendId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // frontend_id - computed: false, optional: false, required: true
  private _frontendId?: string; 
  public get frontendId() {
    return this.getStringAttribute('frontend_id');
  }
  public set frontendId(value: string) {
    this._frontendId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get frontendIdInput() {
    return this._frontendId;
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

  // match_host_header - computed: false, optional: true, required: false
  private _matchHostHeader?: string; 
  public get matchHostHeader() {
    return this.getStringAttribute('match_host_header');
  }
  public set matchHostHeader(value: string) {
    this._matchHostHeader = value;
  }
  public resetMatchHostHeader() {
    this._matchHostHeader = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchHostHeaderInput() {
    return this._matchHostHeader;
  }

  // match_path_begin - computed: false, optional: true, required: false
  private _matchPathBegin?: string; 
  public get matchPathBegin() {
    return this.getStringAttribute('match_path_begin');
  }
  public set matchPathBegin(value: string) {
    this._matchPathBegin = value;
  }
  public resetMatchPathBegin() {
    this._matchPathBegin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchPathBeginInput() {
    return this._matchPathBegin;
  }

  // match_sni - computed: false, optional: true, required: false
  private _matchSni?: string; 
  public get matchSni() {
    return this.getStringAttribute('match_sni');
  }
  public set matchSni(value: string) {
    this._matchSni = value;
  }
  public resetMatchSni() {
    this._matchSni = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchSniInput() {
    return this._matchSni;
  }

  // match_subdomains - computed: false, optional: true, required: false
  private _matchSubdomains?: boolean | cdktf.IResolvable; 
  public get matchSubdomains() {
    return this.getBooleanAttribute('match_subdomains');
  }
  public set matchSubdomains(value: boolean | cdktf.IResolvable) {
    this._matchSubdomains = value;
  }
  public resetMatchSubdomains() {
    this._matchSubdomains = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchSubdomainsInput() {
    return this._matchSubdomains;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LbRouteTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LbRouteTimeouts) {
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
      backend_id: cdktf.stringToTerraform(this._backendId),
      frontend_id: cdktf.stringToTerraform(this._frontendId),
      id: cdktf.stringToTerraform(this._id),
      match_host_header: cdktf.stringToTerraform(this._matchHostHeader),
      match_path_begin: cdktf.stringToTerraform(this._matchPathBegin),
      match_sni: cdktf.stringToTerraform(this._matchSni),
      match_subdomains: cdktf.booleanToTerraform(this._matchSubdomains),
      timeouts: lbRouteTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      backend_id: {
        value: cdktf.stringToHclTerraform(this._backendId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      frontend_id: {
        value: cdktf.stringToHclTerraform(this._frontendId),
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
      match_host_header: {
        value: cdktf.stringToHclTerraform(this._matchHostHeader),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      match_path_begin: {
        value: cdktf.stringToHclTerraform(this._matchPathBegin),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      match_sni: {
        value: cdktf.stringToHclTerraform(this._matchSni),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      match_subdomains: {
        value: cdktf.booleanToHclTerraform(this._matchSubdomains),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      timeouts: {
        value: lbRouteTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "LbRouteTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
