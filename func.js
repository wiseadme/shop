let p3 = new Promise((res, rej) => {
  res('B')
})

let p1 = new Promise((res, rej) => {
  res(p3)
})

let p2 = new Promise((res, rej) => {
  res('A')
})

p1.then(v => console.log(v))
p2.then(v => console.log(v))
