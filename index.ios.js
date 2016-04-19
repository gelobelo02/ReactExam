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
   NativeAppEventEmitter
 } from 'react-native';

 var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'http://localhost/';

class ReactExam extends Component {



  constructor(props) {

     super(props);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       loaded: false,
     };

     this.flickrAPI = require("flickrapi"),
      flickrOptions = {
        api_key: "e02b57790bd8a91640ba334149621e48",
        secret: "a446eafa236cdece"
    };

    this.flickrAPI.authenticate(flickrOptions, function(error, flickr) {
     console.log(error + " " + flickr );
   });
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
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  fetchData() {

    fetch(REQUEST_URL)
      .then((response) => console.log(response))
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: movie.posters.thumbnail}}
        style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>
      </View>
    </View>
  );
}

}
var styles = StyleSheet.create({
  title: {
   fontSize: 20,
   marginBottom: 8,
   textAlign: 'center',
 },
 year: {
   textAlign: 'center',
 },
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
