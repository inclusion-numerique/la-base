// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayLbRoutesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Routes with a frontend id like it are listed.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes#frontend_id DataScalewayLbRoutes#frontend_id}
  */
  readonly frontendId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes#id DataScalewayLbRoutes#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes#project_id DataScalewayLbRoutes#project_id}
  */
  readonly projectId?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes#zone DataScalewayLbRoutes#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayLbRoutesRoutes {
}

export function dataScalewayLbRoutesRoutesToTerraform(struct?: DataScalewayLbRoutesRoutes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayLbRoutesRoutesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayLbRoutesRoutes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayLbRoutesRoutes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // backend_id - computed: true, optional: false, required: false
  public get backendId() {
    return this.getStringAttribute('backend_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // frontend_id - computed: true, optional: false, required: false
  public get frontendId() {
    return this.getStringAttribute('frontend_id');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // match_host_header - computed: true, optional: false, required: false
  public get matchHostHeader() {
    return this.getStringAttribute('match_host_header');
  }

  // match_sni - computed: true, optional: false, required: false
  public get matchSni() {
    return this.getStringAttribute('match_sni');
  }

  // update_at - computed: true, optional: false, required: false
  public get updateAt() {
    return this.getStringAttribute('update_at');
  }
}

export class DataScalewayLbRoutesRoutesList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayLbRoutesRoutesOutputReference {
    return new DataScalewayLbRoutesRoutesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes scaleway_lb_routes}
*/
export class DataScalewayLbRoutes extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_routes";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_routes scaleway_lb_routes} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayLbRoutesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayLbRoutesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_routes',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.17.0',
        providerVersionConstraint: '>= 2.16.3'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._frontendId = config.frontendId;
    this._id = config.id;
    this._projectId = config.projectId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // frontend_id - computed: false, optional: true, required: false
  private _frontendId?: string; 
  public get frontendId() {
    return this.getStringAttribute('frontend_id');
  }
  public set frontendId(value: string) {
    this._frontendId = value;
  }
  public resetFrontendId() {
    this._frontendId = undefined;
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

  // routes - computed: true, optional: false, required: false
  private _routes = new DataScalewayLbRoutesRoutesList(this, "routes", false);
  public get routes() {
    return this._routes;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      frontend_id: cdktf.stringToTerraform(this._frontendId),
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
