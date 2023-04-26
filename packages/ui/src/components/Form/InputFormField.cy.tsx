import React from 'react'
import { useForm } from 'react-hook-form'
import InputFormField from './InputFormField'

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
