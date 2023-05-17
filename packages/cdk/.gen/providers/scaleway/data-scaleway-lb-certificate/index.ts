// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayLbCertificateConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the certificate
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate#certificate_id DataScalewayLbCertificate#certificate_id}
  */
  readonly certificateId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate#id DataScalewayLbCertificate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The load-balancer ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate#lb_id DataScalewayLbCertificate#lb_id}
  */
  readonly lbId?: string;
  /**
  * The name of the load-balancer certificate
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate#name DataScalewayLbCertificate#name}
  */
  readonly name?: string;
}
export interface DataScalewayLbCertificateCustomCertificate {
}

export function dataScalewayLbCertificateCustomCertificateToTerraform(struct?: DataScalewayLbCertificateCustomCertificate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayLbCertificateCustomCertificateOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayLbCertificateCustomCertificate | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayLbCertificateCustomCertificate | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // certificate_chain - computed: true, optional: false, required: false
  public get certificateChain() {
    return this.getStringAttribute('certificate_chain');
  }
}

export class DataScalewayLbCertificateCustomCertificateList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayLbCertificateCustomCertificateOutputReference {
    return new DataScalewayLbCertificateCustomCertificateOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayLbCertificateLetsencrypt {
}

export function dataScalewayLbCertificateLetsencryptToTerraform(struct?: DataScalewayLbCertificateLetsencrypt): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayLbCertificateLetsencryptOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayLbCertificateLetsencrypt | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayLbCertificateLetsencrypt | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // common_name - computed: true, optional: false, required: false
  public get commonName() {
    return this.getStringAttribute('common_name');
  }

  // subject_alternative_name - computed: true, optional: false, required: false
  public get subjectAlternativeName() {
    return this.getListAttribute('subject_alternative_name');
  }
}

export class DataScalewayLbCertificateLetsencryptList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayLbCertificateLetsencryptOutputReference {
    return new DataScalewayLbCertificateLetsencryptOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate scaleway_lb_certificate}
*/
export class DataScalewayLbCertificate extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_certificate";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/lb_certificate scaleway_lb_certificate} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayLbCertificateConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayLbCertificateConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_certificate',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.19.0',
        providerVersionConstraint: '= 2.19.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._certificateId = config.certificateId;
    this._id = config.id;
    this._lbId = config.lbId;
    this._name = config.name;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // certificate_id - computed: false, optional: true, required: false
  private _certificateId?: string; 
  public get certificateId() {
    return this.getStringAttribute('certificate_id');
  }
  public set certificateId(value: string) {
    this._certificateId = value;
  }
  public resetCertificateId() {
    this._certificateId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateIdInput() {
    return this._certificateId;
  }

  // common_name - computed: true, optional: false, required: false
  public get commonName() {
    return this.getStringAttribute('common_name');
  }

  // custom_certificate - computed: true, optional: false, required: false
  private _customCertificate = new DataScalewayLbCertificateCustomCertificateList(this, "custom_certificate", false);
  public get customCertificate() {
    return this._customCertificate;
  }

  // fingerprint - computed: true, optional: false, required: false
  public get fingerprint() {
    return this.getStringAttribute('fingerprint');
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

  // lb_id - computed: false, optional: true, required: false
  private _lbId?: string; 
  public get lbId() {
    return this.getStringAttribute('lb_id');
  }
  public set lbId(value: string) {
    this._lbId = value;
  }
  public resetLbId() {
    this._lbId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbIdInput() {
    return this._lbId;
  }

  // letsencrypt - computed: true, optional: false, required: false
  private _letsencrypt = new DataScalewayLbCertificateLetsencryptList(this, "letsencrypt", false);
  public get letsencrypt() {
    return this._letsencrypt;
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

  // not_valid_after - computed: true, optional: false, required: false
  public get notValidAfter() {
    return this.getStringAttribute('not_valid_after');
  }

  // not_valid_before - computed: true, optional: false, required: false
  public get notValidBefore() {
    return this.getStringAttribute('not_valid_before');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // subject_alternative_name - computed: true, optional: false, required: false
  public get subjectAlternativeName() {
    return this.getListAttribute('subject_alternative_name');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      certificate_id: cdktf.stringToTerraform(this._certificateId),
      id: cdktf.stringToTerraform(this._id),
      lb_id: cdktf.stringToTerraform(this._lbId),
      name: cdktf.stringToTerraform(this._name),
    };
  }
}
