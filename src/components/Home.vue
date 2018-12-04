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
                                <h3>Class</h3>
                            </v-card-text>
                            <v-combobox
                                class="pl-3"
                                v-model="classIP"
                                :items="classes"
                            ></v-combobox>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs6>
                            <v-card-text>
                                <h3>IP address</h3>
                            </v-card-text>
                            <v-layout>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-3"
                                        name="ip1"
                                        id="ip1"
                                        v-model="ip1"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip2"
                                        id="ip2"
                                        v-model="ip2"
                                        :label="defaultA"
                                        :disabled="classA"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip3"
                                        id="ip3"
                                        v-model="ip3"
                                        :label="defaultB"
                                        :disabled="classB"
                                        required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-text-field
                                        class="pl-1 ml-1"
                                        name="ip4"
                                        id="ip4"
                                        v-model="ip4"
                                        :label="defaultC"
                                        :disabled="classC"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs6>
                            <v-card-text>
                                <h3>Require</h3>
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
                                <h3>Subnet mask</h3>
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
        <v-layout row>
            <v-flex xs12>
                <!-- <v-data-table
                    :headers="headers"
                    :items="subnets"
                    class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.number }}</td>
                        <td class="text-xs-right">{{ props.item.subnetID }}</td>
                        <td class="text-xs-right">{{ props.item.first }}</td>
                        <td class="text-xs-right">{{ props.item.last }}</td>
                        <td class="text-xs-right">{{ props.item.broadcast }}</td>
                        </template>
                </v-data-table> -->
                <template>
                    <v-card>

                    </v-card>
                </template>
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
      classIP: "",
      classes: ["A", "B", "C"],
      hostsNet: ["Hosts per Network", "Networks"],
      subnetMask: "0.0.0.0",
      headers: [
        {
          text: "Subnet",
          align: "left",
          value: "number"
        },
        { text: "Subnet ID", value: "subnetID", sortable: false },
        { text: "First add", value: "first", sortable: false },
        { text: "Last add", value: "last", sortable: false },
        { text: "Broadcast", value: "broadcast", sortable: false }
      ],
      // subnetRow: {
      //     value: false,
      //     number: '',
      //     subnetID: '',
      //     first: '',
      //     last: '',
      //     broadcast: '',
      // },
      subnets: []
    };
  },
  computed: {
    defaultC() {
      if (this.classIP == "C" || this.classIP == "B" || this.classIP == "A") {
        return "0";
      }
    },
    defaultB() {
      if (this.classIP == "B" || this.classIP == "A") {
        return "0";
      }
    },
    defaultA() {
      if (this.classIP == "A") {
        return "0";
      }
    },
    classC() {
      return this.classIP == "C" || this.classIP == "B" || this.classIP == "A";
    },
    classB() {
      return this.classIP == "B" || this.classIP == "A";
    },
    classA() {
      return this.classIP == "A";
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
      if (this.ip4 != 0) {
        alert("ข้อมูลใช้ไม่ได้ ใส่ใหม่ว้อยยยยย");
      } else {
        this.Calculate(this.classIP, this.amount);
      }
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
    checkClass(ipNumber) {
      if (ipNumber <= 127) return "A";
      else if (ipNumber >= 128 && ipNumber <= 191) return "B";
      else if (ipNumber >= 192 && ipNumber <= 223) return "C";
    },
    range_host(cls) {
        var h = this.requireHost(this.amount, cls);
      switch (cls) {
        case "A":
          if (h > 16) {
            var k = 24 - h;
            return `${this.ip1}.${Math.pow(2, k)}.255.255`;
          } else if (h <= 16 && h > 8) {
            var k = 16 - h;
            return `${this.ip1}.255.${Math.pow(2, k)}.255`;
          } else if (h <= 8) {
            return `${this.ip1}.255.255.${Math.pow(2, h)}`;
          }
        case "B":
          if (h > 8) {
            var k = 16 - h;
            return `${this.ip1}.${this.ip2}.${Math.pow(2, k)}.255`;
          } else if (h <= 8) {
            return `${this.ip1}.${this.ip2}.255.${Math.pow(2, h)}`;
          }
        case "C":
          return `${this.ip1}.${this.ip2}.${this.ip3}.${Math.pow(2, h)}`;
        default:
          break;
      }
    },
    range_net(cls) {
      var k = this.requireHost(this.amount, cls);
      switch (cls) {
        case "A":
          if (k <= 8) {
            return `${this.ip1}.${Math.pow(2, k)}.255.255`;
          } else if (k <= 16 && k > 8) {
            var h = 16 - k;
            return `${this.ip1}.255.${Math.pow(2, h)}.255`;
          } else if (k > 16) {
            var h = 24 - k;
            return `${this.ip1}.255.255.${Math.pow(2, h)}`;
          }
        case "B":
          if (k <= 8) {
            return `${this.ip1}.${this.ip2}.${Math.pow(2, k)}.255`;
          } else if (k > 8) {
            var h = 16 - k;
            return `${this.ip1}.${this.ip2}.255.${Math.pow(2, h)}`;
          }
        case "C":
          return `${this.ip1}.${this.ip2}.${this.ip3}.${Math.pow(2, h)}`;
        default:
          break;
      }
    },

    Calculate(cls, input) {
      if (this.hosts == "Hosts per Network") {
        this.subnetMask = this.subnet_mark_host(this.checkClass(this.ip1));
      } else {
        this.subnetMask = this.subnet_mark_network(this.checkClass(this.ip1));

        alert("Success!");
      }
    }
  }
};
</script>

