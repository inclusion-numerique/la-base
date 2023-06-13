// https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LbFrontendConfig extends cdktf.TerraformMetaArguments {
  /**
  * The load-balancer backend ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#backend_id LbFrontend#backend_id}
  */
  readonly backendId: string;
  /**
  * Collection of Certificate IDs related to the load balancer and domain
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#certificate_ids LbFrontend#certificate_ids}
  */
  readonly certificateIds?: string[];
  /**
  * Activates HTTP/3 protocol
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#enable_http3 LbFrontend#enable_http3}
  */
  readonly enableHttp3?: boolean | cdktf.IResolvable;
  /**
  * This boolean determines if ACLs should be managed externally through the 'lb_acl' resource. If set to `true`, `acl` attribute cannot be set directly in the lb frontend
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#external_acls LbFrontend#external_acls}
  */
  readonly externalAcls?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#id LbFrontend#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * TCP port to listen on the front side
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#inbound_port LbFrontend#inbound_port}
  */
  readonly inboundPort: number;
  /**
  * The load-balancer ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#lb_id LbFrontend#lb_id}
  */
  readonly lbId: string;
  /**
  * The name of the frontend
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#name LbFrontend#name}
  */
  readonly name?: string;
  /**
  * Set the maximum inactivity time on the client side
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#timeout_client LbFrontend#timeout_client}
  */
  readonly timeoutClient?: string;
  /**
  * acl block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#acl LbFrontend#acl}
  */
  readonly acl?: LbFrontendAcl[] | cdktf.IResolvable;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#timeouts LbFrontend#timeouts}
  */
  readonly timeouts?: LbFrontendTimeouts;
}
export interface LbFrontendAclActionRedirect {
  /**
  * The HTTP redirect code to use
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#code LbFrontend#code}
  */
  readonly code?: number;
  /**
  * An URL can be used in case of a location redirect 
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#target LbFrontend#target}
  */
  readonly target?: string;
  /**
  * The redirect type
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#type LbFrontend#type}
  */
  readonly type?: string;
}

export function lbFrontendAclActionRedirectToTerraform(struct?: LbFrontendAclActionRedirect | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code: cdktf.numberToTerraform(struct!.code),
    target: cdktf.stringToTerraform(struct!.target),
    type: cdktf.stringToTerraform(struct!.type),
  }
}

export class LbFrontendAclActionRedirectOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): LbFrontendAclActionRedirect | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._code !== undefined) {
      hasAnyValues = true;
      internalValueResult.code = this._code;
    }
    if (this._target !== undefined) {
      hasAnyValues = true;
      internalValueResult.target = this._target;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbFrontendAclActionRedirect | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._code = undefined;
      this._target = undefined;
      this._type = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._code = value.code;
      this._target = value.target;
      this._type = value.type;
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

  // target - computed: false, optional: true, required: false
  private _target?: string; 
  public get target() {
    return this.getStringAttribute('target');
  }
  public set target(value: string) {
    this._target = value;
  }
  public resetTarget() {
    this._target = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get targetInput() {
    return this._target;
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}

export class LbFrontendAclActionRedirectList extends cdktf.ComplexList {
  public internalValue? : LbFrontendAclActionRedirect[] | cdktf.IResolvable

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): LbFrontendAclActionRedirectOutputReference {
    return new LbFrontendAclActionRedirectOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LbFrontendAclAction {
  /**
  * The action type
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#type LbFrontend#type}
  */
  readonly type: string;
  /**
  * redirect block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#redirect LbFrontend#redirect}
  */
  readonly redirect?: LbFrontendAclActionRedirect[] | cdktf.IResolvable;
}

export function lbFrontendAclActionToTerraform(struct?: LbFrontendAclActionOutputReference | LbFrontendAclAction): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    redirect: cdktf.listMapper(lbFrontendAclActionRedirectToTerraform, true)(struct!.redirect),
  }
}

export class LbFrontendAclActionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbFrontendAclAction | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    if (this._redirect?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.redirect = this._redirect?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbFrontendAclAction | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._type = undefined;
      this._redirect.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._type = value.type;
      this._redirect.internalValue = value.redirect;
    }
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // redirect - computed: false, optional: true, required: false
  private _redirect = new LbFrontendAclActionRedirectList(this, "redirect", false);
  public get redirect() {
    return this._redirect;
  }
  public putRedirect(value: LbFrontendAclActionRedirect[] | cdktf.IResolvable) {
    this._redirect.internalValue = value;
  }
  public resetRedirect() {
    this._redirect.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get redirectInput() {
    return this._redirect.internalValue;
  }
}
export interface LbFrontendAclMatch {
  /**
  * The HTTP filter to match
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#http_filter LbFrontend#http_filter}
  */
  readonly httpFilter?: string;
  /**
  * You can use this field with http_header_match acl type to set the header name to filter
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#http_filter_option LbFrontend#http_filter_option}
  */
  readonly httpFilterOption?: string;
  /**
  * A list of possible values to match for the given HTTP filter
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#http_filter_value LbFrontend#http_filter_value}
  */
  readonly httpFilterValue?: string[];
  /**
  * If set to true, the condition will be of type "unless"
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#invert LbFrontend#invert}
  */
  readonly invert?: boolean | cdktf.IResolvable;
  /**
  * A list of IPs or CIDR v4/v6 addresses of the client of the session to match
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#ip_subnet LbFrontend#ip_subnet}
  */
  readonly ipSubnet?: string[];
}

export function lbFrontendAclMatchToTerraform(struct?: LbFrontendAclMatchOutputReference | LbFrontendAclMatch): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    http_filter: cdktf.stringToTerraform(struct!.httpFilter),
    http_filter_option: cdktf.stringToTerraform(struct!.httpFilterOption),
    http_filter_value: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.httpFilterValue),
    invert: cdktf.booleanToTerraform(struct!.invert),
    ip_subnet: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.ipSubnet),
  }
}

