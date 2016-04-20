/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 import React, {
   AppRegistry,
   Component,
   Image,
   StyleSheet,
   Text,
   ListView,
   NativeModules,
   View,
   NativeAppEventEmitter,
   Dimensions,
   TextInput,
   TouchableHighlight
 } from 'react-native';

var REQUEST_URL = 'http://localhost/flickrApi/flickrApiConsume.php';

class ReactExam extends Component {



  constructor(props) {

     super(props);
     this.imagePerRow = Math.round(Dimensions.get('window').width/53);
     console.log(this.imagePerRow);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
       text:null
     };
   }

  componentDidMount() {
   this.fetchData();
 }

 _buttonPressed() {
   console.log("Button Pressed:" + this.state.text);
   this._fetchDataWithTag(this.state.text);
 }

 _fetchDataWithTag(tag) {

   this.setState({
     loaded : false
   });

   fetch(REQUEST_URL + '?tag=' +tag)
     .then((response) => response.json())
     .then((responseData) => {
       this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
     })
     .done();

 }

  render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
        <View style = {styles.containerItems}>
        <TextInput
          style={{height: 50, borderColor: 'gray', borderWidth: 2}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
      />
      <TouchableHighlight
        style={{alignItems:"center"}}
        activeOpacity={0.6}
        underlayColor={'gray'}
        onPress={this._buttonPressed.bind(this)}>
        <Text style={styles.button}>Search Tag</Text>
      </TouchableHighlight>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPictures.bind(this)}
        style={styles.listView}
      />
      </View>
    );
  }

  fetchData() {

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(responseData),
         loaded: true,
       });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Pictures...
        </Text>
      </View>
    );
  }

  renderImages(pictures) {
    var imageList = [];
     for (var index = 0; index < this.imagePerRow ; index++) {
       imageList.push(
         <Image
           source={{uri: pictures}}
           style={styles.thumbnail}
         />
       );
     }
     return imageList;
  }

  renderPictures(pictures) {

  return (
    <View style={styles.container}>
        {this.renderImages(pictures)}
    </View>
  );
}

}
var styles = StyleSheet.create({
  rightContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  containerItems: {
     paddingTop:20
  },
  button: {
   color: 'blue',
   fontSize: 30
 }
});

AppRegistry.registerComponent('ReactExam', () => ReactExam);
