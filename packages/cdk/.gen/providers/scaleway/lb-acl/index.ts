// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LbAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * Description of the ACL
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#description LbAcl#description}
  */
  readonly description?: string;
  /**
  * The frontend ID on which the ACL is applied
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#frontend_id LbAcl#frontend_id}
  */
  readonly frontendId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#id LbAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The priority of the ACL. (ACLs are applied in ascending order, 0 is the first ACL executed)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#index LbAcl#index}
  */
  readonly index: number;
  /**
  * The ACL name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#name LbAcl#name}
  */
  readonly name?: string;
  /**
  * action block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#action LbAcl#action}
  */
  readonly action: LbAclAction;
  /**
  * match block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#match LbAcl#match}
  */
  readonly match?: LbAclMatch;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#timeouts LbAcl#timeouts}
  */
  readonly timeouts?: LbAclTimeouts;
}
export interface LbAclActionRedirect {
  /**
  * The HTTP redirect code to use
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#code LbAcl#code}
  */
  readonly code?: number;
  /**
  * An URL can be used in case of a location redirect 
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#target LbAcl#target}
  */
  readonly target?: string;
  /**
  * The redirect type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#type LbAcl#type}
  */
  readonly type?: string;
}

export function lbAclActionRedirectToTerraform(struct?: LbAclActionRedirect | cdktf.IResolvable): any {
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


export function lbAclActionRedirectToHclTerraform(struct?: LbAclActionRedirect | cdktf.IResolvable): any {
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
    target: {
      value: cdktf.stringToHclTerraform(struct!.target),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbAclActionRedirectOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LbAclActionRedirect | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LbAclActionRedirect | cdktf.IResolvable | undefined) {
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

export class LbAclActionRedirectList extends cdktf.ComplexList {
  public internalValue? : LbAclActionRedirect[] | cdktf.IResolvable

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
  public get(index: number): LbAclActionRedirectOutputReference {
    return new LbAclActionRedirectOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LbAclAction {
  /**
  * The action type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#type LbAcl#type}
  */
  readonly type: string;
  /**
  * redirect block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#redirect LbAcl#redirect}
  */
  readonly redirect?: LbAclActionRedirect[] | cdktf.IResolvable;
}

export function lbAclActionToTerraform(struct?: LbAclActionOutputReference | LbAclAction): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    type: cdktf.stringToTerraform(struct!.type),
    redirect: cdktf.listMapper(lbAclActionRedirectToTerraform, true)(struct!.redirect),
  }
}


export function lbAclActionToHclTerraform(struct?: LbAclActionOutputReference | LbAclAction): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    type: {
      value: cdktf.stringToHclTerraform(struct!.type),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    redirect: {
      value: cdktf.listMapperHcl(lbAclActionRedirectToHclTerraform, true)(struct!.redirect),
      isBlock: true,
      type: "list",
      storageClassType: "LbAclActionRedirectList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbAclActionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbAclAction | undefined {
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

  public set internalValue(value: LbAclAction | undefined) {
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
  private _redirect = new LbAclActionRedirectList(this, "redirect", false);
  public get redirect() {
    return this._redirect;
  }
  public putRedirect(value: LbAclActionRedirect[] | cdktf.IResolvable) {
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
export interface LbAclMatch {
  /**
  * The HTTP filter to match
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#http_filter LbAcl#http_filter}
  */
  readonly httpFilter?: string;
  /**
  * You can use this field with http_header_match acl type to set the header name to filter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#http_filter_option LbAcl#http_filter_option}
  */
  readonly httpFilterOption?: string;
  /**
  * A list of possible values to match for the given HTTP filter
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#http_filter_value LbAcl#http_filter_value}
  */
  readonly httpFilterValue?: string[];
  /**
  * If set to true, the condition will be of type "unless"
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#invert LbAcl#invert}
  */
  readonly invert?: boolean | cdktf.IResolvable;
  /**
  * A list of IPs or CIDR v4/v6 addresses of the client of the session to match
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#ip_subnet LbAcl#ip_subnet}
  */
  readonly ipSubnet?: string[];
}

export function lbAclMatchToTerraform(struct?: LbAclMatchOutputReference | LbAclMatch): any {
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


export function lbAclMatchToHclTerraform(struct?: LbAclMatchOutputReference | LbAclMatch): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    http_filter: {
      value: cdktf.stringToHclTerraform(struct!.httpFilter),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    http_filter_option: {
      value: cdktf.stringToHclTerraform(struct!.httpFilterOption),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    http_filter_value: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.httpFilterValue),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    invert: {
      value: cdktf.booleanToHclTerraform(struct!.invert),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    ip_subnet: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.ipSubnet),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbAclMatchOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): LbAclMatch | undefined {
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

  public set internalValue(value: LbAclMatch | undefined) {
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
export interface LbAclTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#default LbAcl#default}
  */
  readonly default?: string;
}

export function lbAclTimeoutsToTerraform(struct?: LbAclTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}


export function lbAclTimeoutsToHclTerraform(struct?: LbAclTimeouts | cdktf.IResolvable): any {
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

export class LbAclTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LbAclTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LbAclTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl scaleway_lb_acl}
*/
export class LbAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_acl";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a LbAcl resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the LbAcl to import
  * @param importFromId The id of the existing LbAcl that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the LbAcl to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_lb_acl", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/lb_acl scaleway_lb_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LbAclConfig
  */
  public constructor(scope: Construct, id: string, config: LbAclConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_acl',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.53.0',
        providerVersionConstraint: '>= 2.53.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._description = config.description;
    this._frontendId = config.frontendId;
    this._id = config.id;
    this._index = config.index;
    this._name = config.name;
    this._action.internalValue = config.action;
    this._match.internalValue = config.match;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // index - computed: false, optional: false, required: true
  private _index?: number; 
  public get index() {
    return this.getNumberAttribute('index');
  }
  public set index(value: number) {
    this._index = value;
  }
  // Temporarily expose input value. Use with caution.
  public get indexInput() {
    return this._index;
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
  private _action = new LbAclActionOutputReference(this, "action");
  public get action() {
    return this._action;
  }
  public putAction(value: LbAclAction) {
    this._action.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action.internalValue;
  }

  // match - computed: false, optional: true, required: false
  private _match = new LbAclMatchOutputReference(this, "match");
  public get match() {
    return this._match;
  }
  public putMatch(value: LbAclMatch) {
    this._match.internalValue = value;
  }
  public resetMatch() {
    this._match.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get matchInput() {
    return this._match.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LbAclTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LbAclTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      frontend_id: cdktf.stringToTerraform(this._frontendId),
      id: cdktf.stringToTerraform(this._id),
      index: cdktf.numberToTerraform(this._index),
      name: cdktf.stringToTerraform(this._name),
      action: lbAclActionToTerraform(this._action.internalValue),
      match: lbAclMatchToTerraform(this._match.internalValue),
      timeouts: lbAclTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      description: {
        value: cdktf.stringToHclTerraform(this._description),
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
      index: {
        value: cdktf.numberToHclTerraform(this._index),
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
      action: {
        value: lbAclActionToHclTerraform(this._action.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LbAclActionList",
      },
      match: {
        value: lbAclMatchToHclTerraform(this._match.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "LbAclMatchList",
      },
      timeouts: {
        value: lbAclTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "LbAclTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
