import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import AppTable from '../components/AppTable/index'

describe('AppTable', () => {
  const cols = {}, rows = []
  const wrapper = shallowMount(AppTable, {
    propsData: { cols, rows }
  })
  it('display props type object', () => {
    expect(wrapper.props().cols).toStrictEqual({})
    expect(wrapper.props().rows).toStrictEqual([])
  })
})


