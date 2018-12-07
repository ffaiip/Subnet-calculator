<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 class="info--text">Subnet calculator</h1>
          </v-card-title>
          <v-layout row>
            <v-flex xs2>
              <v-card-text>
                <div>Class</div>
              </v-card-text>
              <v-card-text>
                <h4>{{ this.classIP }}</h4>
              </v-card-text>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
              <v-card-text>
                <div>IP address</div>
                <h4>{{ this.ip }}</h4>
              </v-card-text>
              <v-layout>
                <v-flex xs2>
                  <v-text-field
                    class="pl-3"
                    name="ip1"
                    id="ip1"
                    v-model="ip1"
                    maxlength="3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    class="pl-1 ml-1"
                    name="ip2"
                    id="ip2"
                    v-model="ip2"
                    maxlength="3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    class="pl-1 ml-1"
                    name="ip3"
                    id="ip3"
                    v-model="ip3"
                    maxlength="3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    class="pl-1 ml-1"
                    name="ip4"
                    id="ip4"
                    v-model="ip4"
                    maxlength="3"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-card-text>
                <div>Require</div>
              </v-card-text>
              <v-layout row>
                <v-flex xs3>
                  <v-text-field class="pl-3" name="amount" id="amount" v-model="amount" required></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-combobox class="pl-2 ml-1" v-model="hosts" :items="hostsNet"></v-combobox>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-card-text>
                <div>Subnet mask</div>
              </v-card-text>
              <v-layout row>
                <v-flex xs3>
                  <v-card-text>
                    <h4 class="headline mb-0">{{ this.subnetMask }}</h4>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-card-text>
                <div>Range</div>
              </v-card-text>
              <v-layout row>
                <v-flex xs6>
                  <v-text-card>{{ this.firstAdd }}</v-text-card>
                </v-flex>
                <v-flex xs4>
                  <v-text-card>{{ this.lastAdd }}</v-text-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-card-text>
                <div>Subnet ID</div>
              </v-card-text>
              <v-layout row>
                <v-flex xs3>
                  <v-card-text>
                    <h4 class="headline mb-0">{{ this.subnetID}}</h4>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-card-text>
                <div>Broadcast</div>
              </v-card-text>
              <v-layout>
                <v-flex xs3>
                  <v-card-text>
                    <h4 class="headline mb-0">{{ this.broadcast }}</h4>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="success" @click="addInfo">Calculate</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import 'node-ipv4';

