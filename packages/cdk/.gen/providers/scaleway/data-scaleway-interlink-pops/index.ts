// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInterlinkPopsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Filter for PoPs with a dedicated connection available for self-hosted links
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#dedicated_available DataScalewayInterlinkPops#dedicated_available}
  */
  readonly dedicatedAvailable?: boolean | cdktf.IResolvable;
  /**
  * Hosting provider name to filter for
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#hosting_provider_name DataScalewayInterlinkPops#hosting_provider_name}
  */
  readonly hostingProviderName?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#id DataScalewayInterlinkPops#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Filter for PoPs with a shared connection allowing this bandwidth size
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#link_bandwidth_mbps DataScalewayInterlinkPops#link_bandwidth_mbps}
  */
  readonly linkBandwidthMbps?: number;
  /**
  * PoP name to filter for
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#name DataScalewayInterlinkPops#name}
  */
  readonly name?: string;
  /**
  * Filter for PoPs hosting an available shared connection from this partner
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#partner_id DataScalewayInterlinkPops#partner_id}
  */
  readonly partnerId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#region DataScalewayInterlinkPops#region}
  */
  readonly region?: string;
}
export interface DataScalewayInterlinkPopsPops {
}

export function dataScalewayInterlinkPopsPopsToTerraform(struct?: DataScalewayInterlinkPopsPops): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayInterlinkPopsPopsToHclTerraform(struct?: DataScalewayInterlinkPopsPops): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayInterlinkPopsPopsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataScalewayInterlinkPopsPops | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayInterlinkPopsPops | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // address - computed: true, optional: false, required: false
  public get address() {
    return this.getStringAttribute('address');
  }

  // available_link_bandwidths_mbps - computed: true, optional: false, required: false
  public get availableLinkBandwidthsMbps() {
    return this.getNumberListAttribute('available_link_bandwidths_mbps');
  }

  // city - computed: true, optional: false, required: false
  public get city() {
    return this.getStringAttribute('city');
  }

  // display_name - computed: true, optional: false, required: false
  public get displayName() {
    return this.getStringAttribute('display_name');
  }

  // hosting_provider_name - computed: true, optional: false, required: false
  public get hostingProviderName() {
    return this.getStringAttribute('hosting_provider_name');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // logo_url - computed: true, optional: false, required: false
  public get logoUrl() {
    return this.getStringAttribute('logo_url');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }
}

export class DataScalewayInterlinkPopsPopsList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayInterlinkPopsPopsOutputReference {
    return new DataScalewayInterlinkPopsPopsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops scaleway_interlink_pops}
*/
export class DataScalewayInterlinkPops extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_interlink_pops";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayInterlinkPops resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayInterlinkPops to import
  * @param importFromId The id of the existing DataScalewayInterlinkPops that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayInterlinkPops to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_interlink_pops", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/interlink_pops scaleway_interlink_pops} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInterlinkPopsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInterlinkPopsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_interlink_pops',
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
    this._dedicatedAvailable = config.dedicatedAvailable;
    this._hostingProviderName = config.hostingProviderName;
    this._id = config.id;
    this._linkBandwidthMbps = config.linkBandwidthMbps;
    this._name = config.name;
    this._partnerId = config.partnerId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // dedicated_available - computed: false, optional: true, required: false
  private _dedicatedAvailable?: boolean | cdktf.IResolvable; 
  public get dedicatedAvailable() {
    return this.getBooleanAttribute('dedicated_available');
  }
  public set dedicatedAvailable(value: boolean | cdktf.IResolvable) {
    this._dedicatedAvailable = value;
  }
  public resetDedicatedAvailable() {
    this._dedicatedAvailable = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dedicatedAvailableInput() {
    return this._dedicatedAvailable;
  }

  // hosting_provider_name - computed: false, optional: true, required: false
  private _hostingProviderName?: string; 
  public get hostingProviderName() {
    return this.getStringAttribute('hosting_provider_name');
  }
  public set hostingProviderName(value: string) {
    this._hostingProviderName = value;
  }
  public resetHostingProviderName() {
    this._hostingProviderName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostingProviderNameInput() {
    return this._hostingProviderName;
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

  // link_bandwidth_mbps - computed: false, optional: true, required: false
  private _linkBandwidthMbps?: number; 
  public get linkBandwidthMbps() {
    return this.getNumberAttribute('link_bandwidth_mbps');
  }
  public set linkBandwidthMbps(value: number) {
    this._linkBandwidthMbps = value;
  }
  public resetLinkBandwidthMbps() {
    this._linkBandwidthMbps = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get linkBandwidthMbpsInput() {
    return this._linkBandwidthMbps;
  }

  // name - computed: false, optional: true, required: false
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

  // partner_id - computed: false, optional: true, required: false
  private _partnerId?: string; 
  public get partnerId() {
    return this.getStringAttribute('partner_id');
  }
  public set partnerId(value: string) {
    this._partnerId = value;
  }
  public resetPartnerId() {
    this._partnerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partnerIdInput() {
    return this._partnerId;
  }

  // pops - computed: true, optional: false, required: false
  private _pops = new DataScalewayInterlinkPopsPopsList(this, "pops", false);
  public get pops() {
    return this._pops;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      dedicated_available: cdktf.booleanToTerraform(this._dedicatedAvailable),
      hosting_provider_name: cdktf.stringToTerraform(this._hostingProviderName),
      id: cdktf.stringToTerraform(this._id),
      link_bandwidth_mbps: cdktf.numberToTerraform(this._linkBandwidthMbps),
      name: cdktf.stringToTerraform(this._name),
      partner_id: cdktf.stringToTerraform(this._partnerId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      dedicated_available: {
        value: cdktf.booleanToHclTerraform(this._dedicatedAvailable),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      hosting_provider_name: {
        value: cdktf.stringToHclTerraform(this._hostingProviderName),
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
      link_bandwidth_mbps: {
        value: cdktf.numberToHclTerraform(this._linkBandwidthMbps),
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
      partner_id: {
        value: cdktf.stringToHclTerraform(this._partnerId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
