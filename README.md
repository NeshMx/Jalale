# Jálale

- Useful commands:
```
ionic cordova platform add android@6.2.3
ionic cordova run android -- -- --minSdkVersion=19
```

Add to build.gradle:
```
// Allow plugins to declare Maven dependencies via build-extras.gradle.
allprojects {
    repositories {
        maven { url 'https://maven.google.com' }
        mavenCentral();
        jcenter()
    }
}
```

Add to project.properties:
```
cordova.system.library.2=com.google.android.gms:play-services-maps:+
cordova.system.library.3=com.google.android.gms:play-services-location:+
cordova.system.library.4=com.android.support:support-core-utils:25+
```