export default {
  data() {
    return {
      ip1: "",
      ip2: "",
      ip3: "",
      ip4: "",
      amount: "",
      hosts: "",
      firstAdd: "",
      lastAdd: "",
      hostsNet: ["Hosts per Network"],
      subnetMask: "0.0.0.0",
      broadcast: "",
      subnetID: "",
      subn: ""
    };
  },
  computed: {
    classIP() {
      if (this.ip1 == "") {
        return " ";
      }
      if (this.ip1 <= 127) {
        return "A";
      } else if (this.ip1 <= 191 && this.ip1 >= 128) {
        return "B";
      } else if (this.ip1 >= 192 && this.ip1 <= 223) {
        return "C";
      } else if (this.ip1 > 223) {
        this.ip1 = "";
        alert("Not include in any class");
        return;
      } else {
        this.ip1 = "";
        alert("please input on the number ");
        return;
      }
    },
    ip() {
      var p2 = parseInt(this.ip2);
      var p3 = parseInt(this.ip3);
      var p4 = parseInt(this.ip4);
      var require = parseInt(this.amount);

      if (!Number.isInteger(p2) && this.ip2 != "") {
        this.ip2 = "";
        alert("please input on the number ");
        return;
      } else if (!Number.isInteger(p3) && this.ip3 != "") {
        this.ip3 = "";
        alert("please input on the number ");
        return;
      } else if (!Number.isInteger(p4) && this.ip4 != "") {
        this.ip4 = "";
        alert("please input on the number ");
        return;
      } else if (!Number.isInteger(require) && this.amount != "") {
        this.amount = "";
        alert("please input on the number ");
        return;
      }

    }
  },
  methods: {
    addInfo() {
      this.Calculate(this.classIP, this.amount);
    },
    requireHost(input, cls) {
      //cla = this.classip
      //inp = this.amount
      var i = 0;
      while (Math.pow(2, i) < input) i++;
      console.log(i);
      return i;
    },

    fibo(m, n) {
      //count m to n
      var s = 0;
      for (var i = m - 1; i < n; i++) {
        s += Math.pow(2, i);
      }
      console.log(s);
      return s;
    },

    subnet_mark_host(cls) {
      var h = this.requireHost(this.amount, cls);
      switch (cls) {
        case "A":
          console.log("1");
          if (h >= 16) {
            var k = 24 - h;
            return `255.${this.fibo(8 - k +1, 8)}.0.0`;
          } else if (h < 16 && h >= 8) {
            var k = 16 - h;
            return `255.255.${this.fibo(8 - k +1, 8)}.0`;
          } else if (h < 8) {
            return `255.255.255.${this.fibo(h, 8)}`;
          }
        case "B":
          console.log("2");
          if (h > 8) {
            var k = 16 - h;
            console.log(`255.255.${this.fibo(k, 8)}.0`);
            return `255.255.${this.fibo(8 - k+1, 8)}.0`;
          } else if (h <= 8) {
            console.log("b");
            return `255.255.255.${this.fibo(h, 8)}`;
          }
        case "C":
          console.log("3");
          return `255.255.255.${this.fibo(h, 8)}`;
        default:
          return `0.0.0.0`;
      }
    },

    last_host(cls, del) {
      var h = this.requireHost(this.amount, cls) - 1;
      switch (cls) {
        case "A":
          if (h >= 16) {
            var k = 24 - h;
            var m = this.requireHost(this.ip2, cls);
            if(m > k) return `${this.ip1}.${(parseInt(this.amount/255)-1) + parseInt(this.ip2)-2}.255.${255 - del}`;
            return `${this.ip1}.${this.ip2}.255.${255 - del}`;
          } else if (h < 16 && h >= 8) {
            var k = 16 - h;
            var n = this.requireHost(this.ip3, cls);
            if(n < k) return `${this.ip1}.${this.ip2}.${(parseInt(this.amount/255)-1) + parseInt(this.ip3)}.${255 - del}`;
            return `${this.ip1}.${this.ip2}.${parseInt(this.ip3) + 1}.${255 - del}`;
          } else if (h < 8) {
            var l = parseInt(this.ip4 - 1) + parseInt(this.amount);
            if(parseInt(this.ip4)+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${l - del}`;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${this.amount - del}`;
          }
        case "B":
          if (h >= 8) {
            var k = 16 - h;
            var n = this.requireHost(this.ip3, cls);
            if(n < k) return `${this.ip1}.${this.ip2}.${(parseInt(this.amount/255)-1) + parseInt(this.ip3)}.${255 - del}`;
            return `${this.ip1}.${this.ip2}.${parseInt(this.ip3) + 1}.${255 - del}`;
          } else if (h < 8) {
            var l = parseInt(this.ip4) + parseInt(this.amount);
            if(parseInt(this.ip4)+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${l - del}`;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${this.amount - del}`;
          }
        case "C":
          var l = parseInt(this.ip4 - 1) + parseInt(this.amount);
          if(parseInt(this.ip4)+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${l - del}`;
          return `${this.ip1}.${this.ip2}.${this.ip3}.${(parseInt(this.amount)+1) - del}`;
        default:
          break;
      }
    },

    subnet(cls, add) {
      var h = this.requireHost(this.amount, cls) - 1;
      switch (cls) {
        case "A":
          if (h > 16) {
            var k = 24 - h;
            var m = this.requireHost(this.ip2, cls);
            if(m > k) return `${this.ip1}.${parseInt(this.ip2) - 2}.0.${0 + add}`;
            return `${this.ip1}.${this.ip2}.0.${0 + add}`;
          } else if (h <= 16 && h > 8) {
            var k = 16 - h;
            var n = this.requireHost(this.ip3, cls);
            if(n < k) return `${this.ip1}.${this.ip2}.${parseInt(this.ip3) - 2}.${0 + add}`;
            return `${this.ip1}.${this.ip2}.0.${0 + add}`;
          } else if (h <= 8) {
            if(this.ip4+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${parseInt(this.ip4) - 2 + add}`;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${0 + add}`;
          }
        case "B":
          if (h > 8) {
            var k = 16 - h;
            var n = this.requireHost(this.ip2, cls);
            if(n < k) return `${this.ip1}.${this.ip2}.${parseInt(this.ip3) - 2}.${0 + add}`;
            return `${this.ip1}.${this.ip2}.0.${0 + add}`;
          } else if (h < 8) {
            if(this.ip4+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${parseInt(this.ip4) - 2 + add}`;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${0 + add}`;
          }
        case "C":
        console.log(parseInt(this.ip4)+2)
          if(parseInt(this.ip4)+2 > this.amount) return `${this.ip1}.${this.ip2}.${this.ip3}.${parseInt(this.ip4) - 2 + add}`;
          return `${this.ip1}.${this.ip2}.${this.ip3}.${0 + add}`;
        default:
          break;
      }
    },
    sub(ip, host){
      
      const ipv4 = require('node-ipv4');
 
      ipv4.parse(ip, host, (err, subnet) => { 
        if (err) return console.error(err);

        this.subn = subnet;
        console.log(subnet);
      });

    },
    mask(input, cls){
      switch (cls) {
        case 'A':
          return 36 - input;
        case 'B':
          return 36 - input;
        case 'C':
          return 36 - input;    
      
        default:
          break;
      }

    },

    Calculate(cls, input) {
      var ip = `${this.ip1}.${this.ip2}.${this.ip3}.${this.ip4}`;
      
      console.log(this.subn);
      if (this.hosts == "Hosts per Network") {
        this.sub(ip, this.mask(this.requireHost(input, cls), cls));
        this.subnetMask = this.subnet_mark_host(cls);
        this.firstAdd = this.subnet(cls, 1);
        this.lastAdd = this.last_host(cls, 1);
        this.broadcast = this.last_host(cls, 0);
        this.subnetID = this.subnet(cls, 0);

        alert("Success!");
      } else {
        alert("Please select the require host");
        return;
      }
    }
  }
};
</script>

