(() => {
  'use strict';

  const React = require('react');
  const ReactDOM = require('react-dom');
  const Immutable = require('immutable');
  const __ = require('timeengine');
  const __Element = require('timeengine-react');

  const SplitPane = require('react-split-pane');
  const dragula = require('react-dragula');

  //const brace = require('brace');
  //================================

  const __interval3 = __
    .intervalSeq(Immutable.Range(), 100000)
    .__((count) => (__.log.t = count)); //console.log


  class ContentEditable extends React.Component {
    constructor() {
      super();
      this.emitChange = this.emitChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
      return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
        this.props.disabled !== nextProps.disabled;
    }

    componentDidUpdate() {
      if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
        this.htmlEl.innerHTML = this.props.html;
      }
    }

    emitChange(evt) {
      if (!this.htmlEl) return;
      var html = this.htmlEl.innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        evt.target = {
          html: html,
          text: this.htmlEl.innerText
        };
        this.props.onChange(evt);
      }
      this.lastHtml = html;
    }

    render() {
      return React.createElement(
        this.props.tagName || 'code',
        Object.assign({}, this.props, {
          ref: (e) => this.htmlEl = e,
          onInput: this.emitChange,
          onBlur: this.emitChange,
          contentEditable: !this.props.disabled,
          dangerouslySetInnerHTML: {
            __html: this.props.html
          }
        }),
        this.props.children);
    }
  }


  const Editor = () => {
    const __html = __().log("__html");
    const __text = __().log("__text");

    const onChange = (e) => {
      __html.t = e.target.html;
      __text.t = e.target.text;
    };
    const style = {
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "overflow": "auto",
      "backgroundColor": "#1B2D33"
    };
    const __seqEl = __([__html])
      .__(([html]) => (<ContentEditable
        style={style}
        html={html}
        onChange={onChange}
        disabled={false}
        />));

    __html.t = "";
    return __Element(__seqEl);
  };

  const WebView = React.createClass({
    componentDidMount() {
      const webview1 = ReactDOM.findDOMNode(this);
    /*
        const timeseq = __webReloadBeacon
          .tMap((val) => {

            console.log("=============webview");
            console.log(val);
            webview1.reload();
          });
    */
    },
    render() {
      return (<webview  src="http://localhost:17890"></webview>
        );
    }

  });
  const PaneContainer1 = React.createClass({
    render() {
      return (
        <div className='paneContainer'>
        <div className='pane'><span className='handle'>{"HTML (index.html)"}
        <div className="right">
        <button onClick={() => (0) /*clearHTML*/ }>
        {"Clear"}
        </button>
        </div>
        </span>

        <div className='panefix'>
        {Editor()}
        </div>
        </div>

        <div className='pane'><span className='handle'>{"CSS (index.css)"}
        <div className="right">
        <button onClick={() => (0) /*clearCSS*/ }>
        {"Clear"}
        </button>
        </div>
        </span>

               <div className='panefix'>
{Editor()}
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
        <div className='pane'><span className='handle'>{"ES6/JSX => ES5 JavaScript (index.js)"}

        <div className="right">
        <button onClick={() => (0) /*clearJSX*/ }>      
        {"Clear"}
        </button>
        </div>
        </span>

          <div className='panefix'>
{Editor()}
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
        <div className='pane'><span className='handle'>{"Console"}</span>
        <div className='panefix'>
{Editor()}
                    </div>
               </div>
               <div className='pane'><span className='handle'>{"WebBrowser"}</span>
                    <div className='panefix'>
                      <WebView/>
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

      console.log(DOMpaneContainer1);

      dragula([DOMpaneContainer1,
        DOMpaneContainer2,
        DOMpaneContainer3
      ], {
        moves(el, container, handle) {
          return handle.className === 'handle';
        }
      });


      //  clearHTML();
      //  clearCSS();
      //    clearJSX();

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
/*


  const __codeHTML = __();
  const __codeCSS = __();
  const __codeJSX = __();

  const timeseqHTML = __([__interval5, __codeHTML])
    .tMap(([interval, code]) => {
      console.log('@@@@@@@@@');
      console.log(code);

      evaluate({
        filename: __dirname + '/code/index.html',
        data: code,
        f: webReload
      });

    });

  const timeseqCSS = __([__interval5, __codeCSS])
    .tMap(([interval, code]) => {
      console.log(code);

      evaluate({
        filename: __dirname + '/code/index.css',
        data: code,
        f: webReload
      });
    });

  const timeseqJSX = __([__interval5, __codeJSX])
    .tMap(([interval, code]) => {
      console.log(code);

      evaluate({
        filename: __dirname + '/code/index.jsx',
        data: code,
        f: () => {

          babel.stdout
            .on('data', (data) => {
              console.log(`stdout: ${data}`);

              webpack.stdout
                .on('data', (data) => {
                  console.log(`stdout: ${data}`);

                  webReload();
                });

            });

          babel.stderr
            .on('data', (data) => {
              console.log(`stderr: ${data}`);
            });
        }
      });
    });

  const __webReloadBeacon = __();

  const __interval500 = __.intervalSeq(500)
    .tMap((tt, t0) => (tt - t0) / 1000);

  const webReload = () => {
    console.log("webReload");
    __webReloadBeacon.t = __interval500.t;

    console.log(__webReloadBeacon.t);
  };

  const timeseq = __webReloadBeacon
    .tMap((val) => {

      console.log("===+++++++++=webview");
      console.log(val);
    });

  const fs = require('fs');
  const evaluate = (obj) => {
    console.log("!!!evaluate");
    fs.writeFile(obj.filename, obj.data,
      (err) => {
        if (err) {
          throw err;
        } else {
          obj.f();
        }
      });
  };


  const spawn = require('child_process').spawn;

  //babel ./index.jsx -o ./index0.js; webpack ./index0.js ./index.js;
  const babel = spawn(__dirname + '/node_modules/.bin/babel'
    , [__dirname + '/code/index.jsx', '-o', __dirname + '/code/index0.js;']);

  const webpack = spawn(__dirname + '/node_modules/.bin/webpack'
    , [__dirname + '/code/index0.js', __dirname + '/code/index.js;']);



  //========================================



  */
/*




  // __val ={__codeHTML}


  const clearHTML = () => {
    fs.readFile(__dirname + '/code_template/index.html', 'utf8',
      (err, data) => {
        if (err)
          throw err;

        __codeHTML.t = data;
      });
  };

  const clearCSS = () => {
    fs.readFile(__dirname + '/code_template/index.css',
      'utf8',
      (err, data) => {
        if (err)
          throw err;

        __codeCSS.t = data;
      });
  };

  const clearJSX = () => {
    fs.readFile(__dirname + '/code_template/index.jsx',
      'utf8',
      (err, data) => {
        if (err)
          throw err;

        __codeJSX.t = data;
      });
  };

  //============================

  (() => {
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
  })();


  //============================


*/
//===================================
})();
