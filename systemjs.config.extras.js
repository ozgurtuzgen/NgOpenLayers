// #docregion
/** App specific SystemJS configuration */
System.config({
  packages: {
    // barrels    
    'app/modules/testing': {main:'index.js', defaultExtension:'js'}
  }
});