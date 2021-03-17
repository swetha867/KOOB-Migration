import {
  Body,
  Button,
  Container,
  Form,
  Header,
  Input,
  Item as FormItem,
  Label,
  Text,
  Title,
} from 'native-base';
import {default as React} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
  setEmail,
  setIsLoggedIn,
  setIsTeacher,
  setStudentId,
  setUserID,
} from '../redux/actions/userActions';
import axios from 'axios';
import {logger} from '../utils/logger';

const Login = ({email, student_id, isLoggedIn,isTeacher,userId, dispatch}) => {
  
React.useEffect(() => {
  alert(userId)
  if(isLoggedIn){
    return Actions.home();
  }

}, []);

  const login = () => {
    axios({
      url: 'http://3.15.37.149:6010/users/',
      data: {
        email: email,
        student_id: student_id,
      },
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    }).then(function (response) {
      if (response.user_id != 0) {
        dispatch(setIsLoggedIn(true));
        dispatch(setIsTeacher(response.data.isTeacher));
        dispatch(setUserID(response.data.user_id));
        logger.info(`User logged in with studentId ${student_id}`);
        return Actions.home();
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });

    
  };
  

  return (
    <Container>
      <Header style={{backgroundColor: 'black'}}>
        <Body>
          <Title style={{marginLeft: 70,alignSelf: 'center'}}>Reader</Title>
        </Body>
      </Header>

      <Form>
        <FormItem
          floatingLabel
          style={{marginLeft: 75, marginRight: 75, marginTop: 100}}>
          <Label>SFSU Email Address</Label>
          <Input onChangeText={(e) => dispatch(setEmail(e))} />
        </FormItem>
        <FormItem floatingLabel style={{marginLeft: 75, marginRight: 75}}>
          <Label>Student Id</Label>
          <Input onChangeText={(e) => dispatch(setStudentId(e))} />
        </FormItem>

        <Button
          rounded
          dark
          style={{marginTop: 40, alignSelf: 'center'}}
          onPress={() => login()}>
          <Text> Login </Text>
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.userReducer.email,
    student_id: state.userReducer.student_id,
    isLoggedIn: state.userReducer.isLoggedIn,
    isTeacher: state.userReducer.isTeacher,
    userId: state.userReducer.userId
  };
};

export default connect(mapStateToProps)(Login);
