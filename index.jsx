(() => {
  'use strict';

  const spawn = require('child_process').spawn;

  const React = require('react');
  const ReactDOM = require('react-dom');
  const Immutable = require('immutable');
  const __ = require('timeengine');
  const __Element = require('timeengine-react');

  const SplitPane = require('react-split-pane');
  const dragula = require('react-dragula');

  __.log.t = "App Starting!";
  //================================

  const webserver = () => {
    __.log.t = "WebServer Starting!";
    const port = 17890;
    const directory = "./code";

    const http = require('http');
    const url = require('url');
    const path = require("path");
    const fs = require('fs');

    const mimeTypes = {
      "html": "text/html",
      "js": "text/javascript",
      "css": "text/css",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "png": "image/png",
      "gif": "image/gif",
      "svg": "image/svg"
    // more
    };

    const request = (req, res) => {
      __.log.t = req;
      const uri = url.parse(req.url).pathname;
      const dir = path.join(__dirname, directory);
      const filepath = path.join(dir, unescape(uri));
      const indexfilepath = path.join(dir, unescape('index.html'));

      console.info('filepath', filepath);

      const f = (err, stats) => {
        if (err) {
          //do nothing
        }


        if (stats === undefined) // path does not exit 404
        {
          res.writeHead(404,
            {
              'Content-Type': 'text/plain'
            });
          res.write('404 Not Found\n');
          res.end();

          return;
        } else if (stats.isFile()) // path exists, is a file
        {
          const mimeType = mimeTypes[path.extname(filepath).split(".")[1]];
          res
            .writeHead(200,
              {
                'Content-Type': mimeType
              });

          const fileStream = fs
            .createReadStream(filepath)
            .pipe(res);

          return;
        } else if (stats.isDirectory()) // path exists, is a directory
        {
          res
            .writeHead(200,
              {
                'Content-Type': "text/html"
              });

          const fileStream2 = fs
            .createReadStream(indexfilepath)
            .pipe(res);

          return;
        } else {
          // Symbolic link, other?
          // TODO: follow symlinks?  security?
          res
            .writeHead(500,
              {
                'Content-Type': 'text/plain'
              })
            .write('500 Internal server error\n')
            .end();

          return;
        }
      };

      const component = fs.stat(filepath, f);
      return;
    };

    const serverUp = () => {
      console.info('HTTP server listening', port);
      return;
    };

    const server = http
      .createServer(request)
      .listen(port, serverUp);
  };



  webserver();



  //=================================================
  const __interval1 = __
    .intervalSeq(Immutable.Range(), 500);

  const __interval2 = __
    .intervalSeq(Immutable.Range(), 1000);

  const Editor = (__code, __setCode) => {
    const onInput = (e) => {
      __code.t = e.target.innerText;
    };
    const style = {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "overflow": "auto",
      "backgroundColor": "#1B2D33",
      "font-family": "Source Code Pro"
    };
    return __Element(__([__setCode])
      .__(([setCode]) => {
        //--------
        __.log.t = setCode;

        return (<div style={style}
          contentEditable
          onInput ={onInput}
          dangerouslySetInnerHTML={{
            __html: setCode
          }} />);
      //----------
      }));

  };
  const Console = (__setCode) => {
    const style = {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "overflow": "auto",
      "backgroundColor": "#222222",
      "font-family": "Source Code Pro"
    };
    return __Element(__([__setCode])
      .__(([setCode]) => (<div style={style}
        dangerouslySetInnerHTML={{
          __html: setCode
        }} />
      )),
      (dom) => (dom.scrollTop = dom.scrollHeight));
  };

  const __codeHTML = __();
  const __codeCSS = __();
  const __codeES = __();

  const __codeSetHTML = __();
  const __codeSetCSS = __();
  const __codeSetES = __();
  const __codeSetConsole = __();

  const __webReloadBeacon = __();

  const webReload = () => {
    console.log("webReload");
    __webReloadBeacon.t = 1;
  };

  const fs = require('fs');
  const fsWrieThenReload = (obj) => {
    console.log("!!!fsWrieThenReload");

    fs.writeFile(obj.filename, obj.data, "utf-8",
      (err) => {
        if (err) {
          throw err;
        } else {
          webReload();
        }
      });
  };

  const reloadByHTML = (code) => (fsWrieThenReload({
      filename: __dirname + '/code/index.html',
      data: code
    }));

  const reloadByCSS = (code) => (fsWrieThenReload({
      filename: __dirname + '/code/index.css',
      data: code
    }));
  const reloadByES = (code) => (fsWrieThenReload({
      filename: __dirname + '/code/index.es',
      data: code
    }));

  const templateHTML = () => {
    __.log.t = "templateHTML!!!!!!!!!!!!!!!!!!!!!";
    fs.readFile(__dirname + '/code_template/index.html', 'utf8',
      (err, data) => {
        if (err)
          throw err;
        __.log.t = data;
        reloadByHTML(data);

        //editor display
        const data1 = data
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");

        __codeSetHTML.t = "Clearing : " + Date.now();
        __codeSetHTML.t = "<pre>" + data1 + "</pre>";
      });
  };

  const clearHTML = () => {
    __codeSetHTML.t = "Clearing : " + Date.now();
    setTimeout(() => (__codeSetHTML.t = ""), 0);
    reloadByHTML("");

  };
  const clearCSS = () => {
    __codeSetCSS.t = "Clearing : " + Date.now();
    setTimeout(() => (__codeSetCSS.t = ""), 0);
    reloadByCSS("");
  };

  const clearES = () => {
    __codeSetES.t = "Clearing : " + Date.now();
    setTimeout(() => (__codeSetES.t = ""), 0);
    reloadByES("");
  };

  const clearConsole = () => {
    __codeSetConsole.t = "";
  };



  const timeseqHTML = __([__interval2, __codeHTML])
    .__(([interval, code]) => {
      __.log.t = "reloadinghtml!!";
      __.log.t = code;
      reloadByHTML(code);
    });

  const timeseqCSS = __([__interval2, __codeCSS])
    .__(([interval, code]) => reloadByCSS(code));

  //
  const __transpileCleared = __();
  const __timeseqES = __([__interval1, __codeES, __transpileCleared])
    .__(([interval, code, transpileCleared]) => {
      __codeSetConsole.t += "<div>------------------------------</div>";
      const babel = spawn(__dirname + '/node_modules/.bin/babel-node'
        , ['-p', code]);

      const node = spawn('node', ['-p', code]);

      const __live = __([__codeES]).__(() => (0));

      babel.stdout
        .on('data', (data) => {
          __transpileCleared.t = 1;
          if (__live.t !== 0) {
            console.info("output:", data.toString());
            __codeSetConsole.t += "<pre>" + data.toString() + "</pre>";

            reloadByES(code);
          }
        });
      babel.stderr
        .on('data', (data) => {
          __transpileCleared.t = 1;
          if (__live.t !== 0) {
            console.info("BabelTranspileError:", data.toString());
            __codeSetConsole.t += "<pre>" + data.toString() + "</pre>";
          }
        });


    });

  __transpileCleared.t = 1; //initial clear

  const __webviewReady = __().log("__webviewReady");

  const WebView = (__beacon) => __Element(__
      .intervalSeq(Immutable.Range(0, 1), 0)
      .log("webview")
      .__(() => (<webview
        //  src="http://google.com"
        src="http://localhost:17890"
        nodeintegration></webview>)),
      (dom) => {
        dom.openDevTools();

        __beacon.__(() => dom.reload());
        dom.addEventListener('dom-ready', (e) => {
          if (__webviewReady.t !== 1) {
            __webviewReady.t = 1;
            return 0;
          } else {
            return 0;
          }
        });
      });

  const PaneContainer1 = React.createClass({
    render() {
      return (
        <div className='paneContainer'>
        <div className='pane'><span className='handle'>{"HTML (index.html)"}
        <div className="right">
        <button onClick={templateHTML}>
        {"Template"}
        </button>
        <button onClick={clearHTML}>
        {"Clear"}
        </button>
        </div>
        </span>

        <div className='panefix'>
          {Editor(__codeHTML, __codeSetHTML)}
        </div>
        </div>

        <div className='pane'><span className='handle'>{"CSS (index.css)"}
        <div className="right">
        <button onClick={clearCSS}>
        {"Clear"}
        </button>
        </div>
        </span>

               <div className='panefix'>
                {Editor(__codeCSS, __codeSetCSS)}
                </div>

               </div>
        </div>
        );
    }

  });


  const PaneContainer2 = React.createClass({
    render() {
      return (
        <div className='paneContainer'>
        <div className='pane'><span className='handle'>{"ES6/JSX  (index.es)"}

        <div className="right">
        <button onClick={clearES}>
        {"Clear"}
        </button>
        </div>
        </span>

          <div className='panefix'>
            {Editor(__codeES, __codeSetES)}
          </div>
          </div>
          </div>
        );
    }
  });


  const PaneContainer3 = React.createClass({
    render() {
      return (
        <div className='paneContainer'>
        <div className='pane'><span className='handle'>{"Console Output"}
        <div className="right">
        <button onClick={clearConsole}>
        {"Clear"}
        </button>
        </div>

        </span>
        <div className='panefix'>
          {Console(__codeSetConsole)}
                    </div>
               </div>
               <div className='pane'><span className='handle'>{"WebBrowser"}</span>
                    <div className='panefix'>
                      {WebView(__webReloadBeacon)}
                    </div>
               </div>
          </div>
        );
    }
  });

  const App = React.createClass({
    componentDidMount() {

      const DOMpaneContainer1 = ReactDOM.findDOMNode(this.refs.p1);
      const DOMpaneContainer2 = ReactDOM.findDOMNode(this.refs.p2);
      const DOMpaneContainer3 = ReactDOM.findDOMNode(this.refs.p3);

      dragula([DOMpaneContainer1,
        DOMpaneContainer2,
        DOMpaneContainer3
      ], {
        moves(el, container, handle) {
          return handle.className === 'handle';
        }
      });

      __webviewReady.__(() => {
        const __ts = __
          .intervalSeq(Immutable.Seq.of("editor loading"), 0)
          .log()
          .__(() => {
            templateHTML();
            clearCSS();
            clearES();
            clearConsole();
          });
        return 1; //__webviewReady.t =1;
      });

    },
    render() {
      return (
        <SplitPane split="vertical" minSize="50" defaultSize="450">
            <PaneContainer1 ref="p1"/>
            <SplitPane split="vertical" minSize="50">
                  <PaneContainer2 ref="p2"/>
                  <PaneContainer3 ref="p3" />
            </SplitPane>
        </SplitPane>
        );
    }
  });


  const mount = ReactDOM.render(<App />, document.getElementById('container'));


  //============================



//============================
//===================================
})();
