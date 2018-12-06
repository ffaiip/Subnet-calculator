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
                            </v-card-text>
                            <v-layout>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-3"
                                        name="ip1"
                                        id="ip1"
                                        v-model="ip1"
                                        maxlength="3"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip2"
                                        id="ip2"
                                        v-model="ip2"
                                        maxlength="3"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip3"
                                        id="ip3"
                                        v-model="ip3"
                                        maxlength="3"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip4"
                                        id="ip4"
                                        v-model="ip4"
                                        maxlength="3"
                                        required>
                                    </v-text-field>
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
                                    <v-text-field
                                        class="pl-3"
                                        name="amount"
                                        id="amount"
                                        v-model="amount"
                                        required
                                    ></v-text-field>
                                </v-flex>    
                                <v-flex xs5>
                                    <v-combobox
                                        class="pl-2 ml-1"
                                        v-model="hosts"
                                        :items="hostsNet"
                                    ></v-combobox>
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
                                    <v-text-card>
                                        {{ this.firstAdd }}
                                    </v-text-card>
                                </v-flex>
                                <v-flex xs4>
                                    <v-text-card>
                                        {{ this.lastAdd }}
                                    </v-text-card>
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
                        <v-btn
                        class="success"
                        @click="addInfo"
                        >Calculate</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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
      hostsNet: ["Hosts per Network", "Networks"],
      subnetMask: "0.0.0.0",
      broadcast: "",
      subnetID: ""
    };
  },
  computed: {
    classIP() {
      if (this.ip1 == "") {
        return " ";
      } else if (this.ip1 <= 127) {
        return "A";
      } else if (this.ip1 <= 191 && this.ip1 >= 128) {
        return "B";
      } else if (this.ip1 >= 192 && this.ip1 <= 223) {
        return "C";
      }
    },
    ip() {
      if (this.classIP == "C") {
        return this.ip4 == "0";
      } else if (this.classIP == "B") {
        return this.ip3 == "0", this.ip4 == "0";
      }
    }
  },
  methods: {
    addInfo() {
      this.Calculate(this.classIP, this.amount);
    },
    requireHost(input, cls) {
      //require = this.hosts
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
      for (var i = m; i < n; i++) {
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
          if (h > 16) {
            var k = 24 - h;
            return `255.${this.fibo(8 - k, 8)}.0.0`;
          } else if (h <= 16 && h > 8) {
            var k = 16 - h;
            return `255.255.${this.fibo(8 - k, 8)}.0`;
          } else if (h <= 8) {
            return `255.255.255.${this.fibo(h, 8)}`;
          }
        case "B":
          console.log("2");
          if (h > 8) {
            var k = 16 - h;
            console.log(`255.255.${this.fibo(k, 8)}.0`);
            return `255.255.${this.fibo(8 - k, 8)}.0`;
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

    subnet_mark_network(cls) {
      var k = this.requireHost(this.amount, cls);

      switch (cls) {
        case "A":
          console.log("4");
          if (k <= 8) {
            return `255.${this.fibo(k, 8)}.0.0`;
          } else if (k <= 16 && k > 8) {
            var h = 16 - k;
            return `255.255.${this.fibo(h, 8)}.0`;
          } else if (k > 16) {
            var h = 24 - k;
            return `255.255.255.${this.fibo(h, 8)}`;
          }
          break;
        case "B":
          console.log("5");
          if (k <= 8) {
            return `255.255.${this.fibo(k, 8)}.0`;
          } else if (k > 8) {
            var h = 16 - k;
            return `255.255.255.${this.fibo(h, 8)}`;
          }
        case "C":
          console.log("6");
          return `255.255.255.${this.fibo(k, 8)}`;
        default:
          return `0.0.0.0`;
      }
    },
    last_host(cls, del) {
      var h = this.requireHost(this.amount, cls) - 1;
      switch (cls) {
        case "A":
          if (h > 16) {
            var k = 24 - h;
            return `${this.ip1}.255.255.${255 - del}`;
          } else if (h <= 16 && h > 8) {
            var k = 16 - h;
            return `${this.ip1}.${this.ip2}.255.${255 - del}`;
          } else if (h <= 8) {
            return `${this.ip1}.${this.ip2}.${this.ip3}.${255- del}`;
          }
        case "B":
          if (h > 8) {
            var k = 16 - h;
            return `${this.ip1}.${this.ip2}.255.${255 - del}`;
          }  else if (h <= 8) {
            return `${this.ip1}.${this.ip2}.${this.ip3}.${255 - del}`;
          }
        case "C":
          return `${this.ip1}.${this.ip2}.${this.ip3}.${255 - del}`;
        default:
          break;
      }
    },
    last_net(cls, del) {
      var k = this.requireHost(this.amount, cls) - 1;
      switch (cls) {
        case "A":
          if (k <= 8) {
            return `${this.ip1}.255.255.${255 - del}`;
          } else if (k <= 16 && k > 8) {
            var h = 16 - k;
            return `${this.ip1}.${this.ip2}.255.${255 - del}`;
          } else if (k > 16) {
            var h = 24 - k;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${255 - del}`;
          }
        case "B":
          if (k <= 8) {
            return `${this.ip1}.${this.ip2}.255.${255 - del}`;
          } else if (k > 8) {
            var h = 16 - k;
            return `${this.ip1}.${this.ip2}.${this.ip3}.${255 - del}`;
          }
        case "C":
          return `${this.ip1}.${this.ip2}.${this.ip3}.${255 - del}`;
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
            return `${this.ip1}.0.0.${0 + add}`;
          } else if (h <= 16 && h > 8) {
            var k = 16 - h;
            return `${this.ip1}.${this.ip2 - 1}.0.${0 + add}`;
          } else if (h <= 8) {
            return `${this.ip1}.${this.ip2}.${this.ip3 - 1}.${0 + add}`;
          }
        case "B":
          if (h > 8) {
            var k = 16 - h;
            return `${this.ip1}.${this.ip2}.0.${0 + add}`;
          } else if (h < 8) {
            return `${this.ip1}.${this.ip2}.${this.ip3 - 1}.${0 + add}`;
          }
        case "C":
          return `${this.ip1}.${this.ip2}.${this.ip3}.${0 + add}`;
        default:
          break;
      }
    },

    Calculate(cls, input) {
      if (this.hosts == "Hosts per Network") {
        this.subnetMask = this.subnet_mark_host(this.classIP);
        this.firstAdd = this.subnet(this.classIP, 1);
        this.lastAdd = this.last_host(this.classIP, 1);
        this.broadcast = this.last_host(this.classIP, 0);
        this.subnetID = this.subnet(this.classIP, 0);
      } else {
        this.subnetMask = this.subnet_mark_network(this.classIP);
        this.firstAdd = this.subnet(this.classIP, 1);
        this.lastAdd = this.last_net(this.classIP, 1);
        this.broadcast = this.last_net(this.classIP, 0);
        this.subnetID = this.subnet(this.classIP, 0);

        alert("Success!");
      }
    }
  }
};
</script>

