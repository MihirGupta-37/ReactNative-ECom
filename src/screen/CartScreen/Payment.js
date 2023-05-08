import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {numberWithCommas} from '../../utils/Validations';
import {TextField} from '../../Components/TextField';
import {Button} from '../../Components/Button';
import {validateCardNo} from '../../utils/Validations';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const Payment = () => {
  // const {confirmPayment} = useStripe();
  const [addedProduct, setAddedProduct] = useState([]);
  const fieldValues = {
    cardNo: '',
  };
  const [values, setValues] = useState(fieldValues);
  const [errors, setErrors] = useState({
    cardNo: '',
  });

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};
      key === 'cardNo';
      newValue.cardNo = mValue;
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.cardNo = '';
      return newValue;
    });
  };

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const cardNoError = validateCardNo(values.cardNo);
    if (cardNoError) {
      valErrors = {...valErrors, cardNo: cardNoError};
      valid = false;
    }
    setErrors(valErrors);
    return valid;
  };

  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    return true;
  };

  const calculateTotal = () => {
    return addedProduct.reduce((total, item) => {
      let amount = total + item.price * item.quantity;
      return amount;
    }, 0);
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
              {numberWithCommas(calculateTotal())}
            </Text>
          </Text>
          <Text style={{color: 'green', marginLeft: 20, marginBottom: 15}}>
            <Icon name="check-circle" style={{fontSize: 15}}></Icon>
            Your order is available for FREE Delivery
          </Text>
        </View>
        {/* <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
            expiration: 'MM/YY',
            cvc: 'CVC',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        /> */}
        <TextField
          title="Enter Card No."
          name="cardNo"
          placeholder="**** **** **** ****"
          autoCapitalize="none"
          autoCorrect={false}
          value={values.cardNo}
          error={errors.cardNo}
          onChangeText={val => {
            handleChangeText('cardNo', val);
          }}
          isIcon={false}
        />
        <View style={styles.invalidField}>
          {errors.cardNo ? (
            <Text style={styles.invalidTxt}>{errors.cardNo}</Text>
          ) : null}
        </View>
        {/* <View>
          <TextInput></TextInput>
        </View> */}
        <View style={styles.buttonContainer}>
          <Button submitForm={submitForm} disabled={true} title="Submit" />
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
    marginVertical: 15,
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
  },
  buynowContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  totalTxt: {
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
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
});
export default Payment;
