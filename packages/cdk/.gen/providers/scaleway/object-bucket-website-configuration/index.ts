// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ObjectBucketWebsiteConfigurationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The bucket name.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#bucket ObjectBucketWebsiteConfiguration#bucket}
  */
  readonly bucket: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#id ObjectBucketWebsiteConfiguration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#project_id ObjectBucketWebsiteConfiguration#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#region ObjectBucketWebsiteConfiguration#region}
  */
  readonly region?: string;
  /**
  * error_document block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#error_document ObjectBucketWebsiteConfiguration#error_document}
  */
  readonly errorDocument?: ObjectBucketWebsiteConfigurationErrorDocument;
  /**
  * index_document block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#index_document ObjectBucketWebsiteConfiguration#index_document}
  */
  readonly indexDocument: ObjectBucketWebsiteConfigurationIndexDocument;
}
export interface ObjectBucketWebsiteConfigurationErrorDocument {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#key ObjectBucketWebsiteConfiguration#key}
  */
  readonly key: string;
}

export function objectBucketWebsiteConfigurationErrorDocumentToTerraform(struct?: ObjectBucketWebsiteConfigurationErrorDocumentOutputReference | ObjectBucketWebsiteConfigurationErrorDocument): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    key: cdktf.stringToTerraform(struct!.key),
  }
}

export class ObjectBucketWebsiteConfigurationErrorDocumentOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObjectBucketWebsiteConfigurationErrorDocument | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._key !== undefined) {
      hasAnyValues = true;
      internalValueResult.key = this._key;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketWebsiteConfigurationErrorDocument | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._key = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._key = value.key;
    }
  }

  // key - computed: false, optional: false, required: true
  private _key?: string; 
  public get key() {
    return this.getStringAttribute('key');
  }
  public set key(value: string) {
    this._key = value;
  }
  // Temporarily expose input value. Use with caution.
  public get keyInput() {
    return this._key;
  }
}
export interface ObjectBucketWebsiteConfigurationIndexDocument {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration#suffix ObjectBucketWebsiteConfiguration#suffix}
  */
  readonly suffix: string;
}

export function objectBucketWebsiteConfigurationIndexDocumentToTerraform(struct?: ObjectBucketWebsiteConfigurationIndexDocumentOutputReference | ObjectBucketWebsiteConfigurationIndexDocument): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    suffix: cdktf.stringToTerraform(struct!.suffix),
  }
}

export class ObjectBucketWebsiteConfigurationIndexDocumentOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObjectBucketWebsiteConfigurationIndexDocument | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._suffix !== undefined) {
      hasAnyValues = true;
      internalValueResult.suffix = this._suffix;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketWebsiteConfigurationIndexDocument | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._suffix = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._suffix = value.suffix;
    }
  }

  // suffix - computed: false, optional: false, required: true
  private _suffix?: string; 
  public get suffix() {
    return this.getStringAttribute('suffix');
  }
  public set suffix(value: string) {
    this._suffix = value;
  }
  // Temporarily expose input value. Use with caution.
  public get suffixInput() {
    return this._suffix;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration scaleway_object_bucket_website_configuration}
*/
export class ObjectBucketWebsiteConfiguration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_object_bucket_website_configuration";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/object_bucket_website_configuration scaleway_object_bucket_website_configuration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ObjectBucketWebsiteConfigurationConfig
  */
  public constructor(scope: Construct, id: string, config: ObjectBucketWebsiteConfigurationConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_object_bucket_website_configuration',
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
    this._bucket = config.bucket;
    this._id = config.id;
    this._projectId = config.projectId;
    this._region = config.region;
    this._errorDocument.internalValue = config.errorDocument;
    this._indexDocument.internalValue = config.indexDocument;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bucket - computed: false, optional: false, required: true
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
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

  // website_domain - computed: true, optional: false, required: false
  public get websiteDomain() {
    return this.getStringAttribute('website_domain');
  }

  // website_endpoint - computed: true, optional: false, required: false
  public get websiteEndpoint() {
    return this.getStringAttribute('website_endpoint');
  }

  // error_document - computed: false, optional: true, required: false
  private _errorDocument = new ObjectBucketWebsiteConfigurationErrorDocumentOutputReference(this, "error_document");
  public get errorDocument() {
    return this._errorDocument;
  }
  public putErrorDocument(value: ObjectBucketWebsiteConfigurationErrorDocument) {
    this._errorDocument.internalValue = value;
  }
  public resetErrorDocument() {
    this._errorDocument.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get errorDocumentInput() {
    return this._errorDocument.internalValue;
  }

  // index_document - computed: false, optional: false, required: true
  private _indexDocument = new ObjectBucketWebsiteConfigurationIndexDocumentOutputReference(this, "index_document");
  public get indexDocument() {
    return this._indexDocument;
  }
  public putIndexDocument(value: ObjectBucketWebsiteConfigurationIndexDocument) {
    this._indexDocument.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get indexDocumentInput() {
    return this._indexDocument.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      bucket: cdktf.stringToTerraform(this._bucket),
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      error_document: objectBucketWebsiteConfigurationErrorDocumentToTerraform(this._errorDocument.internalValue),
      index_document: objectBucketWebsiteConfigurationIndexDocumentToTerraform(this._indexDocument.internalValue),
    };
  }
}
