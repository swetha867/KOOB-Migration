import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
} from 'native-base';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';


const Home = ({

  isLoggedIn,
  dispatch,
}) => {
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    // clickForSearch("");
  }, []);
  const book = null;
  const webview = useRef();

  bookChooser = (e) => {
    // console.log("hello")
    // var firstFile = e;
    // alert(firstFile)
    // if (window.FileReader) {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //         book = ePub({
    //             bookPath: e.target.result
    //         });

    //         book.renderTo("area");
    //         /* Replace area with the id for your div to put the book in */
    //     }.bind(this);

    //     reader.readAsArrayBuffer(firstFile);

    // } else {
    //     alert("Your browser does not support the required features. Please use a modern browser such as Google Chrome, or Mozilla Firefox");
    // }
  };



  prev = () => {
    book.prevPage();
  }

  next = () => {
    book.nextPage();
  }



  handleFilePicker = async () => {
    // console.log(bookSearch)

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }


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
          <Button onclick="">
            <Text>
              GO
            </Text>
          </Button>
        </FormItem>
      </Content>

      <Footer >
        <FooterTab style={{ backgroundColor: 'black' }} >
          <Button vertical>
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
          <Button vertical onPress={() => {
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
  };
};
export default connect(mapStateToProps)(Home);
