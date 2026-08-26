// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcIngressRuleConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ingress rule description
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#description VpcIngressRule#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#id VpcIngressRule#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the nexthop private network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#nexthop_private_network_id VpcIngressRule#nexthop_private_network_id}
  */
  readonly nexthopPrivateNetworkId: string;
  /**
  * IP of the nexthop resource for the ingress rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#nexthop_resource_ip VpcIngressRule#nexthop_resource_ip}
  */
  readonly nexthopResourceIp: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#region VpcIngressRule#region}
  */
  readonly region?: string;
  /**
  * Source IP range to which this rule applies (CIDR notation with subnet mask)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#source VpcIngressRule#source}
  */
  readonly source: string;
  /**
  * The tags associated with the ingress rule
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#tags VpcIngressRule#tags}
  */
  readonly tags?: string[];
  /**
  * The ID of the VPC the ingress rule belongs to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#vpc_id VpcIngressRule#vpc_id}
  */
  readonly vpcId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule scaleway_vpc_ingress_rule}
*/
export class VpcIngressRule extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_ingress_rule";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcIngressRule resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcIngressRule to import
  * @param importFromId The id of the existing VpcIngressRule that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcIngressRule to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_ingress_rule", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/vpc_ingress_rule scaleway_vpc_ingress_rule} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcIngressRuleConfig
  */
  public constructor(scope: Construct, id: string, config: VpcIngressRuleConfig) {
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
    this._description = config.description;
    this._id = config.id;
    this._nexthopPrivateNetworkId = config.nexthopPrivateNetworkId;
    this._nexthopResourceIp = config.nexthopResourceIp;
    this._region = config.region;
    this._source = config.source;
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

  // description - computed: true, optional: true, required: false
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

  // is_ipv6 - computed: true, optional: false, required: false
  public get isIpv6() {
    return this.getBooleanAttribute('is_ipv6');
  }

  // nexthop_private_network_id - computed: false, optional: false, required: true
  private _nexthopPrivateNetworkId?: string; 
  public get nexthopPrivateNetworkId() {
    return this.getStringAttribute('nexthop_private_network_id');
  }
  public set nexthopPrivateNetworkId(value: string) {
    this._nexthopPrivateNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopPrivateNetworkIdInput() {
    return this._nexthopPrivateNetworkId;
  }

  // nexthop_resource_ip - computed: false, optional: false, required: true
  private _nexthopResourceIp?: string; 
  public get nexthopResourceIp() {
    return this.getStringAttribute('nexthop_resource_ip');
  }
  public set nexthopResourceIp(value: string) {
    this._nexthopResourceIp = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopResourceIpInput() {
    return this._nexthopResourceIp;
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

  // source - computed: false, optional: false, required: true
  private _source?: string; 
  public get source() {
    return this.getStringAttribute('source');
  }
  public set source(value: string) {
    this._source = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sourceInput() {
    return this._source;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      nexthop_private_network_id: cdktf.stringToTerraform(this._nexthopPrivateNetworkId),
      nexthop_resource_ip: cdktf.stringToTerraform(this._nexthopResourceIp),
      region: cdktf.stringToTerraform(this._region),
      source: cdktf.stringToTerraform(this._source),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      vpc_id: cdktf.stringToTerraform(this._vpcId),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      source: {
        value: cdktf.stringToHclTerraform(this._source),
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
