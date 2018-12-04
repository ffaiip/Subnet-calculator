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
                                <v-flex xs4>
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
    data () {
        return {
            ip1: '',
            ip2: '',
            ip3: '',
            ip4: '',
            amount: '',
            hosts: '',
            firstAdd: '',
            lastAdd: '',
            hostsNet: [
                "Hosts per Network", "Networks"
            ],
            subnetMask: '255.255.128.0',
            broadcast: '',
            subnetID: '',
        }
    },
    computed: {
        classIP () {
            if (this.ip1 == ""){
                return " "
            }
            else if(this.ip1 <= 127){
                return "A"
            }
            else if(this.ip1 <= 191 && this.ip1 >= 128){
                return "B"
            }
            else if(this.ip1 >= 192 && this.ip1 <= 223){
                return "C"
            }
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

