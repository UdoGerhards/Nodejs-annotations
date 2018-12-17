# DI-Annotations for NodeJS

## Introduction
This liberary brings dependency injection to nodejs objects like it is common use in JAVA.
During my developments I was often using SPRING for such topics and I was wondering to bring a similiar functionality to NodeJS as well. 

Based on this experience this library was developed to aim SPRING like dependency injection for ESS6 objects.

The library is purely written in NodeJS and supports object oriented development implemented with the following Javascript object types:
 - Classes
 - Prototyping
 - Simple Javascript objects

 **Remark**: The library is currently in **BETA state**. Due to this the code is under heavy change currently. Do not use it in your production development unless you are sure there are no security risks
 and a proper working is assured! In any case I cannot provide any support to your developments. 

## Usage

### Annotations

|             | Annotation    | Target               |       Syntax    | Description                                                                                                                                                                                                                                                                                    |
|-------------|---------------|----------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Instance**    |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Context       | Class                | _```@Context("ContextName")```_ | Marks the application context. Can occur only once in an application and marks the root of this application                                                                                                                                                                                    |
|             | Bean          | Class                | _```@Bean("BeanName")```_ | Marks a class as simple bean                                                                                                                                                                                                                                                                   |
|             | Component     | Class                | _```@Component("ComponentName")```_| Marks a class as simple component                                                                                                                                                                                                                                                              |
|             | Service       | Class                | _```@Service("ServiceName")```_| Marks a class as service                                                                                                                                                                                                                                                                       |
|             | Controller    | Class                | _```@Controller("ControllerName")```_| Marks a class as controller                                                                                                                                                                                                                                                                    |
|             | Configuration | Class                | _```@Configuration("ConfigurationName")```_ | Marks a class as configuration bean                                                                                                                                                                                                                                                            |
| **Injection**   |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Autowire      | Class                | _```@Autowire()```_| Marks a class as autowire target. The class will be examinated and properties which have the same name as a bean from the context will be used as injection target.                                                                                                                             |                                                                                                                                                                                                                                                                                         |
|             | Inject        | Property or Function | _```@Inject("...")```_| Injects a bean, component, service, controller or configuration                                                                                                                                                                                                                                |
|             | Qualifier     | Property or Function | _```@Qualifier("...")```_ | Injects a bean, component, service, controller or configuration                                                                                                                                                                                                                                |
|             | Store         | Property or Function | _```@Store("...")```_ | Used to inject a bean, component, controller or service. Can be used to add mulitple beans to a property. If the target property is of type array, beans are added as an array element, if the target property is of type object, beans are added with there bean or class name to the object. |
| **Inheritance** |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Prototype     | Class                | _```@Prototpye("PrototypeName")```_ | Marks a class as a prototype object which can be inherited by other objects.                                                                                                                                                                                                                   |
|             | Inherits      | Class                | _```@Inherits("PrototypeName")```_ | Inherits a prototype object. Supports multiple inheritance.                                                                                                                                                                                                                                    |
| **AOP**        |               |                 |                      |                                                                                                                                                                                                                                                                                             |
|             | Aspect        | Class                |_```@Aspect("AspectName")```_| Marks a class as aspect class which contains aop functions to be executed on dedicated point cuts                                                                                                                                                                                              |
|             | PointCut      | Class                |_```@PointCut("FunctionName")```_| Specifies a point cut for aop developing, matching functions over the whole application by a given search string. Wildcard is supported.                                                                                                                                                       |
|             | Before        | Property or Function |_```@Before()```_| Marks a function which will be executed before a PointCut-object                                                                                                                                                                                                                               |
|             | After         | Property or Function |_```@After()```_ | Marks a function which will be executed after a PointCut-object                                                                                                                                                                                                                                |
| **Meta**        |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Properties    |   Class              |_```@PointCut("[GlobPatern, [GLobPattern],[...]")```_| Scans for property-file(s) in a given directory. Supports glob parameters                                                                                                                                                                                                                      |
|             | Namespace     |   Class              |_```@Namespace([[namespace=...], [canonical=...])```_                | Generates a unique namespace for the marked bean.                                                                                                                                                                                                                                              |
| **Initialize**  |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Init          | Property or Function |_```@Init()```_| Marks an init-function which is used to initialize a bean                                                                                                                                                                                                                                      |
| **Run**         |               |                 |                      |                                                                                                                                                                                                                                                                                            |
|             | Run           | Property or Function |_```@Run()```_ | Marks an explizit run-function. Used for starting application with a dedicated method.                                                                                                                                                                                                         |



## How to use

### Include boostrap.js script in your app

Involve the lib into your index.js-file, setup the parameters and start the bootstrap-script:


```

... 
var bootstrap = require("nodejs-annotations")
    , express = require("express");
...

/**
 *
 * Define the starter script
 *
 */
class ContextStarter {

     init() {
         var instance = this;
         instance.server = express();
         instance._loadServer();
     }
     
     _loadServer(){
     
        var contextFolder = "/Users/xyz/Documents/<Project-folder>

        var contextInfo = {
           "scan": [
                  contextFolder
                 ],
                 ... 
           }
         };
     }


}

/**
 *  Boostrap the annotations context
 */
module.exports = exports = function() {
    var server = new ContextStarter();
    server.init();
}()

```

### bootstrap.js parameter

**scan**: A simple array with paths to scan for annotations,  
**externalContext**: A javascript object containing objects used as beans for injection. The object properties have to be of type function which return the dedicated obejct instance. This will enable the library to use them as normal context beans.
For e.g.:
```
 ...
 "externalContext": {
     // Bean "Domain"
     "Domain": {
          _instance: function () {
               return domainName;
            }
          },
      // Bean "Server"
      "Server": {
          _instance: function () {
               return server;
            }
          },
      // Bean "ServerConfig"
      "ServerConfig": {
          _instance: function () {
               return serverConfiguration
            }
          },
      // Bean "DomainConfig"
      'DomainConfig': {
          _instance: function() {
               return domainConfiguration;
             }
          }
  }
 ```
 
## Visualization of your context

The library provides also the possiblity to visualize your application context but this feature is currently under development and not ready for use at the moment. 

## Remark

The project is under heavy development currently! Contents and functionality might change! Due to this the lib should not be used in projects other than development!

## Further documentation

Please have a look at the provided tests to see how to use the different annotations. The ["resource/annotations"](https://github.com/UdoGerhards/DIAnnotations/tree/master/test/resources/annotations) and the ["resources/projects"](https://github.com/UdoGerhards/DIAnnotations/tree/master/test/resources/projects) folders contain according examples.
