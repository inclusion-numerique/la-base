import InputFormField from '@app/ui/components/Form/InputFormField'
import { useForm } from 'react-hook-form'

const Wrapper = ({ path }: { path: string }) => {
  const form = useForm()

  return (
    <form>
      <InputFormField control={form.control} path={path} />
    </form>
  )
}

describe('<InputFormField />', () => {
  it('should render a InputFormField', () => {
    cy.mount(<Wrapper path="name" />)

    cy.get('input').should('exist')
  })
})
