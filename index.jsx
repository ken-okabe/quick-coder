(() => {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  //var Immutable = require('immutable');
  var __ = require('timeengine');

//================================
/*
  var __interval5 = __.intervalSeq(3000)
    .tMap((tt, t0) => (tt - t0) / 1000);

  var timelineinterval = __interval5
    .tMap((t) => {
      //console.log(t);
    });

  var __codeHTML = __();
  var __codeCSS = __();
  var __codeJSX = __();

  var timeseqHTML = __([__interval5, __codeHTML])
    .tMap(([interval, code]) => {
      console.log('@@@@@@@@@');
      console.log(code);

      evaluate({
        filename: __dirname + '/code/index.html',
        data: code,
        f: webReload
      });

    });

  var timeseqCSS = __([__interval5, __codeCSS])
    .tMap(([interval, code]) => {
      console.log(code);

      evaluate({
        filename: __dirname + '/code/index.css',
        data: code,
        f: webReload
      });
    });

  var timeseqJSX = __([__interval5, __codeJSX])
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

  var __webReloadBeacon = __();

  var __interval500 = __.intervalSeq(500)
    .tMap((tt, t0) => (tt - t0) / 1000);

  var webReload = () => {
    console.log("webReload");
    __webReloadBeacon.t = __interval500.t;

    console.log(__webReloadBeacon.t);
  };

  var timeseq = __webReloadBeacon
    .tMap((val) => {

      console.log("===+++++++++=webview");
      console.log(val);
    });

  var fs = require('fs');
  var evaluate = (obj) => {
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

  var SplitPane = require('react-split-pane');
  var dragula = require('react-dragula');

  var brace = require('brace');

  /*
    var AceEditor = React.createClass({
      propTypes: {
        mode: React.PropTypes.string,
        theme: React.PropTypes.string,
        name: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        showGutter: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        defaultValue: React.PropTypes.string,
        value: React.PropTypes.string,
        onLoad: React.PropTypes.func,
        maxLines: React.PropTypes.number,
        readOnly: React.PropTypes.bool,
        highlightActiveLine: React.PropTypes.bool,
        showPrintMargin: React.PropTypes.bool,
        selectFirstLine: React.PropTypes.bool,
        wrapEnabled: React.PropTypes.bool,


      },
      getDefaultProps() {
        return {
          name: 'brace-editor',
          mode: '',
          theme: '',
          height: '500px',
          width: '500px',
          defaultValue: '',
          value: '',
          fontSize: 12,
          showGutter: true,
          onChange: null,
          onLoad: null,
          maxLines: null,
          readOnly: false,
          highlightActiveLine: true,
          showPrintMargin: true,
          selectFirstLine: false,
          wrapEnabled: false
        };
      },
      onChange() {
        if (this.props.onChange) {
          const value = this.editor.getValue();
          this.props.onChange(value);
        }
      },
      componentDidMount() {
        this.editor = brace.edit(this.props.name);
        this.editor.$blockScrolling = Infinity;
        this.editor.getSession().setMode('ace/mode/' + this.props.mode);
        this.editor.setTheme('ace/theme/' + this.props.theme);
        this.editor.setFontSize(this.props.fontSize);
        this.editor.on('change', this.onChange);
        this.editor.setValue(this.props.defaultValue || this.props.value, (this.props.selectFirstLine === true ? -1 : null));
        this.editor.setOption('maxLines', this.props.maxLines);
        this.editor.setOption('readOnly', this.props.readOnly);
        this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
        this.editor.setShowPrintMargin(this.props.setShowPrintMargin);
        this.editor.getSession().setUseWrapMode(this.props.wrapEnabled);
        this.editor.renderer.setShowGutter(this.props.showGutter);

        if (this.props.onLoad) {
          this.props.onLoad(this.editor);
        }

        var timeseq = this.props.__val
          .tMap((val) => {

            this.editor.setValue(val);

          });
      },

      componentWillReceiveProps(nextProps) {
        let currentRange = this.editor.selection.getRange();

        // only update props if they are changed
        if (nextProps.mode !== this.props.mode) {
          this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
        }
        if (nextProps.theme !== this.props.theme) {
          this.editor.setTheme('ace/theme/' + nextProps.theme);
        }
        if (nextProps.fontSize !== this.props.fontSize) {
          this.editor.setFontSize(nextProps.fontSize);
        }
        if (nextProps.maxLines !== this.props.maxLines) {
          this.editor.setOption('maxLines', nextProps.maxLines);
        }
        if (nextProps.readOnly !== this.props.readOnly) {
          this.editor.setOption('readOnly', nextProps.readOnly);
        }
        if (nextProps.highlightActiveLine !== this.props.highlightActiveLine) {
          this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
        }
        if (nextProps.setShowPrintMargin !== this.props.setShowPrintMargin) {
          this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
        }
        if (nextProps.wrapEnabled !== this.props.wrapEnabled) {
          this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
        }
        if (nextProps.value && this.editor.getValue() !== nextProps.value) {
          this.editor.setValue(nextProps.value, (this.props.selectFirstLine === true ? -1 : null));
          if (currentRange && typeof currentRange === "object") {
            this.editor.getSession().getSelection().setSelectionRange(currentRange);
          }
        }
        if (nextProps.showGutter !== this.props.showGutter) {
          this.editor.renderer.setShowGutter(nextProps.showGutter);
        }
      },

      render() {
        const divStyle = {
          width: this.props.width,
          height: this.props.height,
        };

        return React.DOM.div({
          id: this.props.name,
          onChange: this.onChange,
          style: divStyle,
        });
      }
    });

  */
/*
  require('brace/mode/html');
  require('brace/mode/css');
  require('brace/mode/jsx');
  require('brace/mode/javascript');
  require('brace/mode/text');
  require('brace/theme/monokai');
  require('brace/theme/chrome');


  var seqComponent = (__seq) => {

    class SeqComponent extends React.Component {
      constructor() {
        super();
        this.state = {
          seq: __seq.t
        };
        var timeseq = __seq
          .tMap((val) => {
            this.setState({
              seq: val
            });
          });
      }
      render() {
        return (<span> {this.state.seq}</span> );
      };
    }

    return (<SeqComponent/>);
  };

  var AceHTML = () => {
    return (<AceEditor
      mode="html"
      theme="monokai"
      name="HTML"
      editorProps={{
        $blockScrolling: true
      }}
      width="100%" height="100%"
      __val = {__codeHTML}
      onChange = {(newVal) => {
        console.log('onChange');
        __codeHTML.t = newVal;
      }}
      />);
  };

  // __val ={__codeHTML}
  var WebView = React.createClass({
    render() {
      return (<webview  src="http://localhost:17890"></webview>
        );
    },
    componentDidMount() {
      var webview1 = ReactDOM.findDOMNode(this);

      var timeseq = __webReloadBeacon
        .tMap((val) => {

          console.log("=============webview");
          console.log(val);
          webview1.reload();
        });

    }
  });

  var clearHTML = () => {
    fs.readFile(__dirname + '/code_template/index.html', 'utf8',
      (err, data) => {
        if (err)
          throw err;

        __codeHTML.t = data;
      });
  };

  var clearCSS = () => {
    fs.readFile(__dirname + '/code_template/index.css',
      'utf8',
      (err, data) => {
        if (err)
          throw err;

        __codeCSS.t = data;
      });
  };

  var clearJSX = () => {
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
    var port = 17890;
    var directory = "./code";

    var http = require('http');
    var url = require('url');
    var path = require("path");
    var fs = require('fs');

    var mimeTypes = {
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

    var request = (req, res) => {
      var uri = url.parse(req.url).pathname;
      var dir = path.join(__dirname, directory);
      var filepath = path.join(dir, unescape(uri));
      var indexfilepath = path.join(dir, unescape('index.html'));

      console.info('filepath', filepath);

      var f = (err, stats) => {
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
          var mimeType = mimeTypes[path.extname(filepath).split(".")[1]];
          res
            .writeHead(200,
              {
                'Content-Type': mimeType
              });

          var fileStream = fs
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

          var fileStream2 = fs
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

      var component = fs.stat(filepath, f);
      return;
    };

    var serverUp = () => {
      console.info('HTTP server listening', port);
      return;
    };

    var server = http
      .createServer(request)
      .listen(port, serverUp);
  })();


  //============================

  var App = React.createClass({
    render() {
      return (

        <SplitPane split="vertical" minSize="50" defaultSize="450">

              <div className='paneContainer' ref="paneContainer1">
                     <div className='pane'><span className='handle'>HTML (index.html)
                     <button onClick={clearHTML}>
                     Clear
                     </button></span>

                     <div className='panefix'>
                     {AceHTML()}
                      </div>
                     </div>

                     <div className='pane'><span className='handle'>CSS (index.css)
                     <button onClick={clearCSS}>
                     Clear
                     </button></span>

                     <div className='panefix'>

                      </div>


                     </div>
              </div>

              <SplitPane split="vertical" minSize="50">

                    <div className='paneContainer' ref="paneContainer2">
                        <div className='pane'><span className='handle'>JavaScript (babel index.jsx -o index0.js; webpack index0.js index.js;)  babelrc=["es2015","react"]

                        <button onClick={clearJSX}>
                        Clear
                        </button></span>

                        <div className='panefix'>

                         </div>
                        </div>
                    </div>

                    <div className='paneContainer' ref="paneContainer3">
                           <div className='pane'><span className='handle'>Console</span>
<div className='panefix'>

 </div>
                           </div>
                           <div className='pane'><span className='handle'>WebBrowser</span>
              <div className='panefix'>

              <WebView/>


              </div>
                           </div>
                    </div>
              </SplitPane>
        </SplitPane>

        );
    },
    componentDidMount() {
      var paneContainer1 = ReactDOM.findDOMNode(this.refs.paneContainer1);
      var paneContainer2 = ReactDOM.findDOMNode(this.refs.paneContainer2);
      var paneContainer3 = ReactDOM.findDOMNode(this.refs.paneContainer3);

      dragula([paneContainer1,
        paneContainer2,
        paneContainer3
      ], {
        moves(el, container, handle) {
          return handle.className === 'handle';
        }
      });

      clearHTML();
      clearCSS();
      clearJSX();

    }
  });


  var mount = ReactDOM.render(<App />, document.getElementById('container'));
*/
//===================================
})();
