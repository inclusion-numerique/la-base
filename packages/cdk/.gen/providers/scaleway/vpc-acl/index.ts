// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * The action to take for packets which do not match any rules
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#default_policy VpcAcl#default_policy}
  */
  readonly defaultPolicy: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#id VpcAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Defines whether this set of ACL rules is for IPv6 (false = IPv4). Each Network ACL can have rules for only one IP type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#is_ipv6 VpcAcl#is_ipv6}
  */
  readonly isIpv6?: boolean | cdktf.IResolvable;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#region VpcAcl#region}
  */
  readonly region?: string;
  /**
  * The VPC in which to create the ACL rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#vpc_id VpcAcl#vpc_id}
  */
  readonly vpcId: string;
  /**
  * rules block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#rules VpcAcl#rules}
  */
  readonly rules: VpcAclRules[] | cdktf.IResolvable;
}
export interface VpcAclRules {
  /**
  * The policy to apply to the packet
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#action VpcAcl#action}
  */
  readonly action?: string;
  /**
  * The rule description
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#description VpcAcl#description}
  */
  readonly description?: string;
  /**
  * Destination IP range to which this rule applies (CIDR notation with subnet mask)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#destination VpcAcl#destination}
  */
  readonly destination?: string;
  /**
  * Ending port of the destination port range to which this rule applies (inclusive)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#dst_port_high VpcAcl#dst_port_high}
  */
  readonly dstPortHigh?: number;
  /**
  * Starting port of the destination port range to which this rule applies (inclusive)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#dst_port_low VpcAcl#dst_port_low}
  */
  readonly dstPortLow?: number;
  /**
  * The protocol to which this rule applies. Default value: ANY
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#protocol VpcAcl#protocol}
  */
  readonly protocol?: string;
  /**
  * Source IP range to which this rule applies (CIDR notation with subnet mask)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#source VpcAcl#source}
  */
  readonly source?: string;
  /**
  * Ending port of the source port range to which this rule applies (inclusive)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#src_port_high VpcAcl#src_port_high}
  */
  readonly srcPortHigh?: number;
  /**
  * Starting port of the source port range to which this rule applies (inclusive)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#src_port_low VpcAcl#src_port_low}
  */
  readonly srcPortLow?: number;
}

export function vpcAclRulesToTerraform(struct?: VpcAclRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    description: cdktf.stringToTerraform(struct!.description),
    destination: cdktf.stringToTerraform(struct!.destination),
    dst_port_high: cdktf.numberToTerraform(struct!.dstPortHigh),
    dst_port_low: cdktf.numberToTerraform(struct!.dstPortLow),
    protocol: cdktf.stringToTerraform(struct!.protocol),
    source: cdktf.stringToTerraform(struct!.source),
    src_port_high: cdktf.numberToTerraform(struct!.srcPortHigh),
    src_port_low: cdktf.numberToTerraform(struct!.srcPortLow),
  }
}


