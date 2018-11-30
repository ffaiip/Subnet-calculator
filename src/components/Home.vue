<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="info--text">SUBNET CALCULATOR</h2>
                    </v-card-title>
                    <v-layout row>
                        <v-flex xs2>
                            <v-card-text>
                                <div>Class</div>
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
                                <div>IP address</div>
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
                                        <div class="headline mb-0">{{ this.subnetMask }}</div>
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
                <v-data-table
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
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            ip1: '',
            ip2: '',
            ip3: '',
            ip4: '',
            amount: '',
            hosts: '',
            classIP: '',
            classes: [
                "A", "B", "C"
            ],
            hostsNet: [
                "Hosts per Network", "Networks"
            ],
            subnetMask: '255.255.128.0',
            headers: [{
                            text: 'Subnet',
                            align: 'left',
                            value: 'number'
                        },
                        { text: 'Subnet ID', value: 'subnetID', sortable: false },
                        { text: 'First add', value: 'first', sortable: false },
                        { text: 'Last add', value: 'last', sortable: false },
                        { text: 'Broadcast', value: 'broadcast', sortable: false },
            ],
            subnets: [{
                        value: false,
                        number: '0',
                        subnetID: '159.36.24.13',
                        first: '139.22.32.9',
                        last: '13.49.224.4',
                        broadcast: '13.42.124.255',
                    },
                    {
            value: false,
            number: '1',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '2',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '3',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '4',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '5',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '6',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '7',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '8',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          },
          {
            value: false,
            number: '9',
            subnetID: '159.36.24.13',
            first: '139.22.32.9',
            last: '13.49.224.4',
            broadcast: '13.42.124.255',
          }
        ]
      
        }
    },
    computed: {
        defaultC () {
            if (this.classIP == "C" || this.classIP == "B" || this.classIP == "A") {
                return "0"
            }
        },
        defaultB () {
            if (this.classIP == "B" || this.classIP == "A") {
                return "0"
            }
        },
        defaultA () {
            if (this.classIP == "A") {
                return "0"
            }
        },
        classC () {
            return this.classIP == "C" || this.classIP == "B" || this.classIP == "A"
        },
        classB () {
            return this.classIP == "B" || this.classIP == "A"
        },
        classA () {
            return this.classIP == "A"
        },
        ip () {
            if (this.classIP == "C"){
                return this.ip4 == '0'
            }
            else if (this.classIP == 'B'){
                return this.ip3 == '0', this.ip4 == '0'
            }
        }
    },
    methods: {
        addInfo () {
            if (this.ip4 != 0){
                alert('ข้อมูลใช้ไม่ได้ ใส่ใหม่ว้อยยยยย')
            }
            else{
                this.Calculate()
            }
            
        },
        Calculate () {
            alert('Success!')
        },
    },
}
</script>

