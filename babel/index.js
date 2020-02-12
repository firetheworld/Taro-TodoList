const babylon = require("babylon")
const traverse = require("@babel/traverse").default
const t = require("@babel/types")

const code = `class Demo {
    render () {
        if (a) {
            b = 1
        }
    }
}`;

const ast = babylon.parse(code);
 
traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  },
  MemberExpression (path) {
    const { property } = path.node
    const right = path.getSibling('right')

    if (t.isIdentifier(property, { name: 'config' }) && path.parentPath.isAssignmentExpression() && right.isObjectExpression()) {
      const properties = right.node.properties
      console.log("properties: ", properties);
    }
  },
  ClassMethod (path) {
    if (t.isIdentifier(path.node.key)) {
      if (path.node.key.name === 'render') {
        // console.log("render: ", path);
      }
    }
  },
  IfStatement (path) {
    const consequent = path.get('consequent')
    // console.log("consequent: ", consequent);

    if (consequent.isBlockStatement()) {
        // console.log("consequent: ", consequent);
    }
  },
  CallExpression (path) {
    console.log("path: ", path);
  }
});