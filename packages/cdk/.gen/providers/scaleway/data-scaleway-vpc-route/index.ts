// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcRouteConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#id DataScalewayVpcRoute#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Only routes with an IPv6 destination will be returned
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#is_ipv6 DataScalewayVpcRoute#is_ipv6}
  */
  readonly isIpv6?: boolean | cdktf.IResolvable;
  /**
  * The ID of the nexthop private network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#nexthop_private_network_id DataScalewayVpcRoute#nexthop_private_network_id}
  */
  readonly nexthopPrivateNetworkId?: string;
  /**
  * The ID of the nexthop resource
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#nexthop_resource_id DataScalewayVpcRoute#nexthop_resource_id}
  */
  readonly nexthopResourceId?: string;
  /**
  * Only routes with a matching next hop resource type will be returned
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#nexthop_resource_type DataScalewayVpcRoute#nexthop_resource_type}
  */
  readonly nexthopResourceType?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#region DataScalewayVpcRoute#region}
  */
  readonly region?: string;
  /**
  * The ID of the route
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#route_id DataScalewayVpcRoute#route_id}
  */
  readonly routeId?: string;
  /**
  * The tags associated with the Route
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#tags DataScalewayVpcRoute#tags}
  */
  readonly tags?: string[];
  /**
  * VPC ID the Route belongs to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#vpc_id DataScalewayVpcRoute#vpc_id}
  */
  readonly vpcId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route scaleway_vpc_route}
*/
export class DataScalewayVpcRoute extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_route";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcRoute resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcRoute to import
  * @param importFromId The id of the existing DataScalewayVpcRoute that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcRoute to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_route", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/vpc_route scaleway_vpc_route} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcRouteConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcRouteConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_route',
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
    this._nexthopPrivateNetworkId = config.nexthopPrivateNetworkId;
    this._nexthopResourceId = config.nexthopResourceId;
    this._nexthopResourceType = config.nexthopResourceType;
    this._region = config.region;
    this._routeId = config.routeId;
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

  // destination - computed: true, optional: false, required: false
  public get destination() {
    return this.getStringAttribute('destination');
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

  // nexthop_resource_id - computed: false, optional: true, required: false
  private _nexthopResourceId?: string; 
  public get nexthopResourceId() {
    return this.getStringAttribute('nexthop_resource_id');
  }
  public set nexthopResourceId(value: string) {
    this._nexthopResourceId = value;
  }
  public resetNexthopResourceId() {
    this._nexthopResourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopResourceIdInput() {
    return this._nexthopResourceId;
  }

  // nexthop_resource_type - computed: false, optional: true, required: false
  private _nexthopResourceType?: string; 
  public get nexthopResourceType() {
    return this.getStringAttribute('nexthop_resource_type');
  }
  public set nexthopResourceType(value: string) {
    this._nexthopResourceType = value;
  }
  public resetNexthopResourceType() {
    this._nexthopResourceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nexthopResourceTypeInput() {
    return this._nexthopResourceType;
  }

  // nexthop_vpc_connector_id - computed: true, optional: false, required: false
  public get nexthopVpcConnectorId() {
    return this.getStringAttribute('nexthop_vpc_connector_id');
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

  // route_id - computed: false, optional: true, required: false
  private _routeId?: string; 
  public get routeId() {
    return this.getStringAttribute('route_id');
  }
  public set routeId(value: string) {
    this._routeId = value;
  }
  public resetRouteId() {
    this._routeId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeIdInput() {
    return this._routeId;
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
      is_ipv6: cdktf.booleanToTerraform(this._isIpv6),
      nexthop_private_network_id: cdktf.stringToTerraform(this._nexthopPrivateNetworkId),
      nexthop_resource_id: cdktf.stringToTerraform(this._nexthopResourceId),
      nexthop_resource_type: cdktf.stringToTerraform(this._nexthopResourceType),
      region: cdktf.stringToTerraform(this._region),
      route_id: cdktf.stringToTerraform(this._routeId),
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
      nexthop_resource_id: {
        value: cdktf.stringToHclTerraform(this._nexthopResourceId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      nexthop_resource_type: {
        value: cdktf.stringToHclTerraform(this._nexthopResourceType),
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
      route_id: {
        value: cdktf.stringToHclTerraform(this._routeId),
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
