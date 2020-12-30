import { createDrawerNavigator } from '@react-navigation/drawer';
import { DataTable } from 'react-native-paper';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity, Ionicons, FontAwesome,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'; 
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';

const WorldStats = ({ navigation }) => {
  const[confirmedcases,setConfirmedcases]=useState()
  const[cwrp,setCwrp]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[worldpopulation,setWorldpopulation]=useState()
  useEffect(() => {
    
    getData();
    getworlddata();
  },[])
    
  const getworlddata = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': '40838189e4mshb5ffc5960cde754p1c2078jsn5b6a894a4513',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setWorldpopulation(response.data.body.world_population);
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  const getData = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      params: {code: 'it'},
      headers: {
        'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      setConfirmedcases(response.data[0].confirmed);
      setRecovered(response.data[0].recovered);
      setCritical(response.data[0].critical);
      setDeaths(response.data[0].deaths);
      setlastUpdate(response.data[0].lastUpdate);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const calculate = (value) => {
    const val = (100 * value)/worldpopulation;
    return val.toFixed(2);
  }
  
  const Header =({name, openDrawer}) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>openDrawer()}>
        <Icon name="ios-menu" size={32} />
      </TouchableOpacity>
      <Text>{name}</Text>
      <Text style={{width:50}}></Text>
    </View>
  )

  return (
      <View style={styles.container}>

      <Button onPress={() => navigation.navigate('Stats By Country')} title="Country Stats" />
      <Header openDrawer={navigation.openDrawer}/>

 <DataTable>

    <DataTable.Header>
      <DataTable.Title>World Statistics</DataTable.Title>
    </DataTable.Header>

    <DataTable.Header>
      <DataTable.Title>Updated at {lastUpdate}</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>World Population</DataTable.Cell>
      <DataTable.Cell numeric>{worldpopulation}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Confirmed Cases</DataTable.Cell>
      <DataTable.Cell numeric>{confirmedcases}</DataTable.Cell>
    </DataTable.Row>

     <DataTable.Row>
      <DataTable.Cell>Confirmed Cases %</DataTable.Cell>
      <DataTable.Cell numeric>{calculate(confirmedcases)}%</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Recovered Cases</DataTable.Cell>
      <DataTable.Cell numeric>{recovered}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Recovered Cases %</DataTable.Cell>
      <DataTable.Cell numeric>{calculate(recovered)}%</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Critical Cases</DataTable.Cell>
      <DataTable.Cell numeric>{critical}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Critical Cases %</DataTable.Cell>
      <DataTable.Cell numeric>{calculate(critical)}%</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Deaths</DataTable.Cell>
      <DataTable.Cell numeric>{deaths}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Death %</DataTable.Cell>
      <DataTable.Cell numeric>{calculate(deaths)}%</DataTable.Cell>
    </DataTable.Row>
    
    <DataTable.Pagination

      page={2}
      numberOfPages={2}
      onPageChange={page => {
        console.log(page);
      }}
      
    />
  </DataTable>
    </View>
  );
}

