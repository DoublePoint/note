/* source:
 /a/b/c/d/e
 /a/b/e/f/g
 /a/b/h
 /a/i/j
 /a/i/k

result:
       a
     /   \
    b     i
   /|\   / \
  c e h j   k
  | |
  d f
  | |
  e g
*/

// const baseData = ['a/b/c/d/e', 'a/b/e/f/g', 'a/b/h', 'a/i/j', 'a/i/k']

// export default function (baseData) {
//   const treeDTO = []
//   baseData.forEach((item) => {
//     let path = item.path
//     const nodeArray = path.split('/')
//     let children = treeDTO
//     // 循环构建子节点
//     let index = 0
//     for (const i of nodeArray) {
//       const node = {
//         label: i,
//         name: i,
//         id: i,
//         path: i,
//         gitpath: nodeArray.splice(0, index + 1).join('/'),
//         hidden: false,
//         redirect: 'noRedirect',
//         component: 'Layout',
//         alwaysShow: true,
//         meta: {
//           title: i,
//           icon: 'folder-close',
//           noCache: false,
//           link: null,
//         },
//       }
//       if (children.length === 0) {
//         children.push(node)
//       }
//       let isExist = false
//       for (const j in children) {
//         if (children[j].label === node.label) {
//           if (!children[j].children) {
//             children[j].children = []
//           }
//           children = children[j].children
//           isExist = true
//           break
//         }
//       }
//       if (!isExist) {
//         children.push(node)
//         if (!children[children.length - 1].children) {
//           children[children.length - 1].children = []
//         }
//         children = children[children.length - 1].children
//       }

//       index++
//     }
//   })
//   return treeDTO
// }

// var data = [
//     'LICENSE',
//     'README.md',
//     'app',
//     'app/.npmrc',
//     'app/src/ask-pass1',
//     'app/.yarnrc',
//     'app/app-info.ts',
//     'app/git-info.ts',
//     'app/package-info.ts',
//     'app/package.json',
//     'app/src',
//     'app/src/ask-pass',
//     'app/src/ask-pass/ask-pass.ts',
//     'app/src/ask-pass/main.ts',
//   ],

export default function (data) {
  let result = {}
  data.forEach((p) => {
    p = p.path
    return p.split('/').reduce((o, k) => {
      o.children = o.children || []

      let children = o.children
      let item = children.find((a) => {
        return a.path == k
      })

      if (item == undefined) {
        let curObj = {
          label: k,
          children: [],
          label: k,
          name: k,
          id: k,
          title: k,
          path: k,
          parentPath: o.path || '',
          gitpath: (o.gitpath || '') + '/' + k,
          hidden: false,
          redirect: 'noRedirect',
          component: 'Layout',
          alwaysShow: false,
          meta: {
            title: k,
            icon: 'file-fill',
            noCache: false,
            link: null,
          },
        }
        children.push(curObj)
        return curObj
      } else {
        return item
      }
    }, result)
  })
  return result.children
}

// console.log(result)
