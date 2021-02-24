import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Input,
  Item as FormItem,
  Left,
  Right,
  Body,
} from 'native-base';

import {addBook} from '../redux/actions/bookActions';
import {setBookURL} from '../redux/actions/userActions';

const Home = ({isLoggedIn, books, bookUrl, dispatch}) => {
  handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //name, link, flag, author,imgpath
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      let payload = {url: res.uri, type: res.type, book_name: res.name};
      dispatch(addBook(res.uri, res.name));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    console.log('books' + books.length);
    // console.log(res.uri);
  };

  const openBook = (url) => {
    dispatch(setBookURL(url));
    console.log('Home Page' + bookUrl);
    return Actions.reader();
  };

  _pickDocument = async () => {};
  return (
    <Container>
      <Header style={{backgroundColor: 'black'}}>
        <Left>
          <Icon.Button name="cog" dark backgroundColor="black">
            <Text style={{color: 'white'}}>Settings</Text>
          </Icon.Button>
        </Left>
        <Body>
          <Text style={{color: 'white'}}> HOME </Text>
        </Body>
        <Right>
          <Icon.Button
            name="plus"
            onPress={handleFilePicker}
            dark
            backgroundColor="black">
            <Text style={{color: 'white'}}>Add Books</Text>
          </Icon.Button>
        </Right>
      </Header>

      <Content style={{marginTop: '3%'}}>
        <FormItem rounded style={{marginBottom: '2%'}}>
          <Input placeholder="Search" />
        </FormItem>
        {books.map((item, index) => {
          return (
            <Card key={index} style={{flex: 0}}>
              <CardItem
                button
                onPress={() => {
                  dispatch(setBookURL(item.url));
                  Actions.reader();
                }}>
                <Left>
                  {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
                  <Body>
                    <Text>{item.book_name}</Text>
                    {/* <Text note>{item.url}</Text> */}
                  </Body>
                </Left>
              </CardItem>
            </Card>
          );
        })}
      </Content>

      <Footer>
        <FooterTab style={{backgroundColor: 'black'}}>
          <Button vertical>
            <Text>Home</Text>
          </Button>
          <Button
            vertical
            onPress={() => {
              Actions.reader();
            }}>
            <Text>Book</Text>
          </Button>
          <Button vertical>
            <Text>Statistics</Text>
          </Button>
          <Button
            vertical
            onPress={() => {
              Actions.learning();
            }}>
            <Text>Learning</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    books: state.booksReducer.books,
    bookUrl: state.userReducer.book_url,
  };
};
export default connect(mapStateToProps)(Home);
