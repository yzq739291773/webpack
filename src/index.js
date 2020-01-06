document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
    func()
  })
})

// Prefetch 会等待核心代码加载完之后，有空闲之后再去加载。Preload 会和核心的代码并行加载，还是不推荐
