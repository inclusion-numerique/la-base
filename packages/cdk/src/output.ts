import type { ProjectCdkOutput, WebCdkOutput } from '@app/cdk/getCdkOutput'
import { TerraformOutput } from 'cdktf'
import type { Construct } from 'constructs'

export const outputPrefix = `output_`

// Output helper function
// ⚠️ When calling this function, do not forget to update typings in src/getCdkOutput.ts
export const createOutput =
  <OutputType extends WebCdkOutput | ProjectCdkOutput>(scope: Construct) =>
  <OutputName extends keyof OutputType>(
    name: OutputName,
    value: OutputType[OutputName],
    sensitive?: 'sensitive',
  ) => {
    const id = `${outputPrefix}${name as string}`

    const element = new TerraformOutput(scope, id, {
      value,
      sensitive: sensitive === 'sensitive',
    })
    element.overrideLogicalId(name as string)

    return element
  }
