// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInstanceSecurityGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group#id DataScalewayInstanceSecurityGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group#name DataScalewayInstanceSecurityGroup#name}
  */
  readonly name?: string;
  /**
  * The ID of the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group#security_group_id DataScalewayInstanceSecurityGroup#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group#zone DataScalewayInstanceSecurityGroup#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayInstanceSecurityGroupInboundRule {
}

export function dataScalewayInstanceSecurityGroupInboundRuleToTerraform(struct?: DataScalewayInstanceSecurityGroupInboundRule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayInstanceSecurityGroupInboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayInstanceSecurityGroupInboundRule | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayInstanceSecurityGroupInboundRule | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // action - computed: true, optional: false, required: false
  public get action() {
    return this.getStringAttribute('action');
  }

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
  }

  // ip_range - computed: true, optional: false, required: false
  public get ipRange() {
    return this.getStringAttribute('ip_range');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // port_range - computed: true, optional: false, required: false
  public get portRange() {
    return this.getStringAttribute('port_range');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
}

export class DataScalewayInstanceSecurityGroupInboundRuleList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayInstanceSecurityGroupInboundRuleOutputReference {
    return new DataScalewayInstanceSecurityGroupInboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayInstanceSecurityGroupOutboundRule {
}

export function dataScalewayInstanceSecurityGroupOutboundRuleToTerraform(struct?: DataScalewayInstanceSecurityGroupOutboundRule): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayInstanceSecurityGroupOutboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayInstanceSecurityGroupOutboundRule | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayInstanceSecurityGroupOutboundRule | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // action - computed: true, optional: false, required: false
  public get action() {
    return this.getStringAttribute('action');
  }

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
  }

  // ip_range - computed: true, optional: false, required: false
  public get ipRange() {
    return this.getStringAttribute('ip_range');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // port_range - computed: true, optional: false, required: false
  public get portRange() {
    return this.getStringAttribute('port_range');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
}

export class DataScalewayInstanceSecurityGroupOutboundRuleList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayInstanceSecurityGroupOutboundRuleOutputReference {
    return new DataScalewayInstanceSecurityGroupOutboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group scaleway_instance_security_group}
*/
export class DataScalewayInstanceSecurityGroup extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_security_group";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_security_group scaleway_instance_security_group} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInstanceSecurityGroupConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInstanceSecurityGroupConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_security_group',
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
    this._id = config.id;
    this._name = config.name;
    this._securityGroupId = config.securityGroupId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // enable_default_security - computed: true, optional: false, required: false
  public get enableDefaultSecurity() {
    return this.getBooleanAttribute('enable_default_security');
  }

  // external_rules - computed: true, optional: false, required: false
  public get externalRules() {
    return this.getBooleanAttribute('external_rules');
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

  // inbound_default_policy - computed: true, optional: false, required: false
  public get inboundDefaultPolicy() {
    return this.getStringAttribute('inbound_default_policy');
  }

  // inbound_rule - computed: true, optional: false, required: false
  private _inboundRule = new DataScalewayInstanceSecurityGroupInboundRuleList(this, "inbound_rule", false);
  public get inboundRule() {
    return this._inboundRule;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // outbound_default_policy - computed: true, optional: false, required: false
  public get outboundDefaultPolicy() {
    return this.getStringAttribute('outbound_default_policy');
  }

  // outbound_rule - computed: true, optional: false, required: false
  private _outboundRule = new DataScalewayInstanceSecurityGroupOutboundRuleList(this, "outbound_rule", false);
  public get outboundRule() {
    return this._outboundRule;
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // security_group_id - computed: false, optional: true, required: false
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  public resetSecurityGroupId() {
    this._securityGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // stateful - computed: true, optional: false, required: false
  public get stateful() {
    return this.getBooleanAttribute('stateful');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // zone - computed: false, optional: true, required: false
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
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