export class LbFrontendAclMatchOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbFrontendAclMatch | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._httpFilter !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpFilter = this._httpFilter;
    }
    if (this._httpFilterOption !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpFilterOption = this._httpFilterOption;
    }
    if (this._httpFilterValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.httpFilterValue = this._httpFilterValue;
    }
    if (this._invert !== undefined) {
      hasAnyValues = true;
      internalValueResult.invert = this._invert;
    }
    if (this._ipSubnet !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipSubnet = this._ipSubnet;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbFrontendAclMatch | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._httpFilter = undefined;
      this._httpFilterOption = undefined;
      this._httpFilterValue = undefined;
      this._invert = undefined;
      this._ipSubnet = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._httpFilter = value.httpFilter;
      this._httpFilterOption = value.httpFilterOption;
      this._httpFilterValue = value.httpFilterValue;
      this._invert = value.invert;
      this._ipSubnet = value.ipSubnet;
    }
  }

  // http_filter - computed: false, optional: true, required: false
  private _httpFilter?: string; 
  public get httpFilter() {
    return this.getStringAttribute('http_filter');
  }
  public set httpFilter(value: string) {
    this._httpFilter = value;
  }
  public resetHttpFilter() {
    this._httpFilter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpFilterInput() {
    return this._httpFilter;
  }

  // http_filter_option - computed: false, optional: true, required: false
  private _httpFilterOption?: string; 
  public get httpFilterOption() {
    return this.getStringAttribute('http_filter_option');
  }
  public set httpFilterOption(value: string) {
    this._httpFilterOption = value;
  }
  public resetHttpFilterOption() {
    this._httpFilterOption = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpFilterOptionInput() {
    return this._httpFilterOption;
  }

  // http_filter_value - computed: false, optional: true, required: false
  private _httpFilterValue?: string[]; 
  public get httpFilterValue() {
    return this.getListAttribute('http_filter_value');
  }
  public set httpFilterValue(value: string[]) {
    this._httpFilterValue = value;
  }
  public resetHttpFilterValue() {
    this._httpFilterValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpFilterValueInput() {
    return this._httpFilterValue;
  }

  // invert - computed: false, optional: true, required: false
  private _invert?: boolean | cdktf.IResolvable; 
  public get invert() {
    return this.getBooleanAttribute('invert');
  }
  public set invert(value: boolean | cdktf.IResolvable) {
    this._invert = value;
  }
  public resetInvert() {
    this._invert = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invertInput() {
    return this._invert;
  }

  // ip_subnet - computed: false, optional: true, required: false
  private _ipSubnet?: string[]; 
  public get ipSubnet() {
    return this.getListAttribute('ip_subnet');
  }
  public set ipSubnet(value: string[]) {
    this._ipSubnet = value;
  }
  public resetIpSubnet() {
    this._ipSubnet = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipSubnetInput() {
    return this._ipSubnet;
  }
}
export interface LbFrontendAcl {
  /**
  * Description of the ACL
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#description LbFrontend#description}
  */
  readonly description?: string;
  /**
  * The ACL name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#name LbFrontend#name}
  */
  readonly name?: string;
  /**
  * action block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#action LbFrontend#action}
  */
  readonly action: LbFrontendAclAction;
  /**
  * match block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#match LbFrontend#match}
  */
  readonly match: LbFrontendAclMatch;
}

export function lbFrontendAclToTerraform(struct?: LbFrontendAcl | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    description: cdktf.stringToTerraform(struct!.description),
    name: cdktf.stringToTerraform(struct!.name),
    action: lbFrontendAclActionToTerraform(struct!.action),
    match: lbFrontendAclMatchToTerraform(struct!.match),
  }
}

export class LbFrontendAclOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): LbFrontendAcl | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._action?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action?.internalValue;
    }
    if (this._match?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.match = this._match?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbFrontendAcl | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._description = undefined;
      this._name = undefined;
      this._action.internalValue = undefined;
      this._match.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._description = value.description;
      this._name = value.name;
      this._action.internalValue = value.action;
      this._match.internalValue = value.match;
    }
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // action - computed: false, optional: false, required: true
  private _action = new LbFrontendAclActionOutputReference(this, "action");
  public get action() {
    return this._action;
  }
  public putAction(value: LbFrontendAclAction) {
    this._action.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action.internalValue;
  }

  // match - computed: false, optional: false, required: true
  private _match = new LbFrontendAclMatchOutputReference(this, "match");
  public get match() {
    return this._match;
  }
  public putMatch(value: LbFrontendAclMatch) {
    this._match.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get matchInput() {
    return this._match.internalValue;
  }
}

export class LbFrontendAclList extends cdktf.ComplexList {
  public internalValue? : LbFrontendAcl[] | cdktf.IResolvable

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): LbFrontendAclOutputReference {
    return new LbFrontendAclOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LbFrontendTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#create LbFrontend#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#default LbFrontend#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#delete LbFrontend#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend#update LbFrontend#update}
  */
  readonly update?: string;
}

export function lbFrontendTimeoutsToTerraform(struct?: LbFrontendTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class LbFrontendTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LbFrontendTimeouts | cdktf.IResolvable | undefined {
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
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbFrontendTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend scaleway_lb_frontend}
*/
export class LbFrontend extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_frontend";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/lb_frontend scaleway_lb_frontend} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LbFrontendConfig
  */
  public constructor(scope: Construct, id: string, config: LbFrontendConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_frontend',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.21.0',
        providerVersionConstraint: '>= 2.21.0'
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
    this._certificateIds = config.certificateIds;
    this._enableHttp3 = config.enableHttp3;
    this._externalAcls = config.externalAcls;
    this._id = config.id;
    this._inboundPort = config.inboundPort;
    this._lbId = config.lbId;
    this._name = config.name;
    this._timeoutClient = config.timeoutClient;
    this._acl.internalValue = config.acl;
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

  // certificate_id - computed: true, optional: false, required: false
  public get certificateId() {
    return this.getStringAttribute('certificate_id');
  }

  // certificate_ids - computed: false, optional: true, required: false
  private _certificateIds?: string[]; 
  public get certificateIds() {
    return this.getListAttribute('certificate_ids');
  }
  public set certificateIds(value: string[]) {
    this._certificateIds = value;
  }
  public resetCertificateIds() {
    this._certificateIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateIdsInput() {
    return this._certificateIds;
  }

  // enable_http3 - computed: false, optional: true, required: false
  private _enableHttp3?: boolean | cdktf.IResolvable; 
  public get enableHttp3() {
    return this.getBooleanAttribute('enable_http3');
  }
  public set enableHttp3(value: boolean | cdktf.IResolvable) {
    this._enableHttp3 = value;
  }
  public resetEnableHttp3() {
    this._enableHttp3 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableHttp3Input() {
    return this._enableHttp3;
  }

  // external_acls - computed: false, optional: true, required: false
  private _externalAcls?: boolean | cdktf.IResolvable; 
  public get externalAcls() {
    return this.getBooleanAttribute('external_acls');
  }
  public set externalAcls(value: boolean | cdktf.IResolvable) {
    this._externalAcls = value;
  }
  public resetExternalAcls() {
    this._externalAcls = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalAclsInput() {
    return this._externalAcls;
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

  // inbound_port - computed: false, optional: false, required: true
  private _inboundPort?: number; 
  public get inboundPort() {
    return this.getNumberAttribute('inbound_port');
  }
  public set inboundPort(value: number) {
    this._inboundPort = value;
  }
  // Temporarily expose input value. Use with caution.
  public get inboundPortInput() {
    return this._inboundPort;
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

  // timeout_client - computed: false, optional: true, required: false
  private _timeoutClient?: string; 
  public get timeoutClient() {
    return this.getStringAttribute('timeout_client');
  }
  public set timeoutClient(value: string) {
    this._timeoutClient = value;
  }
  public resetTimeoutClient() {
    this._timeoutClient = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutClientInput() {
    return this._timeoutClient;
  }

  // acl - computed: false, optional: true, required: false
  private _acl = new LbFrontendAclList(this, "acl", false);
  public get acl() {
    return this._acl;
  }
  public putAcl(value: LbFrontendAcl[] | cdktf.IResolvable) {
    this._acl.internalValue = value;
  }
  public resetAcl() {
    this._acl.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aclInput() {
    return this._acl.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LbFrontendTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LbFrontendTimeouts) {
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
      certificate_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._certificateIds),
      enable_http3: cdktf.booleanToTerraform(this._enableHttp3),
      external_acls: cdktf.booleanToTerraform(this._externalAcls),
      id: cdktf.stringToTerraform(this._id),
      inbound_port: cdktf.numberToTerraform(this._inboundPort),
      lb_id: cdktf.stringToTerraform(this._lbId),
      name: cdktf.stringToTerraform(this._name),
      timeout_client: cdktf.stringToTerraform(this._timeoutClient),
      acl: cdktf.listMapper(lbFrontendAclToTerraform, true)(this._acl.internalValue),
      timeouts: lbFrontendTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
