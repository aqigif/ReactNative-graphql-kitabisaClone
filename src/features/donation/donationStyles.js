import { StyleSheet } from 'react-native';

const donationStyles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1
  },
  containerItem: {
    flex: 1
    // backgroundColor: 'red'
  },
  containerLoading: {
    marginTop: 40
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    padding: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#d7d7d7',
  },
  amountItem: {
    padding: 10,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#d7d7d7',
  },
  categoryItemMargin: {
    marginLeft: 5,
  },
  categorySelected: {
    backgroundColor: 'purple',
    color: '#ffff'
  },
  categoryUnselected: {
    color: 'purple'
  },
  categorySelectedText: {
    fontWeight: 'bold',
    color: '#ffff'
  },
  categoryUnselectedText: {
    fontWeight: 'bold',
    color: 'black'
  },
  beneficiariesItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    marginTop: 40
  },
  button: {
    textAlign: 'center'
  },
  buttonText: {
    // color: '#fff'
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 5
  },
  totalText: {
    fontWeight: 'bold'
  },
  donationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageZone: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  imagePickerZone: {
    borderRadius: 4,
    backgroundColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  }
});

export default donationStyles;
