import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {BASE_URL, PAYMENT_API} from '../../utils/Constants';
import {Button} from '../../Components/Button';
import {
  CardField,
  useStripe,
  confirmPayment,
} from '@stripe/stripe-react-native';
import ApiManager from '../../api/ApiManager';

const Payment = props => {
  const {confirmPayment} = useStripe();
  const [showModal, setShowModal] = useState(false);

  const FetchPayment = () => {
    console.log('URL PAYMENT :::::', BASE_URL + PAYMENT_API, 'payload', {
      amount: props?.route?.params?.payAmount,
    });

    ApiManager.PostAPI(
      '',
      {
        amount: props.route.params.payAmount,
      },
      BASE_URL + PAYMENT_API,
    )
      .then(response => {
        console.log('payment Response::::::::::', response?.data);
      })
      .catch(error => {
        console.log('payment Error::::::::::', error);
      })
      .finally(() => {});
  };

  //   const client_secret = data.client_secret;

  // if (!stripe || !elements) return;
  //  const result = await stripe.confirmPayment(client_secret, {
  // payment_method: {
  //  card: elements.getElement(CardField),
  //  billing_details: {
  //   amount: props.route.params.payAmount
  //  },
  //  },
  //  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitForm = e => {
    FetchPayment();
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
            <Text style={{fontWeight: 'bold'}}>
              {props.route.params.payAmount}
              {/* {numberWithCommas(payAmount)} */}
            </Text>
          </Text>
          <Text style={{color: 'lightgreen', marginLeft: 20, marginBottom: 15}}>
            <Icon name="check-circle" style={{fontSize: 15}}></Icon>
            Your order is available for FREE Delivery
          </Text>
        </View>
        <View style={styles.PaymentField}>
          <View style={{marginLeft: 10, marginVertical: 7}}>
            <Text style={{fontSize: 17}}>Card Details:</Text>
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
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 70,
              marginVertical: 10,
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
        <Modal transparent visible={showModal}>
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalMaintxt}>
                <Icon name="check-circle" style={{fontSize: 15}}></Icon>
                Hooray!
              </Text>
              <Text style={{color: 'black'}}>Your Order Has been Placed!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.modalHomeBtn}>Go Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.buttonContainer}>
          <Button submitForm={submitForm} disabled={true} title="Pay Now" />
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
    marginVertical: 30,
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
  PaymentField: {},
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
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
    padding: 5,
    backgroundColor: '#22689f',
    borderRadius: 5,
  },
  modalMaintxt: {
    color: 'green',
    fontSize: 20,
  },
  lowerBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});
export default Payment;
