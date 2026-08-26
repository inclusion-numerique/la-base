// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcIngressRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#id DataScalewayVpcIngressRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the VPC ingress rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#ingress_rule_id DataScalewayVpcIngressRule#ingress_rule_id}
  */
  readonly ingressRuleId?: string;
  /**
  * Only ingress rules with the matching IP version will be returned
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#is_ipv6 DataScalewayVpcIngressRule#is_ipv6}
  */
  readonly isIpv6?: boolean | cdktf.IResolvable;
  /**
  * The ID of the nexthop private network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#nexthop_private_network_id DataScalewayVpcIngressRule#nexthop_private_network_id}
  */
  readonly nexthopPrivateNetworkId?: string;
  /**
  * IP of the nexthop resource for the ingress rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#nexthop_resource_ip DataScalewayVpcIngressRule#nexthop_resource_ip}
  */
  readonly nexthopResourceIp?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#region DataScalewayVpcIngressRule#region}
  */
  readonly region?: string;
  /**
  * The tags associated with the ingress rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#tags DataScalewayVpcIngressRule#tags}
  */
  readonly tags?: string[];
  /**
  * The ID of the VPC the ingress rule belongs to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#vpc_id DataScalewayVpcIngressRule#vpc_id}
  */
  readonly vpcId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule scaleway_vpc_ingress_rule}
*/
export class DataScalewayVpcIngressRule extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_ingress_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcIngressRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcIngressRule to import
  * @param importFromId The id of the existing DataScalewayVpcIngressRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcIngressRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_ingress_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_ingress_rule scaleway_vpc_ingress_rule} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcIngressRuleConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcIngressRuleConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_ingress_rule',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.81.0',
        providerVersionConstraint: '>= 2.81.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._id = config.id;
    this._ingressRuleId = config.ingressRuleId;
    this._isIpv6 = config.isIpv6;
    this._nexthopPrivateNetworkId = config.nexthopPrivateNetworkId;
    this._nexthopResourceIp = config.nexthopResourceIp;
    this._region = config.region;
    this._tags = config.tags;
    this._vpcId = config.vpcId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
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

  // ingress_rule_id - computed: false, optional: true, required: false
  private _ingressRuleId?: string; 
  public get ingressRuleId() {
    return this.getStringAttribute('ingress_rule_id');
  }
  public set ingressRuleId(value: string) {
    this._ingressRuleId = value;
  }
  public resetIngressRuleId() {
    this._ingressRuleId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ingressRuleIdInput() {
    return this._ingressRuleId;
  }

  // is_ipv6 - computed: true, optional: true, required: false
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

  // nexthop_private_network_id - computed: false, optional: true, required: false
  private _nexthopPrivateNetworkId?: string; 
  public get nexthopPrivateNetworkId() {
    return this.getStringAttribute('nexthop_private_network_id');
  }
  public set nexthopPrivateNetworkId(value: string) {
    this._nexthopPrivateNetworkId = value;
  }
  public resetNexthopPrivateNetworkId() {
    this._nexthopPrivateNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopPrivateNetworkIdInput() {
    return this._nexthopPrivateNetworkId;
  }

  // nexthop_resource_ip - computed: false, optional: true, required: false
  private _nexthopResourceIp?: string; 
  public get nexthopResourceIp() {
    return this.getStringAttribute('nexthop_resource_ip');
  }
  public set nexthopResourceIp(value: string) {
    this._nexthopResourceIp = value;
  }
  public resetNexthopResourceIp() {
    this._nexthopResourceIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopResourceIpInput() {
    return this._nexthopResourceIp;
  }

  // region - computed: false, optional: true, required: false
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

  // source - computed: true, optional: false, required: false
  public get source() {
    return this.getStringAttribute('source');
  }

  // srn - computed: true, optional: false, required: false
  public get srn() {
    return this.getStringAttribute('srn');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return this.getListAttribute('tags');
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpc_id - computed: false, optional: true, required: false
  private _vpcId?: string; 
  public get vpcId() {
    return this.getStringAttribute('vpc_id');
  }
  public set vpcId(value: string) {
    this._vpcId = value;
  }
  public resetVpcId() {
    this._vpcId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpcIdInput() {
    return this._vpcId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      ingress_rule_id: cdktf.stringToTerraform(this._ingressRuleId),
      is_ipv6: cdktf.booleanToTerraform(this._isIpv6),
      nexthop_private_network_id: cdktf.stringToTerraform(this._nexthopPrivateNetworkId),
      nexthop_resource_ip: cdktf.stringToTerraform(this._nexthopResourceIp),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ingress_rule_id: {
        value: cdktf.stringToHclTerraform(this._ingressRuleId),
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
      nexthop_private_network_id: {
        value: cdktf.stringToHclTerraform(this._nexthopPrivateNetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      nexthop_resource_ip: {
        value: cdktf.stringToHclTerraform(this._nexthopResourceIp),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      vpc_id: {
        value: cdktf.stringToHclTerraform(this._vpcId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
