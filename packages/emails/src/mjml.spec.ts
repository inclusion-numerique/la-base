import { compileMjml } from '@app/emails/mjml'

describe('mjml', () => {
  it('Compiles mjml templates', async () => {
    const result = await compileMjml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>
          Hey
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`)

    expect(result).toContain('<!doctype html>')
    expect(result).toContain(
      '<html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">',
    )
    expect(result).toContain('<style type="text/css">')
    expect(result).toContain('>Hey</div>')
    expect(result).toContain('</body>')
  })
})
