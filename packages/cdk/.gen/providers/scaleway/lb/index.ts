// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface LbConfig extends cdktf.TerraformMetaArguments {
  /**
  * Defines whether to automatically assign a flexible public IP to the load balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#assign_flexible_ip Lb#assign_flexible_ip}
  */
  readonly assignFlexibleIp?: boolean | cdktf.IResolvable;
  /**
  * Defines whether to automatically assign a flexible public IPv6 to the load balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#assign_flexible_ipv6 Lb#assign_flexible_ipv6}
  */
  readonly assignFlexibleIpv6?: boolean | cdktf.IResolvable;
  /**
  * The description of the lb
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#description Lb#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#id Lb#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The load-balance public IP ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#ip_id Lb#ip_id}
  */
  readonly ipId?: string;
  /**
  * List of IP IDs to attach to the Load Balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#ip_ids Lb#ip_ids}
  */
  readonly ipIds?: string[];
  /**
  * Name of the lb
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#name Lb#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#project_id Lb#project_id}
  */
  readonly projectId?: string;
  /**
  * Release the IPs related to this load-balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#release_ip Lb#release_ip}
  */
  readonly releaseIp?: boolean | cdktf.IResolvable;
  /**
  * Enforces minimal SSL version (in SSL/TLS offloading context)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#ssl_compatibility_level Lb#ssl_compatibility_level}
  */
  readonly sslCompatibilityLevel?: string;
  /**
  * Array of tags to associate with the load-balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#tags Lb#tags}
  */
  readonly tags?: string[];
  /**
  * The type of load-balancer you want to create
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#type Lb#type}
  */
  readonly type: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#zone Lb#zone}
  */
  readonly zone?: string;
  /**
  * private_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#private_network Lb#private_network}
  */
  readonly privateNetwork?: LbPrivateNetwork[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#timeouts Lb#timeouts}
  */
  readonly timeouts?: LbTimeouts;
}
export interface LbPrivateNetwork {
  /**
  * Set to true if you want to let DHCP assign IP addresses
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#dhcp_config Lb#dhcp_config}
  */
  readonly dhcpConfig?: boolean | cdktf.IResolvable;
  /**
  * IPAM ID of a pre-reserved IP address to assign to the Load Balancer on this Private Network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#ipam_ids Lb#ipam_ids}
  */
  readonly ipamIds?: string[];
  /**
  * The Private Network ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#private_network_id Lb#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * Define an IP address in the subnet of your private network that will be assigned to your load balancer instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#static_config Lb#static_config}
  */
  readonly staticConfig?: string[];
}

export function lbPrivateNetworkToTerraform(struct?: LbPrivateNetwork | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dhcp_config: cdktf.booleanToTerraform(struct!.dhcpConfig),
    ipam_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.ipamIds),
    private_network_id: cdktf.stringToTerraform(struct!.privateNetworkId),
    static_config: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.staticConfig),
  }
}


