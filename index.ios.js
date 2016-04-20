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
   Dimensions
 } from 'react-native';

var REQUEST_URL = 'http://localhost/flickrApi/flickrApiConsume.php';

class ReactExam extends Component {



  constructor(props) {

     super(props);
     this.imagePerRow = Math.round(Dimensions.get('window').width/53);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
     };
   }

  componentDidMount() {
   this.fetchData();
 }

  render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPictures}
        style={styles.listView}
      />
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

  _renderImages = function(pictures) {
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
      {this._renderImages(pictures)}
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
});

AppRegistry.registerComponent('ReactExam', () => ReactExam);
