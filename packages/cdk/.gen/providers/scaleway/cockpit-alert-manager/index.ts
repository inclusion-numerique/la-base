// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface CockpitAlertManagerConfig extends cdktf.TerraformMetaArguments {
  /**
  * Enable or disable the alert manager
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#enable_managed_alerts CockpitAlertManager#enable_managed_alerts}
  */
  readonly enableManagedAlerts?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#id CockpitAlertManager#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#project_id CockpitAlertManager#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#region CockpitAlertManager#region}
  */
  readonly region?: string;
  /**
  * contact_points block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#contact_points CockpitAlertManager#contact_points}
  */
  readonly contactPoints?: CockpitAlertManagerContactPoints[] | cdktf.IResolvable;
}
export interface CockpitAlertManagerContactPoints {
  /**
  * Email addresses for the alert receivers
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#email CockpitAlertManager#email}
  */
  readonly email?: string;
}

export function cockpitAlertManagerContactPointsToTerraform(struct?: CockpitAlertManagerContactPoints | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    email: cdktf.stringToTerraform(struct!.email),
  }
}


export function cockpitAlertManagerContactPointsToHclTerraform(struct?: CockpitAlertManagerContactPoints | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    email: {
      value: cdktf.stringToHclTerraform(struct!.email),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class CockpitAlertManagerContactPointsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): CockpitAlertManagerContactPoints | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._email !== undefined) {
      hasAnyValues = true;
      internalValueResult.email = this._email;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: CockpitAlertManagerContactPoints | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._email = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._email = value.email;
    }
  }

  // email - computed: false, optional: true, required: false
  private _email?: string; 
  public get email() {
    return this.getStringAttribute('email');
  }
  public set email(value: string) {
    this._email = value;
  }
  public resetEmail() {
    this._email = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get emailInput() {
    return this._email;
  }
}

export class CockpitAlertManagerContactPointsList extends cdktf.ComplexList {
  public internalValue? : CockpitAlertManagerContactPoints[] | cdktf.IResolvable

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
  public get(index: number): CockpitAlertManagerContactPointsOutputReference {
    return new CockpitAlertManagerContactPointsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager scaleway_cockpit_alert_manager}
*/
export class CockpitAlertManager extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_cockpit_alert_manager";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a CockpitAlertManager resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the CockpitAlertManager to import
  * @param importFromId The id of the existing CockpitAlertManager that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the CockpitAlertManager to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_cockpit_alert_manager", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/cockpit_alert_manager scaleway_cockpit_alert_manager} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options CockpitAlertManagerConfig = {}
  */
  public constructor(scope: Construct, id: string, config: CockpitAlertManagerConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_cockpit_alert_manager',
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
    this._enableManagedAlerts = config.enableManagedAlerts;
    this._id = config.id;
    this._projectId = config.projectId;
    this._region = config.region;
    this._contactPoints.internalValue = config.contactPoints;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // alert_manager_url - computed: true, optional: false, required: false
  public get alertManagerUrl() {
    return this.getStringAttribute('alert_manager_url');
  }

  // enable_managed_alerts - computed: false, optional: true, required: false
  private _enableManagedAlerts?: boolean | cdktf.IResolvable; 
  public get enableManagedAlerts() {
    return this.getBooleanAttribute('enable_managed_alerts');
  }
  public set enableManagedAlerts(value: boolean | cdktf.IResolvable) {
    this._enableManagedAlerts = value;
  }
  public resetEnableManagedAlerts() {
    this._enableManagedAlerts = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableManagedAlertsInput() {
    return this._enableManagedAlerts;
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

  // contact_points - computed: false, optional: true, required: false
  private _contactPoints = new CockpitAlertManagerContactPointsList(this, "contact_points", false);
  public get contactPoints() {
    return this._contactPoints;
  }
  public putContactPoints(value: CockpitAlertManagerContactPoints[] | cdktf.IResolvable) {
    this._contactPoints.internalValue = value;
  }
  public resetContactPoints() {
    this._contactPoints.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contactPointsInput() {
    return this._contactPoints.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      enable_managed_alerts: cdktf.booleanToTerraform(this._enableManagedAlerts),
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      contact_points: cdktf.listMapper(cockpitAlertManagerContactPointsToTerraform, true)(this._contactPoints.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      enable_managed_alerts: {
        value: cdktf.booleanToHclTerraform(this._enableManagedAlerts),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      contact_points: {
        value: cdktf.listMapperHcl(cockpitAlertManagerContactPointsToHclTerraform, true)(this._contactPoints.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "CockpitAlertManagerContactPointsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
