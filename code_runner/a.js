class Code {
    static list = require("./settings.json");
    static fs = require("fs");
    constructor(
      code = "print('Hello World')", //default code
      lang = "py", //language
      fn = "test", //file name
      args = "" //arguments
    ) {
      this.code = code;
      const path = require("path");
      this.fn = path.join(__dirname, fn) + "." + lang; //for platform independence
      this.run_com = Code.replace(Code.list[lang], this.fn, args);
      this._output = "Server not responding";
      this._error = "Server not responding";
    }
  
    file_exists() {
      return Code.fs.existsSync(`${this.fn}`);
    }
  
    make_file() {
      Code.fs.writeFile(`${this.fn}`, this.code, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  
    run_file() {
      if (!this.file_exists()) this.make_file();
  
    //   const exec = require("child_process").execSync;
    //   var result = exec(this.run_com);
    //   console.log(result.stdout,typeof(result.stdout),result);
    const exec = require("child_process").execSync;

var result = exec("python test.py");

// convert and show the output.
    console.log(result.toString("utf8"));
    }
  
    get error() {
      return this._error;
    }
  
    get output() {
      return this._output;
    }
  
    static replace(
      s //replace {}
    ) {
      const arg = Object.values(arguments).slice(1); //convert obj to array removing s
      for (let i in arg) {
        s = s.replace("{}", arg[i]);
      }
      return s;
    }
  }
  
  a = new Code("print('exd')");
  a.run_file();
  