# Nodejs annotations

##Introduction
This liberary brings dependency injection to nodejs objects like it is common use in JAVA.
During my developments I was often using SPRING for such topics and I was wondering to bring a similiar functionality to NodeJS as well. 

Based on this experience this library was developed to aim SPRING like dependency injection for ESS6 objects.

The library is purely written in NodeJS and a supports object oriented development implemented with the following Javascript object types:
 - Classes
 - Prototyping
 - Simple Javascript objects

 Remark: The library is currently in **BETA state**. Do not use it in your production development unless you are sure there are no security risks
 and a proper working is assured! In any case I cannot provide any support to your developments.

## Usage

###Annotations

|             | Annotation    | Target               | Description                                                                                                                                                                                                                                                                                    |
|-------------|---------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Instance**    |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Context       | Class                | Marks the application context. Can occur only once in an application and marks the root of this application                                                                                                                                                                                    |
|             | Bean          | Class                | Marks a class as simple bean                                                                                                                                                                                                                                                                   |
|             | Component     | Class                | Marks a class as simple component                                                                                                                                                                                                                                                              |
|             | Service       | Class                | Marks a class as service                                                                                                                                                                                                                                                                       |
|             | Controller    | Class                | Marks a class as controller                                                                                                                                                                                                                                                                    |
|             | Configuration | Class                | Marks a class as configuration bean                                                                                                                                                                                                                                                            |
| **Injection**   |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Inject        | Property or Function | Injects a bean, component, service, controller or configuration                                                                                                                                                                                                                                |
|             | Qualifier     | Property or Function | Injects a bean, component, service, controller or configuration                                                                                                                                                                                                                                |
|             | Store         | Property or Function | Used to inject a bean, component, controller or service. Can be used to add mulitple beans to a property. If the target property is of type array, beans are added as an array element, if the target property is of type object, beans are added with there bean or class name to the object. |
| **Inheritance** |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Prototype     | Class                | Marks a class as a prototype object which can be inherited by other objects.                                                                                                                                                                                                                   |
|             | Inherits      | Class                | Inherits a prototype object. Supports multiple inheritance.                                                                                                                                                                                                                                    |
| **AOP**        |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Aspect        | Class                | Marks a class as aspect class which contains aop functions to be executed on dedicated point cuts                                                                                                                                                                                              |
|             | PointCut      | Class                | Specifies a point cut for aop developing, matching functions over the whole application by a given search string. Wildcard is supported.                                                                                                                                                       |
|             | Before        | Property or Function | Marks a function which will be executed before a PointCut-object                                                                                                                                                                                                                               |
|             | After         | Property or Function | Marks a function which will be executed after a PointCut-object                                                                                                                                                                                                                                |
| **Meta**        |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Properties    |   Class              | Scans for property-file(s) in a given directory. Supports glob parameters                                                                                                                                                                                                                      |
|             | Namespace     |   Class              | Generates a unique namespace for the marked bean.                                                                                                                                                                                                                                              |
| **Initialize**  |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Init          | Property or Function | Marks an init-function which is used to initialize a bean                                                                                                                                                                                                                                      |
| **Run**         |               |                      |                                                                                                                                                                                                                                                                                                |
|             | Run           | Property or Function | Marks an explizit run-function. Used for starting application with a dedicated method.                                                                                                                                                                                                         |
                                                                                                                                                                                                                                                                                               |


## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