function countryStat({ route,navigation }) {
  const[confirmedcases,setConfirmedcases]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[country,setCountry]=useState()
  useEffect(() => {
    setCountry(route.params.country)
    console.log(route.params.country)
    getData(route.params.country);
  },[route.params.country])
    
  
  function getData(counti) {
    const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country',
  params: {name: counti},
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data[0]);
  setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)
}).catch(function (error) {
	console.error(error);
});
    
  }
  return (
          
      <View style={styles.container}>

<DataTable>

    <DataTable.Header>
      <DataTable.Title>{country}</DataTable.Title>
    </DataTable.Header>

    <DataTable.Header>
      <DataTable.Title>Updated at {lastUpdate}</DataTable.Title>
    </DataTable.Header>


    <DataTable.Row>
      <DataTable.Cell>Confirmed Cases </DataTable.Cell>
      <DataTable.Cell numeric>{confirmedcases}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Recovered Cases</DataTable.Cell>
      <DataTable.Cell numeric>{recovered}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Critical Cases</DataTable.Cell>
      <DataTable.Cell numeric>{critical}</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Deaths Cases</DataTable.Cell>
      <DataTable.Cell numeric>{deaths}</DataTable.Cell>
    </DataTable.Row>
           
    <DataTable.Pagination

      page={2}
      numberOfPages={2}
      onPageChange={page => {
        console.log(page);
      }}
      
    />
  </DataTable>

         
     
    </View>
      
    
  );
}
function FavoriteCountries({ route,navigation }) {
  const[favcountries,setFavcountries]=useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    
    loaddata()
    
  },[isFocused])
    
  const loaddata=async()=>{
    try{
      AsyncStorage.getItem('favoritesity').then(
      (value) =>{
        console.log("val",value)
        var array = value.split(",");
        console.log(array)
        var uniqueArray = [];
        
        // Loop through array values
        for(i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        setFavcountries(uniqueArray)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  const showstat=(item)=>{
       console.log("Its here",item)
       navigation.navigate('CountryStat',{
         country: item
          })
     }
  const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
  return (
    <View style={styles.container}>
      
      <Header name="Favorite Countries" openDrawer={navigation.openDrawer}/>
      
      
      
      <FlatList
        data={favcountries}
        renderItem={({item})=>(<View>


        
        <TouchableOpacity  style={styles.appButton} >
        <Text onPress={()=>{showstat(item)}} style={styles.fortext2}>{item}></Text>
        
        </TouchableOpacity>
        
        
  
        </View>
        )}








        keyExtractor={(item, index) => item.id}
        
      />
    </View>
  );
}
function StatsByCountry({ navigation }) {
  const[countries,setCountries]=useState([])
  const[favcountries,setFavcountries]=useState('')
  const [arrayholder,setArrayholder] =useState([])
  const[text, setText] = useState('')
  useEffect(() => {
    loaddata()
    getData();
    
  },[])
  const loaddata=async()=>{
    try{
      AsyncStorage.getItem('favoritesity').then(
      (value) =>{
        console.log("val",value)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  
  const addfitem =async(country)=>{
    
    try {
      const value = await AsyncStorage.getItem('favoritesity');
      console.log("Does it run",favcountries, value)
     
    
    
           await AsyncStorage.setItem('favoritesity', value+","+country);
          
        } catch (error) {
            // Error saving data
        }
        
  }
    const showstat=(item)=>{
       console.log("Its here",item)
       navigation.navigate('CountryStat',{
         country: item
          })
     }
  
  function getData() {
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.body.countries);
  setCountries(response.data.body.countries)
  setArrayholder(response.data.body.countries)
}).catch(function (error) {
	console.error(error);
});
  } 
  const searchData= (text)=>  {
    console.log("It searches")
    const newData = arrayholder.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    console.log("It gets back")

      setCountries(newData)
      setText(text)
    }
  const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon2 name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Favorite Countries')} title="Go see favorite countries" />
      <Header name="Stats By Country" openDrawer={navigation.openDrawer}/>
      <TextInput
         style={styles.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
      
      <FlatList
        data={countries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.appButton} >
        <Text onPress={()=>{showstat(item)}} style={styles.fortext2}>{item}{item.check}></Text>
        <Icon3 onPress={()=>{addfitem(item)}} name="star-outlined" color={'yellow'}></Icon3>
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
      
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Stats">
        <Drawer.Screen name="Stats By Country" component={StackNavigator} />
        <Drawer.Screen name="World Stats" component={WorldStats} />
        <Drawer.Screen name="Favorite Countries" component={FavoriteCountries} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Stats By Country"}>
      <Stack.Screen name="Stats By Country" component={StatsByCountry}/>
      <Stack.Screen name="CountryStat" component={countryStat}/>
    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor:"white"  
      },
  
  appButton: {
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  },
  fortext2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  }


  
});
