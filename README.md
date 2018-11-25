

# nodejs annotations

##Introduction
This liberary brings dependency injection to nodejs objects like it is common use in JAVA.
During my developments I was often using SPRING for such topics and I was wondering to bring a similiar functionality to NodeJS as well. 

Based on this experience this library was developed to aim SPRING like dependency injection for ESS6 objects.

The library is purely written in NodeJS and a supports object oriented development implemented with the following Javascript object types:
- Classes
- Prototyping
- Simple Javascript objects

Remark: The library is currently in BETA state. I recommend not to use it in your production development unless you are sure there are no security risks and a proper working is assured! In any case I cannot provide any support to your developments.


## Usage

###Annotations

Type | Annotation | Target | Description
---- | ---------- | ------ | -----------
**Instance** | | |
 | @Context | Class : Application context | Marks the application context. Can occur only once in an application and marks the root of this application
 | @Bean | Class : Simple bean object | Marks a class as a simple application bean 
 | @Component | Class : Simple component object | 
 | @Controller | Class : Marks a controller | 
 | @Service | Class : Marks a service | 
  | @Configuration | Class : Marks a configuration bean | 
 **Injection** | | |
 | @Inject | | 
 | @Qualifier | | 
 | @Store | | 
  **Inheritance** | | |
 | @Prototype | Class : Marks a prototype | This annotation is used to mark a prototype class which is used later to inherit concrete objects afterwards 
 | @Inherits | | 
  **AOP** | | |
 | @Aspect | |   
 | @PointCut | | 
 | @Before | | 
 | @After | |  



## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
