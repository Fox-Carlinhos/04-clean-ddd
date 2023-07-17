import { expect, test } from 'vitest'
import { Slug } from './slug'

test('it shoould be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example Text')

  expect(slug.value).toEqual('example-text')
})
