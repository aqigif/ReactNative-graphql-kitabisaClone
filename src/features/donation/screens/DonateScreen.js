import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Button, ToastAndroid, Alert } from 'react-native';
import donationStyles from '../donationStyles';
import Categories from './../components/amountList';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { TRANSACTION, GET_BENEFICIARIES_BY_BEN_ID } from '../queries';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ReactNativeFile } from 'apollo-upload-client';
import FAicons from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Popup } from 'popup-ui';

const DonateScreen = (props) => {
  const { beneficiaryId } = props?.route?.params;
  const [amountSelected, setAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [file, setFiles] = useState('');
  const [filePreview, setFilesPreview] = useState('');

  const [loadTrx, {
    data: dataTrx,
    error: errorTrx,
    loading: loadingTrx,
    called: calledTrx
  }] = useMutation(TRANSACTION,{
    onCompleted(data) {
      onSuccess(data)
    },
    onError(error) {
      onFailed(error)
    }
  });

  const [loadBen, {
    data: dataBen,
    error: errorBen,
    loading: loadingBen,
    called: calledBen
  }] = useLazyQuery(GET_BENEFICIARIES_BY_BEN_ID);

  useEffect(() => {
    loadBen({variables: {id:beneficiaryId}});
  },[]);

  useMemo(() => {
    const { navigation } = props;
    navigation.setOptions({
      title: `Donate for ${dataBen?.beneficiary?.firstName} ${dataBen?.beneficiary?.lastName}`
    })
  },[dataBen]);

  const openFile = async() => {
    try { 
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const file = new ReactNativeFile({
        uri: res.uri,
        name: res.name,
        type: res.type,
      });
      setFilesPreview(res.uri);
      setFiles(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  const onDonate = () => {
    const input = {
      beneficiaryId: beneficiaryId,
      timeline: timeline,
      amount: amountSelected,
      // paymentProof: file,
      total: (amountSelected * timeline)
    };
    return (
    Alert.alert(
      "Confirmation",
      `Are you sure want to send this donation to ${dataBen?.beneficiary?.firstName} ${dataBen?.beneficiary?.lastName}?`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes", onPress: async () => {
          await loadTrx({
            variables: input,
            pollInterval:200000,
          });
        } }
      ],
      { cancelable: false }
    )
  )};

  const onSuccess = async (data) => {
    if (data) {
      Popup.show({
        type: 'Success',
        callback: () => Popup.hide(),
        button: false,
        buttonText: 'Ok',
        autoClose: false,
        timing: 4000,
        title: 'Success',
        textBody: `Donation has been sent to ${dataBen?.beneficiary?.firstName} ${dataBen?.beneficiary?.lastName}`,
      })
      props.navigation.goBack();
    }
  }
  
  const onFailed = async(error) => {
    if(error){
      Popup.show({
        type: 'Danger',
        callback: () => Popup.hide(),
        button: false,
        buttonText: 'Close',
        autoClose: false,
        timing: 4000,
        title: 'Error',
        textBody: "Sorry, Error while sending your donation, try again"
      })
    }
  }
  return (
    <View style={donationStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={donationStyles.containerItem}
      >
        <View style={{flex: 1, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}> 
          <Image
            style={{height: 63, width: 200}}
            source={{
              uri: "https://4.bp.blogspot.com/-aYnDGxxeXDQ/TcJNmbzKbWI/AAAAAAAADjM/DwQ0DHpKd8w/s1600/Logo_Bank_BCA.png",
            }}
          />
          <View
           style={{
             alignItems: 'flex-end',
             justifyContent: 'flex-end'
           }}>
          <Text>12121210 10210</Text>
          <Text>PT Mejik Foundation</Text>
          </View>
        </View>
        <View style={{marginBottom: 5}}>
        <Text>Amount</Text>
        <Categories
          data={dataAmount}
          selected={amountSelected}
          setSelected={setAmount}
        />
        </View>
        <View style={{marginBottom: 10}}>
        <Text>Timeline</Text>
        <Categories
          data={dataTimeline}
          selected={timeline}
          setSelected={setTimeline}
        />
        </View>
        <Text>Payment Proof</Text>
        <TouchableOpacity onPress={openFile}>
          <View style={{
            ...donationStyles.imagePickerZone,
            height: 280,
          }}>
          {filePreview ? 
            <Image
              style={{height: 260, width: 320, borderRadius: 4}}
              source={{
                uri: filePreview,
              }}
            />:
            <View style={{alignItems: 'center'}}>
              <FAicons name='upload' size={50} />
              <Text style={{fontWeight: 'bold'}}>Choose File</Text>
            </View>
          }
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View>
        <View style={donationStyles.donationWrapper}>
          <Text>Amount</Text>
          <Text>Rp {amountSelected}</Text>
        </View>
        <View style={donationStyles.donationWrapper}>
          <Text>Timeline</Text>
          <Text>{timeline} Months</Text>
        </View>
        <View style={donationStyles.totalWrapper}>
          <Text style={donationStyles.totalText}>Total</Text>
          <Text style={donationStyles.totalText}>Rp {(timeline * amountSelected)}</Text>
        </View>
        <Button
          onPress={onDonate}
          title={loadingTrx ? "Loading ..." : "Donate"}
          color="purple"
          disabled={!amountSelected || !timeline || loadingTrx || !file}
        />
      </View>
    </View>
  )
};

const dataAmount = [
  {
    id: 50000,
    name: '50.000'
  },
  {
    id: 100000,
    name: '100.000'
  },
  {
    id: 150000,
    name: '150.000'
  },
  {
    id: 200000,
    name: '200.000'
  },
  {
    id: 300000,
    name: '300.000'
  },
  {
    id: 500000,
    name: '500.000'
  },
  {
    id: 1000000,
    name: '1.000.000'
  }
];

const dataTimeline = [
  {
    id: 1,
    name: 'A Month'
  },
  {
    id: 2,
    name: '2 Month'
  },
  {
    id: 3,
    name: '3 Month'
  },
  {
    id: 6,
    name: '6 Month'
  },
  {
    id: 12,
    name: 'A Years'
  }
]


export default DonateScreen;