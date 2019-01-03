var data={
    "appName": "HostManager",
    "objectModel": [
        {
            "key": "SecurityCheck",
            "name": "SecurityCheck",
            "type": "Service",
            "properties": [
                {
                    "name": "authenticationManager",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "securityCheck",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "SecurityCheck.js"
        },
        {
            "key": "BasicStrategy",
            "name": "BasicStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "basicStrategy",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "BasicStrategy.js"
        },
        {
            "key": "LocalStrategy",
            "name": "LocalStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "localStrategy",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "localStrategy",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "LocalStrategy.js"
        },
        {
            "key": "AuthenticationManager",
            "name": "AuthenticationManager",
            "type": "Service",
            "properties": [
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "strategies",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "realms",
                    "visibility": "public"
                },
                {
                    "name": "authenticationEndpoints",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getAuthentications",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "intitializeAuthentication",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "AuthenticationManager.js"
        },
        {
            "key": "NodeCMS",
            "name": "NodeCMS",
            "type": "Component",
            "properties": [
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "loadExtensionConfiguration",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "NodeCMSCoreDependency",
            "name": "NodeCMSCoreDependency",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "NodeCMSCorePackageInfo",
            "name": "NodeCMSCorePackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "license",
                    "visibility": "public"
                },
                {
                    "name": "author",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "devDependencies",
                    "visibility": "public"
                },
                {
                    "name": "gitHead",
                    "visibility": "public"
                },
                {
                    "name": "keywords",
                    "visibility": "public"
                },
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "main",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "optionalDependencies",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "repository",
                    "visibility": "public"
                },
                {
                    "name": "scripts",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "moduleDirectory",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "NodeCMSCoreConfiguration",
            "name": "NodeCMSCoreConfiguration",
            "type": "Bean",
            "properties": [
                {
                    "name": "DomainManagerRequestFacade",
                    "visibility": "public"
                },
                {
                    "name": "PageManagerRequestFacade",
                    "visibility": "public"
                },
                {
                    "name": "ContentManagerRequestFacade",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "HookManager",
            "name": "HookManager",
            "type": "Service",
            "properties": [
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "HookManager.js"
        },
        {
            "key": "HostManager",
            "name": "HostManager",
            "type": "Context",
            "properties": [
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "applicationFoundation",
                    "visibility": "public"
                },
                {
                    "name": "server",
                    "visibility": "public"
                },
                {
                    "name": "domain",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "fs",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "log4js",
                    "visibility": "public"
                },
                {
                    "name": "domainManagerRequestFacade",
                    "visibility": "public"
                },
                {
                    "name": "express",
                    "visibility": "public"
                },
                {
                    "name": "vhost",
                    "visibility": "public"
                },
                {
                    "name": "layoutManager",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "domainManager",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "serverConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "templateManager",
                    "visibility": "public"
                },
                {
                    "name": "authenticationManager",
                    "visibility": "public"
                },
                {
                    "name": "application",
                    "visibility": "public"
                },
                {
                    "name": "configurators",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "createVirtualHost",
                    "visibility": "public"
                },
                {
                    "name": "createVirtualHostConfigruation",
                    "visibility": "public"
                },
                {
                    "name": "express",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "initStaticRoutes",
                    "visibility": "public"
                },
                {
                    "name": "initVirtualHost",
                    "visibility": "public"
                },
                {
                    "name": "process",
                    "visibility": "public"
                },
                {
                    "name": "registerVhost",
                    "visibility": "public"
                },
                {
                    "name": "server",
                    "visibility": "public"
                },
                {
                    "name": "vhost",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "HostManager.js"
        },
        {
            "key": "PageManager",
            "name": "PageManager",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "getPage",
                    "visibility": "public"
                },
                {
                    "name": "getPageById",
                    "visibility": "public"
                },
                {
                    "name": "getPageRootUp",
                    "visibility": "public"
                },
                {
                    "name": "getPageTreeDown",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "_cacheByDomainAndPage",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "PageManager.js"
        },
        {
            "key": "FileManager",
            "name": "FileManager",
            "type": "Service",
            "properties": [
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "fs",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "readChunk",
                    "visibility": "public"
                },
                {
                    "name": "fileType",
                    "visibility": "public"
                },
                {
                    "name": "allowed",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "wildString",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "readChunk",
                    "visibility": "public"
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "domainRoot",
                    "visibility": "public"
                },
                {
                    "name": "ensureSymlink",
                    "visibility": "public"
                },
                {
                    "name": "fileType",
                    "visibility": "public"
                },
                {
                    "name": "filterDir",
                    "visibility": "public"
                },
                {
                    "name": "getAppRoot",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "isAccessible",
                    "visibility": "public"
                },
                {
                    "name": "isFile",
                    "visibility": "public"
                },
                {
                    "name": "isFolder",
                    "visibility": "public"
                },
                {
                    "name": "listDir",
                    "visibility": "public"
                },
                {
                    "name": "copy",
                    "visibility": "public"
                },
                {
                    "name": "readConfigFile",
                    "visibility": "public"
                },
                {
                    "name": "readDir",
                    "visibility": "public"
                },
                {
                    "name": "readFile",
                    "visibility": "public"
                },
                {
                    "name": "readFileAsync",
                    "visibility": "public"
                },
                {
                    "name": "readJson",
                    "visibility": "public"
                },
                {
                    "name": "scanAndRequire",
                    "visibility": "public"
                },
                {
                    "name": "stat",
                    "visibility": "public"
                },
                {
                    "name": "staticDirectory",
                    "visibility": "public"
                },
                {
                    "name": "templatesDirectory",
                    "visibility": "public"
                },
                {
                    "name": "writeFile",
                    "visibility": "public"
                },
                {
                    "name": "writeFileAsync",
                    "visibility": "public"
                },
                {
                    "name": "writeJson",
                    "visibility": "public"
                },
                {
                    "name": "_checkIfAllowed",
                    "visibility": "private"
                },
                {
                    "name": "_detectFileType",
                    "visibility": "private"
                },
                {
                    "name": "_exists",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "file-manager.js"
        },
        {
            "key": "Coreconfiguration",
            "name": "Coreconfiguration",
            "type": "Configuration",
            "properties": [
                {
                    "name": "appDir",
                    "visibility": "public"
                },
                {
                    "name": "appConf",
                    "visibility": "public"
                },
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "log4js",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "traverse",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "appConf",
                    "visibility": "public"
                },
                {
                    "name": "appDir",
                    "visibility": "public"
                },
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "log4js",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "traverse",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "AppDir",
            "name": "AppDir",
            "type": "Bean",
            "properties": [
                {
                    "name": "root",
                    "visibility": "public"
                },
                {
                    "name": "config",
                    "visibility": "public"
                },
                {
                    "name": "group_regex",
                    "visibility": "public"
                },
                {
                    "name": "group",
                    "visibility": "public"
                },
                {
                    "name": "domainRoot",
                    "visibility": "public"
                },
                {
                    "name": "AppDir",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "AppConf",
            "name": "AppConf",
            "type": "Bean",
            "properties": [
                {
                    "name": "extensions",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "DotObject",
            "name": "DotObject",
            "type": "Bean",
            "properties": [
                {
                    "name": "str",
                    "visibility": "public"
                },
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                },
                {
                    "name": "pick",
                    "visibility": "public"
                },
                {
                    "name": "move",
                    "visibility": "public"
                },
                {
                    "name": "transfer",
                    "visibility": "public"
                },
                {
                    "name": "transform",
                    "visibility": "public"
                },
                {
                    "name": "copy",
                    "visibility": "public"
                },
                {
                    "name": "object",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "set",
                    "visibility": "public"
                },
                {
                    "name": "remove",
                    "visibility": "public"
                },
                {
                    "name": "del",
                    "visibility": "public"
                },
                {
                    "name": "dot",
                    "visibility": "public"
                },
                {
                    "name": "override",
                    "visibility": "public"
                },
                {
                    "name": "overwrite",
                    "visibility": "public"
                },
                {
                    "name": "useArray",
                    "visibility": "public"
                },
                {
                    "name": "keepArray",
                    "visibility": "public"
                },
                {
                    "name": "_process",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "object",
                    "visibility": "public"
                },
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                },
                {
                    "name": "copy",
                    "visibility": "public"
                },
                {
                    "name": "del",
                    "visibility": "public"
                },
                {
                    "name": "dot",
                    "visibility": "public"
                },
                {
                    "name": "move",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "pick",
                    "visibility": "public"
                },
                {
                    "name": "remove",
                    "visibility": "public"
                },
                {
                    "name": "set",
                    "visibility": "public"
                },
                {
                    "name": "str",
                    "visibility": "public"
                },
                {
                    "name": "transfer",
                    "visibility": "public"
                },
                {
                    "name": "transform",
                    "visibility": "public"
                },
                {
                    "name": "_process",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Logger",
            "name": "Logger",
            "type": "Bean",
            "properties": [
                {
                    "name": "category",
                    "visibility": "public"
                },
                {
                    "name": "level",
                    "visibility": "public"
                },
                {
                    "name": "_events",
                    "visibility": "private"
                },
                {
                    "name": "_eventsCount",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "isWarnEnabled",
                    "visibility": "public"
                },
                {
                    "name": "addListener",
                    "visibility": "public"
                },
                {
                    "name": "emit",
                    "visibility": "public"
                },
                {
                    "name": "error",
                    "visibility": "public"
                },
                {
                    "name": "eventNames",
                    "visibility": "public"
                },
                {
                    "name": "fatal",
                    "visibility": "public"
                },
                {
                    "name": "getMaxListeners",
                    "visibility": "public"
                },
                {
                    "name": "info",
                    "visibility": "public"
                },
                {
                    "name": "isDebugEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isErrorEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isFatalEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isInfoEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isLevelEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isMarkEnabled",
                    "visibility": "public"
                },
                {
                    "name": "isTraceEnabled",
                    "visibility": "public"
                },
                {
                    "name": "debug",
                    "visibility": "public"
                },
                {
                    "name": "listenerCount",
                    "visibility": "public"
                },
                {
                    "name": "listeners",
                    "visibility": "public"
                },
                {
                    "name": "log",
                    "visibility": "public"
                },
                {
                    "name": "mark",
                    "visibility": "public"
                },
                {
                    "name": "on",
                    "visibility": "public"
                },
                {
                    "name": "once",
                    "visibility": "public"
                },
                {
                    "name": "prependListener",
                    "visibility": "public"
                },
                {
                    "name": "prependOnceListener",
                    "visibility": "public"
                },
                {
                    "name": "removeAllListeners",
                    "visibility": "public"
                },
                {
                    "name": "removeLevel",
                    "visibility": "public"
                },
                {
                    "name": "removeListener",
                    "visibility": "public"
                },
                {
                    "name": "setLevel",
                    "visibility": "public"
                },
                {
                    "name": "setMaxListeners",
                    "visibility": "public"
                },
                {
                    "name": "trace",
                    "visibility": "public"
                },
                {
                    "name": "warn",
                    "visibility": "public"
                },
                {
                    "name": "_log",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "Log4js",
            "name": "Log4js",
            "type": "Bean",
            "properties": [
                {
                    "name": "shutdown",
                    "visibility": "public"
                },
                {
                    "name": "getBufferedLogger",
                    "visibility": "public"
                },
                {
                    "name": "getDefaultLogger",
                    "visibility": "public"
                },
                {
                    "name": "hasLogger",
                    "visibility": "public"
                },
                {
                    "name": "addAppender",
                    "visibility": "public"
                },
                {
                    "name": "loadAppender",
                    "visibility": "public"
                },
                {
                    "name": "clearAppenders",
                    "visibility": "public"
                },
                {
                    "name": "configure",
                    "visibility": "public"
                },
                {
                    "name": "getLogger",
                    "visibility": "public"
                },
                {
                    "name": "replaceConsole",
                    "visibility": "public"
                },
                {
                    "name": "restoreConsole",
                    "visibility": "public"
                },
                {
                    "name": "levels",
                    "visibility": "public"
                },
                {
                    "name": "setGlobalLogLevel",
                    "visibility": "public"
                },
                {
                    "name": "layouts",
                    "visibility": "public"
                },
                {
                    "name": "appenders",
                    "visibility": "public"
                },
                {
                    "name": "appenderMakers",
                    "visibility": "public"
                },
                {
                    "name": "connectLogger",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "getLogger",
                    "visibility": "public"
                },
                {
                    "name": "addAppender",
                    "visibility": "public"
                },
                {
                    "name": "configure",
                    "visibility": "public"
                },
                {
                    "name": "connectLogger",
                    "visibility": "public"
                },
                {
                    "name": "getBufferedLogger",
                    "visibility": "public"
                },
                {
                    "name": "getDefaultLogger",
                    "visibility": "public"
                },
                {
                    "name": "clearAppenders",
                    "visibility": "public"
                },
                {
                    "name": "hasLogger",
                    "visibility": "public"
                },
                {
                    "name": "loadAppender",
                    "visibility": "public"
                },
                {
                    "name": "replaceConsole",
                    "visibility": "public"
                },
                {
                    "name": "restoreConsole",
                    "visibility": "public"
                },
                {
                    "name": "setGlobalLogLevel",
                    "visibility": "public"
                },
                {
                    "name": "shutdown",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "Validator",
            "name": "Validator",
            "type": "Bean",
            "properties": [
                {
                    "name": "isNull",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "extend",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isServerSide",
                    "visibility": "public"
                },
                {
                    "name": "deprecation",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "toDate",
                    "visibility": "public"
                },
                {
                    "name": "toFloat",
                    "visibility": "public"
                },
                {
                    "name": "toInt",
                    "visibility": "public"
                },
                {
                    "name": "toBoolean",
                    "visibility": "public"
                },
                {
                    "name": "equals",
                    "visibility": "public"
                },
                {
                    "name": "contains",
                    "visibility": "public"
                },
                {
                    "name": "matches",
                    "visibility": "public"
                },
                {
                    "name": "isEmail",
                    "visibility": "public"
                },
                {
                    "name": "isURL",
                    "visibility": "public"
                },
                {
                    "name": "isMACAddress",
                    "visibility": "public"
                },
                {
                    "name": "isIP",
                    "visibility": "public"
                },
                {
                    "name": "isFQDN",
                    "visibility": "public"
                },
                {
                    "name": "isBoolean",
                    "visibility": "public"
                },
                {
                    "name": "isAlpha",
                    "visibility": "public"
                },
                {
                    "name": "isAlphanumeric",
                    "visibility": "public"
                },
                {
                    "name": "isNumeric",
                    "visibility": "public"
                },
                {
                    "name": "isDecimal",
                    "visibility": "public"
                },
                {
                    "name": "isHexadecimal",
                    "visibility": "public"
                },
                {
                    "name": "isHexColor",
                    "visibility": "public"
                },
                {
                    "name": "isLowercase",
                    "visibility": "public"
                },
                {
                    "name": "isUppercase",
                    "visibility": "public"
                },
                {
                    "name": "isInt",
                    "visibility": "public"
                },
                {
                    "name": "isFloat",
                    "visibility": "public"
                },
                {
                    "name": "isDivisibleBy",
                    "visibility": "public"
                },
                {
                    "name": "coerce",
                    "visibility": "public"
                },
                {
                    "name": "isLength",
                    "visibility": "public"
                },
                {
                    "name": "isByteLength",
                    "visibility": "public"
                },
                {
                    "name": "isUUID",
                    "visibility": "public"
                },
                {
                    "name": "isDate",
                    "visibility": "public"
                },
                {
                    "name": "isAfter",
                    "visibility": "public"
                },
                {
                    "name": "isBefore",
                    "visibility": "public"
                },
                {
                    "name": "isIn",
                    "visibility": "public"
                },
                {
                    "name": "isWhitelisted",
                    "visibility": "public"
                },
                {
                    "name": "isCreditCard",
                    "visibility": "public"
                },
                {
                    "name": "isISIN",
                    "visibility": "public"
                },
                {
                    "name": "isISBN",
                    "visibility": "public"
                },
                {
                    "name": "isMobilePhone",
                    "visibility": "public"
                },
                {
                    "name": "isCurrency",
                    "visibility": "public"
                },
                {
                    "name": "isJSON",
                    "visibility": "public"
                },
                {
                    "name": "isMultibyte",
                    "visibility": "public"
                },
                {
                    "name": "isAscii",
                    "visibility": "public"
                },
                {
                    "name": "isFullWidth",
                    "visibility": "public"
                },
                {
                    "name": "isHalfWidth",
                    "visibility": "public"
                },
                {
                    "name": "isVariableWidth",
                    "visibility": "public"
                },
                {
                    "name": "isSurrogatePair",
                    "visibility": "public"
                },
                {
                    "name": "isBase64",
                    "visibility": "public"
                },
                {
                    "name": "isMongoId",
                    "visibility": "public"
                },
                {
                    "name": "isISO8601",
                    "visibility": "public"
                },
                {
                    "name": "ltrim",
                    "visibility": "public"
                },
                {
                    "name": "rtrim",
                    "visibility": "public"
                },
                {
                    "name": "trim",
                    "visibility": "public"
                },
                {
                    "name": "escape",
                    "visibility": "public"
                },
                {
                    "name": "stripLow",
                    "visibility": "public"
                },
                {
                    "name": "whitelist",
                    "visibility": "public"
                },
                {
                    "name": "blacklist",
                    "visibility": "public"
                },
                {
                    "name": "normalizeEmail",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "isISO8601",
                    "visibility": "public"
                },
                {
                    "name": "blacklist",
                    "visibility": "public"
                },
                {
                    "name": "deprecation",
                    "visibility": "public"
                },
                {
                    "name": "equals",
                    "visibility": "public"
                },
                {
                    "name": "escape",
                    "visibility": "public"
                },
                {
                    "name": "extend",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "isAfter",
                    "visibility": "public"
                },
                {
                    "name": "isAlpha",
                    "visibility": "public"
                },
                {
                    "name": "isAlphanumeric",
                    "visibility": "public"
                },
                {
                    "name": "isAscii",
                    "visibility": "public"
                },
                {
                    "name": "isBase64",
                    "visibility": "public"
                },
                {
                    "name": "isBefore",
                    "visibility": "public"
                },
                {
                    "name": "isBoolean",
                    "visibility": "public"
                },
                {
                    "name": "isByteLength",
                    "visibility": "public"
                },
                {
                    "name": "isCreditCard",
                    "visibility": "public"
                },
                {
                    "name": "isCurrency",
                    "visibility": "public"
                },
                {
                    "name": "isDate",
                    "visibility": "public"
                },
                {
                    "name": "isDecimal",
                    "visibility": "public"
                },
                {
                    "name": "isDivisibleBy",
                    "visibility": "public"
                },
                {
                    "name": "isEmail",
                    "visibility": "public"
                },
                {
                    "name": "isFQDN",
                    "visibility": "public"
                },
                {
                    "name": "isFloat",
                    "visibility": "public"
                },
                {
                    "name": "isFullWidth",
                    "visibility": "public"
                },
                {
                    "name": "isHalfWidth",
                    "visibility": "public"
                },
                {
                    "name": "isHexColor",
                    "visibility": "public"
                },
                {
                    "name": "isHexadecimal",
                    "visibility": "public"
                },
                {
                    "name": "isIP",
                    "visibility": "public"
                },
                {
                    "name": "isISBN",
                    "visibility": "public"
                },
                {
                    "name": "isISIN",
                    "visibility": "public"
                },
                {
                    "name": "contains",
                    "visibility": "public"
                },
                {
                    "name": "isIn",
                    "visibility": "public"
                },
                {
                    "name": "isInt",
                    "visibility": "public"
                },
                {
                    "name": "isJSON",
                    "visibility": "public"
                },
                {
                    "name": "isLength",
                    "visibility": "public"
                },
                {
                    "name": "isLowercase",
                    "visibility": "public"
                },
                {
                    "name": "isMACAddress",
                    "visibility": "public"
                },
                {
                    "name": "isMobilePhone",
                    "visibility": "public"
                },
                {
                    "name": "isMongoId",
                    "visibility": "public"
                },
                {
                    "name": "isMultibyte",
                    "visibility": "public"
                },
                {
                    "name": "isNull",
                    "visibility": "public"
                },
                {
                    "name": "isNumeric",
                    "visibility": "public"
                },
                {
                    "name": "isServerSide",
                    "visibility": "public"
                },
                {
                    "name": "isSurrogatePair",
                    "visibility": "public"
                },
                {
                    "name": "isURL",
                    "visibility": "public"
                },
                {
                    "name": "isUUID",
                    "visibility": "public"
                },
                {
                    "name": "isUppercase",
                    "visibility": "public"
                },
                {
                    "name": "isVariableWidth",
                    "visibility": "public"
                },
                {
                    "name": "isWhitelisted",
                    "visibility": "public"
                },
                {
                    "name": "ltrim",
                    "visibility": "public"
                },
                {
                    "name": "matches",
                    "visibility": "public"
                },
                {
                    "name": "normalizeEmail",
                    "visibility": "public"
                },
                {
                    "name": "rtrim",
                    "visibility": "public"
                },
                {
                    "name": "stripLow",
                    "visibility": "public"
                },
                {
                    "name": "toBoolean",
                    "visibility": "public"
                },
                {
                    "name": "toDate",
                    "visibility": "public"
                },
                {
                    "name": "toFloat",
                    "visibility": "public"
                },
                {
                    "name": "toInt",
                    "visibility": "public"
                },
                {
                    "name": "trim",
                    "visibility": "public"
                },
                {
                    "name": "whitelist",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "Traverse",
            "name": "Traverse",
            "type": "Bean",
            "properties": [
                {
                    "name": "set",
                    "visibility": "public"
                },
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "arguments",
                    "visibility": "public"
                },
                {
                    "name": "caller",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "has",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "map",
                    "visibility": "public"
                },
                {
                    "name": "forEach",
                    "visibility": "public"
                },
                {
                    "name": "reduce",
                    "visibility": "public"
                },
                {
                    "name": "paths",
                    "visibility": "public"
                },
                {
                    "name": "nodes",
                    "visibility": "public"
                },
                {
                    "name": "clone",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "has",
                    "visibility": "public"
                },
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                },
                {
                    "name": "clone",
                    "visibility": "public"
                },
                {
                    "name": "forEach",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "map",
                    "visibility": "public"
                },
                {
                    "name": "nodes",
                    "visibility": "public"
                },
                {
                    "name": "paths",
                    "visibility": "public"
                },
                {
                    "name": "reduce",
                    "visibility": "public"
                },
                {
                    "name": "set",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "configuration.js"
        },
        {
            "key": "DomainManager",
            "name": "DomainManager",
            "type": "Service",
            "properties": [
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "getAllByType",
                    "visibility": "public"
                },
                {
                    "name": "getDomain",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "_cacheDomain",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "DomainManager.js"
        },
        {
            "key": "ImportManager",
            "name": "ImportManager",
            "type": "Service",
            "properties": [
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "traverse",
                    "visibility": "public"
                },
                {
                    "name": "saveOrder",
                    "visibility": "public"
                },
                {
                    "name": "appDir",
                    "visibility": "public"
                },
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "hostManager",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "process",
                    "visibility": "public"
                },
                {
                    "name": "traverse",
                    "visibility": "public"
                },
                {
                    "name": "_deserializeObject",
                    "visibility": "private"
                },
                {
                    "name": "_getBluePrintsPerType",
                    "visibility": "private"
                },
                {
                    "name": "_getIdsPerType",
                    "visibility": "private"
                },
                {
                    "name": "_processStaticContent",
                    "visibility": "private"
                },
                {
                    "name": "_processWebsite",
                    "visibility": "private"
                },
                {
                    "name": "_serializeObject",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "ImportManager.js"
        },
        {
            "key": "ContentManager",
            "name": "ContentManager",
            "type": "Service",
            "properties": [
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "watchObject",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "contentTransformer",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "asyncWatch",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "getContentElements",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "ContentManager.js"
        },
        {
            "key": "RenderingManager",
            "name": "RenderingManager",
            "type": "Service",
            "properties": [
                {
                    "name": "minify",
                    "visibility": "public"
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "layoutManager",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "render",
                    "visibility": "public"
                },
                {
                    "name": "_getRenderedCols",
                    "visibility": "private"
                },
                {
                    "name": "_renderElements",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "RenderingManager.js"
        },
        {
            "key": "ConfigurationManager",
            "name": "ConfigurationManager",
            "type": "Service",
            "properties": [
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "configurationFile",
                    "visibility": "public"
                },
                {
                    "name": "appDir",
                    "visibility": "public"
                },
                {
                    "name": "configuration",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getVhostConfigForDomain",
                    "visibility": "public"
                },
                {
                    "name": "addExtension",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "getActiveExtensions",
                    "visibility": "public"
                },
                {
                    "name": "getExtensionCategories",
                    "visibility": "public"
                },
                {
                    "name": "getExtensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "getSection",
                    "visibility": "public"
                },
                {
                    "name": "getVhostConfig",
                    "visibility": "public"
                },
                {
                    "name": "addExtensionConfig",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "loadConfiguration",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "removeExtension",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "setVhostConfig",
                    "visibility": "public"
                },
                {
                    "name": "writeConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "writeSection",
                    "visibility": "public"
                },
                {
                    "name": "writeVhostConfiguration",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "configurationManagerMock.js"
        },
        {
            "key": "PageManagerRequestFacade",
            "name": "PageManagerRequestFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "manager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getPage",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSPageManagerRequestFacade.js"
        },
        {
            "key": "DomainManagerRequestFacade",
            "name": "DomainManagerRequestFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "manager",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getDomain",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSDomainManagerRequestFacade.js"
        },
        {
            "key": "ContentManagerRequestFacade",
            "name": "ContentManagerRequestFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "manager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getContent",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSContentManagerRequestFacade.js"
        },
        {
            "key": "RenderingManagerRequestFacade",
            "name": "RenderingManagerRequestFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "manager",
                    "visibility": "public"
                },
                {
                    "name": "minify",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "render",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSRenderingManagerRequestFacade.js"
        },
        {
            "key": "FaviconConfigurator",
            "name": "FaviconConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "favicon",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "applicationFoundation",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "favicon",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSFaviconConfigurator.js"
        },
        {
            "key": "SessionConfigurator",
            "name": "SessionConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "locale",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "locale",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSLanguageConfigurator.js"
        },
        {
            "key": "BodyParserConfigurator",
            "name": "BodyParserConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "bodyParser",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "bodyParser",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSBodyParserConfigurator.js"
        },
        {
            "key": "CompressionConfigurator",
            "name": "CompressionConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "compress",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "compress",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSCompressionConfigurator.js"
        },
        {
            "key": "CookieParserConfigurator",
            "name": "CookieParserConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "cookieParser",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "cookieParser",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSCookieParserConfigurator.js"
        },
        {
            "key": "ErrorHandlerConfigurator",
            "name": "ErrorHandlerConfigurator",
            "type": "Service",
            "properties": [
                {
                    "name": "virtualHostGenerator",
                    "visibility": "public"
                },
                {
                    "name": "favicon",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "errorHandler",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "errorHandler",
                    "visibility": "public"
                },
                {
                    "name": "favicon",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "setConfigurationToVhost",
                    "visibility": "public",
                    "parameters": []
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSErrorHandlerConfigurator.js"
        },
        {
            "key": "NodeCMSRedisCacheManager",
            "name": "NodeCMSRedisCacheManager",
            "type": "Component",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "redisServer",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "redisServer",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "NodeCMSRedisCacheManagerBeans",
            "name": "NodeCMSRedisCacheManagerBeans",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "redis",
                    "visibility": "public"
                },
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "redisServer",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "redis",
                    "visibility": "public"
                },
                {
                    "name": "redisServer",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "RedisCachePackageInfo",
            "name": "RedisCachePackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "license",
                    "visibility": "public"
                },
                {
                    "name": "author",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "devDependencies",
                    "visibility": "public"
                },
                {
                    "name": "gitHead",
                    "visibility": "public"
                },
                {
                    "name": "homepage",
                    "visibility": "public"
                },
                {
                    "name": "keywords",
                    "visibility": "public"
                },
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "nodeCMS_category",
                    "visibility": "public"
                },
                {
                    "name": "optionalDependencies",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "private",
                    "visibility": "public"
                },
                {
                    "name": "repository",
                    "visibility": "public"
                },
                {
                    "name": "scripts",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "RedisCacheExtensionConfiguration",
            "name": "RedisCacheExtensionConfiguration",
            "type": "Bean",
            "properties": [
                {
                    "name": "redis",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Redis",
            "name": "Redis",
            "type": "Bean",
            "properties": [
                {
                    "name": "AbortError",
                    "visibility": "public"
                },
                {
                    "name": "debug_mode",
                    "visibility": "public"
                },
                {
                    "name": "createClient",
                    "visibility": "public"
                },
                {
                    "name": "RedisClient",
                    "visibility": "public"
                },
                {
                    "name": "print",
                    "visibility": "public"
                },
                {
                    "name": "Multi",
                    "visibility": "public"
                },
                {
                    "name": "debugMode",
                    "visibility": "public"
                },
                {
                    "name": "RedisError",
                    "visibility": "public"
                },
                {
                    "name": "ParserError",
                    "visibility": "public"
                },
                {
                    "name": "ReplyError",
                    "visibility": "public"
                },
                {
                    "name": "AggregateError",
                    "visibility": "public"
                },
                {
                    "name": "add_command",
                    "visibility": "public"
                },
                {
                    "name": "addCommand",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "RedisError",
                    "visibility": "public"
                },
                {
                    "name": "AbortError",
                    "visibility": "public"
                },
                {
                    "name": "Multi",
                    "visibility": "public"
                },
                {
                    "name": "ParserError",
                    "visibility": "public"
                },
                {
                    "name": "RedisClient",
                    "visibility": "public"
                },
                {
                    "name": "AggregateError",
                    "visibility": "public"
                },
                {
                    "name": "ReplyError",
                    "visibility": "public"
                },
                {
                    "name": "addCommand",
                    "visibility": "public"
                },
                {
                    "name": "add_command",
                    "visibility": "public"
                },
                {
                    "name": "createClient",
                    "visibility": "public"
                },
                {
                    "name": "print",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "RedisServer",
            "name": "RedisServer",
            "type": "Bean",
            "properties": [
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                },
                {
                    "name": "parseConfig",
                    "visibility": "public"
                },
                {
                    "name": "parseFlags",
                    "visibility": "public"
                },
                {
                    "name": "parseData",
                    "visibility": "public"
                },
                {
                    "name": "open",
                    "visibility": "public"
                },
                {
                    "name": "close",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "EventEmitter",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                },
                {
                    "name": "close",
                    "visibility": "public"
                },
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "listenerCount",
                    "visibility": "public"
                },
                {
                    "name": "open",
                    "visibility": "public"
                },
                {
                    "name": "parseConfig",
                    "visibility": "public"
                },
                {
                    "name": "parseData",
                    "visibility": "public"
                },
                {
                    "name": "parseFlags",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "CacheManager",
            "name": "CacheManager",
            "type": "Controller",
            "properties": [
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "bluebird",
                    "visibility": "public"
                },
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "cacheServicePrototype",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "configuration",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "redis",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "redisNotifier",
                    "visibility": "public"
                },
                {
                    "name": "eventListener",
                    "visibility": "public"
                },
                {
                    "name": "localConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "bluebird",
                    "visibility": "public"
                },
                {
                    "name": "cacheServicePrototype",
                    "visibility": "public"
                },
                {
                    "name": "createCache",
                    "visibility": "public"
                },
                {
                    "name": "dotObject",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "registerEventListener",
                    "visibility": "public"
                },
                {
                    "name": "_notify",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "redis_cache_manager.js"
        },
        {
            "key": "NodeCMSFoundation",
            "name": "NodeCMSFoundation",
            "type": "Component",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "schemaManager",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "SchemaGenerator",
            "name": "SchemaGenerator",
            "type": "Service",
            "properties": [
                {
                    "name": "generator",
                    "visibility": "public"
                },
                {
                    "name": "mongoose_generator",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "jsonSchemaToMongoosSchema",
                    "visibility": "public"
                },
                {
                    "name": "mongoose_generator",
                    "visibility": "public"
                },
                {
                    "name": "objectToBigquery",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "Object"
                        },
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "objectToJsonSchema",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "Object"
                        },
                        {
                            "name": "A",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "objectToMongooseSchema",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "objectToMysqlTableSchema",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "Object"
                        },
                        {
                            "type": "String"
                        }
                    ]
                }
            ],
            "zOrder": 1000,
            "file": "schemeGenerator.js"
        },
        {
            "key": "NodeCMSFoundationDependency",
            "name": "NodeCMSFoundationDependency",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "ajv",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "ajv",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "NodeCMSFoundationPackageInfo",
            "name": "NodeCMSFoundationPackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "author",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "devDependencies",
                    "visibility": "public"
                },
                {
                    "name": "gitHead",
                    "visibility": "public"
                },
                {
                    "name": "homepage",
                    "visibility": "public"
                },
                {
                    "name": "license",
                    "visibility": "public"
                },
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "nodeCMS_category",
                    "visibility": "public"
                },
                {
                    "name": "optionalDependencies",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "private",
                    "visibility": "public"
                },
                {
                    "name": "repository",
                    "visibility": "public"
                },
                {
                    "name": "scripts",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "moduleDirectory",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "NodeCMSFoundationConfiguration",
            "name": "NodeCMSFoundationConfiguration",
            "type": "Bean",
            "properties": [],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Ajv",
            "name": "Ajv",
            "type": "Bean",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "RULES",
                    "visibility": "public"
                },
                {
                    "name": "errors",
                    "visibility": "public"
                },
                {
                    "name": "_schemaUriFormatFunc",
                    "visibility": "private"
                },
                {
                    "name": "_opts",
                    "visibility": "private"
                },
                {
                    "name": "_refs",
                    "visibility": "private"
                },
                {
                    "name": "_fragments",
                    "visibility": "private"
                },
                {
                    "name": "_formats",
                    "visibility": "private"
                },
                {
                    "name": "_schemaUriFormat",
                    "visibility": "private"
                },
                {
                    "name": "_schemas",
                    "visibility": "private"
                },
                {
                    "name": "_cache",
                    "visibility": "private"
                },
                {
                    "name": "_loadingSchemas",
                    "visibility": "private"
                },
                {
                    "name": "_compilations",
                    "visibility": "private"
                },
                {
                    "name": "_getId",
                    "visibility": "private"
                },
                {
                    "name": "_metaOpts",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "errorsText",
                    "visibility": "public"
                },
                {
                    "name": "addFormat",
                    "visibility": "public"
                },
                {
                    "name": "addMetaSchema",
                    "visibility": "public"
                },
                {
                    "name": "addSchema",
                    "visibility": "public"
                },
                {
                    "name": "compile",
                    "visibility": "public"
                },
                {
                    "name": "compileAsync",
                    "visibility": "public"
                },
                {
                    "name": "addKeyword",
                    "visibility": "public"
                },
                {
                    "name": "getKeyword",
                    "visibility": "public"
                },
                {
                    "name": "getSchema",
                    "visibility": "public"
                },
                {
                    "name": "removeKeyword",
                    "visibility": "public"
                },
                {
                    "name": "removeSchema",
                    "visibility": "public"
                },
                {
                    "name": "validate",
                    "visibility": "public"
                },
                {
                    "name": "validateSchema",
                    "visibility": "public"
                },
                {
                    "name": "_addSchema",
                    "visibility": "private"
                },
                {
                    "name": "_compile",
                    "visibility": "private"
                },
                {
                    "name": "_getId",
                    "visibility": "private"
                },
                {
                    "name": "_schemaUriFormatFunc",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "SchemeManager",
            "name": "SchemeManager",
            "type": "Service",
            "properties": [
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "ajv",
                    "visibility": "public"
                },
                {
                    "name": "dummyJson",
                    "visibility": "public"
                },
                {
                    "name": "faker",
                    "visibility": "public"
                },
                {
                    "name": "moment",
                    "visibility": "public"
                },
                {
                    "name": "registered",
                    "visibility": "public"
                },
                {
                    "name": "addHelpers",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "addFormat",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "[ Void ]"
                        }
                    ]
                },
                {
                    "name": "getKeyword",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "getNewObject",
                    "visibility": "public"
                },
                {
                    "name": "getSchema",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "[ ValidateFunction | Function ]"
                        }
                    ]
                },
                {
                    "name": "addKeyword",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "[ Void ]"
                        }
                    ]
                },
                {
                    "name": "moment",
                    "visibility": "public"
                },
                {
                    "name": "registerSchema",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "removeKeyword",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "removeSchema",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "validate",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "Object"
                        }
                    ]
                }
            ],
            "zOrder": 1000,
            "file": "NodeCMSFoundationManager.js"
        },
        {
            "key": "NodeCMSMongoDB",
            "name": "NodeCMSMongoDB",
            "type": "Component",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "Database",
            "name": "Database",
            "type": "Service",
            "properties": [
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "client",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "mongoose_generator",
                    "visibility": "public"
                },
                {
                    "name": "localConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "initializeStore",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "getNewModel",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "Object"
                        },
                        {
                            "type": "Function"
                        }
                    ]
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public",
                    "parameters": []
                },
                {
                    "name": "mongoose_generator",
                    "visibility": "public"
                },
                {
                    "name": "reconnect",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public",
                    "parameters": [
                        {
                            "type": "Promise"
                        }
                    ]
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "_connect",
                    "visibility": "private"
                },
                {
                    "name": "_disconnect",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "mongoose.js"
        },
        {
            "key": "NodeCMSMongoDBBeans",
            "name": "NodeCMSMongoDBBeans",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "mongooseGenerator",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "mongooseGenerator",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "MongooseManagerPackageInfo",
            "name": "MongooseManagerPackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "license",
                    "visibility": "public"
                },
                {
                    "name": "author",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "devDependencies",
                    "visibility": "public"
                },
                {
                    "name": "gitHead",
                    "visibility": "public"
                },
                {
                    "name": "homepage",
                    "visibility": "public"
                },
                {
                    "name": "keywords",
                    "visibility": "public"
                },
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "nodeCMS_category",
                    "visibility": "public"
                },
                {
                    "name": "optionalDependencies",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "private",
                    "visibility": "public"
                },
                {
                    "name": "repository",
                    "visibility": "public"
                },
                {
                    "name": "scripts",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_args",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_inCache",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_shasum",
                    "visibility": "private"
                },
                {
                    "name": "_shrinkwrap",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Mongoose-generator",
            "name": "Mongoose-generator",
            "type": "Bean",
            "properties": [
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "arguments",
                    "visibility": "public"
                },
                {
                    "name": "caller",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                },
                {
                    "name": "toString",
                    "visibility": "public"
                },
                {
                    "name": "placeholder",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                },
                {
                    "name": "placeholder",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "MongooseExtensionConfiguration",
            "name": "MongooseExtensionConfiguration",
            "type": "Bean",
            "properties": [
                {
                    "name": "database",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "NodeCMSCore",
            "name": "NodeCMSCore",
            "type": "Component",
            "properties": [
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "domainManager",
                    "visibility": "public"
                },
                {
                    "name": "contentManager",
                    "visibility": "public"
                },
                {
                    "name": "renderingManager",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "pageManager",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "loadExtensionConfiguration",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "UserManager",
            "name": "UserManager",
            "type": "Service",
            "properties": [
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                },
                {
                    "name": "strategies",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "authenticate",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "list",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "UserManager.js"
        },
        {
            "key": "ContextManager",
            "name": "ContextManager",
            "type": "Service",
            "properties": [
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "contextTransformer",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "Promise",
                    "visibility": "public"
                },
                {
                    "name": "getContext",
                    "visibility": "public"
                },
                {
                    "name": "processContext",
                    "visibility": "public"
                },
                {
                    "name": "setToContext",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "ContextManager.js"
        },
        {
            "key": "UserManagerFacade",
            "name": "UserManagerFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                },
                {
                    "name": "manager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "create",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "list",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "update",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "UserManagerFacade.js"
        },
        {
            "key": "ContextManagerFacade",
            "name": "ContextManagerFacade",
            "type": "Service",
            "properties": [
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "htmlError",
                    "visibility": "public"
                },
                {
                    "name": "contextManager",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "getContext",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "_createValidResult",
                    "visibility": "private"
                },
                {
                    "name": "_register",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "ContextManagerFacade.js"
        },
        {
            "key": "TextTransformer",
            "name": "TextTransformer",
            "type": "Component",
            "properties": [
                {
                    "name": "Text",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "Text",
                    "visibility": "public"
                },
                {
                    "name": "getElementClass",
                    "visibility": "public"
                },
                {
                    "name": "getNewElement",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "TextTransfomer.js"
        },
        {
            "key": "DomainContextTransformer",
            "name": "DomainContextTransformer",
            "type": "Component",
            "properties": [
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "ElementPrototype",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "ElementPrototype",
                    "visibility": "public"
                },
                {
                    "name": "process",
                    "visibility": "public"
                },
                {
                    "name": "transform",
                    "visibility": "public"
                },
                {
                    "name": "_megeObjecToContext",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "ContextTransfomer.js"
        },
        {
            "key": "TextWithImageTransformer",
            "name": "TextWithImageTransformer",
            "type": "Component",
            "properties": [
                {
                    "name": "TextWithImage",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "TextWithImage",
                    "visibility": "public"
                },
                {
                    "name": "getElementClass",
                    "visibility": "public"
                },
                {
                    "name": "getNewElement",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "TextWithImageTransformer.js"
        },
        {
            "key": "NodeCMSEJSExtension",
            "name": "NodeCMSEJSExtension",
            "type": "Bean",
            "properties": [
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "loadExtensionConfiguration",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "LayoutManager",
            "name": "LayoutManager",
            "type": "Service",
            "properties": [
                {
                    "name": "ejs",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "underscoreString",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "truncatise",
                    "visibility": "public"
                },
                {
                    "name": "templateManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "renderPage",
                    "visibility": "public"
                },
                {
                    "name": "mergeContextToString",
                    "visibility": "public"
                },
                {
                    "name": "renderContentElement",
                    "visibility": "public"
                },
                {
                    "name": "renderContentElementAsync",
                    "visibility": "public"
                },
                {
                    "name": "renderElement",
                    "visibility": "public"
                },
                {
                    "name": "renderElementAsync",
                    "visibility": "public"
                },
                {
                    "name": "promise",
                    "visibility": "public"
                },
                {
                    "name": "setLink",
                    "visibility": "public"
                },
                {
                    "name": "setWraps",
                    "visibility": "public"
                },
                {
                    "name": "truncate",
                    "visibility": "public"
                },
                {
                    "name": "truncatise",
                    "visibility": "public"
                },
                {
                    "name": "underscoreString",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "EJSLayoutManager.js"
        },
        {
            "key": "TemplateManager",
            "name": "TemplateManager",
            "type": "Service",
            "properties": [
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "ejs",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "loadTemplate",
                    "visibility": "public"
                },
                {
                    "name": "loadTemplateAsync",
                    "visibility": "public"
                },
                {
                    "name": "setViewEngine",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "EJSTemplateManager.js"
        },
        {
            "key": "NodeCMSExtensionManager",
            "name": "NodeCMSExtensionManager",
            "type": "Component",
            "properties": [
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "extensionManager",
                    "visibility": "public"
                },
                {
                    "name": "RestfulFunctionProxyClass",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "requestManager",
                    "visibility": "public"
                },
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "loadExtensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "provideVhostProcessing",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "LocalExtensionService",
            "name": "LocalExtensionService",
            "type": "Service",
            "properties": [
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "lodash",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "extensionDirectory",
                    "visibility": "public"
                },
                {
                    "name": "modules",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "load",
                    "visibility": "public"
                },
                {
                    "name": "lodash",
                    "visibility": "public"
                },
                {
                    "name": "_buildModuleInformation",
                    "visibility": "private"
                },
                {
                    "name": "_getPackageJsonFiles",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "local.js"
        },
        {
            "key": "BitBucketRestService",
            "name": "BitBucketRestService",
            "type": "Service",
            "properties": [
                {
                    "name": "repositories",
                    "visibility": "public"
                },
                {
                    "name": "restClientPrototype",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "blueBird",
                    "visibility": "public"
                },
                {
                    "name": "tags",
                    "visibility": "public"
                },
                {
                    "name": "repositoryRoot",
                    "visibility": "public"
                },
                {
                    "name": "user",
                    "visibility": "public"
                },
                {
                    "name": "password",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "blueBird",
                    "visibility": "public"
                },
                {
                    "name": "getFile",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        }
                    ]
                },
                {
                    "name": "load",
                    "visibility": "public"
                },
                {
                    "name": "loadExtensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "restClientPrototype",
                    "visibility": "public"
                },
                {
                    "name": "_extractRepositoryInformation",
                    "visibility": "private"
                },
                {
                    "name": "_getBranchesForPackages",
                    "visibility": "private",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        }
                    ]
                },
                {
                    "name": "_getPaginatedResult",
                    "visibility": "private"
                },
                {
                    "name": "_getRestClient",
                    "visibility": "private"
                },
                {
                    "name": "_loadSinglePage",
                    "visibility": "private"
                }
            ],
            "zOrder": 1000,
            "file": "bitbucket.js"
        },
        {
            "key": "NodeCMSExtensionManagerBeans",
            "name": "NodeCMSExtensionManagerBeans",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "pluginConf",
                    "visibility": "public"
                },
                {
                    "name": "restClient",
                    "visibility": "public"
                },
                {
                    "name": "childExec",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "childExec",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "pluginConf",
                    "visibility": "public"
                },
                {
                    "name": "restClient",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "ExtensionManagerPackageInfo",
            "name": "ExtensionManagerPackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "keywords",
                    "visibility": "public"
                },
                {
                    "name": "author",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "devDependencies",
                    "visibility": "public"
                },
                {
                    "name": "homepage",
                    "visibility": "public"
                },
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "license",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "nodeCMS_category",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "repository",
                    "visibility": "public"
                },
                {
                    "name": "scripts",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "ExtensionManagerExtensionConfiguration",
            "name": "ExtensionManagerExtensionConfiguration",
            "type": "Bean",
            "properties": [
                {
                    "name": "ExtensionManager",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "RestClientPrototype",
            "name": "RestClientPrototype",
            "type": "Bean",
            "properties": [
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "arguments",
                    "visibility": "public"
                },
                {
                    "name": "caller",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                },
                {
                    "name": "super_",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                },
                {
                    "name": "super_",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "ChildExec",
            "name": "ChildExec",
            "type": "Bean",
            "properties": [
                {
                    "name": "length",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "prototype",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "apply",
                    "visibility": "public"
                },
                {
                    "name": "bind",
                    "visibility": "public"
                },
                {
                    "name": "call",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "ExtensionManager",
            "name": "ExtensionManager",
            "type": "Service",
            "properties": [
                {
                    "name": "bluebird",
                    "visibility": "public"
                },
                {
                    "name": "namespace",
                    "visibility": "public"
                },
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "fileManager",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "localConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "bitbucket",
                    "visibility": "public"
                },
                {
                    "name": "local",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "exec",
                    "visibility": "public"
                },
                {
                    "name": "directory",
                    "visibility": "public"
                },
                {
                    "name": "cmdInstall",
                    "visibility": "public"
                },
                {
                    "name": "cmdUninstall",
                    "visibility": "public"
                },
                {
                    "name": "_",
                    "visibility": "private"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getPackage",
                    "visibility": "public"
                },
                {
                    "name": "bluebird",
                    "visibility": "public"
                },
                {
                    "name": "disablePackage",
                    "visibility": "public"
                },
                {
                    "name": "enablePackage",
                    "visibility": "public"
                },
                {
                    "name": "exec",
                    "visibility": "public"
                },
                {
                    "name": "getActivated",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "getDisabled",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "getInstalled",
                    "visibility": "public"
                },
                {
                    "name": "deletePackage",
                    "visibility": "public"
                },
                {
                    "name": "getPackageInfo",
                    "visibility": "public"
                },
                {
                    "name": "getRepositories",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "installPackage",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        },
                        {
                            "name": "Optional",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        },
                        {
                            "type": "Ojbect"
                        }
                    ]
                },
                {
                    "name": "load",
                    "visibility": "public"
                },
                {
                    "name": "loadPackageJson",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        },
                        {
                            "name": "Optional",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        },
                        {
                            "type": "Object"
                        }
                    ]
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "uninstallPackage",
                    "visibility": "public",
                    "parameters": [
                        {
                            "name": "The",
                            "type": "String"
                        },
                        {
                            "type": "Object"
                        },
                        {
                            "type": "Ojbect"
                        }
                    ]
                }
            ],
            "zOrder": 1000,
            "file": "extension_manager.js"
        },
        {
            "key": "Oauth2orizeExtension",
            "name": "Oauth2orizeExtension",
            "type": "Component",
            "properties": [
                {
                    "name": "appFoundation",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "configurationManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "path",
                    "visibility": "public"
                },
                {
                    "name": "util",
                    "visibility": "public"
                },
                {
                    "name": "oauth2server",
                    "visibility": "public"
                },
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "glob",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "extension.js"
        },
        {
            "key": "Oauth2Server",
            "name": "Oauth2Server",
            "type": "Service",
            "properties": [
                {
                    "name": "clientManager",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "crypto",
                    "visibility": "public"
                },
                {
                    "name": "oauth2orize",
                    "visibility": "public"
                },
                {
                    "name": "connectEnsureLogin",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "filemanager",
                    "visibility": "public"
                },
                {
                    "name": "authorizationManager",
                    "visibility": "public"
                },
                {
                    "name": "tokenManager",
                    "visibility": "public"
                },
                {
                    "name": "exchanges",
                    "visibility": "public"
                },
                {
                    "name": "jwtBearer",
                    "visibility": "public"
                },
                {
                    "name": "server",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "getAuthorization",
                    "visibility": "public"
                },
                {
                    "name": "getDecision",
                    "visibility": "public"
                },
                {
                    "name": "getToken",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "oauth2orize",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "server.js"
        },
        {
            "key": "Oauth2TokenManager",
            "name": "Oauth2TokenManager",
            "type": "Service",
            "properties": [
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findByToken",
                    "visibility": "public"
                },
                {
                    "name": "findByUserIdAndClientId",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "save",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "tokenManager.js"
        },
        {
            "key": "Oauth2ClientManager",
            "name": "Oauth2ClientManager",
            "type": "Service",
            "properties": [
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "save",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "clientManager.js"
        },
        {
            "key": "Oauth2Configuration",
            "name": "Oauth2Configuration",
            "type": "Configuration",
            "properties": [
                {
                    "name": "packageInfo",
                    "visibility": "public"
                },
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "extensionConfiguration",
                    "visibility": "public"
                },
                {
                    "name": "packageInfo",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Oauth2orizeExtensionPackageInfo",
            "name": "Oauth2orizeExtensionPackageInfo",
            "type": "Bean",
            "properties": [
                {
                    "name": "bundleDependencies",
                    "visibility": "public"
                },
                {
                    "name": "dependencies",
                    "visibility": "public"
                },
                {
                    "name": "deprecated",
                    "visibility": "public"
                },
                {
                    "name": "description",
                    "visibility": "public"
                },
                {
                    "name": "name",
                    "visibility": "public"
                },
                {
                    "name": "peerDependencies",
                    "visibility": "public"
                },
                {
                    "name": "private",
                    "visibility": "public"
                },
                {
                    "name": "version",
                    "visibility": "public"
                },
                {
                    "name": "_phantomChildren",
                    "visibility": "private"
                },
                {
                    "name": "_from",
                    "visibility": "private"
                },
                {
                    "name": "_inBundle",
                    "visibility": "private"
                },
                {
                    "name": "_integrity",
                    "visibility": "private"
                },
                {
                    "name": "_location",
                    "visibility": "private"
                },
                {
                    "name": "_id",
                    "visibility": "private"
                },
                {
                    "name": "_requested",
                    "visibility": "private"
                },
                {
                    "name": "_requiredBy",
                    "visibility": "private"
                },
                {
                    "name": "_resolved",
                    "visibility": "private"
                },
                {
                    "name": "_spec",
                    "visibility": "private"
                },
                {
                    "name": "_where",
                    "visibility": "private"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "Oauth2orizeExtensionConfiguration",
            "name": "Oauth2orizeExtensionConfiguration",
            "type": "Bean",
            "properties": [
                {
                    "name": "authorizationEndpoint",
                    "visibility": "public"
                },
                {
                    "name": "decision",
                    "visibility": "public"
                },
                {
                    "name": "token",
                    "visibility": "public"
                }
            ],
            "methods": [],
            "zOrder": 1000,
            "file": "moduleBeans.js"
        },
        {
            "key": "BearerStrategy",
            "name": "BearerStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "passportHttpBearer",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "tokenManager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "passportHttpBearer",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "BearerStrategy.js"
        },
        {
            "key": "Oauth2orizePassword",
            "name": "Oauth2orizePassword",
            "type": "Component",
            "properties": [
                {
                    "name": "oauth2orize",
                    "visibility": "public"
                },
                {
                    "name": "clientManager",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "tokenManager",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "getExchange",
                    "visibility": "public"
                },
                {
                    "name": "getGrant",
                    "visibility": "public"
                },
                {
                    "name": "oauth2orize",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "Oauth2orizePassword.js"
        },
        {
            "key": "Oauth2AuthorizationManager",
            "name": "Oauth2AuthorizationManager",
            "type": "Service",
            "properties": [
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "model",
                    "visibility": "public"
                },
                {
                    "name": "database",
                    "visibility": "public"
                },
                {
                    "name": "schemeManager",
                    "visibility": "public"
                },
                {
                    "name": "cacheManager",
                    "visibility": "public"
                },
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "validator",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                },
                {
                    "name": "cacheClient",
                    "visibility": "public"
                }
            ],
            "methods": [
                {
                    "name": "findCached",
                    "visibility": "public"
                },
                {
                    "name": "cache",
                    "visibility": "public"
                },
                {
                    "name": "delete",
                    "visibility": "public"
                },
                {
                    "name": "domainModel",
                    "visibility": "public"
                },
                {
                    "name": "find",
                    "visibility": "public"
                },
                {
                    "name": "findAll",
                    "visibility": "public"
                },
                {
                    "name": "findByCode",
                    "visibility": "public"
                },
                {
                    "name": "findByExample",
                    "visibility": "public"
                },
                {
                    "name": "createCacheClient",
                    "visibility": "public"
                },
                {
                    "name": "get",
                    "visibility": "public"
                },
                {
                    "name": "getModelById",
                    "visibility": "public"
                },
                {
                    "name": "getModelCachedById",
                    "visibility": "public"
                },
                {
                    "name": "init",
                    "visibility": "public"
                },
                {
                    "name": "joinSelect",
                    "visibility": "public"
                },
                {
                    "name": "saveOrUpdate",
                    "visibility": "public"
                },
                {
                    "name": "uuid",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "authorizationManager.js"
        },
        {
            "key": "ClientPasswordStrategy",
            "name": "ClientPasswordStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "passport",
                    "visibility": "public"
                },
                {
                    "name": "oauth2ClientPassword",
                    "visibility": "public"
                },
                {
                    "name": "userManager",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "md5",
                    "visibility": "public"
                },
                {
                    "name": "oauth2ClientPassword",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "ClientPasswordStrategy.js"
        },
        {
            "key": "Oauth2TokenEndpointStrategy",
            "name": "Oauth2TokenEndpointStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "oauth2server",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "Oauth2TokenEndpointStrategy.js"
        },
        {
            "key": "Oauth2DecisionEndpointStrategy",
            "name": "Oauth2DecisionEndpointStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "oauth2server",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "Oauth2DecisionEndpointStrategy.js"
        },
        {
            "key": "Oauth2AuthorizationEndpointStrategy",
            "name": "Oauth2AuthorizationEndpointStrategy",
            "type": "Service",
            "properties": [
                {
                    "name": "logger",
                    "visibility": "public"
                },
                {
                    "name": "oauth2server",
                    "visibility": "public"
                },
                {
                    "name": "_namespace",
                    "visibility": "private"
                },
                {
                    "name": "_canonicalName",
                    "visibility": "private"
                }
            ],
            "methods": [
                {
                    "name": "authenticateRoute",
                    "visibility": "public"
                },
                {
                    "name": "strategy",
                    "visibility": "public"
                }
            ],
            "zOrder": 1000,
            "file": "Oauth2AuthorizationEndpointStrategy.js"
        }
    ],
    "inheritances": {
        "inheritance": [
            {
                "from": "\"BasicStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"LocalStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"AuthenticationManager\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"NodeCMS\"",
                "to": "ExtensionBase"
            },
            {
                "from": "\"PageManager\"",
                "to": "PageManagerPrototype"
            },
            {
                "from": "\"FileManager\"",
                "to": "FileSystemExplorerBase"
            },
            {
                "from": "\"DomainManager\"",
                "to": "DomainManagerPrototype"
            },
            {
                "from": "\"ContentManager\"",
                "to": "ContentManagerPrototype"
            },
            {
                "from": "\"PageManagerRequestFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"DomainManagerRequestFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"ContentManagerRequestFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"RenderingManagerRequestFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"NodeCMSCore\"",
                "to": "ExtensionBase"
            },
            {
                "from": "\"UserManager\"",
                "to": "UserManagerPrototype"
            },
            {
                "from": "\"ContextManager\"",
                "to": "ContextManagerPrototype"
            },
            {
                "from": "\"UserManagerFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"Text\"",
                "to": "Element"
            },
            {
                "from": "\"PageManagerPrototype\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"UserManagerPrototype\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"ContextManagerFacade\"",
                "to": "RequestFacade"
            },
            {
                "from": "\"Conten\"",
                "to": "Element"
            },
            {
                "from": "\"DomainManagerPrototype\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"ContentManagerPrototype\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"TextTransformer\"",
                "to": "ElementTransformer"
            },
            {
                "from": "\"DomainContextTransformer\"",
                "to": "ContextTransformer"
            },
            {
                "from": "\"TextWithImage\"",
                "to": "Element"
            },
            {
                "from": "\"TextWithImageTransformer\"",
                "to": "ElementTransformer"
            },
            {
                "from": "\"NodeCMSEJSExtension\"",
                "to": "ExtensionBase"
            },
            {
                "from": "\"NodeCMSExtensionManager\"",
                "to": "ExtensionBase"
            },
            {
                "from": "\"BitBucketRestService\"",
                "to": "ExtensionBase"
            },
            {
                "from": "\"Oauth2TokenManager\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"Oauth2ClientManager\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"BearerStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"Oauth2orizePassword\"",
                "to": "Oauth2orizeBase"
            },
            {
                "from": "\"Oauth2AuthorizationManager\"",
                "to": "StoreAwareManager"
            },
            {
                "from": "\"ClientPasswordStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"Oauth2TokenEndpointStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"Oauth2DecisionEndpointStrategy\"",
                "to": "BaseStrategy"
            },
            {
                "from": "\"Oauth2AuthorizationEndpointStrategy\"",
                "to": "BaseStrategy"
            }
        ],
        "prototypes": [
            "BaseStrategy",
            "BaseStrategy",
            "StoreAwareManager",
            "ExtensionBase",
            "PageManagerPrototype",
            "FileSystemExplorerBase",
            "DomainManagerPrototype",
            "ContentManagerPrototype",
            "RequestFacade",
            "RequestFacade",
            "RequestFacade",
            "RequestFacade",
            "ExtensionBase",
            "UserManagerPrototype",
            "ContextManagerPrototype",
            "RequestFacade",
            "Element",
            "StoreAwareManager",
            "StoreAwareManager",
            "RequestFacade",
            "Element",
            "StoreAwareManager",
            "StoreAwareManager",
            "ElementTransformer",
            "ContextTransformer",
            "Element",
            "ElementTransformer",
            "ExtensionBase",
            "ExtensionBase",
            "ExtensionBase",
            "StoreAwareManager",
            "StoreAwareManager",
            "BaseStrategy",
            "Oauth2orizeBase",
            "StoreAwareManager",
            "BaseStrategy",
            "BaseStrategy",
            "BaseStrategy",
            "BaseStrategy"
        ]
    },
    "injections": [
        {
            "from": "SecurityCheck",
            "to": "AuthenticationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BasicStrategy",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BasicStrategy",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BasicStrategy",
            "to": "PassportHttp",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BasicStrategy",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BasicStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalStrategy",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalStrategy",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalStrategy",
            "to": "PassportLocal",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalStrategy",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "BaseStrategy",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "AuthenticationManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMS",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMS",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMS",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMS",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "ImportManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "Glob",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PackageBase",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HookManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HookManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Express",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Server",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Domain",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Fs",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Log4js",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "DomainManagerRequestFacade",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Vhost",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "LayoutManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "Glob",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "DomainManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "ServerConfig",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "TemplateManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "HostManager",
            "to": "AuthenticationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Glob",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Wildstring",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "Fs",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "ReadChunk",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FileManager",
            "to": "FileType",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "Traverse",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ImportManager",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "WatchObject",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "AsyncWatch",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "ElementTransformer",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "Minify",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "LayoutManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManager",
            "to": "AppConf",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManagerRequestFacade",
            "to": "PageManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManagerRequestFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManagerRequestFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "PageManagerRequestFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManagerRequestFacade",
            "to": "DomainManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManagerRequestFacade",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManagerRequestFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManagerRequestFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainManagerRequestFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManagerRequestFacade",
            "to": "ContentManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManagerRequestFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManagerRequestFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContentManagerRequestFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManagerRequestFacade",
            "to": "RenderingManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManagerRequestFacade",
            "to": "Minify",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManagerRequestFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManagerRequestFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "RenderingManagerRequestFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "ServeFavicon",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "FaviconConfigurator",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SessionConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SessionConfigurator",
            "to": "Locale",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SessionConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SessionConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BodyParserConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BodyParserConfigurator",
            "to": "BodyParser",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BodyParserConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BodyParserConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BodyParserConfigurator",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CompressionConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CompressionConfigurator",
            "to": "Compress",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CompressionConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CompressionConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CookieParserConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CookieParserConfigurator",
            "to": "CookieParser",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CookieParserConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CookieParserConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "HostManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "ServeFavicon",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ErrorHandlerConfigurator",
            "to": "ErrorHandler",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "RedisCachePackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "RedisCacheExtensionConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "RedisServer",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSRedisCacheManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "Bluebird",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "Redis",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "DotObject",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "RedisCacheServicePrototype",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "RedisCachePackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "AppConf",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "CacheManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "NodeCMSFoundationPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "NodeCMSFoundationConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "Glob",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSFoundation",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemaGenerator",
            "to": "Schema-generator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemaGenerator",
            "to": "Mongoose-generator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemaGenerator",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemaGenerator",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "Ajv",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "DummyJson",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "Faker",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "SchemeManager",
            "to": "Moment",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "MongooseManagerPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "MongooseExtensionConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSMongoDB",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "MongooseManagerPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "MongooseClient",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Mongoose-generator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Database",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "DomainManagerRequestFacade",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "PageManagerRequestFacade",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "ContentManagerRequestFacade",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "RenderingManagerRequestFacade",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "NodeCMSCorePackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "NodeCMSCoreConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSCore",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManager",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManager",
            "to": "ContextTransformer",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManagerFacade",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManagerFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManagerFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "UserManagerFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManagerFacade",
            "to": "ContextManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManagerFacade",
            "to": "Promise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ContextManagerFacade",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TextTransformer",
            "to": "Text",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainContextTransformer",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainContextTransformer",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "DomainContextTransformer",
            "to": "Element",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManagerPrototype",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManagerPrototype",
            "to": "AppConf",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManagerPrototype",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ConfigurationManagerPrototype",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TextWithImageTransformer",
            "to": "TextWithImage",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSEJSExtension",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSEJSExtension",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSEJSExtension",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSEJSExtension",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Ejs",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "UnderscoreString",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Bluebird",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Truncatise",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "TemplateManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LayoutManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TemplateManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TemplateManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TemplateManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "TemplateManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "ExtensionManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "ExtensionManagerPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "ExtensionManagerExtensionConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "NodeCMSExtensionManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalExtensionService",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalExtensionService",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalExtensionService",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalExtensionService",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "LocalExtensionService",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "RestClientPrototype",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "Bluebird",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BitBucketRestService",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "ExtensionManagerPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "BitBucketRestService",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "LocalExtensionService",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "Bluebird",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "Lodash",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ExtensionManager",
            "to": "ChildExec",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "AppDir",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Oauth2orizeExtensionPackageInfo",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Oauth2orizeExtensionConfiguration",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "ConfigurationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Path",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Util",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Oauth2Server",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "Glob",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizeExtension",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "FileManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Oauth2orize",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "ConnectEnsureLogin",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Oauth2ClientManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Oauth2AuthorizationManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Oauth2TokenManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "Oauth2orizeBase",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2Server",
            "to": "JWTBearer",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2ClientManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "PassportHttpBearer",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "Oauth2TokenManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "BearerStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizePassword",
            "to": "Oauth2orize",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizePassword",
            "to": "Oauth2ClientManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizePassword",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2orizePassword",
            "to": "Oauth2TokenManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "Database",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "SchemeManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "CacheManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "Validator",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationManager",
            "to": "Uuid4",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ClientPasswordStrategy",
            "to": "Md5",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ClientPasswordStrategy",
            "to": "Passport",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ClientPasswordStrategy",
            "to": "PassportOauth2ClientPassword",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ClientPasswordStrategy",
            "to": "UserManager",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "ClientPasswordStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenEndpointStrategy",
            "to": "Oauth2Server",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2TokenEndpointStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2DecisionEndpointStrategy",
            "to": "Oauth2Server",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2DecisionEndpointStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationEndpointStrategy",
            "to": "Oauth2Server",
            "relationship": "generalization",
            "zOrder": 100
        },
        {
            "from": "Oauth2AuthorizationEndpointStrategy",
            "to": "Logger",
            "relationship": "generalization",
            "zOrder": 100
        }
    ]
}