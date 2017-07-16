# Appendix VI: External Repository Identifiers

***
When `<category>` = “SECURITY”:
***

## \<type> cpe22Type <a name="cpe22"></a>

### \<locator> Information

Locator Format:

    "[c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\._\-~%]*){0,6}"

Contextual Example: 

    cpe:/o:canonical:ubuntu_linux:10.04:-:lts

External Reference Site: [https://nvd.nist.gov/cpe](https://nvd.nist.gov/cpe)

Documentation: [https://cpe.mitre.org/files/cpe-specification_2.2.pdf](https://cpe.mitre.org/files/cpe-specification_2.2.pdf)


## \<type> cpe23Type <a name="cpe23"></a>

### \<locator> Information

Locator Format: 

    "cpe:2\.3:[aho\*\­]
    (:(((\?*|\*?)([a­zA­Z0­9\­\._]|(\\[\\\*\?!
    "#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~])
    )+(\?*|\*?))|[\*\­])){5}
    (:(([a­zA­Z]{2,3}(­([a­zA­Z]{2}|[0­9]{3
    }))?)|[\*\­]))
    (:(((\?*|\*?)([a­zA­Z0­9\­\._]|(\\[\\\*\?!
    "#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~])
    )+(\?*|\*?))|[\*\­])){4}"

Contextual Example: 

    cpe:2.3:o:canonical:ubuntu_linux:10.04:­:lts:*:*:*:*:*

External Reference Site: [https://nvd.nist.gov/cpe](https://nvd.nist.gov/cpe)

Documentation: [http://csrc.nist.gov/publications/nistir/ir7695/NISTIR-7695-CPE-Naming.pdf](http://csrc.nist.gov/publications/nistir/ir7695/NISTIR-7695-CPE-Naming.pdf)
 
***
When <category> = “PACKAGE_MANAGER”:
***

## \<type> maven-central <a name="maven"></a>

### \<locator> Information

Locator Format:

    group:artifact[:version]
    ^[^:]+:[^:]+(:[^:]+)?$

Contextual Example:

    org.apache.tomcat:tomcat:9.0.0.M4

External Reference Site: [http://repo1.maven.org/maven2/](http://repo1.maven.org/maven2/)

Documentation: [https://maven.apache.org](https://maven.apache.org)

## \<type> npm <a name="npm"></a>

### \<locator> Information

Locator Format:

    package@version
    ^[^@]+@[^@]+$

Contextual Example:

    http-server@0.3.0

External Reference Site: [https://www.npmjs.com/](https://www.npmjs.com/)

Documentation: [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

## \<type> nuget <a name="nuget"></a>

### \<locator> Information

Locator Format:

    package/version
    ^[^\/]+\/[^\/]+$

Contextual Example:

    Microsoft.AspNet.MVC/5.0.0

External Reference Site: [https://www.nuget.org/](https://www.nuget.org/)

Documentation: [https://docs.nuget.org/](https://docs.nuget.org/)

## \<type> bower <a name="bower"></a>

### \<locator> Information

Locator Format:

        package#version
        ^[^#]+#[^#]+$

Contextual Example:

        modernizr#2.6.2

External Reference Site: [http://bower.io/](http://bower.io/)

Documentation: [http://bower.io/docs/api/#install](http://bower.io/docs/api/#install)

***
When <category> = “OTHER”:
***

## \<type> [idstring] <a name="idstring"></a>

### \<locator> Information

no spaces, but anything else goes