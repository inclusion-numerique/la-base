// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface S2SVpnRoutingPolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#id S2SVpnRoutingPolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * IP prefixes version of the routing policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#is_ipv6 S2SVpnRoutingPolicy#is_ipv6}
  */
  readonly isIpv6?: boolean | cdktf.IResolvable;
  /**
  * The name of the routing policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#name S2SVpnRoutingPolicy#name}
  */
  readonly name?: string;
  /**
  * IP prefixes to accept from the peer (ranges of route announcements to accept)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#prefix_filter_in S2SVpnRoutingPolicy#prefix_filter_in}
  */
  readonly prefixFilterIn?: string[];
  /**
  * IP prefix filters to advertise to the peer (ranges of routes to advertise)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#prefix_filter_out S2SVpnRoutingPolicy#prefix_filter_out}
  */
  readonly prefixFilterOut?: string[];
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#project_id S2SVpnRoutingPolicy#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#region S2SVpnRoutingPolicy#region}
  */
  readonly region?: string;
  /**
  * The list of tags to apply to the routing policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#tags S2SVpnRoutingPolicy#tags}
  */
  readonly tags?: string[];
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy scaleway_s2s_vpn_routing_policy}
*/
export class S2SVpnRoutingPolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_s2s_vpn_routing_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a S2SVpnRoutingPolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the S2SVpnRoutingPolicy to import
  * @param importFromId The id of the existing S2SVpnRoutingPolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the S2SVpnRoutingPolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_s2s_vpn_routing_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_routing_policy scaleway_s2s_vpn_routing_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options S2SVpnRoutingPolicyConfig = {}
  */
  public constructor(scope: Construct, id: string, config: S2SVpnRoutingPolicyConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_s2s_vpn_routing_policy',
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
    this._isIpv6 = config.isIpv6;
    this._name = config.name;
    this._prefixFilterIn = config.prefixFilterIn;
    this._prefixFilterOut = config.prefixFilterOut;
    this._projectId = config.projectId;
    this._region = config.region;
    this._tags = config.tags;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // prefix_filter_in - computed: false, optional: true, required: false
  private _prefixFilterIn?: string[]; 
  public get prefixFilterIn() {
    return this.getListAttribute('prefix_filter_in');
  }
  public set prefixFilterIn(value: string[]) {
    this._prefixFilterIn = value;
  }
  public resetPrefixFilterIn() {
    this._prefixFilterIn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get prefixFilterInInput() {
    return this._prefixFilterIn;
  }

  // prefix_filter_out - computed: false, optional: true, required: false
  private _prefixFilterOut?: string[]; 
  public get prefixFilterOut() {
    return this.getListAttribute('prefix_filter_out');
  }
  public set prefixFilterOut(value: string[]) {
    this._prefixFilterOut = value;
  }
  public resetPrefixFilterOut() {
    this._prefixFilterOut = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get prefixFilterOutInput() {
    return this._prefixFilterOut;
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      is_ipv6: cdktf.booleanToTerraform(this._isIpv6),
      name: cdktf.stringToTerraform(this._name),
      prefix_filter_in: cdktf.listMapper(cdktf.stringToTerraform, false)(this._prefixFilterIn),
      prefix_filter_out: cdktf.listMapper(cdktf.stringToTerraform, false)(this._prefixFilterOut),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
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
      is_ipv6: {
        value: cdktf.booleanToHclTerraform(this._isIpv6),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      prefix_filter_in: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._prefixFilterIn),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      prefix_filter_out: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._prefixFilterOut),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
