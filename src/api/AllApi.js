// export {BASE_URL, LOGIN_API, REGISTER_API, PROFILE_API} from '../utils/Constants'

// export const handleRegister = () => {
//   axios
//     .post(BASE_URL + REGISTER_API, {
//       name: values.userName,
//       email: values.email,
//       password: values.password,
//     })
//     .then(function (response) {
//       console.log('Response::::::::::', response);

//       LocalStorage.saveData('UserData', response?.data);
//       userDetails(response?.data);
//       userToken(response?.data?.token);
//       props.navigation.navigate('Home');
//     })
//     .catch(function (error) {
//       console.log('Error::::::::::', error.response);
//       ToastAndroid.showWithGravityAndOffset(
//         'User already Exists!',
//         ToastAndroid.LONG,
//         ToastAndroid.BOTTOM,
//         25,
//         50,
//       );
//     });
// };