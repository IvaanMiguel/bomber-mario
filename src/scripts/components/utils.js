export const addComponent = (inst, component) => {
  if (!component.name) throw new Error('Component\'s name not found')

  inst[component.name] = component
}
