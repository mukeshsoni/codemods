function isLowerCase(str) {
  return str === str.toLowerCase()
}

function removeSlashes(str, replaceWith = "_") {
  return str.split("/").join("_")
}

function butLast(arr) {
  return arr.slice(0, arr.length - 1)
}

function removeExtension(filePath) {
  return butLast(filePath.split(".")).join(".")
}

export default function transformer(file, api) {
  const j = api.jscodeshift

  let i = 0
  return j(file.source)
    .find(j.JSXElement)
    .forEach(p => {
      // only add to native html elements like div, p, h1 etc. They start with lowercase letter
      if (isLowerCase(p.node.openingElement.name.name[0])) {
        // only add the attribute if id does not already exist
        if (
          !p.node.openingElement.attributes.some(
            attribute =>
              attribute &&
              attribute.name &&
              attribute.name.name === "data-test-id"
          )
        ) {
          j(p).replaceWith(
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxIdentifier(p.node.openingElement.name.name),
                p.node.openingElement.attributes.concat(
                  j.jsxAttribute(
                    j.jsxIdentifier("data-test-id"),
                    j.literal(
                      removeSlashes(removeExtension(file.path)).toLowerCase() +
                        `_test_id_` +
                        i++
                    )
                  )
                ),
                p.node.openingElement.selfClosing
              ),
              p.node.closingElement,
              p.node.children
            )
          )
        }
      }
    })
    .toSource()
}
