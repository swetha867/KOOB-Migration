import React, { Component,useRef } from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {addBook
  
} from "../redux/actions/bookActions";
import {setBookURL,setCurrentBookLocation,setCurrentBookName
  
} from "../redux/actions/userActions";
import { Image,PermissionsAndroid } from 'react-native';

import {
  Container,
  Header,
  Footer,
  FooterTab,
  Button,
  Text,
  Body,
  Form,
  Left,
  Right,
  Content,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
  Card, CardItem, Thumbnail
} from 'native-base';
import  { DocumentPickerResponse } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';

const Home = ({
  
  isLoggedIn,
  books,
  bookUrl,
  dispatch,
}) => {
  const [booksStore, setBooksStore] = React.useState([]);
  const book=null;
  React.useLayoutEffect(() => {
    console.log("home isLoggedin"+isLoggedIn)
    renderBooks();
  });
  

  bookChooser= (e)=> { 
  
};

renderBooks=()=>{
  
    for(let i=0;i<books.length;i++){
        booksStore.push(books[i]);
    }
    console.log(booksStore[0])
  }
  requestStoragePermission = async () => {

    if (Platform.OS !== "android") return true

    const pm1 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    const pm2 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    if (pm1 && pm2) return true

    const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ]);

    if (userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
        return true
    } else {
        return false
    }
}
handleFilePicker= async () => {
   // console.log(bookSearch)
   let granted = await requestStoragePermission();
  //  if (!granted) await getStoragePermission();
    try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    //name, link, flag, author,imgpath
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
  //  let realPath = `file://${RNFetchBlob.fs.dirs.SDCardDir}/${res.name}`;
   dispatch(addBook(res.uri,res.name));

  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
  console.log("books"+books.length)
 // console.log(res.uri);

 
}
  
 openBook=(url,book_name)=>{
      dispatch(setBookURL(url));
      dispatch(setCurrentBookName(book_name))
      console.log(book_name)
      return Actions.reader();
 }
  
  
  
  
  
  _pickDocument = async () => {
    // let result = await DocumentPicker.getDocumentAsync({});
    // // need to verify whether doc is epub
    // var slash_index = result.name.lastIndexOf("/") + 1;
    // var epubindex = result.name.lastIndexOf(".epub");
    // var onlyname = result.name.substring(slash_index, epubindex);
    // onlyname = onlyname.replace(/-/g, " ");
    // var linkname = result.uri;
    // var bname = toTitleCase(onlyname);
    // db.transaction(tx => {
      
    //   tx.executeSql(
    //     'CREATE TABLE IF NOT EXISTS BooksTable (book_id INTEGER PRIMARY KEY AUTOINCREMENT,name, link, flag, author,imgpath)'
    //     )    
    //     tx.executeSql('INSERT INTO BooksTable VALUES (?,?,?,?,?)', [bname,
    //       linkname, 0, '', '']);
    //      // console.log(result);
    //     })
        
        
        
    //   }
    //   function toTitleCase(str) {
    //     return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    //   }
      
      // const ebook =() => {
      //   return (
      //     <Epub src={"https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf"}
      //     flow={"paginated"} />
      
      //   )}
      
  }
      return (
        <Container>
        <Header style={{ backgroundColor: 'black' }}>
          
          <Left>
  
          <Icon.Button name='cog' dark backgroundColor="black">
            <Text style={{ color: "white" }}>Settings</Text>
          </Icon.Button>
          </Left>
          {/* <Body>
          <Text  style={{ color: "white"}}> HOME </Text>  
          </Body> */}
          <Right>
          <Icon.Button name='plus' onPress={handleFilePicker} dark backgroundColor="black">
            <Text style={{ color: "white" }}>Add Books</Text>
          </Icon.Button>
          </Right>
        </Header>
        
        <Content >
      
              <FormItem rounded>
              <Input placeholder='Search' />
            </FormItem>
            {booksStore.map((item, index) => {
                        return(

            <Card key={index} style={{flex: 0}}>
            <CardItem button onPress={() =>openBook(item.url,item.book_name)}>
              <Left>
                {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
                <Body>
                  <Text>{item.book_name}</Text>
                  <Text note>{item.url}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
             );
          })}
            </Content>

      <Footer >
        <FooterTab style={{ backgroundColor: 'black' }} >
          <Button vertical onPress={() => {
            Actions.home();}}>
            <Text>Home</Text>
          </Button>
          <Button vertical onPress={() => {
            Actions.reader();
          }}>
            <Text>Book</Text>
          </Button>
          <Button vertical >
            <Text>Statistics</Text>
          </Button>
          <Button vertical  onPress={() => {
            Actions.learning();
          }}>
            <Text>Learning</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
        
       
          )
        }



        const mapStateToProps = (state) => {
          return {
            isLoggedIn: state.userReducer.isLoggedIn,
            books:state.booksReducer.books,
            bookUrl:state.userReducer.book_url

          };
        };
 export default connect(mapStateToProps)(Home);
        