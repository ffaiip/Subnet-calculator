hostIp(cls, req) {
    //req = this.requireHost(this.amount, cls)
    let list = [];
    let sublist = [];
    var x = 0;
    switch (cls) {
      case "A":
      console.log('เข้าบ่')
        for (var i = 0; i < req; i++) {
          for (var j = 0; j < 256; j++) {
              for (var k = 0; k < 256; k++) {
                  list.push(`${this.ip1}.${Math.pow(2, i)}.${j}.${k}`);
          console.log(list)
              }
          }
          sublist.push(list[x]);
          x++;
          list = [];
        }
        return sublist;
      case "B":
        for (var i = 0; i < (16 - req); i++) {
          for (var j = 0; j < 256; j++) {
            list.push(`${this.ip1}.${this.ip2}.${Math.pow(2, i)}.${j}`);
          }
          sublist.push(list[x]);
          x++;
          list = [];
        }
        return sublist;
      case "C":
        for (var i = 0; i < req; i++) {
          sublist.push(
            `${this.ip1}.${this.ip2}.${this.ip3}.${Math.pow(2, i)}`
          );
          x++;
          list = [];
        }
        return sublist;
      default:
        break;
    }
  },

  netIp(cls, req) {
    let list = [];
    let sublist = [];
    var x = 0;
    switch (cls) {
      case "A":
        if (k <= 8) {
          for (var i = 0; i < 8 - req; i++) {
            for (var j = 0; j < 256; j++) {
              for (var k = 0; k < 256; k++) {
                list.push(`${this.ip1}.${Math.pow(2, i)}.${j}.${k}`);
              }
            }
            sublist.push(list[x]);
            x++;
            list = [];
          }
        } else if (k <= 16 && k > 8) {
          for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 16 - req; j++) {
              for (var k = 0; k < 256; k++) {
                list.push(`${this.ip1}.${i}.${Math.pow(2, j)}.${k}`);
              }
              this.sublist.push(list[x]);
              x++;
              list = [];
            }
          }
        } else if (k > 16) {
          for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 256; j++) {
              for (var k = 0; k < 24 - req; k++) {
                list.push(`${this.ip1}.${i}.${j}.${Math.pow(2, k)}`);
                this.sublist.push(list[x]);
                x++;
                list = [];
              }
            }
          }
        }
        return sublist;
      case "B":
        if (k <= 8) {
          for (var i = 0; i < 8 - req; i++) {
            for (var j = 0; j < 256; j++) {
              list.push(`${this.ip1}.${this.ip2}.${Math.pow(2, i)}.${j}`);
            }
            this.sublist.push(list[x]);
            x++;
            list = [];
          }
        } else if (k > 8) {
          for (var i = 0; i < 256; i++) {
            for (var j = 0; j < 16 - req; j++) {
              list.push(`${this.ip1}.${this.ip2}.${i}.${Math.pow(2, j)}`);
              this.sublist.push(list[x]);
              x++;
              list = [];
            }
          }
        }
        return sublist;
      case "C":
        for (var i = 0; i < 8 - req; i++) {
          this.sublist.push(
            `${this.ip1}.${this.ip2}.${this.ip3}.${Math.pow(2, i)}`
          );
          x++;
          list = [];
        }
        return sublist;
      default:
        break;
    }
  },