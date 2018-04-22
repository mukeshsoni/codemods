export default function transformer(file, api) {
  const j = api.jscodeshift;

  let i = 0
  return j(file.source)
    .find(j.JSXElement)
    .forEach(p => {
    	if(p.node.openingElement.name.name[0] === p.node.openingElement.name.name[0].toLowerCase()) {
        
		j(p).replaceWith(
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier(p.node.openingElement.name.name), 
              p.node.openingElement.attributes.concat(j.jsxAttribute(
                j.jsxIdentifier('data-test-id'), 
                j.literal(file.path + `_test_id_`+i++))),
              false), 
            p.node.closingElement, 
            p.node.children))
          }
    })
    .toSource();
}
