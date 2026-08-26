// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface KeyManagerKeyMaterialConfig extends cdktf.TerraformMetaArguments {
  /**
  * ID of the key to import key material into. The key's origin must be external (UUID format). Can be a plain UUID or a regional ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#key_id KeyManagerKeyMaterial#key_id}
  */
  readonly keyId: string;
  /**
  * The key material to import. The key material is a random sequence of bytes used to derive a cryptographic key. Can be provided as raw bytes or a base64-encoded string (the provider will automatically normalize the input).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#key_material KeyManagerKeyMaterial#key_material}
  */
  readonly keyMaterial?: string;
  /**
  * The key material to import in write-only mode. The key material is a random sequence of bytes used to derive a cryptographic key. Can be provided as raw bytes or a base64-encoded string (the provider will automatically normalize the input). The key material will not be stored in the Terraform state.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#key_material_wo KeyManagerKeyMaterial#key_material_wo}
  */
  readonly keyMaterialWo?: string;
  /**
  * Version number to track changes to the write-only key material. Increment this value to trigger resource recreation. Required when using 'key_material_wo'.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#key_material_wo_version KeyManagerKeyMaterial#key_material_wo_version}
  */
  readonly keyMaterialWoVersion?: number;
  /**
  * Region of the key. If not set, the region is derived from the key_id when possible or from the provider configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#region KeyManagerKeyMaterial#region}
  */
  readonly region?: string;
  /**
  * Optional salt for key derivation. A salt is random data added to key material to ensure unique derived keys, even if the input is similar. It helps strengthen security when the key material has low randomness (low entropy). Can be provided as raw bytes or a base64-encoded string (the provider will automatically normalize the input).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#salt KeyManagerKeyMaterial#salt}
  */
  readonly salt?: string;
  /**
  * Optional salt for key derivation in write-only mode. A salt is random data added to key material to ensure unique derived keys. Can be provided as raw bytes or a base64-encoded string (the provider will automatically normalize the input). The salt will not be stored in the Terraform state.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#salt_wo KeyManagerKeyMaterial#salt_wo}
  */
  readonly saltWo?: string;
  /**
  * Version number to track changes to the write-only salt. Increment this value to recreate the resource with new salt. Required when using 'salt_wo'.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#salt_wo_version KeyManagerKeyMaterial#salt_wo_version}
  */
  readonly saltWoVersion?: number;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material scaleway_key_manager_key_material}
*/
export class KeyManagerKeyMaterial extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_key_manager_key_material";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a KeyManagerKeyMaterial resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the KeyManagerKeyMaterial to import
  * @param importFromId The id of the existing KeyManagerKeyMaterial that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the KeyManagerKeyMaterial to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_key_manager_key_material", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/key_manager_key_material scaleway_key_manager_key_material} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options KeyManagerKeyMaterialConfig
  */
  public constructor(scope: Construct, id: string, config: KeyManagerKeyMaterialConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_key_manager_key_material',
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
    this._keyId = config.keyId;
    this._keyMaterial = config.keyMaterial;
    this._keyMaterialWo = config.keyMaterialWo;
    this._keyMaterialWoVersion = config.keyMaterialWoVersion;
    this._region = config.region;
    this._salt = config.salt;
    this._saltWo = config.saltWo;
    this._saltWoVersion = config.saltWoVersion;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // key_id - computed: false, optional: false, required: true
  private _keyId?: string; 
  public get keyId() {
    return this.getStringAttribute('key_id');
  }
  public set keyId(value: string) {
    this._keyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyIdInput() {
    return this._keyId;
  }

  // key_material - computed: false, optional: true, required: false
  private _keyMaterial?: string; 
  public get keyMaterial() {
    return this.getStringAttribute('key_material');
  }
  public set keyMaterial(value: string) {
    this._keyMaterial = value;
  }
  public resetKeyMaterial() {
    this._keyMaterial = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyMaterialInput() {
    return this._keyMaterial;
  }

  // key_material_wo - computed: false, optional: true, required: false
  private _keyMaterialWo?: string; 
  public get keyMaterialWo() {
    return this.getStringAttribute('key_material_wo');
  }
  public set keyMaterialWo(value: string) {
    this._keyMaterialWo = value;
  }
  public resetKeyMaterialWo() {
    this._keyMaterialWo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyMaterialWoInput() {
    return this._keyMaterialWo;
  }

  // key_material_wo_version - computed: false, optional: true, required: false
  private _keyMaterialWoVersion?: number; 
  public get keyMaterialWoVersion() {
    return this.getNumberAttribute('key_material_wo_version');
  }
  public set keyMaterialWoVersion(value: number) {
    this._keyMaterialWoVersion = value;
  }
  public resetKeyMaterialWoVersion() {
    this._keyMaterialWoVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get keyMaterialWoVersionInput() {
    return this._keyMaterialWoVersion;
  }

  // key_state - computed: true, optional: false, required: false
  public get keyState() {
    return this.getStringAttribute('key_state');
  }

  // origin - computed: true, optional: false, required: false
  public get origin() {
    return this.getStringAttribute('origin');
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

  // salt - computed: false, optional: true, required: false
  private _salt?: string; 
  public get salt() {
    return this.getStringAttribute('salt');
  }
  public set salt(value: string) {
    this._salt = value;
  }
  public resetSalt() {
    this._salt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saltInput() {
    return this._salt;
  }

  // salt_wo - computed: false, optional: true, required: false
  private _saltWo?: string; 
  public get saltWo() {
    return this.getStringAttribute('salt_wo');
  }
  public set saltWo(value: string) {
    this._saltWo = value;
  }
  public resetSaltWo() {
    this._saltWo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saltWoInput() {
    return this._saltWo;
  }

  // salt_wo_version - computed: false, optional: true, required: false
  private _saltWoVersion?: number; 
  public get saltWoVersion() {
    return this.getNumberAttribute('salt_wo_version');
  }
  public set saltWoVersion(value: number) {
    this._saltWoVersion = value;
  }
  public resetSaltWoVersion() {
    this._saltWoVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get saltWoVersionInput() {
    return this._saltWoVersion;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      key_id: cdktf.stringToTerraform(this._keyId),
      key_material: cdktf.stringToTerraform(this._keyMaterial),
      key_material_wo: cdktf.stringToTerraform(this._keyMaterialWo),
      key_material_wo_version: cdktf.numberToTerraform(this._keyMaterialWoVersion),
      region: cdktf.stringToTerraform(this._region),
      salt: cdktf.stringToTerraform(this._salt),
      salt_wo: cdktf.stringToTerraform(this._saltWo),
      salt_wo_version: cdktf.numberToTerraform(this._saltWoVersion),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      key_id: {
        value: cdktf.stringToHclTerraform(this._keyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      key_material: {
        value: cdktf.stringToHclTerraform(this._keyMaterial),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      key_material_wo: {
        value: cdktf.stringToHclTerraform(this._keyMaterialWo),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      key_material_wo_version: {
        value: cdktf.numberToHclTerraform(this._keyMaterialWoVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      salt: {
        value: cdktf.stringToHclTerraform(this._salt),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      salt_wo: {
        value: cdktf.stringToHclTerraform(this._saltWo),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      salt_wo_version: {
        value: cdktf.numberToHclTerraform(this._saltWoVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
