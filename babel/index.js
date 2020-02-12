const babylon = require("babylon")
const traverse = require("@babel/traverse").default
const t = require("@babel/types")

const code = `import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class Home extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    numbers: [1, 2, 3, 4, 5]
  }

  constructor () {
    super();
    this.a = {};
  }

  handleClick = () => {
    this.props.onTest()
  }

  render () {
    const oddNumbers = this.state.numbers.filter(number => number & 2)
    return (
      <ScrollView className='home' scrollTop={false}>
        奇数：
        {
          oddNumbers.map(number => <Text onClick={this.handleClick}>{number}</Text>)
        }
        偶数：
        {
          numbers.map(number => number % 2 === 0 && <Text onClick={this.handleClick}>{number}</Text>)
        }
      </ScrollView>
    )
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