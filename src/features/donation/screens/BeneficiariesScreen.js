import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ToastAndroid, Button } from 'react-native';
import donationStyles from '../donationStyles';
import Categories from './../components/categoryList';
import Beneficiaries from './../components/beneficiaryList';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { GET_CATEGORIES, GET_BENEFICIARIES_BY_CATEGORIES_ID, GET_BENEFICIARIES } from '../queries';
import AsyncStorage from '@react-native-community/async-storage';

const BeneficiariesScreen = (props) => {
  const [categorySelected, setCategory] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories
  } = useQuery(GET_CATEGORIES);
  let categories = [
    { id: '', name: 'All' }
  ];
  if (dataCategories?.categories) {
    const dataNew = dataCategories?.categories;
    categories = [
      ...categories,
      ...dataNew
    ];
  }

  const [loadBeneficariesByCatId, {
    called: calledBeneficariesByCatId,
    loading: loadingBeneficariesByCatId,
    data: dataBeneficariesByCatId,
    refetch: refetchBenCatId
  }] = useLazyQuery(GET_BENEFICIARIES_BY_CATEGORIES_ID,
    { variables: { categoriesId: categorySelected },
    fetchPolicy : 'network-only'}
  );
  const [loadBeneficaries, {
    called: calledBeneficaries,
    loading: loadingBeneficaries,
    data: dataBeneficaries,
    refetch: refetchBen
  }] = useLazyQuery(GET_BENEFICIARIES,{
    fetchPolicy : 'network-only'});
  useEffect(() => {
    loadBeneficaries({pollInterval: 10000});
  }, []);

  const fetchBeneficarieByCatId = async (catId) => {
    await setCategory(catId);
    setBeneficiary('');
    if (catId) {
      loadBeneficariesByCatId();
    } else {
      loadBeneficaries();
    }
  }

  const selectBeneficiary = async (benId) => {
    if (benId === beneficiary) {
      setBeneficiary('');
    } else {
      setBeneficiary(benId);
    }
  }

  const onRefresh = () => {
    if (categorySelected) {
      loadBeneficariesByCatId();
    } else {
      loadBeneficaries();
    }
  }
  const onChooseBeneficiary = async() => {
    const { navigation } = props;
    const auth = await AsyncStorage.getItem('@token');
    if (auth) {
      navigation.push('Donation', {
        beneficiaryId: beneficiary
      });
    } else {
      navigation.push('Login');
      ToastAndroid.showWithGravityAndOffset(
        "Sorry, You have to login first before donating",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      
    }
    setBeneficiary('');
  }
  return (
    <View style={donationStyles.container}>
      <View style={donationStyles.containerItem}>
        {(loadingCategories && !dataCategories) ?
          <Text>Loading</Text> :
          <Categories
            data={categories}
            selected={categorySelected}
            setSelected={fetchBeneficarieByCatId}
          />
        }
        <Beneficiaries
          loading={calledBeneficaries && loadingBeneficaries}
          data={categorySelected ?
            (dataBeneficariesByCatId?.beneficiariesConnection?.data) :
            (dataBeneficaries?.beneficiaries)
          }
          refreshing={categorySelected ?
            loadingBeneficariesByCatId :
            loadingBeneficaries
          }
          onRefresh={onRefresh}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          beneficiary={beneficiary}
          setBeneficiary={selectBeneficiary}
        />
      </View>
      <View>
        <Button
          title="Choose Beneficiary"
          color="purple"
          disabled={!beneficiary}
          onPress={onChooseBeneficiary}
        />
      </View>
    </View>
  )
};

export default BeneficiariesScreen;