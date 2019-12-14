
目录/文件 | 对应功能
config	| 配置模块
core	| 核心模块（申明过滤器、管道、拦截器、守卫、中间件、全局模块）
feature	| 特性模块（主要业务模块）
shared	| 共享模块（共享mongodb、redis封装服务、通用服务）
tools	| 工具（提供一些小工具函数）

参考：

https://github.com/lujakob/nestjs-realworld-example-app

# todo

- swagger
- exceptionfilter
- validation
- Jest 测试复杂的case
- cache

# done

- postman
- Logger
- ConfigService, dotenv decorator里面没有替换过来。 

https://dev.to/thisdotmedia/angular-and-the-rest-nest-js-and-jwt-dja

This object is annotated by validation decorators defined by class-validator and class-transformer libraries.




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};


  public addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(this.movieTrackerUrl, movie, httpOptions)
      .pipe(catchError(this.handleError));
  }

  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

  上面 T extends U ? X : Y 的形式为条件类型（Conditional Types），即，如果类型 T 能够赋值给类型 U，那么该表达式返回类型 X，否则返回类型 Y。