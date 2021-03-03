import React from 'react'
import { View,TextInput,TouchableOpacity,Text,Image,Alert } from 'react-native'
import { Header } from 'react-native-elements'
import db from '../config';

export default class ReadScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            inputSearch: '',
            search: '',
            searchedTitle: '',
            searchedAuthor: '',
            searchedStory: '',
        }
    }

    searchStory = async () => {
        this.setState({ search: this.state.inputSearch })
        const storyRef = db.collection("stories").where("title","==",this.state.search).get();
        var story = "";
        if(storyRef.docs.length===0){
            Alert.alert("","There is no such story with that title");
            this.setState({ search: '' })
        } 
        
    }

    render(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        }
        if (mm < 10) {
        mm = '0' + mm;
        }
        today = dd + '-' + mm + '-' + yyyy;
        return (
            <View>
                <Header
                    backgroundColor={'#303338'}
                    centerComponent={{
                        text: 'Bedtime Stories',
                        style: { color: 'white', 
                                fontSize: 20 },
                    }}
                    leftComponent={{
                        text: today,
                        style: { color: 'white', 
                                fontSize: 13 },
                    }}
                />
                <View style={{ flexDirection: 'row',marginTop: 5 }}>
                    <TextInput style={{ width: '87%',
                                        height: 50,
                                        backgroundColor: '#303338',
                                        borderWidth: 8,
                                        borderColor: '#393C3F',
                                        color: '#f5f5f5',
                                        paddingLeft: 20,
                                        fontSize: 18 }}
                                placeholder="Search Here"
                                onChangeText={text=>
                                this.setState({ inputSearch: text })} 
                                value={this.state.search } />
                    <TouchableOpacity onPress={async()=>{this.searchStory()}}>
                    <Image
                    source={require("../assets/search.jpg")}
                    style={{width:50, height: 50}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

