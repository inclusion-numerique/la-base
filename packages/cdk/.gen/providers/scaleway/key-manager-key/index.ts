// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface KeyManagerKeyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Algorithm to use for the key. The valid algorithms depend on the usage type.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#algorithm KeyManagerKey#algorithm}
  */
  readonly algorithm: string;
  /**
  * Description of the key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#description KeyManagerKey#description}
  */
  readonly description?: string;
  /**
  * Name of the key.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#name KeyManagerKey#name}
  */
  readonly name?: string;
  /**
  * Origin of the key material. Possible values: scaleway_kms (Key Manager generates the key material), external (key material comes from an external source).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#origin KeyManagerKey#origin}
  */
  readonly origin?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#project_id KeyManagerKey#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#region KeyManagerKey#region}
  */
  readonly region?: string;
  /**
  * List of the key's tags.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#tags KeyManagerKey#tags}
  */
  readonly tags?: string[];
  /**
  * If true, the key is not protected against deletion.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#unprotected KeyManagerKey#unprotected}
  */
  readonly unprotected?: boolean | cdktf.IResolvable;
  /**
  * Key usage type. Possible values: symmetric_encryption, asymmetric_encryption, asymmetric_signing.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#usage KeyManagerKey#usage}
  */
  readonly usage: string;
  /**
  * rotation_policy block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#rotation_policy KeyManagerKey#rotation_policy}
  */
  readonly rotationPolicy?: KeyManagerKeyRotationPolicy;
}
export interface KeyManagerKeyRotationPolicy {
  /**
  * Timestamp indicating the next scheduled rotation. Computed from rotation_period if not set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#next_rotation_at KeyManagerKey#next_rotation_at}
  */
  readonly nextRotationAt?: string;
  /**
  * Time interval between two key rotations. The minimum duration is 24 hours and the maximum duration is 1 year (876000 hours).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#rotation_period KeyManagerKey#rotation_period}
  */
  readonly rotationPeriod: string;
}

export function keyManagerKeyRotationPolicyToTerraform(struct?: KeyManagerKeyRotationPolicyOutputReference | KeyManagerKeyRotationPolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    next_rotation_at: cdktf.stringToTerraform(struct!.nextRotationAt),
    rotation_period: cdktf.stringToTerraform(struct!.rotationPeriod),
  }
}


