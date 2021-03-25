import axios from 'axios';
import {Badge, Body, Button, Container, Content, Footer, FooterTab, Header, Text, Title, View} from 'native-base';
import React from 'react';
import {connect} from 'react-redux';

const Learning = ({isLoggedIn, dispatch}) => {
  //dataArray = [];
  const dataArray = [{}];

  const getAllLookedUpWords = (sortWordsType) => {
    axios(
      'http://3.15.37.149:6010/learning',
      {
        user_id: '20',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(function (response) {
      if (sortWordsType == 'alphabetical') {
        response.data.sort(function (a, b) {
          return a.word > b.word ? 1 : b.word > a.word ? -1 : 0;
        });
      } else if (sortWordsType == 'frequency') {
        response.data.sort(function (a, b) {
          return b.freq - a.freq;
        });
      }
      var data = response.data;
      // dataArray= response.data.map(words => ({ title: words.word, content: words.sentence }));

      for (let i = 0; i < 3; i++) {
        //var dataSet = {"title": data[i].word,"content":data[i].sentence};
        dataArray[i] = {title: data[i].word, content: data[i].sentence};
        //dataArray.push({title: data[i].word,content:data[i].sentence});
      }

      console.log(dataArray);
    });
  };

  React.useEffect((getAllLookedUpWords) => {
    getAllLookedUpWords('recent');
  }, []);

  return (
    <Container>
      <Header style={{backgroundColor: 'black'}}>
        <Body>
          <Title style={{color: 'white'}}> READER </Title>
        </Body>
      </Header>
      <Content padder>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            padding: 10,
            marginLeft: 140,
            marginRight: 140,
          }}>
          <Badge style={{backgroundColor: 'grey'}}>
            <Text style={{color: 'white'}}>Recent</Text>
          </Badge>
          <Badge style={{backgroundColor: 'grey'}}>
            <Text style={{color: 'white'}}>alphabetical</Text>
          </Badge>
          <Badge style={{backgroundColor: 'grey'}}>
            <Text style={{color: 'white'}}>Frequency</Text>
          </Badge>
        </View>
        {/* <Accordion dataArray={dataArray}
            expandedIcon="remove"
            iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }}
            /> */}
      </Content>

      <Footer>
        <FooterTab style={{backgroundColor: 'black'}}>
          <Button vertical>
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Text>Book</Text>
          </Button>
          <Button vertical>
            <Text>Statistics</Text>
          </Button>
          <Button vertical>
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
  };
};
export default connect(mapStateToProps)(Learning);
