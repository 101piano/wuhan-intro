
    requirejs.config({
      baseUrl: './js',//一般情况 下以data-main的地址为baseUrl
      paths: {
        'jquery': './lib/jquery-3.2.0.min'
      }
    });
    requirejs(['app/index']);







