export function keyManagerKeyRotationPolicyToHclTerraform(struct?: KeyManagerKeyRotationPolicyOutputReference | KeyManagerKeyRotationPolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    next_rotation_at: {
      value: cdktf.stringToHclTerraform(struct!.nextRotationAt),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    rotation_period: {
      value: cdktf.stringToHclTerraform(struct!.rotationPeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class KeyManagerKeyRotationPolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): KeyManagerKeyRotationPolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._nextRotationAt !== undefined) {
      hasAnyValues = true;
      internalValueResult.nextRotationAt = this._nextRotationAt;
    }
    if (this._rotationPeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.rotationPeriod = this._rotationPeriod;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: KeyManagerKeyRotationPolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._nextRotationAt = undefined;
      this._rotationPeriod = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._nextRotationAt = value.nextRotationAt;
      this._rotationPeriod = value.rotationPeriod;
    }
  }

  // next_rotation_at - computed: true, optional: true, required: false
  private _nextRotationAt?: string; 
  public get nextRotationAt() {
    return this.getStringAttribute('next_rotation_at');
  }
  public set nextRotationAt(value: string) {
    this._nextRotationAt = value;
  }
  public resetNextRotationAt() {
    this._nextRotationAt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nextRotationAtInput() {
    return this._nextRotationAt;
  }

  // rotation_period - computed: false, optional: false, required: true
  private _rotationPeriod?: string; 
  public get rotationPeriod() {
    return this.getStringAttribute('rotation_period');
  }
  public set rotationPeriod(value: string) {
    this._rotationPeriod = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rotationPeriodInput() {
    return this._rotationPeriod;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key scaleway_key_manager_key}
*/
export class KeyManagerKey extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_key_manager_key";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a KeyManagerKey resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the KeyManagerKey to import
  * @param importFromId The id of the existing KeyManagerKey that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the KeyManagerKey to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_key_manager_key", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key scaleway_key_manager_key} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options KeyManagerKeyConfig
  */
  public constructor(scope: Construct, id: string, config: KeyManagerKeyConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_key_manager_key',
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
    this._algorithm = config.algorithm;
    this._description = config.description;
    this._name = config.name;
    this._origin = config.origin;
    this._projectId = config.projectId;
    this._region = config.region;
    this._tags = config.tags;
    this._unprotected = config.unprotected;
    this._usage = config.usage;
    this._rotationPolicy.internalValue = config.rotationPolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // algorithm - computed: false, optional: false, required: true
  private _algorithm?: string; 
  public get algorithm() {
    return this.getStringAttribute('algorithm');
  }
  public set algorithm(value: string) {
    this._algorithm = value;
  }
  // Temporarily expose input value. Use with caution.
  public get algorithmInput() {
    return this._algorithm;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // locked - computed: true, optional: false, required: false
  public get locked() {
    return this.getBooleanAttribute('locked');
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

  // origin - computed: false, optional: true, required: false
  private _origin?: string; 
  public get origin() {
    return this.getStringAttribute('origin');
  }
  public set origin(value: string) {
    this._origin = value;
  }
  public resetOrigin() {
    this._origin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get originInput() {
    return this._origin;
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

  // protected - computed: true, optional: false, required: false
  public get protected() {
    return this.getBooleanAttribute('protected');
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

  // rotated_at - computed: true, optional: false, required: false
  public get rotatedAt() {
    return this.getStringAttribute('rotated_at');
  }

  // rotation_count - computed: true, optional: false, required: false
  public get rotationCount() {
    return this.getNumberAttribute('rotation_count');
  }

  // srn - computed: true, optional: false, required: false
  public get srn() {
    return this.getStringAttribute('srn');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
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

  // unprotected - computed: false, optional: true, required: false
  private _unprotected?: boolean | cdktf.IResolvable; 
  public get unprotected() {
    return this.getBooleanAttribute('unprotected');
  }
  public set unprotected(value: boolean | cdktf.IResolvable) {
    this._unprotected = value;
  }
  public resetUnprotected() {
    this._unprotected = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get unprotectedInput() {
    return this._unprotected;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // usage - computed: false, optional: false, required: true
  private _usage?: string; 
  public get usage() {
    return this.getStringAttribute('usage');
  }
  public set usage(value: string) {
    this._usage = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usageInput() {
    return this._usage;
  }

  // rotation_policy - computed: false, optional: true, required: false
  private _rotationPolicy = new KeyManagerKeyRotationPolicyOutputReference(this, "rotation_policy");
  public get rotationPolicy() {
    return this._rotationPolicy;
  }
  public putRotationPolicy(value: KeyManagerKeyRotationPolicy) {
    this._rotationPolicy.internalValue = value;
  }
  public resetRotationPolicy() {
    this._rotationPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rotationPolicyInput() {
    return this._rotationPolicy.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      algorithm: cdktf.stringToTerraform(this._algorithm),
      description: cdktf.stringToTerraform(this._description),
      name: cdktf.stringToTerraform(this._name),
      origin: cdktf.stringToTerraform(this._origin),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      unprotected: cdktf.booleanToTerraform(this._unprotected),
      usage: cdktf.stringToTerraform(this._usage),
      rotation_policy: keyManagerKeyRotationPolicyToTerraform(this._rotationPolicy.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      algorithm: {
        value: cdktf.stringToHclTerraform(this._algorithm),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      origin: {
        value: cdktf.stringToHclTerraform(this._origin),
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
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      unprotected: {
        value: cdktf.booleanToHclTerraform(this._unprotected),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      usage: {
        value: cdktf.stringToHclTerraform(this._usage),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      rotation_policy: {
        value: keyManagerKeyRotationPolicyToHclTerraform(this._rotationPolicy.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "KeyManagerKeyRotationPolicyList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