export function vpcAclRulesToHclTerraform(struct?: VpcAclRules | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    action: {
      value: cdktf.stringToHclTerraform(struct!.action),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    description: {
      value: cdktf.stringToHclTerraform(struct!.description),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    destination: {
      value: cdktf.stringToHclTerraform(struct!.destination),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    dst_port_high: {
      value: cdktf.numberToHclTerraform(struct!.dstPortHigh),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    dst_port_low: {
      value: cdktf.numberToHclTerraform(struct!.dstPortLow),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    protocol: {
      value: cdktf.stringToHclTerraform(struct!.protocol),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    source: {
      value: cdktf.stringToHclTerraform(struct!.source),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    src_port_high: {
      value: cdktf.numberToHclTerraform(struct!.srcPortHigh),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    src_port_low: {
      value: cdktf.numberToHclTerraform(struct!.srcPortLow),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpcAclRulesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpcAclRules | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._description !== undefined) {
      hasAnyValues = true;
      internalValueResult.description = this._description;
    }
    if (this._destination !== undefined) {
      hasAnyValues = true;
      internalValueResult.destination = this._destination;
    }
    if (this._dstPortHigh !== undefined) {
      hasAnyValues = true;
      internalValueResult.dstPortHigh = this._dstPortHigh;
    }
    if (this._dstPortLow !== undefined) {
      hasAnyValues = true;
      internalValueResult.dstPortLow = this._dstPortLow;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    if (this._source !== undefined) {
      hasAnyValues = true;
      internalValueResult.source = this._source;
    }
    if (this._srcPortHigh !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcPortHigh = this._srcPortHigh;
    }
    if (this._srcPortLow !== undefined) {
      hasAnyValues = true;
      internalValueResult.srcPortLow = this._srcPortLow;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcAclRules | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._description = undefined;
      this._destination = undefined;
      this._dstPortHigh = undefined;
      this._dstPortLow = undefined;
      this._protocol = undefined;
      this._source = undefined;
      this._srcPortHigh = undefined;
      this._srcPortLow = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._description = value.description;
      this._destination = value.destination;
      this._dstPortHigh = value.dstPortHigh;
      this._dstPortLow = value.dstPortLow;
      this._protocol = value.protocol;
      this._source = value.source;
      this._srcPortHigh = value.srcPortHigh;
      this._srcPortLow = value.srcPortLow;
    }
  }

  // action - computed: false, optional: true, required: false
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  public resetAction() {
    this._action = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // destination - computed: false, optional: true, required: false
  private _destination?: string; 
  public get destination() {
    return this.getStringAttribute('destination');
  }
  public set destination(value: string) {
    this._destination = value;
  }
  public resetDestination() {
    this._destination = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get destinationInput() {
    return this._destination;
  }

  // dst_port_high - computed: false, optional: true, required: false
  private _dstPortHigh?: number; 
  public get dstPortHigh() {
    return this.getNumberAttribute('dst_port_high');
  }
  public set dstPortHigh(value: number) {
    this._dstPortHigh = value;
  }
  public resetDstPortHigh() {
    this._dstPortHigh = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstPortHighInput() {
    return this._dstPortHigh;
  }

  // dst_port_low - computed: false, optional: true, required: false
  private _dstPortLow?: number; 
  public get dstPortLow() {
    return this.getNumberAttribute('dst_port_low');
  }
  public set dstPortLow(value: number) {
    this._dstPortLow = value;
  }
  public resetDstPortLow() {
    this._dstPortLow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dstPortLowInput() {
    return this._dstPortLow;
  }

  // protocol - computed: false, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // source - computed: false, optional: true, required: false
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  public resetSource() {
    this._source = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
  }

  // src_port_high - computed: false, optional: true, required: false
  private _srcPortHigh?: number; 
  public get srcPortHigh() {
    return this.getNumberAttribute('src_port_high');
  }
  public set srcPortHigh(value: number) {
    this._srcPortHigh = value;
  }
  public resetSrcPortHigh() {
    this._srcPortHigh = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcPortHighInput() {
    return this._srcPortHigh;
  }

  // src_port_low - computed: false, optional: true, required: false
  private _srcPortLow?: number; 
  public get srcPortLow() {
    return this.getNumberAttribute('src_port_low');
  }
  public set srcPortLow(value: number) {
    this._srcPortLow = value;
  }
  public resetSrcPortLow() {
    this._srcPortLow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get srcPortLowInput() {
    return this._srcPortLow;
  }
}

export class VpcAclRulesList extends cdktf.ComplexList {
  public internalValue? : VpcAclRules[] | cdktf.IResolvable

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
  public get(index: number): VpcAclRulesOutputReference {
    return new VpcAclRulesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl scaleway_vpc_acl}
*/
export class VpcAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_acl";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcAcl resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcAcl to import
  * @param importFromId The id of the existing VpcAcl that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcAcl to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_acl", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_acl scaleway_vpc_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcAclConfig
  */
  public constructor(scope: Construct, id: string, config: VpcAclConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_acl',
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
    this._defaultPolicy = config.defaultPolicy;
    this._id = config.id;
    this._isIpv6 = config.isIpv6;
    this._region = config.region;
    this._vpcId = config.vpcId;
    this._rules.internalValue = config.rules;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // default_policy - computed: false, optional: false, required: true
  private _defaultPolicy?: string; 
  public get defaultPolicy() {
    return this.getStringAttribute('default_policy');
  }
  public set defaultPolicy(value: string) {
    this._defaultPolicy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultPolicyInput() {
    return this._defaultPolicy;
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

  // is_ipv6 - computed: false, optional: true, required: false
  private _isIpv6?: boolean | cdktf.IResolvable; 
  public get isIpv6() {
    return this.getBooleanAttribute('is_ipv6');
  }
  public set isIpv6(value: boolean | cdktf.IResolvable) {
    this._isIpv6 = value;
  }
  public resetIsIpv6() {
    this._isIpv6 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isIpv6Input() {
    return this._isIpv6;
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

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // rules - computed: false, optional: false, required: true
  private _rules = new VpcAclRulesList(this, "rules", false);
  public get rules() {
    return this._rules;
  }
  public putRules(value: VpcAclRules[] | cdktf.IResolvable) {
    this._rules.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rulesInput() {
    return this._rules.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      default_policy: cdktf.stringToTerraform(this._defaultPolicy),
      id: cdktf.stringToTerraform(this._id),
      is_ipv6: cdktf.booleanToTerraform(this._isIpv6),
      region: cdktf.stringToTerraform(this._region),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
      rules: cdktf.listMapper(vpcAclRulesToTerraform, true)(this._rules.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      default_policy: {
        value: cdktf.stringToHclTerraform(this._defaultPolicy),
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
      is_ipv6: {
        value: cdktf.booleanToHclTerraform(this._isIpv6),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      rules: {
        value: cdktf.listMapperHcl(vpcAclRulesToHclTerraform, true)(this._rules.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpcAclRulesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