export function lbPrivateNetworkToHclTerraform(struct?: LbPrivateNetwork | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dhcp_config: {
      value: cdktf.booleanToHclTerraform(struct!.dhcpConfig),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    ipam_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.ipamIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    private_network_id: {
      value: cdktf.stringToHclTerraform(struct!.privateNetworkId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    static_config: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.staticConfig),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class LbPrivateNetworkOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): LbPrivateNetwork | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dhcpConfig !== undefined) {
      hasAnyValues = true;
      internalValueResult.dhcpConfig = this._dhcpConfig;
    }
    if (this._ipamIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipamIds = this._ipamIds;
    }
    if (this._privateNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateNetworkId = this._privateNetworkId;
    }
    if (this._staticConfig !== undefined) {
      hasAnyValues = true;
      internalValueResult.staticConfig = this._staticConfig;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: LbPrivateNetwork | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._dhcpConfig = undefined;
      this._ipamIds = undefined;
      this._privateNetworkId = undefined;
      this._staticConfig = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._dhcpConfig = value.dhcpConfig;
      this._ipamIds = value.ipamIds;
      this._privateNetworkId = value.privateNetworkId;
      this._staticConfig = value.staticConfig;
    }
  }

  // dhcp_config - computed: true, optional: true, required: false
  private _dhcpConfig?: boolean | cdktf.IResolvable; 
  public get dhcpConfig() {
    return this.getBooleanAttribute('dhcp_config');
  }
  public set dhcpConfig(value: boolean | cdktf.IResolvable) {
    this._dhcpConfig = value;
  }
  public resetDhcpConfig() {
    this._dhcpConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dhcpConfigInput() {
    return this._dhcpConfig;
  }

  // ipam_ids - computed: true, optional: true, required: false
  private _ipamIds?: string[]; 
  public get ipamIds() {
    return this.getListAttribute('ipam_ids');
  }
  public set ipamIds(value: string[]) {
    this._ipamIds = value;
  }
  public resetIpamIds() {
    this._ipamIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamIdsInput() {
    return this._ipamIds;
  }

  // private_network_id - computed: false, optional: false, required: true
  private _privateNetworkId?: string; 
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
  public set privateNetworkId(value: string) {
    this._privateNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdInput() {
    return this._privateNetworkId;
  }

  // static_config - computed: false, optional: true, required: false
  private _staticConfig?: string[]; 
  public get staticConfig() {
    return this.getListAttribute('static_config');
  }
  public set staticConfig(value: string[]) {
    this._staticConfig = value;
  }
  public resetStaticConfig() {
    this._staticConfig = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get staticConfigInput() {
    return this._staticConfig;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }
}

export class LbPrivateNetworkList extends cdktf.ComplexList {
  public internalValue? : LbPrivateNetwork[] | cdktf.IResolvable

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
  public get(index: number): LbPrivateNetworkOutputReference {
    return new LbPrivateNetworkOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface LbTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#create Lb#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#default Lb#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#delete Lb#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#read Lb#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#update Lb#update}
  */
  readonly update?: string;
}

export function lbTimeoutsToTerraform(struct?: LbTimeouts | cdktf.IResolvable): any {
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


export function lbTimeoutsToHclTerraform(struct?: LbTimeouts | cdktf.IResolvable): any {
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

export class LbTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): LbTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: LbTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb scaleway_lb}
*/
export class Lb extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a Lb resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the Lb to import
  * @param importFromId The id of the existing Lb that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the Lb to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_lb", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/lb scaleway_lb} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options LbConfig
  */
  public constructor(scope: Construct, id: string, config: LbConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb',
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
    this._assignFlexibleIp = config.assignFlexibleIp;
    this._assignFlexibleIpv6 = config.assignFlexibleIpv6;
    this._description = config.description;
    this._id = config.id;
    this._ipId = config.ipId;
    this._ipIds = config.ipIds;
    this._name = config.name;
    this._projectId = config.projectId;
    this._releaseIp = config.releaseIp;
    this._sslCompatibilityLevel = config.sslCompatibilityLevel;
    this._tags = config.tags;
    this._type = config.type;
    this._zone = config.zone;
    this._privateNetwork.internalValue = config.privateNetwork;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // assign_flexible_ip - computed: false, optional: true, required: false
  private _assignFlexibleIp?: boolean | cdktf.IResolvable; 
  public get assignFlexibleIp() {
    return this.getBooleanAttribute('assign_flexible_ip');
  }
  public set assignFlexibleIp(value: boolean | cdktf.IResolvable) {
    this._assignFlexibleIp = value;
  }
  public resetAssignFlexibleIp() {
    this._assignFlexibleIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignFlexibleIpInput() {
    return this._assignFlexibleIp;
  }

  // assign_flexible_ipv6 - computed: false, optional: true, required: false
  private _assignFlexibleIpv6?: boolean | cdktf.IResolvable; 
  public get assignFlexibleIpv6() {
    return this.getBooleanAttribute('assign_flexible_ipv6');
  }
  public set assignFlexibleIpv6(value: boolean | cdktf.IResolvable) {
    this._assignFlexibleIpv6 = value;
  }
  public resetAssignFlexibleIpv6() {
    this._assignFlexibleIpv6 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assignFlexibleIpv6Input() {
    return this._assignFlexibleIpv6;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // ip_id - computed: true, optional: true, required: false
  private _ipId?: string; 
  public get ipId() {
    return this.getStringAttribute('ip_id');
  }
  public set ipId(value: string) {
    this._ipId = value;
  }
  public resetIpId() {
    this._ipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipIdInput() {
    return this._ipId;
  }

  // ip_ids - computed: true, optional: true, required: false
  private _ipIds?: string[]; 
  public get ipIds() {
    return this.getListAttribute('ip_ids');
  }
  public set ipIds(value: string[]) {
    this._ipIds = value;
  }
  public resetIpIds() {
    this._ipIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipIdsInput() {
    return this._ipIds;
  }

  // ipv6_address - computed: true, optional: false, required: false
  public get ipv6Address() {
    return this.getStringAttribute('ipv6_address');
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

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // release_ip - computed: false, optional: true, required: false
  private _releaseIp?: boolean | cdktf.IResolvable; 
  public get releaseIp() {
    return this.getBooleanAttribute('release_ip');
  }
  public set releaseIp(value: boolean | cdktf.IResolvable) {
    this._releaseIp = value;
  }
  public resetReleaseIp() {
    this._releaseIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get releaseIpInput() {
    return this._releaseIp;
  }

  // ssl_compatibility_level - computed: false, optional: true, required: false
  private _sslCompatibilityLevel?: string; 
  public get sslCompatibilityLevel() {
    return this.getStringAttribute('ssl_compatibility_level');
  }
  public set sslCompatibilityLevel(value: string) {
    this._sslCompatibilityLevel = value;
  }
  public resetSslCompatibilityLevel() {
    this._sslCompatibilityLevel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sslCompatibilityLevelInput() {
    return this._sslCompatibilityLevel;
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

  // zone - computed: true, optional: true, required: false
  private _zone?: string; 
  public get zone() {
    return this.getStringAttribute('zone');
  }
  public set zone(value: string) {
    this._zone = value;
  }
  public resetZone() {
    this._zone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zoneInput() {
    return this._zone;
  }

  // private_network - computed: false, optional: true, required: false
  private _privateNetwork = new LbPrivateNetworkList(this, "private_network", true);
  public get privateNetwork() {
    return this._privateNetwork;
  }
  public putPrivateNetwork(value: LbPrivateNetwork[] | cdktf.IResolvable) {
    this._privateNetwork.internalValue = value;
  }
  public resetPrivateNetwork() {
    this._privateNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkInput() {
    return this._privateNetwork.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new LbTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: LbTimeouts) {
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
      assign_flexible_ip: cdktf.booleanToTerraform(this._assignFlexibleIp),
      assign_flexible_ipv6: cdktf.booleanToTerraform(this._assignFlexibleIpv6),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      ip_id: cdktf.stringToTerraform(this._ipId),
      ip_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._ipIds),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      release_ip: cdktf.booleanToTerraform(this._releaseIp),
      ssl_compatibility_level: cdktf.stringToTerraform(this._sslCompatibilityLevel),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      zone: cdktf.stringToTerraform(this._zone),
      private_network: cdktf.listMapper(lbPrivateNetworkToTerraform, true)(this._privateNetwork.internalValue),
      timeouts: lbTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      assign_flexible_ip: {
        value: cdktf.booleanToHclTerraform(this._assignFlexibleIp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      assign_flexible_ipv6: {
        value: cdktf.booleanToHclTerraform(this._assignFlexibleIpv6),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
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
      ip_id: {
        value: cdktf.stringToHclTerraform(this._ipId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ip_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._ipIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      release_ip: {
        value: cdktf.booleanToHclTerraform(this._releaseIp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      ssl_compatibility_level: {
        value: cdktf.stringToHclTerraform(this._sslCompatibilityLevel),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_network: {
        value: cdktf.listMapperHcl(lbPrivateNetworkToHclTerraform, true)(this._privateNetwork.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "LbPrivateNetworkList",
      },
      timeouts: {
        value: lbTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "LbTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
