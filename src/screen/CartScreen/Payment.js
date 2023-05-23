import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {BASE_URL, PAYMENT_API} from '../../utils/Constants';
import {Button} from '../../Components/Button';
import {CardField} from '@stripe/stripe-react-native';
import ApiManager from '../../api/ApiManager';
import {TextField} from '../../Components/TextField';
import {validateAddress, validateName} from '../../utils/Validations';
import {useSelector} from 'react-redux';

const Payment = props => {
  const total = useSelector(state => state.products.total);
  // const {confirmPayment, loading} = useConfirmPayment();
  const [showModal, setShowModal] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const fieldValues = {
    userName: '',
    Address: '',
  };
  const [values, setValues] = useState(fieldValues);
  const [errors, setErrors] = useState({
    userName: '',
    Address: '',
  });

  //Fetching Card Details On Completion
  const FetchCardDetail = cardDetail => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  //Api Call For Payment Response
  const FetchPayment = async () => {
    ApiManager.PostAPI(
      '',
      {
        amount: total,
      },
      BASE_URL + PAYMENT_API,
    )
      .then(response => {
        console.log('payment Response::::::::::', response?.data);
        toggleModal();
      })
      .catch(error => {
        console.log('payment Error::::::::::', error);
        ToastAndroid.showWithGravityAndOffset(
          'Error in Placing The Order',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
    // Client Secret Handling

    // const {clientSecret} = await response.data;

    // const {error, paymentIntent} = await confirmPayment(clientSecret, {
    //   paymentMethodType: 'Card',
    //   paymentMethodData: {
    //     billingDetails: [values],
    //   },
    // });

    // if (error) {
    //   console.log(`Error code: ${error.code}, error.message`);
    // } else if (paymentIntent) {
    //   console.log('Success', `Payment Successful: ${paymentIntent.id}`);
    // }
  };

  // Handling Text In Input Field
  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};

      if (key === 'userName') {
        newValue.userName = mValue;
      } else {
        newValue.Address = mValue;
      }
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.userName = '';
      newValue.Address = '';
      return newValue;
    });
  };

  //Validation For Input Field
  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const userNameError = validateName(values.userName);
    const AddressError = validateAddress(values.Address);
    if (userNameError) {
      valErrors = {...valErrors, userName: userNameError};
      valid = false;
    }
    if (AddressError) {
      valErrors = {...valErrors, Address: AddressError};
      valid = false;
    }
    setErrors(valErrors);
    return valid;
  };

  //Toggle For Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //Submitting on Button
  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    FetchPayment();
    return true;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Payment Gateway</Text>
        </View>
        <View style={styles.buynowContainer}>
          <Text style={styles.totalTxt}>
            Subtotal {'\u20B9'}
            <Text style={{fontWeight: 'bold'}}>{total}</Text>
          </Text>
          <Text style={{color: 'lightgreen', marginLeft: 20, marginBottom: 15}}>
            <Icon name="check-circle" style={{fontSize: 15}}></Icon>
            Your order is available for FREE Delivery
          </Text>
        </View>
        <View style={styles.PaymentField}>
          <View style={{marginLeft: 10, marginVertical: 7}}>
            <TextField
              title="Full Name"
              name="userName"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.userName}
              error={errors.userName}
              onChangeText={val => {
                handleChangeText('userName', val);
              }}
              isIcon={false}
            />
            <View style={styles.invalidField}>
              {errors.userName ? (
                <Text style={styles.invalidTxt}>{errors.userName}</Text>
              ) : null}
            </View>
            <TextField
              title="Address"
              name="Address"
              autoCapitalize="none"
              autoCorrect={false}
              value={values.Address}
              error={errors.Address}
              onChangeText={val => {
                handleChangeText('Address', val);
              }}
              isIcon={false}
            />
            <View style={styles.invalidField}>
              {errors.Address ? (
                <Text style={styles.invalidTxt}>{errors.Address}</Text>
              ) : null}
            </View>
            <Text style={{fontSize: 15, color: '#625D5D'}}>Card Details:</Text>
          </View>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
              expiration: 'MM/YY',
              cvc: 'CVC',
            }}
            cardStyle={{
              borderWidth: 2,
              borderColor: '#22689f',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              textColor: 'black',
              placeholderColor: 'lightgrey',
            }}
            style={{
              width: '100%',
              height: 70,
              marginVertical: 10,
            }}
            onCardChange={cardDetails => {
              FetchCardDetail(cardDetails);
              // console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
        <Modal transparent visible={showModal}>
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <Icon
                name="check-circle"
                style={{
                  fontSize: 100,
                  alignSelf: 'center',
                  color: 'green',
                }}></Icon>
              <Text style={styles.modalMaintxt}>Hooray!</Text>
              <Text style={{color: 'black', textAlign: 'center', fontSize: 17}}>
                Your Order Has been Placed!
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Home')}>
                <Text style={styles.modalHomeBtn}>Go Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <Button submitForm={submitForm} disabled={cardInfo} title="Pay Now" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerMain: {
    fontSize: 27,
    marginVertical: 10,
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
  },
  buynowContainer: {
    marginVertical: 20,
    backgroundColor: '#22689f',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
  },
  totalTxt: {
    textAlign: 'left',
    fontSize: 25,
    color: '#ffff',
    marginLeft: 20,
    marginVertical: 7,
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  invalidTxt: {
    color: 'red',
    paddingBottom: 15,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    elevation: 20,
    borderColor: 'black',
    borderWidth: 5,
  },
  modalHomeBtn: {
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    marginVertical: 10,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    backgroundColor: '#22689f',
    borderRadius: 5,
  },
  modalMaintxt: {
    color: 'green',
    fontSize: 25,
    textAlign: 'center',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  invalidTxt: {
    color: 'red',
    paddingBottom: 15,
  },
});
export default Payment;
